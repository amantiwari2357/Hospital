import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { diseasesData } from '../utils/diseasesData';
import { ArrowLeft, CheckCircle2, Phone, Mail, Clock, ShieldCheck, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const DiseaseDetail = () => {
    const { id } = useParams();
    const disease = diseasesData.find(d => d.id === id);

    if (!disease) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Condition Not Found</h2>
                    <Link to="/" className="text-medical-600 font-bold flex items-center gap-2 justify-center hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Hero */}
            <div className="relative pt-32 lg:pt-48 h-fit overflow-hidden">
                <div className="absolute inset-0 h-full w-full">
                    <img src={disease.image} alt={disease.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
                </div>
                <div className="relative w-full p-8 lg:p-20 pt-20 lg:pt-32">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 font-bold transition-all">
                                <ArrowLeft className="w-5 h-5" /> Back to Specialized Care
                            </Link>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-medical-500 text-white text-xs font-black uppercase tracking-widest mb-4">
                                {disease.category}
                            </span>
                            <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                                {disease.name}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Content Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Stethoscope className="w-8 h-8 text-medical-600" />
                                Overview
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {disease.description}
                                <br /><br />
                                Our medical facility offers a multidisciplinary approach to managing {disease.name}. We combine clinical expertise with compassionate care to ensure the best possible outcomes for our patients.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                                <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-4 uppercase tracking-wider">Common Symptoms</h3>
                                <ul className="space-y-4">
                                    {disease.symptoms.map((symptom, idx) => (
                                        <li key={idx} className="flex gap-4 text-slate-600 font-bold">
                                            <CheckCircle2 className="w-6 h-6 text-medical-500 flex-shrink-0" />
                                            {symptom}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-100/50">
                                <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-4 uppercase tracking-wider">Advanced Treatments</h3>
                                <ul className="space-y-4">
                                    {disease.treatments.map((treatment, idx) => (
                                        <li key={idx} className="flex gap-4 text-slate-600 font-bold">
                                            <div className="w-6 h-6 rounded-full bg-medical-100 text-medical-600 flex items-center justify-center text-xs font-black flex-shrink-0">
                                                {idx + 1}
                                            </div>
                                            {treatment}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Additional Info Block */}
                        <div className="bg-medical-600 rounded-[3rem] p-12 text-white">
                            <h3 className="text-2xl font-black mb-6">Why Choose Our {disease.name} Program?</h3>
                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <p className="font-black text-lg">Top 1% Specialists</p>
                                    <p className="text-medical-50 text-sm">Board-certified experts with international training.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-black text-lg">Ultra-Modern Diagnostics</p>
                                    <p className="text-medical-50 text-sm">AI-driven diagnosis for 99.9% accuracy.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Enquiry Form */}
                    <div className="lg:sticky lg:top-24 h-fit space-y-8">
                        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-2xl shadow-medical-100/20">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Book Consultation</h3>
                            <p className="text-slate-400 text-sm font-bold mb-8 uppercase tracking-widest">Immediate Response</p>

                            <form className="space-y-4">
                                <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-500 font-bold" />
                                <input type="tel" placeholder="Phone Number" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-500 font-bold" />
                                <div className="p-4 bg-medical-50 rounded-2xl border border-medical-100">
                                    <p className="text-xs font-black text-medical-600 uppercase tracking-widest mb-1">Selected Condition</p>
                                    <p className="text-sm font-bold text-slate-700">{disease.name}</p>
                                </div>
                                <textarea rows="4" placeholder="Brief about your condition..." className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-500 font-bold resize-none"></textarea>
                                <button className="w-full bg-medical-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-medical-700 transition-all shadow-xl shadow-medical-100">
                                    Inquire Now
                                </button>
                            </form>
                        </div>

                        {/* Quick Contact */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 bg-medical-100 text-medical-600 rounded-xl flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Call for Help</p>
                                    <p className="font-black text-slate-800 tracking-tight">+1 (800) HELP-SY</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="w-12 h-12 bg-medical-100 text-medical-600 rounded-xl flex items-center justify-center">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Support</p>
                                    <p className="font-black text-slate-800 tracking-tight">care@hospital.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetail;
