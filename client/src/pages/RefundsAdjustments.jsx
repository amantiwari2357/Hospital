import Layout from '../components/Layout/Layout';
import {
    Search, Filter, ChevronDown, Download,
    ChevronLeft, ChevronRight, MoreVertical,
    Plus, DollarSign, Clock, RefreshCw,
    AlertTriangle, CheckCircle, FileText,
    XCircle, Calendar, Settings
} from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color, subtext }) => (
    <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-sm flex flex-col gap-6 group hover:bg-[#334155]/50 transition-all">
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {change}
            </div>
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
            <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
            {subtext && <p className="text-[10px] font-bold text-gray-500 mt-2">{subtext}</p>}
        </div>
    </div>
);

const RefundsAdjustments = () => {
    const list = [
        { id: '#TRX-8821', patient: 'Johnathan Doe', pid: 'PID-4022', date: 'Oct 24, 2023', reason: 'Medication Error', amount: '$4,500.00', adj: '$4,200.00', status: 'Admin Approval' },
        { id: '#TRX-8819', patient: 'Sarah Smith', pid: 'PID-3901', date: 'Oct 23, 2023', reason: 'Insurance Update', amount: '$1,200.00', adj: '$0.00', status: 'Processed' },
        { id: '#TRX-8755', patient: 'Michael Chang', pid: 'PID-4110', date: 'Oct 22, 2023', reason: 'Service Dispute', amount: '$350.00', adj: '$350.00', status: 'Rejected' },
        { id: '#TRX-8902', patient: 'Emily Blunt', pid: 'PID-5021', date: 'Oct 24, 2023', reason: 'Double Charge', amount: '$800.00', adj: '$400.00', status: 'Pending Review' },
        { id: '#TRX-8640', patient: 'Robert Fox', pid: 'PID-2291', date: 'Oct 20, 2023', reason: 'Senior Discount Applied', amount: '$2,500.00', adj: '$2,250.00', status: 'Processed' },
    ];

    return (
        <Layout title="Refunds & Adjustments" dark={true}>
            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
                            <span>Home</span>
                            <ChevronRight className="w-3 h-3 text-gray-700" />
                            <span>Finance</span>
                            <ChevronRight className="w-3 h-3 text-gray-700" />
                            <span className="text-gray-300">Refunds & Adjustments</span>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight leading-none mb-3">Refunds & Adjustments</h2>
                        <p className="text-gray-500 font-medium max-w-2xl">Manage financial corrections, refund requests, and view detailed audit trails for patient billing.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-[#1e293b] border border-gray-800 text-gray-300 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#334155] transition-all">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                        <button className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                            <Plus className="w-5 h-5" /> New Adjustment
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard title="Total Pending Refunds" value="$12,450.00" change="+2.5%" trend="up" icon={RefreshCw} color="bg-orange-600" />
                    <StatCard title="Adjusted (This Month)" value="$45,200.00" change="+5.0%" trend="up" icon={Calendar} color="bg-blue-600" />
                    <StatCard title="Rejected Requests" value="3" change="-10%" trend="down" icon={XCircle} color="bg-red-600" />
                    <StatCard title="Avg Processing Time" value="1.2 Days" subtext="Same as last week" trend="up" icon={Clock} color="bg-purple-600" />
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search Patient Name or Transaction ID"
                            className="w-full bg-[#1e293b] border border-gray-800 rounded-3xl py-5 pl-16 pr-6 text-sm font-medium text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-gray-600"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select className="bg-[#1e293b] border border-gray-800 rounded-3xl py-5 px-10 text-sm font-black text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer w-48">
                                <option>Department</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select className="bg-[#1e293b] border border-gray-800 rounded-3xl py-5 px-10 text-sm font-black text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer w-48">
                                <option>Status</option>
                            </select>
                            <Filter className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#1e293b] rounded-[3rem] border border-gray-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0f172a]/50">
                                <tr className="border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                    <th className="px-8 py-6">Transaction ID</th>
                                    <th className="px-6 py-6">Patient Name</th>
                                    <th className="px-6 py-6">Date</th>
                                    <th className="px-6 py-6">Reason</th>
                                    <th className="px-6 py-6 text-center">Original Amt.</th>
                                    <th className="px-6 py-6 text-center font-black">Adj. Amount</th>
                                    <th className="px-6 py-6 text-center">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {list.map((item, i) => (
                                    <tr key={i} className="group hover:bg-[#334155]/20 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-gray-500 font-mono tracking-widest">{item.id}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div>
                                                <p className="text-xs font-black text-white leading-tight">{item.patient}</p>
                                                <p className="text-[9px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">{item.pid}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xs font-bold text-gray-400">{item.date}</td>
                                        <td className="px-6 py-6">
                                            <span className="text-[11px] font-medium text-gray-300">{item.reason}</span>
                                        </td>
                                        <td className="px-6 py-6 text-center font-mono text-xs text-gray-500">{item.amount}</td>
                                        <td className="px-6 py-6 text-center font-mono text-xs font-black text-white">{item.adj}</td>
                                        <td className="px-6 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${item.status === 'Admin Approval' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                    item.status === 'Processed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        item.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                                }`}>
                                                <div className={`w-1 h-1 rounded-full ${item.status === 'Admin Approval' ? 'bg-blue-400' :
                                                        item.status === 'Processed' ? 'bg-green-400' :
                                                            item.status === 'Rejected' ? 'bg-red-400' : 'bg-orange-400'
                                                    }`}></div>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-700 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 border-t border-gray-800 flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-900/20">
                        <p>Showing 1-5 of 128 items</p>
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-3 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-all">Previous</button>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg">1</button>
                                <button className="w-10 h-10 rounded-xl bg-[#1e293b] text-gray-500 hover:text-white transition-all">2</button>
                                <button className="w-10 h-10 rounded-xl bg-[#1e293b] text-gray-500 hover:text-white transition-all">3</button>
                            </div>
                            <button className="px-6 py-3 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-all">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RefundsAdjustments;
