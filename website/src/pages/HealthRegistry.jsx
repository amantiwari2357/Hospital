import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Users, FileCheck, ShieldCheck, Database, ArrowRight, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HealthRegistry = () => {
    return (
        <div className="bg-slate-50 min-h-screen italic">
            <Navbar />

            <div className="bg-slate-900 pt-44 lg:pt-64 pb-32 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-3xl">
                            <h1 className="text-6xl lg:text-9xl font-black mb-12 tracking-tighter leading-none italic uppercase">
                                Health <span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Registry</span>
                            </h1>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed italic">
                                Seamless patient onboarding and digitized clinical record management for lifetime care coordination.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl">
                            <div className="flex flex-col gap-6">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-medical-400 mb-2">Total Managed</p>
                                    <p className="text-5xl font-black text-white italic">1.2M+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 italic">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center mb-8">
                                <UserPlus className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase italic">New Patient?</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10 italic">
                                Register your clinical profile in under 2 minutes. We use encrypted blockchain storage to ensure your health data remains yours.
                            </p>
                        </div>
                        <Link
                            to="/register"
                            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-medical-600 transition-all flex items-center justify-center gap-4 text-center"
                        >
                            Start Registration <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col justify-between">
                        <div>
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                                <Database className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase italic">Access Records</h3>
                            <p className="text-slate-500 font-medium leading-relaxed mb-10 italic">
                                View laboratory results, imaging reports, and historical clinical summaries through our secure portal.
                            </p>
                        </div>
                        <Link
                            to="/portal-login"
                            className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all flex items-center justify-center gap-4 text-center"
                        >
                            Portal Login <FileCheck className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthRegistry;
