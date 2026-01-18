import Layout from '../components/Layout/Layout';
import {
    ChevronRight, Edit2, Plus, AlertCircle,
    Heart, Thermometer, Scale as Weight, Search,
    Filter, Send, Printer, UserPlus,
    RefreshCcw, Pill, ChevronDown, CheckCircle2,
    Calendar, Clock, User, Activity
} from 'lucide-react';

const VitalsCard = ({ label, value, unit, status, trend, icon: Icon }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col gap-6 group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
            {Icon && <div className="p-3 bg-gray-50 text-gray-300 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors"><Icon className="w-5 h-5" /></div>}
        </div>
        <div className="space-y-1">
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
                <span className="text-xs font-bold text-gray-400">{unit}</span>
            </div>
            <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${status === 'Normal' || status === 'Stable' ? 'text-green-500' : 'text-orange-500'}`}>
                {status === 'Normal' || status === 'Stable' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {status}
            </div>
        </div>
        {trend && <p className="text-[10px] font-bold text-gray-400 italic">Last check: {trend}</p>}
    </div>
);

const HistoryItem = ({ type, title, doctor, dept, date, note, tags, color, icon: Icon }) => (
    <div className="relative pl-12 pb-12 group last:pb-0">
        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center z-10 scale-110 group-hover:border-blue-200 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all">
            <Icon className={`w-4 h-4 ${color}`} />
        </div>
        {!title.includes('Birth') && <div className="absolute left-4 top-9 bottom-0 w-[2px] bg-gray-50 group-hover:bg-blue-50 transition-colors"></div>}

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm group-hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">{title}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Dr. {doctor} • {dept}</p>
                </div>
                <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 uppercase tracking-widest">{date}</span>
            </div>
            <p className="text-sm font-medium text-gray-500 leading-relaxed max-w-2xl">{note}</p>
            <div className="flex gap-3 mt-6">
                {tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-gray-50 text-gray-400 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest">{tag}</span>
                ))}
            </div>
        </div>
    </div>
);

const PatientProfile = () => {
    return (
        <Layout title="Sarah Jenkins - Profile">
            <div className="max-w-[1700px] mx-auto space-y-12">
                {/* Navigation Header */}
                <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                    <span>Patients</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900">Sarah Jenkins</span>
                </div>

                {/* Patient Profile Hero */}
                <div className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-100/30 transition-all duration-[2s]"></div>

                    <div className="relative">
                        <div className="w-40 h-40 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl ring-1 ring-gray-100">
                            <img src="https://i.pravatar.cc/150?u=sarahj" className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-lg"></div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Sarah Jenkins</h2>
                                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">In-Patient</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-500">
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> ID: #HMS-9281</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> 42 Years</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Female</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> Blood: O+</div>
                                </div>
                            </div>
                            <div className="flex gap-4 self-stretch md:self-auto">
                                <button className="flex-1 md:flex-none px-10 py-4 border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                                    <Edit2 className="w-4 h-4" /> Edit Profile
                                </button>
                                <button className="flex-1 md:flex-none px-12 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
                                    <Plus className="w-5 h-5" /> New Record
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-50">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Allergies:</span>
                            <span className="px-5 py-1.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5" /> Penicillin
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vitals Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <VitalsCard label="Blood Pressure" value="120/80" unit="mmHg" status="Normal" icon={Heart} />
                    <VitalsCard label="Heart Rate" value="72" unit="bpm" status="Stable" trend="2h ago" icon={Activity} />
                    <VitalsCard label="Temperature" value="98.6" unit="°F" status="Stable" icon={Thermometer} />
                    <VitalsCard label="Weight" value="65" unit="kg" status="Stable" trend="-1.2kg since last visit" icon={Weight} />
                </div>

                {/* Main Body: Tabs & Detail view */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    {/* Left: History Timeline */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex border-b border-gray-100 pb-1 gap-12">
                            {['History', 'Past Visits', 'Prescriptions', 'Lab Reports'].map((tab, i) => (
                                <button key={i} className={`pb-5 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${i === 0 ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {tab}
                                    {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"></div>}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm flex items-center justify-between group">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="text" placeholder="Search history, diagnosis..." className="w-full pl-10 pr-6 py-2 text-sm font-medium focus:outline-none placeholder:text-gray-300 transition-all" />
                                </div>
                                <button className="flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-white transition-all">
                                    <Filter className="w-4 h-4 text-gray-300" /> Filter
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 mt-12">
                            <div className="flex items-center gap-4 mb-10">
                                <Clock className="w-5 h-5 text-blue-500" />
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Medical History</h3>
                            </div>

                            <HistoryItem
                                title="General Checkup"
                                doctor="Emily Chen"
                                dept="Cardiology Dept."
                                date="Oct 24, 2023"
                                note="Routine follow-up. Patient reports mild fatigue. BP slightly elevated but within manageable range. Recommended lifestyle adjustments and..."
                                tags={['Follow-up', 'Routine']}
                                color="text-blue-500"
                                icon={Activity}
                            />

                            <HistoryItem
                                title="ER Visit - Severe Migraine"
                                doctor="Mark Stone"
                                dept="Emergency Room"
                                date="Aug 12, 2023"
                                note="Admitted with severe headache, nausea, and photophobia. Administered IV fluids and analgesics. CT scan negative for acute abnormalities."
                                tags={['Emergency', 'Neurology']}
                                color="text-red-500"
                                icon={AlertCircle}
                            />
                        </div>
                    </div>

                    {/* Right: Actions & Meds */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Quick Actions */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-6">Quick Actions</h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'Print Medical Record', icon: Printer },
                                    { label: 'Refer to Specialist', icon: Send },
                                    { label: 'Renew Prescriptions', icon: UserPlus },
                                ].map((action, i) => (
                                    <button key={i} className="w-full p-6 bg-gray-50/50 hover:bg-blue-50 rounded-[2rem] border border-gray-100/50 hover:border-blue-100 transition-all flex items-center gap-5 group">
                                        <div className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 group-hover:text-blue-600 group-hover:shadow-md transition-all">
                                            <action.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-black text-gray-700 tracking-tight">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Meds */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
                            <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Active Meds</h4>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">See All</button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: 'Amoxicillin', dose: '500mg • 2x Daily' },
                                    { name: 'Lisinopril', dose: '10mg • 1x Daily' },
                                ].map((med, i) => (
                                    <div key={i} className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100/50 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                                        <div>
                                            <h5 className="text-sm font-black text-gray-900 tracking-tight">{med.name}</h5>
                                            <p className="text-[10px] font-bold text-gray-400 mt-1">{med.dose}</p>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-500 scale-100 group-hover:scale-125 transition-transform"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[3rem] transition-transform duration-500 group-hover:scale-110"></div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Upcoming</h4>
                            <div className="flex items-center gap-6 p-6 bg-blue-50 rounded-[2rem] border border-blue-100 relative shadow-sm">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm">
                                    <span className="text-[9px] font-black text-blue-600 uppercase">Nov</span>
                                    <span className="text-lg font-black text-gray-900 leading-none">08</span>
                                </div>
                                <div>
                                    <h5 className="text-sm font-black text-gray-900 tracking-tight">Cardiology Review</h5>
                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">10:30 AM • Room 204</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PatientProfile;
