import { TrendingUp, TrendingDown, DollarSign, Calendar, FileText, Activity } from 'lucide-react';

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {change}
            </div>
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

const BillingStats = () => {
    const stats = [
        {
            title: 'Total Revenue (Monthly)',
            value: '$124,500',
            change: '12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Daily Revenue',
            value: '$12,450',
            change: '8.2%',
            trend: 'up',
            icon: Calendar,
            color: 'bg-blue-500'
        },
        {
            title: 'Pending Invoices',
            value: '45',
            change: '2.1%',
            trend: 'down',
            icon: FileText,
            color: 'bg-orange-500'
        },
        {
            title: 'Avg. Invoice Value',
            value: '$850',
            change: '1.5%',
            trend: 'up',
            icon: Activity,
            color: 'bg-purple-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default BillingStats;
