import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import {
    ArrowLeft,
    CheckCircle2,
    Phone,
    Mail,
    Clock,
    ShieldCheck,
    Stethoscope,
    Activity,
    Zap,
    HeartPulse,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ClinicalServiceDetail = () => {
    const { category, service } = useParams();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [service]);

    // Format the display name from slug (e.g. "breast-cancer" -> "Breast Cancer")
    const formatDisplayName = (slug) => {
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const serviceName = formatDisplayName(service);
    const categoryName = formatDisplayName(category);

    return (
        <div className="min-h-screen bg-slate-50 italic">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="relative pt-32 lg:pt-56 pb-20 lg:pb-32 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
                    <img
                        src={`https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop`}
                        className="w-full h-full object-cover opacity-30 grayscale"
                        alt="Medical Background"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-3xl"
                    >
                        <Link to="/" className="inline-flex items-center gap-2 text-medical-400 hover:text-white mb-8 font-black uppercase tracking-widest text-[10px] bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all">
                            <ArrowLeft className="w-4 h-4" /> Back to Clinical Domains
                        </Link>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-medical-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-medical-500/20">
                                <Activity className="w-6 h-6" />
                            </div>
                            <span className="text-medical-400 font-black uppercase tracking-[0.3em] text-[10px]">
                                {categoryName} Division
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-none italic">
                            {serviceName}
                        </h1>

                        <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed italic mb-10">
                            Our {serviceName} program utilizes state-of-the-art clinical protocols and AI-driven precision medicine to deliver world-class patient outcomes.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-500 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-white font-black uppercase tracking-widest text-[10px]">JCI ACCREDITED</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-medical-500/20 text-medical-400 flex items-center justify-center">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-white font-black uppercase tracking-widest text-[10px]">RAPID DISPATCH AVAILABLE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-16 lg:space-y-24">

                        {/* Clinical Overview */}
                        <section>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-px flex-grow bg-slate-200" />
                                <h2 className="text-2xl font-black text-slate-900 uppercase italic whitespace-nowrap">Clinical Overview</h2>
                                <div className="h-px flex-grow bg-slate-200" />
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-xl text-slate-600 leading-relaxed font-medium italic mb-8">
                                    The {serviceName} department at CareSync represents the pinnacle of modern clinical excellence. We maintain a zero-latency integration between diagnostic imaging and surgical planning.
                                </p>
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                                        <h4 className="text-medical-600 font-black uppercase tracking-widest text-xs mb-6">Service Highlights</h4>
                                        <ul className="space-y-4">
                                            {[
                                                'AI-Assisted Diagnostic Analysis',
                                                'Minimally Invasive Procedural Suites',
                                                'Real-time Clinical Monitoring',
                                                'Integrated Genetic Mapping'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                                    <CheckCircle2 className="w-5 h-5 text-medical-500" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                                        <h4 className="text-medical-600 font-black uppercase tracking-widest text-xs mb-6">Specialized Pathways</h4>
                                        <ul className="space-y-4">
                                            {[
                                                'Accelerated Diagnosis Flow',
                                                'Post-Operative Precision Care',
                                                'Multi-disciplinary Case Review',
                                                'Continuous Quality Assessment'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-medical-500" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Interactive Stats Block */}
                        <section className="bg-slate-900 rounded-[3rem] lg:rounded-[4rem] p-10 lg:p-20 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-medical-600/10 blur-[100px] -mr-48 -mt-48" />
                            <div className="relative z-10 grid md:grid-cols-3 gap-12 lg:gap-20 text-center">
                                <div>
                                    <p className="text-5xl lg:text-7xl font-black italic mb-2 tracking-tighter">99.8%</p>
                                    <p className="text-medical-400 font-black uppercase tracking-widest text-[10px]">Clinical Success Rate</p>
                                </div>
                                <div>
                                    <p className="text-5xl lg:text-7xl font-black italic mb-2 tracking-tighter">1500+</p>
                                    <p className="text-medical-400 font-black uppercase tracking-widest text-[10px]">Annual Procedures</p>
                                </div>
                                <div>
                                    <p className="text-5xl lg:text-7xl font-black italic mb-2 tracking-tighter">24/7</p>
                                    <p className="text-medical-400 font-black uppercase tracking-widest text-[10px]">Expert Availability</p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column: Interaction */}
                    <div className="space-y-8">
                        {/* Booking Card */}
                        <div className="bg-white rounded-[3rem] p-8 lg:p-10 border border-slate-100 shadow-2xl sticky top-32">
                            <div className="mb-10">
                                <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-2">Book Consultation</h3>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] italic">Immediate Processing</p>
                            </div>

                            <form className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                    <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-bold focus:ring-2 focus:ring-medical-500 transition-all outline-none" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-4">Contact Number</label>
                                    <input type="tel" placeholder="+91 0000 0000" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-bold focus:ring-2 focus:ring-medical-500 transition-all outline-none" />
                                </div>
                                <div className="p-4 bg-medical-50 border border-medical-100 rounded-2xl">
                                    <p className="text-[9px] font-black uppercase text-medical-600 tracking-widest mb-1 italic">Clinical Interest</p>
                                    <p className="text-sm font-black text-slate-700 uppercase italic tracking-tight">{serviceName}</p>
                                </div>
                                <button type="button" className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-medical-600 transition-all shadow-xl shadow-slate-200">
                                    Request Appointment
                                </button>
                                <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                                    Response within 12 minutes
                                </p>
                            </form>

                            <div className="mt-10 pt-10 border-t border-slate-50 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Emergency Line</p>
                                        <p className="text-lg font-black text-slate-900 italic tracking-tighter leading-none">108-CARE-SOS</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Support Email</p>
                                        <p className="text-lg font-black text-slate-900 italic tracking-tighter leading-none">care@{category.toLowerCase()}.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClinicalServiceDetail;
