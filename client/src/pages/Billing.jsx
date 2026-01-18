import Layout from '../components/Layout/Layout';
import BillingStats from '../components/Billing/BillingStats';
import RevenueByDepartment from '../components/Billing/RevenueByDepartment';
import TopPerformers from '../components/Billing/TopPerformers';
import RecentInvoices from '../components/Billing/RecentInvoices';
import { Calendar, Download } from 'lucide-react';

const Billing = () => {
    return (
        <Layout title="Billing Overview">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Financial Dashboard</h2>
                        <p className="text-gray-500 mt-1">Track revenue streams, pending payments, and departmental performance.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <Calendar className="w-4 h-4" />
                            Oct 2023
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <BillingStats />

                {/* Charts & Performers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <RevenueByDepartment />
                    </div>
                    <div>
                        <TopPerformers />
                    </div>
                </div>

                {/* Recent Invoices Table */}
                <RecentInvoices />
            </div>
        </Layout>
    );
};

export default Billing;
