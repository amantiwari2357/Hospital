import Layout from '../components/Layout/Layout';
import {
    Search, Filter, ChevronDown, Download,
    Printer, CreditCard, Clock, AlertCircle,
    CheckCircle2, RefreshCcw, MoreVertical,
    ChevronLeft, ChevronRight, Calendar,
    Building2 as Building, Wallet2 as Wallet, DollarSign, XCircle,
    Shield
} from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-sm flex items-center justify-between group transition-all hover:bg-[#334155]/50">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{title}</p>
                {trend && <Icon className={`w-4 h-4 ${color}`} />}
            </div>
            <div className="flex items-end gap-3">
                <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {change}
                </span>
            </div>
        </div>
        <div className={`p-4 rounded-2xl bg-opacity-10 ${color.replace('text-', 'bg-')} group-hover:scale-110 transition-transform`}>
            {Icon && <Icon className={`w-6 h-6 ${color}`} />}
        </div>
    </div>
);

const PaymentLogs = () => {
    const logs = [
        { id: '#PYT-8821', date: 'Oct 24, 2023', time: '14:30', patient: 'Sarah Jenkins', invoice: '#INV-2023-001', mode: 'Visa â€¢â€¢â€¢â€¢ 4242', amount: '$450.00', status: 'Success' },
        { id: '#PYT-8820', date: 'Oct 24, 2023', time: '11:15', patient: 'Michael Chen', invoice: '#INV-2023-002', mode: 'Cash', amount: '$120.00', status: 'Pending' },
        { id: '#PYT-8819', date: 'Oct 23, 2023', time: '09:45', patient: 'Robert Fox', invoice: '#INV-2023-001', mode: 'Online Transfer', amount: '$1,250.00', status: 'Failed' },
        { id: '#PYT-8818', date: 'Oct 23, 2023', time: '09:12', patient: 'Eleanor Pena', invoice: '#INV-2023-003', mode: 'MasterCard â€¢â€¢â€¢â€¢ 9921', amount: '$450.00', status: 'Refunded' },
        { id: '#PYT-8817', date: 'Oct 22, 2023', time: '16:20', patient: 'Wade Warren', invoice: '#INV-2023-004', mode: 'Insurance', amount: '$3,200.00', status: 'Success' },
        { id: '#PYT-8816', date: 'Oct 22, 2023', time: '13:10', patient: 'Jenny Wilson', invoice: '#INV-2023-005', mode: 'Visa â€¢â€¢â€¢â€¢ 1122', amount: '$85.00', status: 'Success' },
    ];

    return (
        <Layout title="Payment Logs" dark={true}>
            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
                            <span>Finance</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gray-300">Payment Logs</span>
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tight leading-none">Payment Transaction Log</h2>
                        <p className="text-gray-500 font-medium">View and manage all processed transaction records.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-[#1e293b] border border-gray-800 text-gray-300 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#334155] transition-all">
                            <Download className="w-4 h-4" /> Export CSV
                        </button>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl shadow-white/5">
                            <Printer className="w-4 h-4" /> Print Log
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard title="Total Processed Today" value="$12,450.00" change="+12% from yesterday" trend="up" icon={Wallet} color="text-blue-400" />
                    <StatCard title="Pending Clearance" value="3" change="Requires attention" trend="up" icon={Clock} color="text-orange-400" />
                    <StatCard title="Refunded" value="$450.00" change="-2% rate" trend="down" icon={RefreshCcw} color="text-red-400" />
                    <StatCard title="Failed Transactions" value="1" change="System flagged" trend="up" icon={AlertCircle} color="text-red-500" />
                </div>

                {/* Filters */}
                <div className="bg-[#1e293b] p-10 rounded-[3rem] border border-gray-800 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-4 space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Search Transactions</label>
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by Payment ID, Name..."
                                    className="w-full bg-[#0f172a] border border-gray-800 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-gray-600"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Payment Mode</label>
                            <div className="relative">
                                <select className="w-full bg-[#0f172a] border border-gray-800 rounded-2xl py-4 px-6 text-sm font-medium text-gray-300 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all">
                                    <option>All Modes</option>
                                    <option>Visa</option>
                                    <option>Cash</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                            </div>
                        </div>
                        <div className="lg:col-span-2 space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</label>
                            <div className="relative">
                                <select className="w-full bg-[#0f172a] border border-gray-800 rounded-2xl py-4 px-6 text-sm font-medium text-gray-300 appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all">
                                    <option>All Statuses</option>
                                    <option>Success</option>
                                    <option>Failed</option>
                                </select>
                                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                            </div>
                        </div>
                        <div className="lg:col-span-3 space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Date Range</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full bg-[#0f172a] border border-gray-800 rounded-2xl py-4 px-6 text-sm font-medium text-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-1 flex items-end">
                            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Filter</button>
                        </div>
                    </div>
                </div>

                {/* Logs Table Card */}
                <div className="bg-[#1e293b] rounded-[3rem] border border-gray-800 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#0f172a]/50">
                                <tr className="border-b border-gray-800 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                                    <th className="px-8 py-6">Payment ID</th>
                                    <th className="px-6 py-6">Date & Time</th>
                                    <th className="px-6 py-6">Patient Name</th>
                                    <th className="px-6 py-6 font-black">Invoice Ref</th>
                                    <th className="px-6 py-6">Mode</th>
                                    <th className="px-6 py-6 font-black">Amount</th>
                                    <th className="px-6 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {logs.map((log, i) => (
                                    <tr key={i} className="group hover:bg-[#334155]/20 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-black text-blue-400 font-mono tracking-widest">{log.id}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-xs font-black text-gray-300 leading-none">{log.date}</p>
                                            <p className="text-[10px] font-bold text-gray-600 mt-1 uppercase tracking-tighter">{log.time}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-black text-gray-200">{log.patient}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-black text-gray-500 font-mono tracking-widest">{log.invoice}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#0f172a] rounded-lg border border-gray-800">
                                                    {log.mode.includes('Visa') ? <CreditCard className="w-3.5 h-3.5 text-blue-400" /> :
                                                        log.mode === 'Cash' ? <Wallet className="w-3.5 h-3.5 text-orange-400" /> :
                                                            log.mode === 'Insurance' ? <Shield className="w-3.5 h-3.5 text-purple-400" /> :
                                                                <Building className="w-3.5 h-3.5 text-green-400" />}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400">{log.mode}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-xs font-black text-white tracking-tight">{log.amount}</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                log.status === 'Pending' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                                    log.status === 'Failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-600 hover:text-blue-400 transition-colors"><EyeIcon className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-8 border-t border-gray-800 flex items-center justify-between text-[10px] font-black text-gray-500 bg-[#0f172a]/20">
                        <p>Showing 1 to 6 of 97 results</p>
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-3 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all font-black text-gray-400">Previous</button>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/10">1</button>
                                <button className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-all">2</button>
                                <button className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-all">3</button>
                                <span className="px-4 py-2 opacity-50">...</span>
                            </div>
                            <button className="px-6 py-3 border border-gray-800 rounded-xl hover:bg-gray-800 transition-all font-black text-gray-400">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export default PaymentLogs;
