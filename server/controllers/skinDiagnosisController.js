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

        // --- CRITICAL ERROR HANDLING (Layer 7) ---
        // Catch spawn errors (e.g. python3 not found)
        pythonProcess.on('error', (err) => {
            console.error('Python Process Spawn Error:', err.message);
        });

        // Catch stream errors individually to prevent unhandled 'error' event crash
        if (pythonProcess.stdin) {
            pythonProcess.stdin.on('error', (err) => {
                if (err.code === 'EPIPE') {
                    console.warn('Python Stdin Pipe closed early (EPIPE) - process likely failed during initialization.');
                } else {
                    console.error('Python Stdin Pipe Error:', err.message);
                }
            });
        }

        if (pythonProcess.stdout) pythonProcess.stdout.on('error', (err) => console.error('Stdout Error:', err.message));
        if (pythonProcess.stderr) pythonProcess.stderr.on('error', (err) => console.error('Stderr Error:', err.message));

        // Safely write to stdin
        if (pythonProcess.stdin && pythonProcess.stdin.writable) {
            try {
                pythonProcess.stdin.write(JSON.stringify({
                    image,
                    realDiseases,
                    historicalData: confirmedHistory,
                    chatTrends: chatTrends.slice(-30)
                }));
                pythonProcess.stdin.end();
            } catch (stdinErr) {
                console.error('Synchronous Stdin Write Failure:', stdinErr.message);
            }
        }

        pythonProcess.stdout.on('data', (data) => resultData += data.toString());
        pythonProcess.stderr.on('data', (data) => errorData += data.toString());

        pythonProcess.on('close', async (code) => {
            // Filter noise from stderr
            const filteredError = errorData
                .split('\n')
                .filter(line => {
                    const isInfo = line.includes('Matplotlib') ||
                        line.includes('Moment') ||
                        line.includes('font cache');
                    return line.trim() !== '' && !isInfo;
                })
                .join('\n')
                .trim();

            let analysisResult = null;
            let parseError = null;

            try {
                if (resultData.trim()) {
                    analysisResult = JSON.parse(resultData);
                }
            } catch (err) {
                parseError = err.message;
            }

            // Decision Logic:
            // 1. If we have a structured result (even with code != 0), check for errors in it
            if (analysisResult) {
                if (analysisResult.error) {
                    diagnosis.status = 'Failed';
                    await diagnosis.save();
                    return res.status(400).json({
                        message: 'AI Engine Diagnostic',
                        error: analysisResult.error,
                        details: analysisResult.details
                    });
                }

                // 2. Successful analysis path
                diagnosis.status = 'Pending Review';
                diagnosis.aiAnalysis = analysisResult;
                await diagnosis.save();
                return res.status(201).json({
                    ...diagnosis.toObject(),
                    aiAnalysis: analysisResult
                });
            }

            // 3. If no structured result and code is non-zero, it's a crash
            if (code !== 0) {
                console.error(`AI Engine Crash (Code ${code}). Raw Error Data:`, errorData);
                diagnosis.status = 'Failed';
                await diagnosis.save();
                return res.status(500).json({
                    message: 'AI Process Crash',
                    error: filteredError || errorData.slice(-500) || 'Process terminated silently',
                    details: 'Check server logs for full traceback',
                    code
                });
            }

            // 4. Fallback for empty results
            res.status(500).json({ message: 'Empty Analysis Result', error: parseError || 'Unknown Error' });
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
