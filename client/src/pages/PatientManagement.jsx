import Layout from '../components/Layout/Layout';
import {
    Users, UserPlus, Home, Search, Bell, Mail,
    MoreVertical, ChevronRight, ChevronLeft, Filter,
    Download, Activity, AlertCircle, TrendingUp
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between group transition-all hover:shadow-md">
        <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">{value}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {change}
                </span>
            </div>
        </div>
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
    </div>
);

const PatientManagement = () => {
    const patients = [
        { name: 'Sarah Jenkins', id: '#MED-99281', age: '45', gender: 'F', status: 'Emergency', dept: 'Cardiology', doctor: 'Dr. A. Smith', initial: 'AS', date: 'Oct 24, 2023', img: 'https://i.pravatar.cc/150?u=sarah' },
        { name: 'Michael Chen', id: '#MED-99245', age: '32', gender: 'M', status: 'IPD', dept: 'Neurology', doctor: 'Dr. J. Wong', initial: 'JW', date: 'Oct 22, 2023', img: 'https://i.pravatar.cc/150?u=michael' },
        { name: 'Emily Davis', id: '#MED-99212', age: '28', gender: 'F', status: 'OPD', dept: 'General Medicine', doctor: 'Dr. B. Roberts', initial: 'BR', date: 'Today', img: 'https://i.pravatar.cc/150?u=emily' },
        { name: 'James Doe', id: '#MED-99188', age: '55', gender: 'M', status: 'IPD', dept: 'Orthopedics', doctor: 'Dr. M. Khan', initial: 'MK', date: 'Oct 20, 2023', initial_box: 'JD' },
        { name: 'Linda Taylor', id: '#MED-99056', age: '41', gender: 'F', status: 'OPD', dept: 'Dermatology', doctor: 'Dr. S. Lee', initial: 'SL', date: 'Today', img: 'https://i.pravatar.cc/150?u=linda' },
    ];

    return (
        <Layout title="Patient Overview">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Breadcrumbs & Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 items-center">
                            <Home className="w-3 h-3" />
                            <ChevronRight className="w-3 h-3" />
                            <span>Patient Overview</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Patient Overview</h2>
                        <p className="text-sm font-medium text-gray-500 mt-1">Manage and view patient records</p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                        <UserPlus className="w-5 h-5" />
                        Add New Patient
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard title="Total Patients" value="1,248" change="+2.4%" icon={Users} color="bg-blue-500" />
                    <StatCard title="Admitted (IPD)" value="342" change="+1.1%" icon={Home} color="bg-blue-500" />
                    <StatCard title="OPD Today" value="156" change="↘ 0.5%" icon={Activity} color="bg-orange-500" />
                    <StatCard title="Emergency" value="12" change="+5.0%" icon={AlertCircle} color="bg-red-500" />
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                    {/* Filters Bar */}
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/20">
                        <div className="flex items-center gap-4">
                            <select className="bg-white border border-gray-100 rounded-2xl px-6 py-3 text-xs font-black text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer">
                                <option>All Departments</option>
                            </select>
                            <select className="bg-white border border-gray-100 rounded-2xl px-6 py-3 text-xs font-black text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer">
                                <option>All Status</option>
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Select date range"
                                    className="bg-white border border-gray-100 rounded-2xl px-12 py-3 text-xs font-black text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all w-[240px]"
                                />
                                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Filter className="w-5 h-5" /></button>
                            <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Download className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/10">
                                    <th className="px-8 py-6 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                                    <th className="px-6 py-6 font-black">Patient Name</th>
                                    <th className="px-6 py-6 font-black">Medical ID</th>
                                    <th className="px-6 py-6 font-black text-center">Status</th>
                                    <th className="px-6 py-6 font-black">Department</th>
                                    <th className="px-6 py-6 font-black">Doctor Assigned</th>
                                    <th className="px-6 py-6 font-black">Date</th>
                                    <th className="px-8 py-6 text-right font-black">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {patients.map((p, i) => (
                                    <tr key={i} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                                        <td className="px-8 py-5"><input type="checkbox" className="rounded border-gray-300" /></td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                {p.img ? (
                                                    <img src={p.img} className="w-10 h-10 rounded-2xl object-cover shadow-sm border-2 border-white" alt="" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px] uppercase">{p.initial_box}</div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 leading-tight">{p.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Age: {p.age} • {p.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] font-black text-gray-500 font-mono tracking-widest opacity-60">{p.id}</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'Emergency' ? 'bg-red-50 text-red-500 border border-red-100' :
                                                    p.status === 'IPD' ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                                                        'bg-gray-50 text-gray-500 border border-gray-100'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-bold text-gray-600">{p.dept}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-[8px] font-black text-blue-600 uppercase">{p.initial}</div>
                                                <span className="text-xs font-black text-gray-700">{p.doctor}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-bold text-gray-500">{p.date}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="text-xs font-black text-blue-600 hover:underline underline-offset-4 tracking-tighter">View Profile</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-8 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-500 bg-gray-50/10">
                        <p>Showing 1-5 of 1,248</p>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4">
                                <span>Rows per page:</span>
                                <div className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-gray-900">10</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-gray-100 rounded-xl hover:bg-white transition-all disabled:opacity-30" disabled><ChevronLeft className="w-4 h-4" /></button>
                                <div className="flex gap-1">
                                    <button className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black">1</button>
                                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-all">2</button>
                                    <button className="w-8 h-8 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-all">3</button>
                                    <span className="px-2">...</span>
                                </div>
                                <button className="p-2 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 transition-all"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export default PatientManagement;
