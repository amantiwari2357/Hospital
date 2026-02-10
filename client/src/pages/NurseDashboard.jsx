import Layout from '../components/Layout/Layout';
import {
    Users, AlertCircle, Pill, ClipboardCheck,
    Calendar, TrendingUp, Heart, ChevronRight,
    Plus, Search, Bell, Settings, FileText, UserPlus, FlaskConical as LabIcon, Pill as PillIcon, LogOut as DischargeIcon, MoreVertical
} from 'lucide-react';

const StatCard = ({ title, value, subtext, subColor, icon: Icon, color }) => (
    <div className={`p-6 rounded-3xl border bg-white shadow-sm flex items-center justify-between group transition-all hover:shadow-md ${color === 'red' ? 'border-red-100' : 'border-gray-50'}`}>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                {subtext && <span className={`text-[10px] font-bold ${subColor}`}>{subtext}</span>}
            </div>
        </div>
        <div className={`p-4 rounded-2xl ${color === 'red' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'} group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const NurseDashboard = () => {
    return (
        <Layout title="Nurse Dashboard">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Nurse Dashboard</h2>
                        <p className="text-sm font-medium text-gray-500">Welcome back, Sarah. You have 3 pending tasks.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <FileText className="w-4 h-4 text-blue-500" />
                            Add Nursing Note
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                            <TrendingUp className="w-4 h-4" />
                            Record Vitals
                        </button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Assigned Patients"
                        value="8"
                        subtext="â†‘ 1 Pending Discharge"
                        subColor="text-orange-500"
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Critical Alerts"
                        value="2"
                        subtext="Room 304 requires attention."
                        subColor="text-gray-400"
                        icon={AlertCircle}
                        color="red"
                    />
                    <StatCard
                        title="Upcoming Meds (1h)"
                        value="5"
                        subtext="65% Administered"
                        subColor="text-blue-500"
                        icon={Pill}
                        color="blue"
                    />
                    <StatCard
                        title="Shift Tasks"
                        value="12/15"
                        subtext="3 hours remaining"
                        subColor="text-gray-400"
                        icon={ClipboardCheck}
                        color="blue"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Medication Schedule Timeline */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-xl font-black text-gray-900 tracking-tight">Medication Schedule (Next 4 Hours)</h4>
                                <button className="text-blue-600 font-bold text-xs hover:underline">View Full Schedule</button>
                            </div>

                            <div className="relative pt-12">
                                {/* Time markers */}
                                <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-8 border-b border-gray-50 pb-4">
                                    <span>10:00</span>
                                    <span>11:00</span>
                                    <span>12:00</span>
                                    <span>13:00</span>
                                </div>

                                {/* Timeline Rows */}
                                <div className="space-y-6">
                                    {[
                                        { name: 'M. Thompson', initial: 'MT', time: '10:15', drug: 'Amoxicillin', dose: '500mg IV', pos: 'col-start-1' },
                                        { name: 'J. Doe', initial: 'JD', time: '11:45', drug: 'Insulin', dose: '10 Units SC', pos: 'col-start-2' },
                                        { name: 'R. Smith', initial: 'RS', time: '12:45', drug: 'Heparin', dose: '5000 Units SC', pos: 'col-start-4' },
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center gap-6">
                                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-500">
                                                {row.initial}
                                            </div>
                                            <div className="flex-1 h-px bg-gray-50 relative">
                                                <div className={`absolute top-1/2 -translate-y-1/2 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer`} style={{ left: `${(i * 30) + 10}%` }}>
                                                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-orange-400' : i === 1 ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
                                                    <div>
                                                        <p className="text-xs font-black text-gray-900 leading-none">{row.drug}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-tighter">{row.dose}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Patients Requiring Attention */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h4 className="text-xl font-black text-gray-900 tracking-tight">Patients Requiring Attention</h4>
                                <button className="p-2 text-gray-400 hover:text-blue-500 rounded-xl bg-gray-50"><TrendingUp className="w-4 h-4" /></button>
                            </div>
                            <table className="w-full">
                                <thead className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                                    <tr>
                                        <th className="text-left pb-4 font-black">Patient</th>
                                        <th className="text-left pb-4 font-black">Location</th>
                                        <th className="text-left pb-4 font-black">Trend</th>
                                        <th className="text-left pb-4 font-black">Last Vitals</th>
                                        <th className="text-right pb-4 font-black">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { name: 'David Lee', id: 'MRN-8482', bed: 'Bed 304-A', trend: 'HR Spike', trendColor: 'text-red-500', vitals: 'HR: 115, BP: 130/85' },
                                        { name: 'Sarah Jones', id: 'MRN-1102', bed: 'Bed 201-B', trend: 'O2 Drop', trendColor: 'text-orange-500', vitals: 'SpO2: 88%, RR: 22' },
                                    ].map((p, i) => (
                                        <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                                            <td className="py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 text-[10px] font-black">{p.name.charAt(0)}</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-none">{p.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold mt-1 font-mono">{p.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-5 text-xs font-bold text-blue-600">{p.bed}</td>
                                            <td className={`py-5 text-xs font-black flex items-center gap-1 ${p.trendColor}`}>
                                                <TrendingUp className="w-3 h-3 rotate-45" />
                                                {p.trend}
                                            </td>
                                            <td className="py-5">
                                                <p className="text-[10px] font-black text-gray-900">{p.vitals}</p>
                                            </td>
                                            <td className="py-5 text-right">
                                                <button className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">Assess</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Sidebar: Notes & Quick Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Handover Notes */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm h-full">
                            <h4 className="text-xl font-black text-gray-900 tracking-tight mb-8">Handover Notes</h4>
                            <div className="space-y-6">
                                {[
                                    { patient: 'Bed 304 (David Lee)', note: 'Check central line dressing. Family requested update at 14:00.', color: 'bg-blue-500' },
                                    { patient: 'Pharmacy Restock', note: 'Controlled substances count verification pending for cabinet B.', color: 'bg-gray-400' },
                                    { patient: 'New Admission', note: 'Expected from ER around 11:30. Prep Bed 305.', color: 'bg-gray-400' },
                                ].map((note, i) => (
                                    <div key={i} className="flex gap-4 relative">
                                        {i !== 2 && <div className="absolute left-1.5 top-6 bottom-0 w-px bg-gray-100"></div>}
                                        <div className={`mt-1.5 w-3 h-3 rounded-full border-2 border-white ring-2 ring-gray-50 ${note.color}`}></div>
                                        <div>
                                            <h5 className="text-xs font-black text-gray-900 mb-1">{note.patient}</h5>
                                            <p className="text-xs font-medium text-gray-500 leading-relaxed">{note.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 border border-dashed border-gray-200 rounded-2xl text-xs font-black text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all">+ Add New Note</button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-blue-600 p-8 rounded-[2rem] shadow-xl shadow-blue-500/20 text-white">
                            <h4 className="text-xl font-black mb-6">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col items-center gap-3 transition-all group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform"><FileText className="w-5 h-5" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Lab Request</span>
                                </button>
                                <button className="p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col items-center gap-3 transition-all group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform"><DischargeIcon className="w-5 h-5" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Discharge</span>
                                </button>
                                <button className="p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col items-center gap-3 transition-all group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform"><Pill className="w-5 h-5" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Refill</span>
                                </button>
                                <button className="p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl flex flex-col items-center gap-3 transition-all group">
                                    <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform"><Heart className="w-5 h-5" /></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Page Doc</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NurseDashboard;
