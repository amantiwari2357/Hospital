import Layout from '../components/Layout/Layout';
import { Search, Bell, Settings, ChevronRight, AlertCircle, Clock, User, FileText, CheckCircle2, ChevronDown, Flag } from 'lucide-react';
import { useState } from 'react';

const patients = [
    { id: '1', name: 'Jane Doe', mrn: '884-239-01', test: 'Comp. Metabolic Panel', time: 'Today, 10:30 AM', status: 'CRITICAL', color: 'text-red-600 bg-red-50 border-red-100' },
    { id: '2', name: 'Robert Fox', mrn: '722-104-99', test: 'CBC with Differential', time: 'Today, 09:15 AM', status: 'Abnormal', color: 'text-orange-600 bg-orange-50 border-orange-100' },
    { id: '3', name: 'Bessie Cooper', mrn: '102-441-23', test: 'Lipid Panel', time: 'Yesterday, 4:45 PM', status: 'Normal', color: 'text-green-600 bg-green-50 border-green-100' },
    { id: '4', name: 'Wade Warren', mrn: '991-002-55', test: 'Troponin I', time: 'Yesterday, 2:10 PM', status: 'CRITICAL', color: 'text-red-600 bg-red-50 border-red-100' },
];

const LabReports = () => {
    const [selectedPatient, setSelectedPatient] = useState(patients[0]);

    return (
        <Layout title="Lab Review Queue">
            <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex gap-8">
                {/* Left Queue */}
                <div className="w-1/3 flex flex-col gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search patient or MRN"
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        {['All', 'Critical (2)', 'Abnormal (5)', 'Pending'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${i === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                        {patients.map((p) => (
                            <div
                                key={p.id}
                                onClick={() => setSelectedPatient(p)}
                                className={`p-5 rounded-2xl border transition-all cursor-pointer group ${selectedPatient.id === p.id
                                        ? 'bg-blue-50 border-blue-200 shadow-md'
                                        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {p.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 leading-none">{p.name}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold mt-1">MRN: {p.mrn}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${p.color}`}>
                                        {p.status}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-gray-700">{p.test}</p>
                                <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-[10px] font-bold">
                                    <Clock className="w-3 h-3" />
                                    {p.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Report Detail */}
                <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-6">
                                <img src={`https://i.pravatar.cc/150?u=${selectedPatient.id}`} className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg" alt="" />
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">{selectedPatient.name}</h3>
                                        <span className="text-xs font-bold text-gray-400">Order ID: #LB-2023-8891</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                        <div className="flex items-center gap-2 italic">
                                            <User className="w-4 h-4" /> 42 Yrs (Mar 12, 1982)
                                        </div>
                                        <div className="flex items-center gap-2 italic">
                                            <span className="opacity-50">Trans:</span> Female
                                        </div>
                                        <div className="flex items-center gap-2 italic">
                                            <span className="opacity-50">MRN:</span> {selectedPatient.mrn}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">View History</button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                        <div>
                            <div className="flex justify-between items-end mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 tracking-tight">Comprehensive Metabolic Panel (CMP)</h4>
                                </div>
                                <span className="px-4 py-1.5 bg-yellow-50 text-yellow-600 border border-yellow-100 rounded-lg text-[10px] font-black uppercase tracking-widest">Preliminary</span>
                            </div>

                            <div className="w-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-4">Test Name</th>
                                            <th className="px-8 py-4">Result</th>
                                            <th className="px-8 py-4">Units</th>
                                            <th className="px-8 py-4">Ref Range</th>
                                            <th className="px-8 py-4 text-right">Flag</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            { name: 'Glucose', result: '450', units: 'mg/dL', range: '70 - 99', flag: 'High', color: 'text-red-600' },
                                            { name: 'Sodium', result: '132', units: 'mmol/L', range: '136 - 145', flag: 'Low', color: 'text-orange-600' },
                                            { name: 'Potassium', result: '4.1', units: 'mmol/L', range: '3.5 - 5.1', flag: 'Normal', color: 'text-green-600' },
                                            { name: 'Calcium', result: '9.2', units: 'mg/dL', range: '8.5 - 10.5', flag: 'Normal', color: 'text-green-600' },
                                            { name: 'Creatinine', result: '1.4', units: 'mg/dL', range: '0.6 - 1.2', flag: 'High', color: 'text-orange-600' },
                                        ].map((t) => (
                                            <tr key={t.name} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="px-8 py-5 text-sm font-bold text-gray-900">{t.name}</td>
                                                <td className={`px-8 py-5 text-sm font-black ${t.color}`}>{t.result}</td>
                                                <td className="px-8 py-5 text-xs text-gray-400 font-bold">{t.units}</td>
                                                <td className="px-8 py-5 text-xs text-gray-400 font-bold">{t.range}</td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${t.flag === 'Normal' ? 'bg-green-50 text-green-600 border-green-100' :
                                                            t.flag === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                                        }`}>
                                                        {t.flag}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Remarks */}
                        <div className="border-t border-gray-100 pt-10">
                            <div className="flex items-center gap-2 mb-6">
                                <Settings className="w-5 h-5 text-gray-400" />
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Clinical Interpretation / Remarks</h4>
                            </div>
                            <textarea
                                placeholder="Enter clinical correlation, follow-up instructions, or other remarks..."
                                className="w-full h-40 bg-gray-50 border border-gray-100 rounded-2xl p-6 text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-8 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer scale-90">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Notify Patient via Portal</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-8 py-3.5 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm">
                                <Flag className="w-4 h-4 text-gray-400" />
                                Flag for Follow-up
                            </button>
                            <button className="flex items-center gap-2 px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                                <CheckCircle2 className="w-4 h-4" />
                                Mark as Reviewed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LabReports;
