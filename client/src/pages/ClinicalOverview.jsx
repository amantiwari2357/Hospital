import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Activity, Heart, Thermometer, User,
    Clock, AlertCircle, CheckCircle2,
    Plus, Bell, MoreVertical, ChevronDown,
    Droplet, Wind, Clipboard, Pill,
    FileText, HelpCircle, CheckCircle,
    Calendar, Shield, AlertTriangle, XCircle
} from 'lucide-react';

const ClinicalOverview = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = ['Overview', 'Vitals History', 'Medications', 'Lab Reports', 'Nursing Notes'];

    const vitals = [
        { label: 'BLOOD PRESSURE', value: '120/80', unit: 'mmHg', status: 'Normal', icon: Heart, color: 'text-blue-500 bg-blue-50', trend: 'stable' },
        { label: 'HEART RATE', value: '72', unit: 'bpm', status: 'Last checked: 15m ago', icon: Activity, color: 'text-red-500 bg-red-50', trend: 'stable' },
        { label: 'SPO2', value: '98', unit: '%', status: 'Steady', icon: Wind, color: 'text-cyan-500 bg-cyan-50', trend: 'stable' },
        { label: 'TEMPERATURE', value: '36.8', unit: 'Â°C', status: 'Oral', icon: Thermometer, color: 'text-orange-500 bg-orange-50', trend: 'stable' },
    ];

    const tasks = [
        { label: 'Collect Blood Sample', sub: 'CBC & Troponin I â€¢ Due 14:00', done: false, type: 'urgent' },
        { label: 'Vitals Check', sub: 'Hourly Monitoring â€¢ Due 14:30', done: false },
        { label: 'Administer Aspirin', sub: '300mg Stat â€¢ Done 09:15', done: true },
    ];

    return (
        <Layout title="Clinical Overview">
            <div className="max-w-[1700px] mx-auto space-y-8 pb-10 px-4 md:px-0">
                {/* Patient Header */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=jane" className="w-20 h-20 rounded-[2rem] object-cover ring-4 ring-white shadow-md" alt="Jane Doe" />
                            <div className="absolute -bottom-1 -right-1 px-3 py-1 bg-green-500 text-white text-[8px] font-black rounded-full uppercase tracking-widest border-2 border-white">Stable</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Jane Doe</h1>
                                <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-gray-100 italic">UHID-99281</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> 45 Years</span>
                                <span className="flex items-center gap-1.5"><BuildingIcon className="w-3.5 h-3.5" /> Ward A - Bed 204</span>
                                <span className="flex items-center gap-1.5"><StethoscopeIcon className="w-3.5 h-3.5 text-blue-500" /> Dr. Sarah Smith (Cardiology)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm group">
                            <Activity className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Add Vitals
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 group">
                            <FileText className="w-4 h-4 text-white/70 group-hover:scale-110 transition-transform" /> Nursing Note
                        </button>
                        <button className="p-4 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-10 border-b border-gray-100 px-6">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-9 space-y-8">
                        {/* System Alert */}
                        <div className="p-6 bg-orange-50/50 border border-orange-100 rounded-[2rem] flex items-center gap-6 group hover:bg-orange-50 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-xs font-black text-gray-900 tracking-tight uppercase">System Alert: NPO Status</h4>
                                    <span className="text-[10px] font-black text-gray-400">â€¢ 10:00 AM Today</span>
                                </div>
                                <p className="text-xs font-medium text-gray-500 mt-1">Patient is NPO (Nothing by Mouth) since 10:00 AM in preparation for scheduled Angiography at 14:00.</p>
                            </div>
                        </div>

                        {/* Vitals Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {vitals.map((v, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-4 hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">{v.label}</p>
                                        <div className={`p-3 rounded-xl ${v.color} transition-transform group-hover:scale-110`}>
                                            <v.icon className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-end gap-2 px-1">
                                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{v.value}</h3>
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest pb-1.5">{v.unit}</span>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-1 ${v.label === 'HEART RATE' ? 'text-gray-400' : 'text-green-500'}`}>
                                            {v.label === 'HEART RATE' ? null : <CheckCircle2 className="w-3 h-3" />}
                                            {v.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Details Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8 flex flex-col h-full ring-1 ring-gray-100">
                                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3 border-b border-gray-50 pb-6">
                                    <ClipboardIcon className="w-4 h-4 text-blue-500" /> Admission Details
                                </h3>
                                <div className="space-y-8 flex-1">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason for Admission</p>
                                        <p className="text-xs font-medium text-gray-500 leading-relaxed italic border-l-4 border-blue-50 pl-6 py-1">
                                            Severe chest pain radiating to left arm accompanied by diaphoresis and shortness of breath.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</p>
                                            <p className="text-sm font-black text-gray-900">Emergency</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                                            <p className="text-sm font-black text-gray-900">Oct 24, 2023</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Provisional Diagnosis</p>
                                        <div>
                                            <p className="text-sm font-black text-gray-900 tracking-tight">Acute Coronary Syndrome (ACS)</p>
                                            <p className="text-[10px] font-bold text-gray-400 mt-1 italic leading-tight uppercase tracking-tighter">Rule out Myocardial Infarction</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8 flex flex-col h-full ring-1 ring-gray-100">
                                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3 border-b border-gray-50 pb-6">
                                    <ActivityIcon className="w-4 h-4 text-blue-500" /> Clinical Status
                                </h3>
                                <div className="space-y-8 flex-1">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Condition</p>
                                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[8px] font-black uppercase tracking-widest border border-green-100">STABLE</span>
                                        </div>
                                        <p className="text-xs font-medium text-gray-500 leading-relaxed">
                                            Patient is conscious and oriented. Pain managed with analgesics. Awaiting Angiography results.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Known Allergies</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
                                                <XCircle className="w-3 h-3" /> Penicillin
                                            </span>
                                            <span className="px-5 py-2 bg-gray-50 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">Sulfa Drugs</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mt-auto">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Diet</p>
                                        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4 text-blue-600 group hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                                            <UtensilsIcon className="w-5 h-5 flex-shrink-0" />
                                            <p className="text-xs font-black uppercase tracking-widest">Cardiac Diet (Low Sodium)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Tasks Sidebar */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="flex justify-between items-center relative z-10 px-2">
                                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <ClipboardIcon className="w-4 h-4 text-blue-600" /> Pending Tasks
                                </h3>
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-100">2 Due</span>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {tasks.map((task, i) => (
                                    <div key={i} className={`p-6 rounded-[2rem] border transition-all cursor-pointer group flex items-start gap-4 ${task.done ? 'bg-gray-50/50 border-transparent opacity-60' : 'bg-white border-blue-50 hover:border-blue-200 shadow-sm'}`}>
                                        <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 group-hover:border-blue-500'}`}>
                                            {task.done && <CheckCircle className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <h4 className={`text-xs font-black tracking-tight ${task.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.label}</h4>
                                            <p className={`text-[10px] font-bold mt-1 ${task.done ? 'text-gray-400' : 'text-gray-400'}`}>{task.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-50 relative z-10">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 mb-6">Active Fluids</p>
                                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-5 group hover:bg-blue-100 transition-all cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm relative z-10 group-hover:scale-110 transition-transform">
                                        <Droplet className="w-6 h-6" />
                                    </div>
                                    <div className="relative z-10">
                                        <h5 className="text-xs font-black text-gray-900 tracking-tight leading-none uppercase">Normal Saline (0.9%)</h5>
                                        <p className="text-[10px] font-bold text-gray-500 mt-2 lowercase italic tracking-tight">@ 100ml/hr â€¢ Started 10:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const StethoscopeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a2 2 0 01-2-2m0 0a2 2 0 012-2M10 19v-4.586a1 1 0 01.293-.707l2.828-2.828a1 1 0 01.707-.293H16m0 0a2 2 0 012 2m0 0a2 2 0 01-2 2M16 11V7a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2h2" />
    </svg>
);

const BuildingIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const ClipboardIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

const ActivityIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const UtensilsIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 8a3 3 0 00-3 3v2a3 3 0 003 3H9a3 3 0 003-3v-2a3 3 0 00-3-3H8zM16 4v16M20 4v16" />
    </svg>
);

export default ClinicalOverview;
