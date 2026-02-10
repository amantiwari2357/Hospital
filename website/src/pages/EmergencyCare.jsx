import React from 'react';
import Navbar from '../components/layout/Navbar';
import { Phone, ShieldAlert, Clock, MapPin, HeartPulse, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyCare = () => {
    return (
        <div className="bg-white min-h-screen italic">
            <Navbar />

            <div className="bg-red-600 pt-44 lg:pt-64 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full border border-white/30 mb-10 italic"
                    >
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-xs uppercase font-black tracking-[0.3em]">24/7 Critical Response</span>
                    </motion.div>
                    <h1 className="text-6xl lg:text-9xl font-black mb-12 tracking-tighter leading-none italic uppercase">
                        Emergency <span className="text-red-200 underline decoration-red-200 underline-offset-8">Unit</span>
                    </h1>
                    <p className="text-red-100 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
                        Immediate medical intervention powered by advanced trauma care protocols and lightning-fast logistics.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-10 italic">
                    {[
                        { title: 'Rapid Response', icon: Zap, desc: 'Average ambulance arrival time under 8 minutes within a 15km radius.' },
                        { title: 'Trauma Center', icon: HeartPulse, desc: 'Level 1 trauma facility equipped for neuro and cardiac emergencies.' },
                        { title: 'Pinnacle Triage', icon: Clock, desc: 'Zero-wait triage system for immediate stabilization of critical cases.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-red-100 border border-red-50 text-center">
                            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase italic">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-32 text-center italic">
                <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase italic">Emergency Contact</h2>
                <div className="bg-slate-900 p-16 rounded-[4rem] text-white shadow-2xl flex flex-col md:flex-row items-center justify-around gap-12">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-red-600 rounded-3xl animate-pulse">
                            <Phone className="w-10 h-10" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-black tracking-widest text-red-400 mb-1">Hotline</p>
                            <p className="text-4xl font-black italic">1800-911-999</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-white/10 rounded-3xl">
                            <MapPin className="w-10 h-10" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Location</p>
                            <p className="text-xl font-black italic">South Block, CareSync</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyCare;
