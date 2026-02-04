import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ClipboardList,
    FileText,
    MessageSquare,
    Calendar,
    CreditCard,
    ShieldCheck,
    Bell,
    Settings,
    Clock
} from 'lucide-react';

const PatientPortal = () => {
    const portalActions = [
        { name: 'Clinical Records', icon: FileText, desc: 'View your lab results, imaging reports, and medical history.', color: 'bg-blue-50 text-blue-600' },
        { name: 'Appointments', icon: Calendar, desc: 'Schedule, reschedule, or cancel your clinical sessions.', color: 'bg-green-50 text-green-600' },
        { name: 'Prescriptions', icon: ClipboardList, desc: 'Manage your active medications and request refills.', color: 'bg-purple-50 text-purple-600' },
        { name: 'Billing', icon: CreditCard, desc: 'Securely pay your medical bills and view insurance claims.', color: 'bg-amber-50 text-amber-600' },
        { name: 'Messages', icon: MessageSquare, desc: 'Directly communicate with your clinical team.', color: 'bg-rose-50 text-rose-600' },
        { name: 'Settings', icon: Settings, desc: 'Update your personal profile and security preferences.', color: 'bg-slate-50 text-slate-600' }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            <div className="bg-slate-900 pt-44 lg:pt-64 pb-64 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-500/10 blur-[150px] -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-8">
                                <ShieldCheck className="w-4 h-4 text-medical-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Secure HIPAA Compliant Hub</span>
                            </div>
                            <h1 className="text-6xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-none italic uppercase">
                                Patient <span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Portal</span>
                            </h1>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed italic">
                                Your centralized clinical command center for medical records, scheduling, and direct expert communication.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 text-center min-w-[300px]">
                            <p className="text-[10px] font-black uppercase tracking-widest text-medical-400 mb-2">Account Status</p>
                            <p className="text-4xl font-black text-white italic mb-6 uppercase">Verified Plus</p>
                            <div className="flex justify-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl relative">
                                    <Bell className="w-5 h-5 text-medical-400" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                                </div>
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <Settings className="w-5 h-5 text-white/40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
                    {portalActions.map((action, i) => (
                        <motion.div
                            key={action.name}
                            whileHover={{ y: -10 }}
                            className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-50 group flex flex-col justify-between h-full"
                        >
                            <div>
                                <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase italic leading-none">{action.name}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic mb-8">
                                    {action.desc}
                                </p>
                            </div>
                            <button className="flex items-center gap-4 text-medical-600 font-black uppercase tracking-widest text-[11px] group-hover:gap-6 transition-all">
                                Open Service <LayoutDashboard className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Recent Activity Section */}
                <div className="mt-24 bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-100 border border-slate-50 italic">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase italic">Recent Clinical Activity</h2>
                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-medical-600 transition-colors">View All Logs</button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { event: 'Blood Panel Results Uploaded', time: '2 hours ago', detail: 'Lipid Profile & Glucose levels marked as within range.' },
                            { event: 'Appointment Scheduled', time: 'Yesterday', detail: 'Consultation with Dr. Sarah Wilson (Cardiology) on Feb 12.' },
                            { event: 'Prescription Refill', time: '3 days ago', detail: 'Atorvastatin 20mg dispatch confirmed for home delivery.' }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-medical-100 transition-all cursor-pointer group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-medical-600 transition-colors">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 uppercase text-xs mb-1">{log.event}</h4>
                                        <p className="text-xs text-slate-400 font-bold">{log.detail}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase italic">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientPortal;
