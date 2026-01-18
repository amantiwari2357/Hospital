import Layout from '../components/Layout/Layout';
import RevenueTrends from '../components/Reports/RevenueTrends';
import RevenueByDeptPie from '../components/Reports/RevenueByDeptPie';
import { Download, Calendar, Filter, ChevronDown, Search, ArrowUpRight, ArrowDownRight, Clock, DollarSign } from 'lucide-react';

const StatCardDark = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Icon className="w-20 h-20 text-white" />
        </div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-white mb-4">{value}</h3>
            <div className={`flex items-center gap-1.5 text-sm font-bold ${trend === 'up' ? 'text-green-400' : 'text-orange-400'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {change}
                <span className="text-gray-500 ml-1 font-medium italic lowercase">vs last month</span>
            </div>
        </div>
    </div>
);

const FinancialReports = () => {
    return (
        <div className="min-h-screen bg-[#0f172a]">
            <Layout title="Financial Analytics" dark={true}>
                <div className="max-w-7xl mx-auto space-y-10 py-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                        <div>
                            <h2 className="text-5xl font-black text-white tracking-tighter">Financial Revenue Reports</h2>
                            <p className="text-gray-400 mt-3 text-lg font-medium leading-relaxed max-w-2xl">
                                Overview of daily revenue, monthly trends, and department performance.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="bg-[#1e293b] p-1.5 rounded-2xl flex border border-gray-800">
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-bold shadow-lg transition-all border border-gray-700">
                                    <Calendar className="w-4 h-4" />
                                    Oct 1, 2023 - Oct 31, 2023
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 text-gray-400 hover:text-white rounded-xl text-sm font-bold transition-all">
                                    All Departments
                                    <ChevronDown className="w-4 h-4 opacity-50" />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                                <Download className="w-5 h-5" />
                                Download Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCardDark title="Total Revenue" value="$1,240,500" change="+12.5%" trend="up" icon={DollarSign} color="bg-blue-600" />
                        <StatCardDark title="Avg Daily Revenue" value="$41,350" change="+2.1%" trend="up" icon={ArrowUpRight} color="bg-cyan-600" />
                        <StatCardDark title="Outstanding Invoices" value="$45,200" change="24 Pending" trend="down" icon={Clock} color="bg-orange-600" />
                        <StatCardDark title="Net Profit" value="$320,150" change="+8.4%" trend="up" icon={Filter} color="bg-purple-600" />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2">
                            <RevenueTrends />
                        </div>
                        <div>
                            <RevenueByDeptPie />
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default FinancialReports;
