const SkinDiagnosis = require('../models/SkinDiagnosis');
const Disease = require('../models/Disease');
const { spawn } = require('child_process');
const path = require('path');

// @desc    Analyze skin image with Reinforcement Learning context
// @route   POST /api/skin-diagnosis/analyze
const analyzeSkin = async (req, res) => {
    try {
        const { image, patientName, patientId, phone, email } = req.body;

        if (!image) {
            return res.status(400).json({ message: 'Image data is required' });
        }

        // 1. Initial Processing Record
        let diagnosis = new SkinDiagnosis({
            patientName: patientName || 'Anonymous',
            patientId: patientId || `P-${Math.floor(1000 + Math.random() * 9000)}`,
            phone,
            email,
            imageUrl: image,
            status: 'Processing'
        });
        diagnosis = await diagnosis.save();

        // 2. Gather AI Learning Context (Historical + Chat)
        const realDiseases = await Disease.find({});

        // Fetch confirmed history to provide "learning" bias
        const confirmedHistory = await SkinDiagnosis.find({
            'doctorVerdict.isConfirmed': true
        }).limit(30).select('aiAnalysis.condition doctorVerdict.condition');

        // Extract diagnostic chatter patterns
        const recentInteractions = await SkinDiagnosis.find({
            'interactions.0': { $exists: true }
        }).sort({ createdAt: -1 }).limit(10).select('interactions.message');

        const chatTrends = [];
        recentInteractions.forEach(d => {
            d.interactions.forEach(i => {
                if (i.message.length > 3) chatTrends.push(i.message);
            });
        });

        // 3. Trigger Analysis (Use python3 for Linux/Render compatibility)
        const scriptPath = path.join(__dirname, '../scripts/analyze_skin.py');
        const pythonProcess = spawn('python3', [scriptPath], {
            env: {
                ...process.env,
                MPLCONFIGDIR: '/tmp', // Ensure matplotlib has a writable cache
                PYTHONUNBUFFERED: '1'
            }
        });

        let resultData = '';
        let errorData = '';

        // Handle pipe errors (prevent EPIPE crash if Python fails early)
        pythonProcess.stdin.on('error', (err) => {
            console.error('Python Stdin Pipe Error:', err.message);
        });

        pythonProcess.stdin.write(JSON.stringify({
            image,
            realDiseases,
            historicalData: confirmedHistory,
            chatTrends: chatTrends.slice(-30)
        }));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => resultData += data.toString());
        pythonProcess.stderr.on('data', (data) => errorData += data.toString());

        pythonProcess.on('close', async (code) => {
            // Filter out purely informational messages from stderr
            const filteredError = errorData
                .split('\n')
                .filter(line => {
                    const isInfo = line.includes('Matplotlib is building the font cache') ||
                        line.includes('Moment');
                    return line.trim() !== '' && !isInfo;
                })
                .join('\n')
                .trim();

            if (code !== 0 || filteredError) {
                console.error(`AI Analysis Ended (Code ${code}):`, filteredError || errorData);

                // If we got valid result despite stderr noise, we might want to proceed
                // But if code is non-zero, it likely failed.
                if (code !== 0) {
                    diagnosis.status = 'Failed';
                    await diagnosis.save();
                    return res.status(500).json({
                        message: 'AI Engine Error',
                        error: filteredError || 'Process exited unexpectedly'
                    });
                }
            }

            try {
                // If stdout is empty but we reached here, it's also an error
                if (!resultData.trim()) {
                    throw new Error('No output from AI engine');
                }

                const analysisResult = JSON.parse(resultData);

                if (analysisResult.error) {
                    diagnosis.status = 'Failed';
                    await diagnosis.save();
                    return res.status(400).json({ message: 'Validation Error', error: analysisResult.error });
                }

                // 4. Update with Results
                diagnosis.status = 'Pending Review';
                diagnosis.aiAnalysis = analysisResult;

                try {
                    await diagnosis.save();
                } catch (saveError) {
                    console.error('Final Save Warning:', saveError.message);
                }

                res.status(201).json({
                    ...diagnosis.toObject(),
                    aiAnalysis: analysisResult
                });

            } catch (err) {
                console.error('Result Processing Error:', err.message);
                res.status(500).json({ message: 'Server Process Error', error: err.message });
            }
        });

    } catch (error) {
        console.error('Major Backend Failure:', error);
        res.status(500).json({ message: 'Critical Backend Error', error: error.message });
    }
};

// @desc    Get all diagnoses (CRM)
const getDiagnoses = async (req, res) => {
    try {
        const diagnoses = await SkinDiagnosis.find().sort({ createdAt: -1 });
        res.json(diagnoses);
    } catch (error) {
        res.status(500).json({ message: 'Fetch Error', error: error.message });
    }
};

// @desc    Update diagnosis with Doctor Feedback & Chat
const updateDiagnosis = async (req, res) => {
    try {
        const { status, doctorVerdict, interaction } = req.body;
        const diagnosis = await SkinDiagnosis.findById(req.params.id);

        if (!diagnosis) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (status) diagnosis.status = status;
        if (doctorVerdict) {
            diagnosis.doctorVerdict = { ...diagnosis.doctorVerdict, ...doctorVerdict };
            diagnosis.reviewedAt = new Date();
            if (req.user) diagnosis.reviewedBy = req.user._id;
        }

        if (interaction) {
            diagnosis.interactions.push({
                sender: interaction.sender || 'Doctor',
                message: interaction.message,
                timestamp: new Date()
            });
        }

        await diagnosis.save();
        res.status(200).json(diagnosis);

    } catch (error) {
        console.error('Feedback Save Error:', error);
        res.status(500).json({ message: 'Save Failed', error: error.message });
    }
};

module.exports = {
    analyzeSkin,
    getDiagnoses,
    updateDiagnosis
};
