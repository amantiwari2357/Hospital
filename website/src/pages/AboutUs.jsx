import React from 'react';
import Navbar from '../components/layout/Navbar';
import { ShieldCheck, Target, Heart, Award, Users, Microscope, Globe, History, Activity, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { institutionTimeline } from '../utils/marketData';

const AboutUs = () => {
    return (
        <div className="bg-white min-h-screen italic">
            <Navbar />

            {/* Hero */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-medical-600/5" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-medical-500/20 text-medical-400 px-6 py-2 rounded-full border border-medical-500/30 mb-10 italic"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs uppercase font-black tracking-[0.3em]">Institutional Profile</span>
                    </motion.div>
                    <h1 className="text-6xl lg:text-9xl font-black mb-12 tracking-tighter leading-none italic uppercase">
                        Care<span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Sync</span> Medical
                    </h1>
                    <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
                        Established in 2020, CareSync International is a pinnacle of clinical excellence,
                        bridging the gap between advanced biotechnology and compassionate human care.
                    </p>
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid md:grid-cols-3 gap-10 italic">
                    {[
                        { title: 'Clinical Precision', icon: Target, desc: 'Every diagnostic pathway is validated by molecular analysis and AI verification.' },
                        { title: 'Global Ethics', icon: Heart, desc: 'Operating under stringent international healthcare protocols for patient safety.' },
                        { title: 'World Class Excellence', icon: Award, desc: 'JCI Gold Seal accredited with continuous refinement of clinical standards.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-50 text-center hover:scale-105 transition-all">
                            <div className="w-20 h-20 bg-medical-50 text-medical-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase italic">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 italic">
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="p-4 bg-slate-900 text-white rounded-3xl mb-8">
                        <History className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase italic mb-6">Our Institutional Timeline</h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Four years of groundbreaking clinical evolution</p>
                </div>

                <div className="space-y-12">
                    {institutionTimeline.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex flex-col md:flex-row gap-12 items-center"
                        >
                            <div className="w-full md:w-1/3 text-center md:text-right">
                                <span className="text-7xl lg:text-9xl font-black text-slate-100 italic leading-none">{item.year}</span>
                            </div>
                            <div className="hidden md:block w-4 h-4 rounded-full bg-medical-500 shadow-[0_0_15px_rgba(14,165,233,0.5)] relative z-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-medical-500/20 rounded-full animate-ping" />
                            </div>
                            <div className="w-full md:w-1/2 bg-slate-50 p-12 rounded-[3rem] border border-slate-100 italic">
                                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic">{item.event}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.detail}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Leadership Section */}
            <div className="bg-slate-50 py-32 italic">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-24">
                        <div className="italic">
                            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase italic">Clinical Leadership</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">The minds shaping the future of CareSync</p>
                        </div>
                        <div className="p-5 bg-white rounded-3xl text-medical-600 shadow-xl border border-slate-100">
                            <Users className="w-10 h-10" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 italic">
                        {[
                            { name: 'Dr. Sarah Wilson', role: 'Chief of Cardiology', exp: '24 Years', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Dr. James Miller', role: 'Head of Neurology', exp: '19 Years', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Dr. Elena Rossi', role: 'Genomics Director', exp: '15 Years', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop' },
                            { name: 'Dr. Marcus Chen', role: 'Surgical Excellence', exp: '22 Years', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop' },
                        ].map((leader, i) => (
                            <div key={i} className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 group">
                                <div className="h-80 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8 italic">
                                    <h4 className="text-lg font-black text-slate-900 mb-1 uppercase">{leader.name}</h4>
                                    <p className="text-medical-600 font-bold text-[10px] uppercase tracking-widest mb-4 italic">{leader.role}</p>
                                    <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest pt-4 border-t border-slate-100 italic">
                                        <Sparkles className="w-3 h-3" /> {leader.exp} Tenure
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Research Stats */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 space-y-24 italic">
                <div className="space-y-10">
                    <h2 className="text-4xl font-black text-slate-900 uppercase italic">Global Research Network</h2>
                    <p className="text-lg text-slate-500 font-medium leading-loose italic">
                        Our clinical staff provides insights into the latest peer-reviewed research and practical applications.
                        We lead from the front in minimally invasive robotic surgeries and peptide-based dermatological reconstruction.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-slate-100">
                        <div className="text-center">
                            <span className="block text-4xl font-black text-medical-600 mb-2">50+</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Research Centers</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-black text-medical-600 mb-2">200+</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Clinical Protocols</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-black text-medical-600 mb-2">99%</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Diagnostic Accuracy</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-black text-medical-600 mb-2">1M+</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Patients Served</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden italic shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-medical-500/20 blur-[120px]" />
                    <Microscope className="w-24 h-24 text-medical-500 mb-10 opacity-50" />
                    <h2 className="text-4xl font-black mb-8 uppercase italic leading-tight">Advanced Diagnostic <br />Infrastructure</h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 italic">
                        Equipped with PET-CT, 3 Tesla MRI, and molecular genomics labs, identifying pathologies at the cellular level.
                    </p>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 uppercase font-black text-[10px] tracking-widest italic"><Globe className="w-4 h-4 text-medical-400" /> Global Diagnostics</div>
                        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 uppercase font-black text-[10px] tracking-widest italic"><Users className="w-4 h-4 text-medical-400" /> Expert Panel</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
