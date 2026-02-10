import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    Heart,
    Zap,
    Baby,
    Stethoscope,
    ShieldAlert,
    UserRound,
    Brain,
    Eye,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Specialities = () => {
    const specialities = [
        {
            id: 'cardiology',
            name: 'Cardiology',
            icon: Heart,
            desc: 'Advanced cardiovascular care featuring non-invasive diagnostics and robotic assisted surgery.',
            doctors: '12 Specialists',
            stats: '98% Success Rate'
        },
        {
            id: 'neurology',
            name: 'Neurology',
            icon: Brain,
            desc: 'Comprehensive brain and spine care utilizing neural mapping and peptide therapeutic protocols.',
            doctors: '8 Specialists',
            stats: 'Global Hub'
        },
        {
            id: 'pediatrics',
            name: 'Pediatrics',
            icon: Baby,
            desc: 'Gentle and precise care for the next generation, focused on complex developmental pathologies.',
            doctors: '15 Specialists',
            stats: 'Child Friendly'
        },
        {
            id: 'oncology',
            name: 'Oncology',
            icon: ShieldAlert,
            desc: 'Molecular level detection and precision oncology matching treatments to genetic profiles.',
            doctors: '20 Specialists',
            stats: 'Precision Care'
        },
        {
            id: 'dermatology',
            name: 'Dermatology',
            icon: Zap,
            desc: 'Regenerative aesthetics and clinical dermatology for complex skin reconstruction.',
            doctors: '6 Specialists',
            stats: 'Top Rated'
        },
        {
            id: 'orthopedics',
            name: 'Orthopedics',
            icon: UserRound,
            desc: 'Joint replacement and sports medicine using ultra-light biocompatible implants.',
            doctors: '10 Specialists',
            stats: 'Rapid Recovery'
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Header */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-32 overflow-hidden relative">
                <div className="absolute inset-0 bg-medical-500/5" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 className="text-6xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-none italic uppercase">
                        Our Core <span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Expertise</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
                        Specialized clinical domains operating at the intersection of bio-technological innovation and human empathy.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
                    {specialities.map((item, i) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-50 group flex flex-col justify-between h-full"
                        >
                            <div>
                                <div className="w-20 h-20 bg-slate-50 text-medical-600 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-medical-500 group-hover:text-white transition-all duration-500 shadow-inner">
                                    <item.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase italic leading-none">{item.name}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic mb-8 h-20 overflow-hidden line-clamp-3">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-slate-50 space-y-6">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span className="flex items-center gap-2"><Stethoscope className="w-3 h-3" /> {item.doctors}</span>
                                    <span className="text-medical-600 italic">{item.stats}</span>
                                </div>
                                <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] group-hover:bg-medical-600 transition-all flex items-center justify-center gap-3">
                                    Explore Domain <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Appointment CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                <div className="bg-medical-600 rounded-[4rem] p-16 text-white relative overflow-hidden italic text-center shadow-2xl shadow-medical-200">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px]" />
                    <h2 className="text-4xl lg:text-6xl font-black mb-10 uppercase italic leading-tight">Ready to meet our <br />Experts?</h2>
                    <p className="text-white/80 text-lg font-medium leading-relaxed mb-12 italic max-w-xl mx-auto">
                        High-resolution consultations available now. Secure your slot with our clinical director or domain experts.
                    </p>
                    <Link
                        to="/book-appointment"
                        className="inline-flex items-center gap-4 bg-white text-medical-600 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
                    >
                        Secure Appointment <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Specialities;
