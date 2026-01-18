import Layout from '../components/Layout/Layout';
import { Search, Bell, Users, Clock, UserPlus, CheckCircle2, MoreVertical, Plus, Info, ChevronDown } from 'lucide-react';

const StatCardQueue = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between group transition-all hover:shadow-md">
        <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-gray-900">{value}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {change}
                </span>
            </div>
        </div>
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
    </div>
);

const DoctorCard = ({ name, specialty, room, waiting, activePatient }) => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${name}`} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h4 className="font-black text-gray-900 text-sm tracking-tight">{name}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {specialty} • Room {room}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                    {waiting} Waiting
                </span>
            </div>
        </div>

        <div className="p-6 flex-1 bg-white flex flex-col">
            {activePatient ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter border border-blue-100">
                            In Consultation
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div>
                        <h5 className="text-xl font-black text-gray-900 tracking-tight">{activePatient.name}</h5>
                        <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">ID: {activePatient.id}</p>
                    </div>
                    <div className="flex items-center gap-2 py-3 border-y border-gray-50">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-bold text-gray-600 tracking-tight">{activePatient.elapsed} elapsed</span>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-auto hover:underline underline-offset-4">Details</button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all py-10">
                    <div className="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-blue-50 transition-colors">
                        <Users className="w-8 h-8 text-gray-300 group-hover:text-blue-500" />
                    </div>
                    <p className="text-sm font-black text-gray-900 tracking-tight">Doctor is available</p>
                    <button className="mt-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-4">Call next patient</button>
                </div>
            )}

            {/* Next in Queue Peek */}
            <div className="mt-8 space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Next in Queue</p>
                <div className="space-y-2">
                    {[
                        { pos: '01', name: 'Pam Beesly', id: '#PT-9921', wait: '15m wait' },
                        { pos: '02', name: 'Dwight Schrute', id: '#PT-1029', wait: '45m wait', alert: true },
                        { pos: '03', name: 'Jim Halpert', id: '#PT-4521', wait: '5m wait' },
                    ].map((p, i) => (
                        <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${p.alert ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-50 hover:bg-blue-50 hover:border-blue-100'
                            }`}>
                            <span className="text-[10px] font-black text-gray-400 leading-none">{p.pos}</span>
                            <div className="flex-1">
                                <h6 className="text-xs font-bold text-gray-900 leading-none">{p.name}</h6>
                                <p className="text-[9px] text-gray-400 font-bold mt-1 tracking-wider uppercase">{p.id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {p.alert && <AlertCircle className="w-3 h-3 text-red-500" />}
                                <span className={`text-[9px] font-black uppercase tracking-tighter ${p.alert ? 'text-red-600' : 'text-orange-500'}`}>
                                    {p.wait}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Completed */}
            <div className="mt-8 pt-6 border-t border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Recently Completed</p>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-[10px] font-bold text-gray-600">Angela Martin</span>
                    <span className="text-[9px] text-gray-400 ml-auto uppercase font-bold">2m ago</span>
                </div>
            </div>
        </div>
    </div>
);

const QueueStatus = () => {
    return (
        <Layout title="Queue Management">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Queue Management</h2>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Live Updates</span>
                        </div>
                        <p className="text-gray-500 font-medium">Monday, Oct 24 • <span className="text-blue-600 font-black">09:42 AM</span></p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by patient or ID"
                                className="pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium text-sm w-[350px]"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                            <Plus className="w-5 h-5" />
                            New Check-in
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCardQueue title="Total Checked-in" value="42" change="+12%" trend="up" icon={Users} color="bg-blue-500" />
                    <StatCardQueue title="Avg. Wait Time" value="18m" change="+2m" trend="down" icon={Clock} color="bg-orange-500" />
                    <StatCardQueue title="Doctors on Duty" value="5" change="Active now" trend="up" icon={UserPlus} color="bg-purple-500" />
                    <StatCardQueue title="Completed" value="28" change="Today" trend="up" icon={CheckCircle2} color="bg-green-500" />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                    {['All Departments', 'General Medicine', 'Pediatrics', 'Cardiology'].map((dept, i) => (
                        <button key={i} className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:bg-gray-50'
                            }`}>
                            {dept}
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort by:</p>
                        <button className="flex items-center gap-2 text-xs font-bold text-gray-900 group">
                            Wait Time
                            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-y-0.5" />
                        </button>
                    </div>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <DoctorCard
                        name="Dr. Gregory House"
                        specialty="General Medicine"
                        room="101"
                        waiting={4}
                        activePatient={{ name: 'Michael Scott', id: '#PT-8832', elapsed: '12m' }}
                    />
                    <DoctorCard
                        name="Dr. Meredith Grey"
                        specialty="Pediatrics"
                        room="204"
                        waiting={2}
                    />
                    <DoctorCard
                        name="Dr. Cristina Yang"
                        specialty="Cardiology"
                        room="302"
                        waiting={1}
                        activePatient={{ name: 'Kevin Malone', id: '#PT-5561', elapsed: '28m' }}
                    />
                </div>
            </div>
        </Layout>
    );
};

const AlertCircle = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default QueueStatus;
