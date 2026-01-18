import Layout from '../components/Layout/Layout';
import { Search, Filter, Download, Plus, MoreVertical, Eye, Edit, Send, Calendar, Clock, DollarSign, ChevronDown } from 'lucide-react';

const invoices = [
    { id: 'INV-2023-001', patient: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=1', service: 'MRI Scan', amount: '$450.00', date: 'Oct 24, 2023', status: 'Paid' },
    { id: 'INV-2023-002', patient: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=2', service: 'General Checkup', amount: '$120.00', date: 'Oct 25, 2023', status: 'Unpaid' },
    { id: 'INV-2023-003', patient: 'Robert Fox', avatar: 'https://i.pravatar.cc/150?u=3', service: 'Physical Therapy', amount: '$300.00', date: 'Oct 26, 2023', status: 'Partial' },
    { id: 'INV-2023-004', patient: 'Leslie Alexander', avatar: 'https://i.pravatar.cc/150?u=4', service: 'Blood Test Panel', amount: '$85.00', date: 'Oct 27, 2023', status: 'Paid' },
    { id: 'INV-2023-005', patient: 'Guy Hawkins', avatar: 'https://i.pravatar.cc/150?u=5', service: 'X-Ray (Chest)', amount: '$150.00', date: 'Oct 28, 2023', status: 'Unpaid' },
];

const getStatusStyle = (status) => {
    switch (status) {
        case 'Paid': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'Unpaid': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        case 'Partial': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
};

const Invoices = () => {
    return (
        <div className="min-h-screen bg-[#0f172a]">
            <Layout title="Invoice Directory" dark={true}>
                <div className="max-w-7xl mx-auto space-y-8 py-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight">Invoice Directory</h2>
                            <p className="text-gray-400 mt-2 font-medium">Manage and track all patient billing and payment statuses.</p>
                        </div>
                        <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 self-start lg:self-center">
                            <Plus className="w-5 h-5" />
                            Create New Invoice
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-xl flex items-center justify-between group">
                            <div>
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Total Outstanding</p>
                                <h3 className="text-4xl font-black text-white">$45,230.00</h3>
                                <p className="text-[10px] font-bold text-green-400 mt-2">↑ 2.5% <span className="text-gray-500 lowercase italic ml-1">vs last month</span></p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                                <DollarSign className="w-8 h-8 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-xl flex items-center justify-between group">
                            <div>
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Collected Today</p>
                                <h3 className="text-4xl font-black text-white">$12,450.00</h3>
                                <p className="text-[10px] font-bold text-green-400 mt-2">↑ 12% <span className="text-gray-500 lowercase italic ml-1">from yesterday</span></p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                                <Calendar className="w-8 h-8 text-cyan-500" />
                            </div>
                        </div>
                        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-xl flex items-center justify-between group">
                            <div>
                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Overdue Invoices</p>
                                <h3 className="text-4xl font-black text-white">8</h3>
                                <p className="text-[10px] font-bold text-orange-400 mt-2">↓ 1% <span className="text-gray-500 lowercase italic ml-1">last 7 days</span></p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                                <Clock className="w-8 h-8 text-orange-500" />
                            </div>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-[#1e293b] p-4 rounded-2xl border border-gray-800 flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 min-w-[300px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by Invoice ID, Patient Name..."
                                className="w-full bg-[#0f172a] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                                <Calendar className="w-4 h-4" />
                                10/01/2023 - 10/31/2023
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                                All Statuses
                                <ChevronDown className="w-4 h-4 opacity-50" />
                            </button>
                            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                                Payment Mode
                                <ChevronDown className="w-4 h-4 opacity-50" />
                            </button>
                            <button className="p-3 bg-[#0f172a] border border-gray-700 rounded-xl text-gray-400 hover:text-white transition-all">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-[#1e293b] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-[#0f172a]/50 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-800">
                                <tr>
                                    <th className="px-8 py-5">Invoice ID</th>
                                    <th className="px-8 py-5">Patient Name</th>
                                    <th className="px-8 py-5">Service</th>
                                    <th className="px-8 py-5">Amount</th>
                                    <th className="px-8 py-5">Due Date</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-blue-600/5 transition-colors group">
                                        <td className="px-8 py-6 text-sm font-black text-blue-400">{inv.id}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <img src={inv.avatar} className="w-10 h-10 rounded-xl object-cover border border-gray-700" alt="" />
                                                <span className="text-sm font-bold text-white tracking-tight">{inv.patient}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-300 font-medium">{inv.service}</td>
                                        <td className="px-8 py-6 text-sm font-black text-white">{inv.amount}</td>
                                        <td className="px-8 py-6 text-sm text-gray-400 font-medium">{inv.date}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"><Send className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="p-8 border-t border-gray-800 flex justify-between items-center">
                            <p className="text-xs font-bold text-gray-500">Showing <span className="text-white">1 to 5</span> of <span className="text-white">128</span> results</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-xs font-black text-gray-500 hover:text-white disabled:opacity-30" disabled>Previous</button>
                                <div className="flex gap-1">
                                    {[1, 2, 3, '...', 24].map((n, i) => (
                                        <button key={i} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${n === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-gray-500 hover:text-white hover:bg-gray-800'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-xs font-black text-gray-500 hover:text-white">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Invoices;
