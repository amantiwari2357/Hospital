import Layout from '../components/Layout/Layout';
import {
    Search, Plus, MapPin, Clock,
    ChevronDown, X, Pill,
    CheckCircle2, AlertCircle, TrendingUp, User,
    FileText, Save, Send, Clipboard, FlaskConical as LabIcon
} from 'lucide-react';
import { useState } from 'react';

const VitalsCard = ({ label, value, unit, trend }) => (
    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex flex-col gap-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</p>
        <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-gray-900 tracking-tight">{value}</span>
            <span className="text-[10px] font-bold text-gray-500">{unit}</span>
        </div>
    </div>
);

const Consultation = () => {
    return (
        <Layout title="Doctor's Consultation">
            <div className="max-w-[1600px] mx-auto flex gap-10">
                {/* Left Patient Sidebar */}
                <div className="w-[350px] space-y-8 flex flex-col">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-5">
                            <img src="https://i.pravatar.cc/150?u=consult" className="w-16 h-16 rounded-2xl object-cover" alt="" />
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">John Doe</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Male, 45 yrs • #HMS-8921</p>
                            </div>
                        </div>

                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Allergy: Penicillin (High Risk)</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Vitals</h4>
                                <span className="text-[10px] font-bold text-gray-500 italic">Just now</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <VitalsCard label="BP" value="120/80" unit="mmHg" />
                                <VitalsCard label="Heart Rate" value="72" unit="bpm" />
                                <VitalsCard label="Temp" value="98.6" unit="°F" />
                                <VitalsCard label="SpO2" value="98" unit="%" />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50">
                            <details className="group" open>
                                <summary className="flex items-center justify-between cursor-pointer list-none">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Past Medical History</h4>
                                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-4 space-y-2">
                                    <p className="text-xs font-medium text-gray-500">• Type 2 Diabetes (Diagnosed 2018)</p>
                                    <p className="text-xs font-medium text-gray-500">• Hypertension (Managed with meds)</p>
                                </div>
                            </details>

                            <details className="group" open>
                                <summary className="flex items-center justify-between cursor-pointer list-none pt-4 border-t border-gray-50">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Current Medications</h4>
                                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                    <p className="text-xs font-black text-blue-600">Lisinopril 10mg</p>
                                    <p className="text-[10px] font-bold text-gray-500 mt-1">1 Tablet Daily</p>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex items-center justify-between cursor-pointer list-none pt-4 border-t border-gray-50">
                                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Recent Visits</h4>
                                    <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-4 h-10"></div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Main Content: Consultation Form */}
                <div className="flex-1 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col">
                    <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Consultation Note</h2>
                        <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">In Progress</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                        <div className="space-y-6">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Chief Complaint</label>
                            <textarea
                                placeholder="e.g. Severe headache and nausea since morning..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-gray-300 font-medium h-32"
                            ></textarea>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">History of Present Illness</label>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">+ Templates</button>
                            </div>
                            <textarea
                                placeholder="Describe onset, duration, and associated symptoms..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-gray-300 font-medium h-48"
                            ></textarea>
                        </div>

                        <div className="space-y-6">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Diagnosis (ICD-10)</label>
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search diagnosis..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-8 py-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <div className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    Migraine without aura (G43.0)
                                    <X className="w-3 h-3 cursor-pointer hover:scale-110" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Treatment Plan & Notes</label>
                            <textarea
                                placeholder="Rest, hydration fluids..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-gray-300 font-medium h-40"
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-8 border-t border-gray-50 flex justify-between gap-6 bg-gray-50/30">
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all">Save Draft</button>
                            <button className="px-8 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all">Refer Specialist</button>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-8 py-4 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-lg shadow-orange-500/5">
                                <Clipboard className="w-4 h-4" />
                                Request Labs
                            </button>
                            <button className="flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                                <CheckCircle2 className="w-4 h-4" />
                                Complete Consultation
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Orders/Prescription Sidebar */}
                <div className="w-[400px] flex flex-col gap-8">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex-1 flex flex-col p-8">
                        <div className="flex border-b border-gray-50 mb-8">
                            <button className="flex-1 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 border-b-2 border-blue-600 transition-all">Prescription</button>
                            <button className="flex-1 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-600 transition-all">Lab Orders</button>
                        </div>

                        <div className="space-y-8 flex-1">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-blue-500" /> Add Medication
                                </h4>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Drug Name (e.g. Paracetamol)" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium" />
                                    <div className="flex gap-3">
                                        <input type="text" placeholder="Dose (500mg)" className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium" />
                                        <div className="flex-1 relative">
                                            <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium appearance-none">
                                                <option>Frequency</option>
                                                <option>1-0-0</option>
                                                <option>1-1-1</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <input type="text" placeholder="Duration (5 days)" className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium" />
                                        <button className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"><Plus className="w-6 h-6" /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-gray-50">
                                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Prescribed Items (2)</h4>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Sumatriptan', info: '50mg • 1-0-0 • 3 Days', note: 'Take at onset of migraine' },
                                        { name: 'Naproxen', info: '250mg • 1-0-1 • 5 Days', note: 'After food' },
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group">
                                            <div>
                                                <h5 className="text-xs font-black text-gray-900">{item.name}</h5>
                                                <p className="text-[9px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">{item.info}</p>
                                                <p className="text-[9px] italic text-gray-400 mt-1">{item.note}</p>
                                            </div>
                                            <button className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 space-y-4">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Quick Labs</p>
                            <div className="flex flex-wrap gap-2">
                                {['CBC', 'Lipid Profile', 'X-Ray Chest', '+ More'].map((lab) => (
                                    <button key={lab} className="px-4 py-2 border border-blue-100 bg-blue-50 rounded-xl text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all">{lab}</button>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Items</p>
                                    <p className="text-lg font-black text-gray-900 leading-none">2</p>
                                </div>
                                <button className="text-xs font-black text-blue-600 hover:underline">Print Rx Only</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Consultation;
