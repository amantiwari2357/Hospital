import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Oct 1', gross: 30000, net: 22000 },
    { name: 'Oct 5', gross: 55000, net: 45000 },
    { name: 'Oct 10', gross: 42000, net: 38000 },
    { name: 'Oct 15', gross: 85000, net: 70000 },
    { name: 'Oct 20', gross: 72000, net: 65000 },
    { name: 'Oct 25', gross: 92000, net: 82000 },
    { name: 'Oct 30', gross: 88000, net: 80000 },
];

const RevenueTrends = () => {
    return (
        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Revenue Trends</h3>
                    <p className="text-sm text-gray-400 mt-1">Last 30 Days</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Gross</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Net</span>
                    </div>
                </div>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 500 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '16px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="gross"
                            stroke="#3B82F6"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorGross)"
                        />
                        <Area
                            type="monotone"
                            dataKey="net"
                            stroke="#8B5CF6"
                            strokeWidth={4}
                            strokeDasharray="8 8"
                            fillOpacity={1}
                            fill="url(#colorNet)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueTrends;
