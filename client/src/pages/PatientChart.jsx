import Layout from '../components/Layout/Layout';
import {
    Activity, Clock, FileText, CheckCircle2,
    MoreVertical, Plus, User, Send, Shield,
    Bell, Settings, MessageSquare, ChevronRight, AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

const ChecklistItem = ({ title, time, completed }) => (
    <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${completed ? 'bg-blue-600/5 border-blue-500/10' : 'bg-[#1e293b] border-gray-800 hover:border-blue-500/30'}`}>
        <div className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${completed ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-700 bg-gray-900'}`}>
                {completed && <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div>
                <h5 className={`text-sm font-bold tracking-tight ${completed ? 'text-gray-400 line-through' : 'text-white'}`}>{title}</h5>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{time}</p>
            </div>
        </div>
        {!completed && <span className="text-[9px] font-black text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Start</span>}
    </div>
);

const TimelineEntry = ({ time, author, role, content, type }) => (
    <div className="flex gap-6 relative group">
        <div className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full border-4 border-[#0f172a] ring-2 z-10 ${type === 'start' ? 'ring-blue-500 bg-blue-500' : 'ring-gray-700 bg-gray-800'}`}></div>
            <div className="flex-1 w-px bg-gray-800 group-last:bg-transparent"></div>
        </div>
        <div className="pb-10 flex-1">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black text-gray-500 tracking-tight">{time}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${role === 'Nurse' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {author} • {role}
                </span>
            </div>
            {type === 'start' ? (
                <div className="h-px bg-gradient-to-r from-gray-800 to-transparent flex items-center">
                    <span className="bg-[#0f172a] pr-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">SHIFT START</span>
                </div>
            ) : (
                <div className="p-6 bg-[#1e293b] border border-gray-800 rounded-[2rem] text-sm text-gray-400 leading-relaxed group-hover:border-gray-700 transition-colors">
                    {content}
                </div>
            )}
        </div>
    </div>
);

const OrderCard = ({ type, time, title, text, status }) => (
    <div className={`p-6 bg-[#1e293b] border rounded-[2rem] transition-all relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/5 ${type === 'STAT' ? 'border-red-500/20' : 'border-gray-800'}`}>
        {type === 'STAT' && <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-[4rem] group-hover:bg-red-500/10 transition-colors"></div>}
        <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-1">
                <span className={`text-[9px] font-black uppercase tracking-widest ${type === 'STAT' ? 'text-red-500' : 'text-gray-500'}`}>{type} ORDER</span>
                <span className="text-[10px] font-bold text-gray-500">{time}</span>
            </div>
            <Info className="w-4 h-4 text-gray-700" />
        </div>
        <h5 className="text-md font-black text-white tracking-tight mb-2">{title}</h5>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">{text}</p>
        <button className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'pending' ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' : 'bg-gray-800 text-gray-500'}`}>
            {status === 'pending' ? 'Acknowledge' : 'Completed'}
        </button>
    </div>
);

const PatientChart = () => {
    return (
        <Layout title="Nurse Station | IPD Ward A" dark={true}>
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Profile */}
                <div className="bg-[#1e293b] rounded-[3rem] border border-gray-800 overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent"></div>
                    <div className="p-10 relative flex flex-wrap lg:flex-nowrap items-center gap-10">
                        <div className="relative">
                            <img src="https://i.pravatar.cc/150?u=jane" className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-[#0f172a] shadow-2xl" alt="" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-2xl bg-green-500 border-4 border-[#1e293b] animate-pulse"></div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-4">
                                <h1 className="text-5xl font-black text-white tracking-tighter">Jane Doe <span className="text-gray-600 font-medium text-3xl">(54F)</span></h1>
                                <span className="px-4 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">Stable</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] italic">
                                <span className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-800 rounded flex items-center justify-center text-[8px] text-gray-500">🛏️</div> Bed: 204-A</span>
                                <span className="flex items-center gap-2 text-blue-400"><div className="w-4 h-4 bg-blue-500/10 rounded flex items-center justify-center text-[8px] text-blue-400">#</div> MRN: #839210</span>
                                <span className="flex items-center gap-2 text-red-400"><AlertTriangle className="w-3 h-3" /> Allergies: Penicillin</span>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button className="px-6 py-2.5 bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">Full History</button>
                                <button className="px-6 py-2.5 bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-700 transition-all">Lab Results</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { label: 'Heart Rate', value: '88', unit: 'bpm', trend: 'up' },
                                { label: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
                                { label: 'Temp', value: '98.6', unit: '°F' },
                                { label: 'SpO2', value: '96', unit: '%' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-[#0f172a] p-4 rounded-3xl border border-gray-800 flex flex-col gap-1 min-w-[120px]">
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                                        {stat.label === 'Heart Rate' ? <Activity className="w-3 h-3 text-red-500" /> : stat.label === 'Temp' ? '🔥' : '💧'} {stat.label}
                                    </p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-black text-white">{stat.value}</span>
                                        <span className="text-[9px] font-bold text-gray-600">{stat.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Patient Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Care Checklist Section */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                Care Checklist
                            </h4>
                            <span className="bg-gray-800 px-2.5 py-1 rounded text-[9px] font-black text-gray-500 uppercase">Shift A</span>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-800 pb-2">Morning (08:00 - 12:00)</p>
                                <ChecklistItem title="Morning Vitals Check" time="08:00 AM • Completed" completed={true} />
                                <ChecklistItem title="IV Fluid Replacement" time="09:00 AM • NS 500ml" completed={false} />
                                <ChecklistItem title="Wound Dressing Change" time="10:00 AM • Left Leg" completed={false} />
                            </div>
                            <div className="space-y-4 opacity-50">
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-800 pb-2">Afternoon (12:00 - 16:00)</p>
                                <ChecklistItem title="Lunch & Insulin" time="12:30 PM • Sliding Scale" completed={false} />
                                <ChecklistItem title="Hourly Rounding" time="02:00 PM • 4Ps Check" completed={false} />
                            </div>
                        </div>

                        <div className="bg-[#1e293b] p-6 rounded-[2rem] border border-gray-800 shadow-xl">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Shift Status</p>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white">Time Remaining</span>
                                <span className="text-xs font-black text-blue-400 font-mono">3h 45m</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[62%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* Nursing Notes Section */}
                    <div className="lg:col-span-3 bg-[#1e293b] p-10 rounded-[3rem] border border-gray-800 shadow-2xl flex flex-col h-full min-h-[800px]">
                        <div className="flex justify-between items-center mb-12">
                            <h4 className="text-xl font-black text-white tracking-tight flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-blue-500" />
                                Nursing Notes
                            </h4>
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                <Plus className="w-4 h-4" />
                                New Entry
                            </button>
                        </div>

                        <div className="flex-1 space-y-2">
                            <TimelineEntry
                                time="10:15 AM"
                                author="Nurse Ratched"
                                role="Nurse"
                                content="Patient reported mild discomfort during dressing change. Analgesic administered per PRN order. Wound site looks clean, no signs of infection or purulent discharge."
                            />
                            <TimelineEntry
                                time="09:05 AM"
                                author="Dr. House"
                                role="Doctor"
                                content="Reviewed patient status. Vitals stable. Continue current antibiotic course. Patient cleared for soft diet."
                            />
                            <TimelineEntry
                                time="08:00 AM"
                                author="Shift B Handover"
                                type="start"
                            />
                        </div>

                        <div className="mt-auto pt-10 border-t border-gray-800">
                            <div className="relative group">
                                <textarea
                                    placeholder="Type nursing note here..."
                                    className="w-full h-32 bg-[#0f172a] border border-gray-800 rounded-3xl p-6 text-sm text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none"
                                ></textarea>
                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors"><Activity className="w-4 h-4" /></button>
                                    <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">🚩</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctor's Orders Section */}
                    <div className="lg:col-span-1 space-y-8">
                        <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                            <Plus className="w-4 h-4 text-blue-500" />
                            Doctor's Orders
                        </h4>

                        <div className="space-y-6">
                            <OrderCard
                                type="STAT"
                                time="10:30 AM"
                                title="Strict I/O Monitoring"
                                text="Monitor urine output hourly. Notify MD if < 30ml/hr for 2 consecutive hours."
                                status="pending"
                            />
                            <OrderCard
                                type="DIET"
                                time="Yesterday"
                                title="Soft Diet Only"
                                text="Avoid spicy foods. Encourage hydration."
                                status="completed"
                            />
                            <OrderCard
                                type="RESPIRATORY"
                                time="Yesterday"
                                title="O2 Saturation Target"
                                text="Keep SpO2 > 94%. Titrate O2 via NC as needed."
                                status="completed"
                            />
                            <OrderCard
                                type="ACTIVITY"
                                time="2 days ago"
                                title="Bed Rest with BRP"
                                text="Patient may use bathroom with assistance. Fall risk precautions in place."
                                status="completed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const Info = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default PatientChart;
