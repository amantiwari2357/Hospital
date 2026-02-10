import Layout from '../components/Layout/Layout';
import {
    Search, Bell, MessageSquare, Calendar,
    UserPlus, CheckCircle, Clock, Users,
    MoreVertical, ChevronRight, AlertCircle,
    Phone, Plus, ShieldCheck, UserCheck,
    Activity, TrendingUp, TrendingDown
} from 'lucide-react';

const StatCard = ({ title, value, subtext, change, trend, icon: Icon, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {change}
            </div>
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
            <h3 className="text-4xl font-black text-gray-900 tracking-tight">{value}</h3>
            <p className="text-[10px] font-bold text-gray-400 mt-2">{subtext}</p>
        </div>
    </div>
);

const DoctorCard = ({ name, specialty, status, img, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center gap-4 hover:border-blue-100 transition-all group">
        <div className="relative">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                <img src={img} className="w-full h-full object-cover" alt={name} />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${status === 'Available' ? 'bg-green-500' :
                    status.includes('Surgery') ? 'bg-red-500' :
                        status === 'Busy' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-black text-gray-900 tracking-tight">{name}</h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{specialty}</p>
            <div className="mt-2 flex">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${status === 'Available' ? 'bg-green-50 text-green-600' :
                        status.includes('Surgery') ? 'bg-red-50 text-red-600' :
                            status === 'Busy' ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    </div>
);

const ReceptionConsole = () => {
    return (
        <Layout title="Reception Console">
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Main Dashboard */}
                <div className="lg:col-span-9 space-y-12 pb-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">Good Morning, Sarah</h2>
                            <p className="text-gray-500 font-medium italic">Here's the hospital status overview for today, October 24.</p>
                        </div>
                        <div className="p-4 bg-white border border-gray-100 rounded-[2rem] shadow-sm flex items-center gap-6 pr-10 border-l-[6px] border-l-blue-600">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Current Shift</p>
                                <p className="text-md font-black text-gray-900 tracking-tight">08:00 - 16:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatCard title="Today's Appointments" value="42" subtext="12 pending confirmation" change="12%" trend="up" icon={Calendar} color="bg-blue-500" />
                        <StatCard title="Walk-in Count" value="8" subtext="Since 8:00 AM" change="5%" trend="up" icon={Users} color="bg-purple-500" />
                        <StatCard title="Avg Queue Wait" value="14 min" subtext="Optimal level" change="-8%" trend="down" icon={Clock} color="bg-orange-500" />
                    </div>

                    {/* Doctor Availability */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Doctor Availability Snapshot</h3>
                            <button className="text-xs font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest hover:underline">
                                View Full Roster <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <DoctorCard name="Dr. James S." specialty="Cardiology" status="Available" img="https://i.pravatar.cc/150?u=doc1" />
                            <DoctorCard name="Dr. Emily J." specialty="Pediatrics" status="In Surgery (until 2pm)" img="https://i.pravatar.cc/150?u=doc2" />
                            <DoctorCard name="Dr. Alan Ray" specialty="General Practice" status="Busy with patient" img="https://i.pravatar.cc/150?u=doc3" />
                            <DoctorCard name="Dr. Sarah Lee" specialty="Neurology" status="Off Duty" img="https://i.pravatar.cc/150?u=doc4" />
                            <DoctorCard name="Dr. P. Patel" specialty="Orthopedics" status="Available" img="https://i.pravatar.cc/150?u=doc5" />
                            <DoctorCard name="Dr. Lisa Wong" specialty="Dermatology" status="Busy with patient" img="https://i.pravatar.cc/150?u=doc6" />
                        </div>
                    </div>

                    {/* Live Alerts */}
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                Live Alerts & Updates
                            </h3>
                            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Clear All</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {[
                                { type: 'delay', label: 'Schedule Delay: Dr. Emily Jones', note: 'Running 15 minutes late due to emergency surgery extension.', time: '2 mins ago', icon: Clock, color: 'text-red-500 bg-red-50' },
                                { type: 'cancel', label: 'Cancellation: Appt #4022', note: 'Patient John Doe cancelled via mobile app.', time: '10 mins ago', icon: ShieldCheck, color: 'text-orange-500 bg-orange-50' },
                                { type: 'update', label: 'System Update', note: 'Billing module maintenance scheduled for 10:00 PM tonight.', time: '1h ago', icon: Activity, color: 'text-blue-500 bg-blue-50' },
                            ].map((alert, i) => (
                                <div key={i} className="p-8 flex items-start gap-6 hover:bg-gray-50/50 transition-all cursor-pointer group">
                                    <div className={`p-4 rounded-2xl ${alert.color} transition-transform group-hover:scale-110`}>
                                        <alert.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-black text-gray-900 tracking-tight">{alert.label}</h4>
                                        <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">{alert.note}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Quick Actions & Sidebar */}
                <div className="lg:col-span-3 space-y-8 sticky top-24">
                    <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-10">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-6 flex items-center gap-3">
                            <Activity className="w-4 h-4 text-blue-500" /> Quick Actions
                        </h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Register Patient', sub: 'New admission', icon: UserPlus, color: 'bg-blue-600 text-white shadow-blue-600/20' },
                                { label: 'Book Appointment', sub: 'Schedule visit', icon: Calendar, color: 'bg-white border-gray-100 text-gray-700' },
                                { label: 'Check-in Patient', sub: 'Arrival confirm', icon: UserCheck, color: 'bg-white border-gray-100 text-gray-700' },
                            ].map((action, i) => (
                                <button key={i} className={`w-full p-6 ${action.color} border rounded-[2rem] flex items-center gap-5 group transition-all hover:shadow-lg ${i === 0 ? 'shadow-xl' : 'hover:border-blue-200 shadow-sm'}`}>
                                    <div className={`p-3 rounded-2xl ${i === 0 ? 'bg-white/20' : 'bg-blue-50 text-blue-600'} group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black tracking-tight leading-tight">{action.label}</p>
                                        <p className={`text-[10px] font-bold mt-1 ${i === 0 ? 'text-white/70' : 'text-gray-400'}`}>{action.sub}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* On Call Duty */}
                    <div className="bg-blue-50/50 p-8 rounded-[3rem] border border-blue-100 space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">On Call Duty</h4>
                        <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] shadow-sm relative z-10">
                            <img src="https://i.pravatar.cc/150?u=doc1" className="w-12 h-12 rounded-xl object-cover" alt="" />
                            <div className="flex-1">
                                <h5 className="text-xs font-black text-gray-900 leading-tight">Dr. James Smith</h5>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Emergency Dept</p>
                            </div>
                            <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                <Phone className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ReceptionConsole;
