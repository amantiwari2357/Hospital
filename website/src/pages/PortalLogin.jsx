import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    ShieldAlert,
    Lock,
    Fingerprint,
    FileText,
    Activity,
    Database,
    ArrowRight,
    ShieldCheck,
    Key,
    UserCircle,
    Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PortalLogin = () => {
    const [loginType, setLoginType] = useState('patient'); // 'patient' or 'institutional'

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-medical-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Branding & Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-8"
                        >
                            <ShieldCheck className="w-4 h-4 text-medical-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Secure Protocol v2.4</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-10 italic uppercase tracking-tighter"
                        >
                            Access <br /> <span className="text-medical-600">Portal</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex gap-6 items-start group">
                                <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 uppercase italic mb-2">Clinical Records</h4>
                                    <p className="text-slate-500 font-medium italic">Download laboratory results, imaging reports, and historical summaries.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Fingerprint className="w-6 h-6 text-medical-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 uppercase italic mb-2">Biometric Verification</h4>
                                    <p className="text-slate-500 font-medium italic">Advanced security layers to ensure your health data remains private and protected.</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Database className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 uppercase italic mb-2">Immutable Logs</h4>
                                    <p className="text-slate-500 font-medium italic">Every access attempt is recorded on our secure institutional ledger.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Login Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100"
                    >
                        {/* Selector */}
                        <div className="flex bg-slate-100 p-2 rounded-3xl mb-12">
                            <button
                                onClick={() => setLoginType('patient')}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${loginType === 'patient' ? 'bg-white text-medical-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <UserCircle className="w-4 h-4" /> Patient Access
                            </button>
                            <button
                                onClick={() => setLoginType('institutional')}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${loginType === 'institutional' ? 'bg-white text-medical-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <Building2 className="w-4 h-4" /> Institutional
                            </button>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Identification ID</label>
                                <div className="relative flex items-center">
                                    <UserCircle className="absolute left-6 w-5 h-5 text-slate-300" />
                                    <input
                                        type="text"
                                        placeholder={loginType === 'patient' ? "UHID Number" : "Professional License ID"}
                                        className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none italic"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Access Secret</label>
                                <div className="relative flex items-center">
                                    <Key className="absolute left-6 w-5 h-5 text-slate-300" />
                                    <input
                                        type="password"
                                        placeholder="••••••••••••"
                                        className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none italic"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-medical-600 focus:ring-medical-500 transition-all" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-600 transition-colors">Remember Session</span>
                                </label>
                                <button className="text-[10px] font-black uppercase text-medical-600 hover:text-medical-700 transition-colors">Forgot Secret?</button>
                            </div>

                            <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-medical-600 transition-all flex items-center justify-center gap-4 group">
                                Unlock Portal <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>

                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 font-medium">
                                    No access credentials? <Link to="/register" className="text-medical-600 font-black uppercase ml-2 hover:underline">Start Onboarding</Link>
                                </p>
                            </div>
                        </form>

                        {/* Emergency Hook */}
                        <div className="mt-12 p-6 bg-red-50 rounded-3xl flex items-center gap-4">
                            <div className="bg-red-100 p-2 rounded-xl">
                                <ShieldAlert className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-[9px] font-bold text-red-700 uppercase leading-relaxed">
                                Institutional Emergency? <br />
                                <span className="font-black">Contact Global Board Support: +1 (800) CARESYNC</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PortalLogin;
