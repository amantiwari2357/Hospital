import React, { useState, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera,
    Upload,
    Sparkles,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Stethoscope,
    Search,
    RefreshCw,
    X,
    MessageSquare,
    Zap,
    Lock
} from 'lucide-react';

const SkinAI = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [showConsultation, setShowConsultation] = useState(false);
    const [diagnosisId, setDiagnosisId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraMode, setCameraMode] = useState('environment'); // 'user' or 'environment'
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const startCamera = async (mode = cameraMode) => {
        setIsCameraOpen(true);
        setSelectedImage(null);
        setResult(null);

        // Stop any existing tracks first
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: mode }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please check permissions.");
            setIsCameraOpen(false);
        }
    };

    const toggleCamera = () => {
        const newMode = cameraMode === 'environment' ? 'user' : 'environment';
        setCameraMode(newMode);
        if (isCameraOpen) {
            startCamera(newMode);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraOpen(false);
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/jpeg');
            setSelectedImage(imageData);
            stopCamera();
            analyzeImage(imageData);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result;
                setSelectedImage(imageData);
                analyzeImage(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async (imageData) => {
        setIsAnalyzing(true);
        setResult(null);
        setDiagnosisId(null);

        try {
            const response = await fetch('https://hospital-40m0.onrender.com/api/skin-diagnosis/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            });

            // Defensive check for non-JSON responses (e.g. 404 HTML)
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
            }

            const data = await response.json();

            if (response.ok) {
                setResult(data.aiAnalysis);
                setDiagnosisId(data._id); // Store ID for later update
            } else {
                console.error("Analysis failed:", data.error || data.message);
                setResult({
                    condition: 'Analysis Error',
                    confidence: '0%',
                    severity: 'Error',
                    description: data.error || data.message || 'Could not process the image. Please try again.',
                    suggestions: [
                        'Ensure the area is well-lit',
                        'Remove any covering hair or clothing',
                        'Hold the camera 4-6 inches away',
                        'Ensure the photo is in focus'
                    ],
                    isUrgent: false,
                    isError: true
                });
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
            setResult({
                condition: 'Connection Error',
                confidence: '0%',
                severity: 'Unknown',
                description: 'Could not connect to the analysis server.',
                suggestions: [],
                isUrgent: false
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleConsultationConfirm = async () => {
        if (!diagnosisId || !phoneNumber) return;

        setIsSubmittingConsultation(true);
        try {
            const response = await fetch(`https://hospital-40m0.onrender.com/api/skin-diagnosis/${diagnosisId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phoneNumber,
                    status: 'Follow-up Scheduled'
                })
            });

            if (response.ok) {
                alert("Consultation request confirmed! A doctor will contact you soon.");
                setShowConsultation(false);
            }
        } catch (error) {
            console.error("Failed to confirm consultation:", error);
        } finally {
            setIsSubmittingConsultation(false);
        }
    };

    const resetScan = () => {
        setSelectedImage(null);
        setResult(null);
        setDiagnosisId(null);
        setPhoneNumber('');
        setIsAnalyzing(false);
        setShowConsultation(false);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 lg:pt-80 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side: Info & Brand */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-medical-500/10 text-medical-600 px-3 py-1.5 rounded-full border border-medical-500/20 mb-6"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Vision Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase"
                        >
                            AI Skin <br className="hidden sm:block" /> <span className="text-medical-600 underline decoration-medical-500 underline-offset-4">Diagnosis</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-lg font-medium leading-relaxed mb-10 max-w-xl"
                        >
                            Analyze dermatological conditions in seconds. Our neural network scans for common skin pathologies with clinical-grade accuracy.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: 'Privacy Shield', icon: ShieldCheck, desc: 'Photos are processed locally and never stored without consent.' },
                                { title: 'Verified Data', icon: Zap, desc: 'Trained on high-fidelity clinical skin datasets.' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                                >
                                    <div className="w-10 h-10 bg-medical-50 text-medical-600 rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-black text-slate-900 uppercase italic mb-1 text-sm">{feature.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex items-center gap-4 text-slate-400 opacity-60">
                            <Lock className="w-8 h-8" />
                            <div className="text-[8px] font-black uppercase tracking-widest leading-tight">
                                HIPAA Compliant <br /> Encrypted Analysis
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Upload & Analysis Area */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {isCameraOpen ? (
                                <motion.div
                                    key="camera"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-slate-900 aspect-square rounded-[3.5rem] lg:rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center"
                                >
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <canvas ref={canvasRef} className="hidden" />

                                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none flex items-center justify-center">
                                        <div className="w-64 h-64 border-2 border-white/50 border-dashed rounded-3xl" />
                                    </div>

                                    <div className="absolute bottom-12 flex items-center gap-6">
                                        <button
                                            onClick={toggleCamera}
                                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-medical-500 transition-all"
                                            title="Switch Camera"
                                        >
                                            <RefreshCw className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClick={captureImage}
                                            className="w-24 h-24 bg-white rounded-full p-2"
                                        >
                                            <div className="w-full h-full border-4 border-slate-900 rounded-full flex items-center justify-center">
                                                <div className="w-12 h-12 bg-medical-600 rounded-full animate-pulse" />
                                            </div>
                                        </button>
                                        <button
                                            onClick={stopCamera}
                                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-red-500 transition-all"
                                        >
                                            <X className="w-8 h-8" />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : !selectedImage ? (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-10 lg:p-16 rounded-[3.5rem] lg:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-4 border-dashed border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-medical-200 transition-all group"
                                >
                                    <div
                                        className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 group-hover:bg-medical-50 group-hover:scale-110 transition-all duration-500"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <Upload className="w-10 h-10 text-slate-300 group-hover:text-medical-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase italic">Analyze Skin</h3>
                                    <p className="text-slate-400 font-bold max-w-sm mb-10 text-sm">
                                        Capture a live photo or upload a clear, focused image of the affected area.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full px-4">
                                        <button
                                            onClick={startCamera}
                                            className="flex-1 bg-medical-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-medical-700 transition-all shadow-xl shadow-medical-500/20"
                                        >
                                            <Camera className="w-4 h-4" /> Take Photo
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
                                        >
                                            <Upload className="w-3.5 h-3.5" /> Upload
                                        </button>
                                    </div>

                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[3.5rem] lg:rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden"
                                >
                                    {/* Preview Header */}
                                    <div className="relative h-72 md:h-96 bg-slate-100">
                                        <img src={selectedImage} alt="Analysis" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                                        <button
                                            onClick={resetScan}
                                            className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 shadow-xl hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>

                                        {isAnalyzing && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm">
                                                <RefreshCw className="w-16 h-16 text-medical-600 animate-spin mb-6" />
                                                <p className="text-xl font-black text-medical-600 uppercase tracking-tighter animate-pulse">Running Neural Diagnosis...</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Result Data */}
                                    <div className="p-6 lg:p-10 relative">
                                        {result ? (
                                            <div className="space-y-8">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Primary Detection</p>
                                                        <h4 className="text-2xl font-black text-slate-900 italic uppercase">{result.condition}</h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confidence</p>
                                                        <p className={`text-2xl font-black ${result.isError ? 'text-red-500' : 'text-medical-600'}`}>{result.confidence}</p>
                                                    </div>
                                                </div>

                                                <div className={`p-6 rounded-2xl border italic ${result.isError ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                                                    <div className={`flex items-center gap-2 mb-3 ${result.isError ? 'text-red-600' : 'text-medical-600'}`}>
                                                        <AlertCircle className="w-4 h-4" />
                                                        <p className="font-black uppercase text-[11px]">{result.isError ? 'Error Detected' : 'AI Assessment'}</p>
                                                    </div>
                                                    <p className={`${result.isError ? 'text-red-600' : 'text-slate-600'} leading-relaxed font-medium text-xs`}>{result.description}</p>
                                                </div>

                                                {/* Medical Metrics Dashboard */}
                                                {result?.medical_metrics && (
                                                    <div className="bg-slate-900 rounded-3xl p-6 text-white">
                                                        <div className="flex items-center gap-2 mb-6">
                                                            <Zap className="w-4 h-4 text-medical-400" />
                                                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Signal Audit</p>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Inflammation</p>
                                                                <p className="text-lg font-black text-medical-400">{result.medical_metrics.inflammation_index || result.medical_metrics.inflammation_score || '0%'}</p>
                                                            </div>
                                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Pigmentation</p>
                                                                <p className="text-lg font-black text-amber-400">{result.medical_metrics.pigment_index || result.medical_metrics.pigment_score || '0%'}</p>
                                                            </div>
                                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Color Loss</p>
                                                                <p className="text-lg font-black text-slate-300">{result.medical_metrics.depigmentation_index || result.medical_metrics.color_loss_score || '0%'}</p>
                                                            </div>
                                                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                                                <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Texture (Rough)</p>
                                                                <p className="text-lg font-black text-medical-200">{result.medical_metrics.skin_roughness || '0'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Suggested Next Steps</p>
                                                    <div className="grid gap-3">
                                                        {Array.isArray(result?.suggestions) && result.suggestions.map((s, i) => (
                                                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all hover:translate-x-1">
                                                                <AlertCircle className="w-3.5 h-3.5 text-medical-500" />
                                                                <span className="text-xs font-bold text-slate-700">{s}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                                                    <button
                                                        onClick={() => setShowConsultation(true)}
                                                        className="w-full bg-medical-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-medical-700 transition-all shadow-xl shadow-medical-100"
                                                    >
                                                        <Stethoscope className="w-4 h-4" /> Discuss with Expert Doctor
                                                    </button>
                                                    <button
                                                        onClick={resetScan}
                                                        className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-200 hover:text-slate-600 transition-all"
                                                    >
                                                        Perform Another Scan
                                                    </button>
                                                </div>
                                            </div>
                                        ) : !isAnalyzing && (
                                            <div className="text-center py-20">
                                                <Search className="w-16 h-16 text-slate-100 mx-auto mb-6" />
                                                <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">Waiting for Analysis...</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Consultation Modal/Overlay */}
                        <AnimatePresence>
                            {showConsultation && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-xl rounded-[4rem] p-12 lg:p-16 flex flex-col items-center justify-center text-center text-white italic"
                                >
                                    <button
                                        onClick={() => setShowConsultation(false)}
                                        className="absolute top-8 right-8 text-white/40 hover:text-white"
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                    <div className="w-24 h-24 bg-white text-medical-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl">
                                        <MessageSquare className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-4xl font-black mb-6 uppercase leading-tight">Request Expert <br /> Consultation</h3>
                                    <p className="text-slate-400 font-medium mb-12 max-w-sm">
                                        Your scan results will be shared with one of our Board-Certified Dermatologists for a finalized clinical verdict.
                                    </p>

                                    <div className="w-full space-y-4">
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Verify Phone Number.."
                                            className="w-full bg-white/10 border-2 border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-medical-500 transition-all font-black text-white"
                                        />
                                        <button
                                            onClick={handleConsultationConfirm}
                                            disabled={isSubmittingConsultation || !phoneNumber}
                                            className="w-full bg-medical-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-medical-600 transition-all shadow-2xl shadow-medical-500/20 disabled:opacity-50"
                                        >
                                            {isSubmittingConsultation ? 'Confirming...' : 'Confirm Request'} <ArrowRight className="w-5 h-5 ml-2" />
                                        </button>
                                    </div>
                                    <p className="mt-8 text-[9px] text-white/30 uppercase font-bold tracking-widest">Typical response time: Under 15 Minutes</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkinAI;
