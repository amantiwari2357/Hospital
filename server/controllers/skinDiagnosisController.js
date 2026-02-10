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
                const savedDiagnosis = await diagnosis.save();

                res.status(201).json(savedDiagnosis);

            } catch (err) {
                console.error('Analysis Process Error:', err);
                console.error('Raw Python Output:', resultData);

                diagnosis.status = 'Failed';
                try {
                    await diagnosis.save();
                } catch (saveErr) {
                    console.error('Failed to save diagnosis after process error:', saveErr);
                }

                if (err instanceof SyntaxError) {
                    return res.status(500).json({ message: 'Failed to parse AI output', error: 'Invalid response format' });
                }

                res.status(500).json({
                    message: 'Backend operation failed',
                    error: err.name === 'MongoNetworkError' ? 'Database connection error' : err.message
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
