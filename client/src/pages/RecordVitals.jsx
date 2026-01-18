import Layout from '../components/Layout/Layout';
import {
    Activity, Heart, Thermometer, User,
    Clock, AlertCircle, CheckCircle2,
    Save, Plus, Bell, MoreVertical,
    ChevronDown, Droplet, Wind
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const data = [
    { time: '00:00', bp_sys: 115, bp_dia: 75, pulse: 68, spo2: 98 },
    { time: '04:00', bp_sys: 118, bp_dia: 78, pulse: 70, spo2: 97 },
    { time: '08:00', bp_sys: 120, bp_dia: 80, pulse: 72, spo2: 98 },
    { time: '12:00', bp_sys: 112, bp_dia: 72, pulse: 65, spo2: 99 },
    { time: '16:00', bp_sys: 125, bp_dia: 82, pulse: 75, spo2: 96 },
    { time: '20:00', bp_sys: 118, bp_dia: 79, pulse: 105, spo2: 98 },
    { time: 'Now', bp_sys: 116, bp_dia: 77, pulse: 71, spo2: 97 },
];

const VitalInput = ({ label, value, unit, prev, status, icon: Icon, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 group hover:shadow-md transition-all relative overflow-hidden">
        <div className="flex justify-between items-start">
            <div className={`p-4 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-${color.split('-')[1]}-50 group-hover:text-${color.split('-')[1]}-500 transition-all`}>
                <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Prev:</p>
                <p className="text-sm font-black text-gray-300 font-mono italic">{prev}</p>
            </div>
        </div>
        <div className="flex items-end gap-3 px-2">
            <input type="text" defaultValue={value} className="text-5xl font-black text-gray-900 w-32 bg-transparent border-b-2 border-transparent focus:border-blue-500 focus:outline-none transition-all tracking-tighter" />
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest pb-3">{unit}</span>
        </div>
        {status && (
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${status === 'High' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
        )}
        {status === 'High' && (
            <div className="flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-widest px-2">
                <AlertCircle className="w-3 h-3" /> High
            </div>
        )}
    </div>
);

const RecordVitals = () => {
    return (
        <Layout title="Patient Vitals">
            <div className="max-w-[1700px] mx-auto space-y-10 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl shadow-sm border border-blue-100 italic">SJ</div>
                        <div>
                            <div className="flex items-center gap-4 mb-1">
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Patient: Sarah Jenkins</h2>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">ID: #49220</span>
                            </div>
                            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">Bed: 402-A</span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg">Admitted: Oct 24</span>
                                <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-lg border border-green-100">Status: Stable</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                            <Bell className="w-4 h-4 text-orange-500" /> Notifications
                        </button>
                        <button className="flex items-center gap-3 px-10 py-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-red-500/10">
                            <Activity className="w-5 h-5" /> Code Blue
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Vital Inputs */}
                        <div className="bg-gray-50/50 p-10 rounded-[3.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10 relative z-10">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-blue-600" /> Record Vitals
                                </h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm">Today, 02:27 AM</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                                <VitalInput label="Temperature" value="98.6" unit="°F" prev="98.4°F" icon={Thermometer} color="bg-orange-500" />
                                <VitalInput label="Blood Pressure" value="120/80" unit="mmHg" prev="118/79" icon={Droplet} color="bg-blue-500" />
                                <VitalInput label="Pulse Rate" value="105" unit="bpm" prev="72 bpm" status="High" icon={Heart} color="bg-red-500" />
                                <VitalInput label="SpO2" value="98" unit="%" prev="99%" icon={Wind} color="bg-purple-500" />
                            </div>

                            <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-gray-100 pt-10 relative z-10">
                                <button className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                                    <Plus className="w-4 h-4" /> Add Observation Note
                                </button>
                                <div className="flex gap-4 w-full md:w-auto">
                                    <button className="flex-1 md:w-48 py-5 bg-red-50 text-red-600 rounded-[2rem] text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all">Alert Doctor</button>
                                    <button className="flex-1 md:w-48 py-5 bg-blue-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                        <Save className="w-4 h-4" /> Save Vitals
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Trends Chart */}
                        <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-10 relative overflow-hidden">
                            <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-3xl">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3 px-4">
                                    <TrendingUpIcon className="w-6 h-6 text-blue-600" /> 24-Hour Trends
                                </h3>
                                <div className="flex gap-2">
                                    {['All', 'BP', 'Temp', 'Pulse'].map((btn, i) => (
                                        <button key={i} className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-400 hover:text-gray-600'}`}>{btn}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[400px] w-full pt-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'black', fontSize: '10px' }}
                                        />
                                        <Area type="monotone" dataKey="bp_sys" name="BP (Sys)" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSys)" />
                                        <Area type="monotone" dataKey="pulse" name="Pulse" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorPulse)" />
                                        <Line type="monotone" dataKey="spo2" name="SpO2" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex justify-center gap-12 text-[9px] font-black uppercase tracking-widest text-gray-400">
                                <span className="flex items-center gap-3"><div className="w-3 h-1 bg-blue-600 rounded-full"></div> BP (Sys)</span>
                                <span className="flex items-center gap-3"><div className="w-3 h-1 bg-blue-300 rounded-full"></div> BP (Dia)</span>
                                <span className="flex items-center gap-3"><div className="w-3 h-1 bg-red-500 rounded-full"></div> Pulse</span>
                                <span className="flex items-center gap-3"><div className="w-3 h-1 bg-green-500 rounded-full"></div> SpO2</span>
                            </div>
                        </div>
                    </div>

                    {/* History Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-10">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <HistoryIcon className="w-6 h-6 text-blue-600" /> History Log
                            </h3>

                            <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-50">
                                {[
                                    { time: 'Today, 08:00 AM', bp: '120/80', pulse: '72', spo2: '98', temp: '98.6', user: 'RN. J. Doe', latest: true },
                                    { time: 'Today, 04:00 AM', bp: '118/78', pulse: '74', spo2: '97', temp: '99.1', user: 'RN. M. Smith' },
                                    { time: 'Yesterday, 11:00 PM', bp: '122/82', pulse: '70', spo2: '99', temp: '98.4', user: 'RN. J. Doe' },
                                    { time: 'Yesterday, 07:00 PM', bp: '145/95', pulse: '82', spo2: '98', temp: '98.8', user: 'Dr. K. Patel', high: true },
                                ].map((log, i) => (
                                    <div key={i} className="relative pl-12 group">
                                        <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center border-4 border-white shadow-sm transition-all group-hover:scale-110 z-10 ${log.high ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
                                            <Activity className="w-4 h-4" />
                                        </div>
                                        <div className={`p-6 rounded-[2rem] border transition-all ${log.latest ? 'bg-blue-50/30 border-blue-100 shadow-sm' : log.high ? 'bg-red-50/30 border-red-100' : 'bg-white border-transparent hover:border-blue-50'}`}>
                                            <div className="flex justify-between items-start mb-3">
                                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{log.time}</p>
                                                {log.latest && <span className="text-[8px] font-black px-2 py-0.5 bg-blue-600 text-white rounded-lg uppercase tracking-widest">Latest</span>}
                                                {log.high && <span className="text-[8px] font-black px-2 py-0.5 bg-red-500 text-white rounded-lg uppercase tracking-widest">High BP</span>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">BP / Pulse</p>
                                                    <p className="text-xs font-black text-gray-700">{log.bp} <span className="text-[10px] text-gray-400">mmHg</span> / {log.pulse} <span className="text-[10px] text-gray-400">bpm</span></p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Temp / SpO2</p>
                                                    <p className="text-xs font-black text-gray-700">{log.temp}°F / {log.spo2}%</p>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-dashed border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-5 h-5 bg-gray-100 rounded-lg flex items-center justify-center text-[8px] font-black uppercase tracking-tighter italic">JD</div>
                                                Rec: {log.user}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const HistoryIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const TrendingUpIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export default RecordVitals;
