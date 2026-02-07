import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, change, icon: Icon, color = 'blue', status }) => {
    const isPositive = change > 0;

    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>

            <div className="flex items-start justify-between relative z-10">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {typeof value === 'number'
                            ? value.toLocaleString()
                            : value}
                    </h3>

                    {change !== undefined && change !== 0 && (
                        <div className="flex items-center gap-1.5">
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isPositive ? (
                                    <TrendingUp className="w-3 h-3" />
                                ) : (
                                    <TrendingDown className="w-3 h-3" />
                                )}
                                <span>{isPositive ? '+' : ''}{change}%</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">vs last month</span>
                        </div>
                    )}

                    {status && (
                        <div className="mt-2 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">{status}</span>
                        </div>
                    )}
                </div>

                {Icon && (
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform transition-all ${colorClasses[color]}`}
                    >
                        <Icon className="w-7 h-7" />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default StatsCard;
