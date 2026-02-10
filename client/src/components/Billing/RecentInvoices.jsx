import { Search, Filter, MoreVertical, Download } from 'lucide-react';

const invoices = [
    {
        id: '#INV-2023-001',
        patient: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?u=john',
        department: 'Cardiology',
        date: 'Oct 24, 2023',
        amount: '$500.00',
        status: 'Paid'
    },
    {
        id: '#INV-2023-002',
        patient: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?u=jane',
        department: 'Pediatrics',
        date: 'Oct 23, 2023',
        amount: '$1,200.00',
        status: 'Pending'
    },
    {
        id: '#INV-2023-003',
        patient: 'Robert Brown',
        avatar: 'https://i.pravatar.cc/150?u=robert',
        department: 'Neurology',
        date: 'Oct 22, 2023',
        amount: '$890.00',
        status: 'Overdue'
    },
    {
        id: '#INV-2023-004',
        patient: 'Emily Davis',
        avatar: 'https://i.pravatar.cc/150?u=emily',
        department: 'Radiology',
        date: 'Oct 21, 2023',
        amount: '$2,150.00',
        status: 'Paid'
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Paid': return 'bg-green-100 text-green-700';
        case 'Pending': return 'bg-yellow-100 text-yellow-700';
        case 'Overdue': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

const RecentInvoices = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-md-center gap-4">
                    <h3 className="text-lg font-bold text-gray-900">Recent Invoices</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by patient or ID"
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-64"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Invoice ID</th>
                            <th className="px-6 py-4">Patient Name</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invoices.map((invoice, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-blue-600">{invoice.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={invoice.avatar} alt="" className="w-8 h-8 rounded-full border border-gray-200" />
                                        <span className="text-sm font-semibold text-gray-900">{invoice.patient}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{invoice.department}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{invoice.date}</td>
                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{invoice.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                <span>Showing 1 to 4 of 12 results</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Previous</button>
                    <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
};

export default RecentInvoices;
