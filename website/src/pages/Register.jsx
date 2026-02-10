import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Stethoscope,
    Heart,
    ShoppingBag,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Lock,
    ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [selectedRole, setSelectedRole] = useState(null);

    const roles = [
        {
            id: 'patient',
            title: 'Patient',
            icon: User,
            color: 'from-blue-600 to-medical-600',
            bgColor: 'bg-blue-50',
            description: 'Register your clinical profile in under 2 minutes. Secure, blockchain-backed vault for your health data.',
            features: ['Blockchain Encrypted Data', 'Immediate Doctor Access', '2-Minute Onboarding']
        },
        {
            id: 'doctor',
            title: 'Doctor',
            icon: Stethoscope,
            color: 'from-medical-700 to-emerald-600',
            bgColor: 'bg-medical-50',
            description: 'Join our institutional board. Manage consultations and access advanced clinical tools.',
            features: ['License Verification', 'Clinic Dashboard', 'Tele-Consultation Ready']
        },
        {
            id: 'nurse',
            title: 'Nurse',
            icon: Heart,
            color: 'from-rose-600 to-pink-600',
            bgColor: 'bg-rose-50',
            description: 'Empower your clinical practice. Coordinate care and manage patient vitals smoothly.',
            features: ['Care Coordination', 'Shift Management', 'Real-time Vitals Training']
        },
        {
            id: 'pharmacy',
            title: 'Medical Shop',
            icon: ShoppingBag,
            color: 'from-amber-600 to-orange-600',
            bgColor: 'bg-amber-50',
            description: 'Register as a certified digital pharmacy. Fulfill prescriptions and manage institutional inventory.',
            features: ['Digital Prescription Fulfillment', 'Inventory Tracking', 'Certified Vendor Status']
        }
    ];

    const currentRoleData = roles.find(r => r.id === selectedRole);

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Header Section */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-32 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#3b82f61a_0%,transparent_70%)]" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mb-8"
                    >
                        <ShieldCheck className="w-4 h-4 text-medical-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Advanced Institutional Onboarding</span>
                    </motion.div>
                    <h1 className="text-5xl lg:text-8xl font-black text-white mb-8 tracking-tighter italic uppercase leading-none">
                        Start Your <span className="text-medical-500">Journey</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto italic">
                        Select your professional or personal domain to begin the encrypted registration process.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <AnimatePresence mode="wait">
                    {!selectedRole ? (
                        <motion.div
                            key="role-selection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className="group relative bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 hover:border-medical-500 transition-all text-left flex flex-col justify-between h-full overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-5 transition-opacity -mr-16 -mt-16 rounded-full`} />

                                    <div>
                                        <div className={`w-16 h-16 ${role.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                            <role.icon className={`w-8 h-8 bg-gradient-to-r ${role.color} bg-clip-text text-transparent`} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase italic">{role.title}</h3>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 italic">
                                            {role.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 text-medical-600 font-black uppercase tracking-widest text-[10px] group-hover:gap-5 transition-all">
                                        Select Role <ArrowRight className="w-4 h-4" />
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="role-form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-4xl mx-auto bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-slate-100"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className={`md:w-1/3 bg-gradient-to-br ${currentRoleData?.color || 'from-slate-800 to-slate-900'} p-12 text-white flex flex-col justify-between`}>
                                    <div>
                                        <button
                                            onClick={() => setSelectedRole(null)}
                                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-12 text-[10px] font-black uppercase tracking-widest"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Back to Roles
                                        </button>
                                        <h2 className="text-4xl font-black uppercase italic mb-6 leading-none">
                                            {currentRoleData?.title} <br />
                                            Registration
                                        </h2>
                                        <div className="space-y-4 mt-12">
                                            {currentRoleData?.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-white/50" />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-20 opacity-40">
                                        <Lock className="w-10 h-10" />
                                        <div className="text-[8px] font-black uppercase tracking-widest leading-tight">
                                            End-to-End <br /> Encrypted Process
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-2/3 p-12 lg:p-20">
                                    <form className="space-y-8 italic" onSubmit={(e) => e.preventDefault()}>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Legal Name</label>
                                                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Email Address</label>
                                                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Phone Number</label>
                                            <input type="tel" placeholder="+91 00000 00000" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none" />
                                        </div>

                                        {selectedRole !== 'patient' && (
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">License / Certification ID</label>
                                                <input type="text" placeholder="LIC-XXXX-XXXX" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none" />
                                            </div>
                                        )}

                                        <div className="pt-8">
                                            <button className={`w-full bg-gradient-to-r ${currentRoleData?.color || 'from-slate-800 to-slate-900'} text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4`}>
                                                Complete Registration <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <p className="text-center text-[10px] text-slate-400 font-medium">
                                            By continuing, you agree to our Institutional Terms of Service and Data Management Protocol.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Register;
