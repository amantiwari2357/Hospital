import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, UserCheck, Activity, ArrowRight, ShieldCheck, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative overflow-hidden pt-44 pb-20 lg:pt-64 lg:pb-32">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-medical-200/30 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-medical-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-medical-500 animate-pulse" />
                            <span className="text-sm font-bold text-slate-800 tracking-wide uppercase">Your Health, Our Priority</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                            Compassionate Care, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-medical-400">
                                Advanced Technology.
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-12 max-w-xl leading-relaxed">
                            Experience healthcare redefined with world-class specialists, state-of-the-art facilities, and a commitment to your well-being.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                to="/book-appointment"
                                className="w-full sm:w-auto bg-medical-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-medical-700 transition-all shadow-xl shadow-medical-200 flex items-center justify-center gap-3"
                            >
                                <CalendarCheck className="w-5 h-5" />
                                Book Appointment
                            </Link>
                            <Link
                                to="/specialities"
                                className="w-full sm:w-auto bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3 border border-slate-100"
                            >
                                Exploring Specialities
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-2 grid grid-cols-3 gap-8 border-t border-slate-100 pt-10">
                            <div>
                                <p className="text-3xl font-black text-slate-900">500+</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Specialists</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900">10k+</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Satisfied Patients</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900">24/7</p>
                                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Emergency Service</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-medical-200 border-8 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
                                alt="Hospital Facility"
                                className="w-full h-full object-cover aspect-[4/5]"
                            />
                            {/* Floating Cards */}
                            <div className="absolute top-10 left-10 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                <div className="p-3 bg-medical-100 text-medical-600 rounded-xl">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Best Doctors</p>
                                    <p className="text-lg font-black text-slate-800">Verified Plus</p>
                                </div>
                            </div>

                            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4">
                                <div className="p-2 border-2 border-green-500 rounded-full">
                                    <Activity className="w-5 h-5 text-green-500" />
                                </div>
                                <p className="text-sm font-bold text-slate-800">Real-time Monitoring</p>
                            </div>
                        </div>

                        {/* Decorative Grid */}
                        <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
