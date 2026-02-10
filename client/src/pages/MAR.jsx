import Layout from '../components/Layout/Layout';
import {
    AlertCircle, Clock, Pill, CheckCircle2,
    Search, Calendar, Filter, User, MoreVertical,
    ChevronRight, ArrowRight, Shield, Activity
} from 'lucide-react';
import { useState } from 'react';

const MedCard = ({ name, type, dose, freq, time, note, status, color }) => (
    <div className={`p-8 bg-white rounded-[2rem] border transition-all flex items-center justify-between group hover:shadow-lg ${status === 'due' ? 'border-red-200 bg-red-50/10' : 'border-gray-50'}`}>
        <div className="flex items-center gap-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${status === 'due' ? 'bg-red-50 text-red-500' : status === 'upcoming' ? 'bg-blue-50 text-blue-500' : 'bg-green-50 text-green-500'}`}>
                {status === 'administered' ? <CheckCircle2 className="w-8 h-8" /> : <Pill className="w-8 h-8" />}
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">{name}</h4>
                    <span className="text-[10px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded uppercase tracking-widest">{type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                    <span>{dose}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{freq}</span>
                </div>
                {note && (
                    <p className="text-[10px] font-medium text-gray-400 flex items-center gap-1.5 mt-2 italic">
                        <AlertCircle className="w-3 h-3" />
                        {note}
                    </p>
                )}
            </div>
        </div>

        <div className="flex items-center gap-12">
            <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Scheduled</p>
                <p className={`text-lg font-black tracking-tight ${status === 'due' ? 'text-red-500' : 'text-gray-900'}`}>{time}</p>
            </div>
            {status === 'due' ? (
                <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                    <Pill className="w-4 h-4" />
                    Administer
                </button>
            ) : status === 'upcoming' ? (
                <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Mark Prepared
                </button>
            ) : (
                <div className="flex items-center gap-2 text-green-600 font-black text-sm uppercase tracking-widest bg-green-50 px-6 py-4 rounded-2xl border border-green-100">
                    <CheckCircle2 className="w-4 h-4" />
                    Administered
                </div>
            )}
        </div>
    </div>
);

const MAR = () => {
    const [activeTab, setActiveTab] = useState('Due Now');
    const tabs = [
        { name: 'Due Now', count: 2 },
        { name: 'Upcoming', count: 4 },
        { name: 'PRN / As Needed', count: 0 },
        { name: 'Administered', count: 8 }
    ];

    return (
        <Layout title="MAR - Medication Administration Record">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Patient Header */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <img src="https://i.pravatar.cc/150?u=john" className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white" alt="" />
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight">John Doe <span className="text-gray-300 font-medium text-2xl ml-2">(M, 45)</span></h2>
                                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Admitted</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> MRN: #839210</span>
                                <span className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Room: 402-B</span>
                                <span className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Dr. House</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex flex-col gap-1 pr-12 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-red-100/50 rounded-bl-[2rem] flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-[10px] font-black text-red-800 uppercase tracking-wider">Warning: Allergies</p>
                            <p className="text-lg font-black text-red-600 tracking-tight">PENICILLIN (Severe)</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-black text-gray-700 transition-all">
                                <FileText className="w-4 h-4 text-blue-500" />
                                View Chart
                            </button>
                            <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-black text-gray-700 transition-all">
                                <Clock className="w-4 h-4 text-blue-500" />
                                History
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation & Filters */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`px-6 py-4 rounded-2xl text-sm font-black transition-all relative ${activeTab === tab.name
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.name}
                                {tab.count > 0 && <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-lg ${activeTab === tab.name ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{tab.count}</span>}
                                {activeTab === tab.name && <div className="absolute bottom-0 left-4 right-4 h-1 bg-blue-600 rounded-full"></div>}
                            </button>
                        ))}
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter medications..."
                            className="bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all w-[300px]"
                        />
                    </div>
                </div>

                {/* List Sections */}
                <div className="space-y-12">
                    {/* Section 1: Due Now */}
                    {(activeTab === 'Due Now' || activeTab === 'all') && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Due Now - 09:00 AM</h3>
                            </div>
                            <div className="space-y-4">
                                <MedCard
                                    name="Lisinopril"
                                    type="ACE Inhibitor"
                                    dose="10mg"
                                    freq="Oral (Tablet) â€¢ Daily"
                                    time="09:00 AM"
                                    note="Hold if SBP < 100"
                                    status="due"
                                />
                                <MedCard
                                    name="Metformin"
                                    type="Antidiabetic"
                                    dose="500mg"
                                    freq="Oral (Tablet) â€¢ BID (Twice Daily)"
                                    time="09:00 AM"
                                    note="Instruction: Take with food"
                                    status="due"
                                />
                            </div>
                        </div>
                    )}

                    {/* Section 2: Upcoming */}
                    {(activeTab === 'Upcoming' || activeTab === 'all') && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Upcoming - 02:00 PM</h3>
                            </div>
                            <div className="space-y-4">
                                <MedCard
                                    name="Vancomycin"
                                    type="Antibiotic"
                                    dose="1g"
                                    freq="IV Drip â€¢ Q12H"
                                    time="02:00 PM"
                                    note="Alert: Monitor Trough Levels"
                                    status="upcoming"
                                />
                            </div>
                        </div>
                    )}

                    {/* Section 3: Administered */}
                    {(activeTab === 'Administered' || activeTab === 'all') && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Administered (Past 24h)</h3>
                            </div>
                            <div className="space-y-4 opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                <MedCard
                                    name="Acetaminophen"
                                    type="Analgesic"
                                    dose="650mg"
                                    freq="Oral â€¢ PRN"
                                    time="07:42 AM"
                                    note="Given by Nurse Ratched"
                                    status="administered"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Toast Notification Mockup */}
                <div className="fixed bottom-12 right-12 bg-white rounded-3xl border border-green-100 shadow-2xl p-6 flex items-center gap-6 animate-bounce-subtle border-l-[6px] border-l-green-500">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h5 className="text-sm font-black text-gray-900 tracking-tight">Success</h5>
                        <p className="text-xs font-medium text-gray-500">Vitals checked & recorded.</p>
                    </div>
                    <button className="text-gray-300 hover:text-gray-500"><MoreVertical className="w-4 h-4" /></button>
                </div>
            </div>
        </Layout>
    );
};

const FileText = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export default MAR;
