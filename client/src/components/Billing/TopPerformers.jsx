import { Zap, Activity, Heart } from 'lucide-react';

const performers = [
    { name: 'Radiology', invoices: 324, revenue: '$85k', icon: Zap, color: 'bg-blue-100 text-blue-600' },
    { name: 'Neurology', invoices: 215, revenue: '$62k', icon: Activity, color: 'bg-purple-100 text-purple-600' },
    { name: 'Cardiology', invoices: 189, revenue: '$45k', icon: Heart, color: 'bg-red-100 text-red-600' },
];

const TopPerformers = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top Performers</h3>
            <div className="space-y-6">
                {performers.map((performer, index) => {
                    const Icon = performer.icon;
                    return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${performer.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{performer.name}</p>
                                    <p className="text-xs text-gray-500">{performer.invoices} Invoices</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">{performer.revenue}</span>
                        </div>
                    );
                })}
            </div>
            <button className="w-full mt-8 py-2 text-sm text-blue-600 font-semibold border-t border-gray-100 hover:text-blue-700 transition-colors">
                View Full Report
            </button>
        </div>
    );
};

export default TopPerformers;
