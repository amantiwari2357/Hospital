import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    MessageSquare,
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle2,
    Clock,
    User,
    Phone,
    Mail,
    Tag,
    ChevronRight,
    AlertCircle,
    ArrowUpRight,
    Activity
} from 'lucide-react';

const Enquiries = () => {
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const enquiries = [
        { id: 'ENQ-001', name: 'Rahul Sharma', type: 'Clinical', subject: 'Inquiry about Cardiology Specialist', date: '10m ago', status: 'New', priority: 'High' },
        { id: 'ENQ-002', name: 'Ananya Iyer', type: 'Appointment', subject: 'Rescheduling Surgery Date', date: '45m ago', status: 'In-Progress', priority: 'Medium' },
        { id: 'ENQ-003', name: 'Zaid Khan', type: 'Billing', subject: 'Invoice Clarification for MED-77', date: '2h ago', status: 'Resolved', priority: 'Low' },
        { id: 'ENQ-004', name: 'John Doe', type: 'Ambulance', subject: 'SOS Response Feedback', date: '5h ago', status: 'New', priority: 'High' },
        { id: 'ENQ-005', name: 'Priya Verma', type: 'Pharmacy', subject: 'Availability of Medicine XYZ', date: '1d ago', status: 'Escalated', priority: 'Critical' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'In-Progress': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Resolved': return 'bg-green-50 text-green-600 border-green-100';
            case 'Escalated': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    return (
        <Layout title="Enquiry Center">
            <div className="flex flex-col gap-8 italic">
                {/* Header Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Enquiries', value: '1,240', icon: MessageSquare, color: 'blue' },
                        { label: 'Unresolved', value: '42', icon: AlertCircle, color: 'red' },
                        { label: 'Avg. Response', value: '4m 12s', icon: Clock, color: 'emerald' },
                        { label: 'Resolution Rate', value: '98.5%', icon: CheckCircle2, color: 'indigo' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Actions */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 w-full lg:w-auto">
                        <div className="relative w-full lg:w-96">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, ID or subject..."
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-gray-50 p-1.5 rounded-2xl">
                            {['All', 'New', 'Pending', 'Resolved'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setStatusFilter(tab)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10">
                        <Filter className="w-4 h-4" /> Advanced Export
                    </button>
                </div>

                {/* Enquiry List */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Enquirer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Subject / Category</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Priority</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {enquiries.map((enq) => (
                                <tr key={enq.id} className="hover:bg-blue-50/20 transition-all group">
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {enq.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 italic tracking-tight uppercase text-sm">{enq.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{enq.id} • {enq.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="max-w-xs">
                                            <p className="font-bold text-gray-800 text-sm mb-1 italic truncate">{enq.subject}</p>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md italic">{enq.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${enq.priority === 'High' || enq.priority === 'Critical' ? 'bg-red-500' :
                                                enq.priority === 'Medium' ? 'bg-orange-500' : 'bg-gray-400'
                                                }`} />
                                            <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">{enq.priority}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(enq.status)}`}>
                                            {enq.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex items-center gap-3">
                                            <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:bg-gray-100 transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Response Assistant */}
                <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Activity className="w-5 h-5" />
                            </div>
                            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">AI Response Agent</span>
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none">Automate Patient <span className="text-blue-500">Communications</span></h3>
                        <p className="text-slate-400 text-lg font-medium italic">Enable AI-driven initial response protocols to decrease wait times and improve enquirer satisfaction across all clinical channels.</p>
                    </div>
                    <button className="relative z-10 bg-white text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                        Configure Automation
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Enquiries;
