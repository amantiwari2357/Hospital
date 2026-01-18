import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Surgery', value: 35, color: '#F59E0B' },
    { name: 'Cardiology', value: 25, color: '#3B82F6' },
    { name: 'Neurology', value: 20, color: '#8B5CF6' },
    { name: 'Gen. Med', value: 20, color: '#10B981' },
];

const RevenueByDeptPie = () => {
    return (
        <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-800 shadow-2xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-white tracking-tight mb-8">Revenue by Dept</h3>
            <div className="flex-1 relative min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Top Dept</p>
                    <p className="text-2xl font-black text-white">Surgery</p>
                    <p className="text-sm font-bold text-orange-400">35%</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs font-bold text-gray-400">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RevenueByDeptPie;
