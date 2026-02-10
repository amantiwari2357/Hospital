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
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setIsAnalyzing(true);
        setResult(null);
        // Simulate AI analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                condition: 'Dermatitis (Probable)',
                confidence: '94.2%',
                severity: 'Moderate',
                description: 'Detected patterns suggest inflammatory skin response. This could be due to contact with an allergen or irritant.',
                suggestions: [
                    'Avoid harsh soaps or chemicals',
                    'Apply cool compress to affected area',
                    'Keep the skin hydrated with fragrance-free lotion',
                    'Monitor for spreading or increased redness'
                ],
                urgent: false
            });
        }, 3000);
    };

    const resetScan = () => {
        setSelectedImage(null);
        setResult(null);
        setIsAnalyzing(false);
        setShowConsultation(false);
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left Side: Info & Brand */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-medical-500/10 text-medical-600 px-4 py-2 rounded-full border border-medical-500/20 mb-8"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Advanced Vision Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none uppercase"
                        >
                            AI Skin <br className="hidden sm:block" /> <span className="text-medical-600 underline decoration-medical-500 underline-offset-8">Diagnosis</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-xl font-medium leading-relaxed mb-12 max-w-xl"
                        >
                            Analyze dermatological conditions in seconds. Our neural network scans for over 50+ common pathologies with clinical-grade accuracy.
                        </motion.p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { title: 'Privacy Shield', icon: ShieldCheck, desc: 'Photos are processed locally and never stored without consent.' },
                                { title: '99% Accuracy', icon: Zap, desc: 'Trained on 1M+ clinical dermatological datasets.' },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50"
                                >
                                    <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center mb-6">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-black text-slate-900 uppercase italic mb-2">{feature.title}</h4>
                                    <p className="text-xs text-slate-400 font-bold leading-relaxed">{feature.desc}</p>
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
                            {!selectedImage ? (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-10 lg:p-16 rounded-[3.5rem] lg:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-4 border-dashed border-slate-100 flex flex-col items-center text-center cursor-pointer hover:border-medical-200 transition-all group"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mb-10 group-hover:bg-medical-50 group-hover:scale-110 transition-all duration-500">
                                        <Camera className="w-12 h-12 text-slate-300 group-hover:text-medical-600" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase italic">Upload Photo</h3>
                                    <p className="text-slate-400 font-bold max-w-sm mb-12">
                                        Take a clear, well-lit photo of the affected skin area for the most accurate AI matching.
                                    </p>
                                    <button className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-medical-600 transition-all shadow-2xl">
                                        <Upload className="w-4 h-4" /> Select File
                                    </button>
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
                                    <div className="p-8 lg:p-16 relative">
                                        {result ? (
                                            <div className="space-y-10">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Detection</p>
                                                        <h4 className="text-4xl font-black text-slate-900 italic uppercase">{result.condition}</h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Confidence</p>
                                                        <p className="text-2xl font-black text-medical-600">{result.confidence}</p>
                                                    </div>
                                                </div>

                                                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic">
                                                    <div className="flex items-center gap-3 mb-4 text-medical-600">
                                                        <AlertCircle className="w-5 h-5" />
                                                        <p className="font-black uppercase text-sm">AI Assessment</p>
                                                    </div>
                                                    <p className="text-slate-600 leading-relaxed font-medium">{result.description}</p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">Suggested Next Steps</p>
                                                    <div className="grid gap-4">
                                                        {result.suggestions.map((s, i) => (
                                                            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:translate-x-2">
                                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                                <span className="text-sm font-bold text-slate-700">{s}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pt-8 border-t border-slate-100 flex flex-col gap-4">
                                                    <button
                                                        onClick={() => setShowConsultation(true)}
                                                        className="w-full bg-medical-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-medical-700 transition-all shadow-xl shadow-medical-100"
                                                    >
                                                        <Stethoscope className="w-5 h-5" /> Discuss with Expert Doctor
                                                    </button>
                                                    <button
                                                        onClick={resetScan}
                                                        className="w-full bg-slate-100 text-slate-400 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 hover:text-slate-600 transition-all"
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
                                            placeholder="Verify Phone Number.."
                                            className="w-full bg-white/10 border-2 border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-medical-500 transition-all font-black text-white"
                                        />
                                        <button className="w-full bg-medical-500 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-medical-600 transition-all shadow-2xl shadow-medical-500/20">
                                            Confirm Request <ArrowRight className="w-5 h-5 ml-2" />
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
