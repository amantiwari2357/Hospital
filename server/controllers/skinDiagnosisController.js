const SkinDiagnosis = require('../models/SkinDiagnosis');
const Disease = require('../models/Disease');
const { spawn } = require('child_process');
const path = require('path');

// @desc    Analyze skin image
// @route   POST /api/skin-diagnosis/analyze
// @access  Public (or Protected if needed)
const analyzeSkin = async (req, res) => {
    try {
        const { image, patientName, patientId, phone, email } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'Table image data is required' });
        }

        // 1. Save initial record with "Processing" status
        let diagnosis = new SkinDiagnosis({
            patientName: patientName || 'Anonymous',
            patientId: patientId || `P-${Math.floor(Math.random() * 10000)}`,
            phone,
            email,
            imageUrl: image,
            status: 'Processing',
            aiAnalysis: {} // Empty initially
        });

        diagnosis = await diagnosis.save();

        // 2. Fetch Real Disease Data (Dermatology focused)
        const realDiseases = await Disease.find({
            $or: [
                { category: 'Skin/Face' },
                { name: /Skin|Acne|Pimples|Dermatitis|Eczema|Psoriasis/i }
            ]
        });

        // 3. Spawn Python process
        const scriptPath = path.join(__dirname, '../scripts/analyze_skin.py');
        const pythonProcess = spawn('python', [scriptPath]);

        let resultData = '';
        let errorData = '';

        pythonProcess.stdin.write(JSON.stringify({
            image: image,
            realDiseases: realDiseases // Pass real data to Python
        }));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}: ${errorData}`);
                diagnosis.status = 'Failed';
                diagnosis.doctorNotes = `Analysis failed: ${errorData}`;
                await diagnosis.save();
                return res.status(500).json({ message: 'Analysis failed', error: errorData });
            }

            try {
                const analysisResult = JSON.parse(resultData);

                if (analysisResult.error) {
                    diagnosis.status = 'Failed';
                    diagnosis.doctorNotes = `Analysis error: ${analysisResult.error}`;
                    try {
                        await diagnosis.save();
                    } catch (saveErr) {
                        console.error('Failed to save diagnosis after analysis error:', saveErr);
                    }
                    // Return 200/201 but with the error info if it's a validation error from AI
                    return res.status(400).json({
                        message: 'Analysis validation failed',
                        error: analysisResult.error,
                        aiAnalysis: analysisResult
                    });
                }

                // 3. Update record with analysis results
                diagnosis.status = 'Pending Review';
                diagnosis.aiAnalysis = analysisResult;

                try {
                    await diagnosis.save();
                } catch (saveError) {
                    console.error('Final Save Warning (History may be incomplete):', saveError.message);
                    // We don't return here because the AI actually worked!
                }

                // Return result to user even if DB save for history fails
                res.status(201).json({
                    ...diagnosis.toObject(),
                    aiAnalysis: analysisResult,
                    _dbWarning: diagnosis.isNew ? 'History not saved' : null
                });

            } catch (err) {
                console.error('Analysis Finalization Error:', err.message);

                diagnosis.status = 'Failed';
                diagnosis.doctorNotes = `Server sync error: ${err.message}`;

                try {
                    await diagnosis.save();
                } catch (sErr) { }

                // If error is just DB but Python worked, try to return Python data
                if (resultData && resultData.includes('"success": true')) {
                    try {
                        const recover = JSON.parse(resultData);
                        return res.status(200).json({
                            success: true,
                            aiAnalysis: recover.aiAnalysis,
                            status: 'Partially Saved (DB Sync Issue)'
                        });
                    } catch (pe) { }
                }

                res.status(500).json({
                    message: 'Backend operation failed',
                    error: err.name === 'MongoNetworkError' ? 'Database connection error' : err.message,
                    pythonRaw: process.env.NODE_ENV === 'development' ? resultData : undefined
                });
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all diagnoses
// @route   GET /api/skin-diagnosis
// @access  Private (Admin/Doctor)
const getAllDiagnoses = async (req, res) => {
    try {
        const diagnoses = await SkinDiagnosis.find().sort({ createdAt: -1 });
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update diagnosis status
// @route   PUT /api/skin-diagnosis/:id
// @access  Private (Admin/Doctor)
const updateDiagnosisStatus = async (req, res) => {
    try {
        const { status, doctorNotes } = req.body;
        const diagnosis = await SkinDiagnosis.findById(req.params.id);

        if (diagnosis) {
            diagnosis.status = status || diagnosis.status;
            diagnosis.doctorNotes = doctorNotes || diagnosis.doctorNotes;
            diagnosis.phone = req.body.phone || diagnosis.phone;

            if (req.user) {
                diagnosis.reviewedBy = req.user._id;
                diagnosis.reviewedAt = Date.now();
            }

            const updatedDiagnosis = await diagnosis.save();
            res.json(updatedDiagnosis);
        } else {
            res.status(404).json({ message: 'Diagnosis not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    analyzeSkin,
    getAllDiagnoses,
    updateDiagnosisStatus
};
