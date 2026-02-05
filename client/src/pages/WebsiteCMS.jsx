import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Globe,
    ShieldCheck,
    Pill,
    Ambulance,
    Activity,
    ChevronRight,
    Settings,
    Eye,
    Edit3,
    Database,
    Clock,
    UserCircle,
    LayoutDashboard,
    PenTool,
    Briefcase,
    Stethoscope,
    MessageSquare,
    Search,
    Plus,
    Filter,
    ArrowUpRight,
    Wifi,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    FileText,
    TrendingUp
} from 'lucide-react';

const WebsiteCMS = () => {
    const [activeTab, setActiveTab] = useState('blogger'); // Expanded default to Blogger
    const [searchQuery, setSearchQuery] = useState('');

    const mainModules = [
        { id: 'blogger', label: 'Blogger Dashboard', icon: PenTool, color: 'blue', desc: 'Personal Blog Management' },
        { id: 'doctors', label: 'Doctor Portals', icon: Stethoscope, color: 'indigo', desc: 'Availability & Case Logs' },
        { id: 'clinical', label: 'Clinical Hub', icon: Activity, color: 'sky', desc: 'Domain & Service CMS' },
        { id: 'logistics', label: 'Fleet & Fleet SOS', icon: Ambulance, color: 'red', desc: 'Ambulance Live Ops' },
        { id: 'pharmacy', label: 'Pharmacy Inventory', icon: Pill, color: 'purple', desc: 'Digital Catalog Manager' },
        { id: 'diseases', label: 'Condition Meta', icon: Database, color: 'emerald', desc: 'Disease Database CMS' },
        { id: 'enquiry', label: 'Enquiry Logic', icon: MessageSquare, color: 'indigo', desc: 'Communication Flows' },
        { id: 'market', label: 'Market Insights', icon: TrendingUp, color: 'orange', desc: 'Real-time Stats Sync' }
    ];

    // Sub-components for professional look
    const BlogCard = ({ title, status, date, category }) => (
        <div className="bg-white border border-gray-100 p-6 rounded-3xl hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br transition-opacity opacity-5 ${status === 'Published' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-indigo-500'}`} />
            <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {status}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{date}</span>
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight italic">{title}</h4>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">{category}</p>
            <div className="flex gap-2">
                <button className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Edit3 className="w-3 h-3" /> Edit Article
                </button>
                <button className="w-12 bg-gray-50 text-gray-400 py-3 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all">
                    <Eye className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const FleetCard = ({ unit, id, status, battery, location, oxygen }) => (
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden border border-white/5">
            <div className={`absolute top-0 right-0 w-48 h-48 blur-[60px] opacity-20 -mr-24 -mt-24 ${status === 'Active' ? 'bg-green-500' : status === 'SOS' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h4 className="text-xl font-black italic tracking-tighter uppercase">{unit}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/60">{id}</p>
                </div>
                <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'Active' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' :
                    status === 'SOS' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-blue-500'
                    }`} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Status</p>
                    <p className="text-xs font-bold">{status}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Energy</p>
                    <p className="text-xs font-bold">{battery}%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Oxygen</p>
                    <p className="text-xs font-bold">{oxygen}L</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Location</p>
                    <p className="text-xs font-bold truncate">{location}</p>
                </div>
            </div>

            <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                Manual Override
            </button>
        </div>
    );

    return (
        <Layout title="Hospital Universe CMS">
            {/* Horizontal Navigation Modules */}
            <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {mainModules.map((mod) => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveTab(mod.id)}
                            className={`flex items-center gap-4 px-8 py-5 rounded-[2.5rem] border transition-all relative overflow-hidden group ${activeTab === mod.id
                                ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-900/20'
                                : 'bg-white border-gray-100 hover:border-blue-200 text-gray-600'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === mod.id ? 'bg-white/20' : `bg-${mod.color}-50 text-${mod.color}-600`
                                }`}>
                                <mod.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className={`font-black uppercase tracking-tighter text-sm ${activeTab === mod.id ? 'text-white' : 'text-gray-900'}`}>{mod.label}</p>
                                <p className={`text-[9px] font-bold uppercase tracking-widest ${activeTab === mod.id ? 'text-blue-100/60' : 'text-gray-400'}`}>{mod.desc}</p>
                            </div>
                            {activeTab === mod.id && <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 blur-xl rounded-full -mr-6 -mt-6" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Viewport Control Bar */}
            <div className="bg-white border border-gray-100 rounded-[3rem] p-4 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-6 w-full lg:w-auto">
                    <div className="relative w-full lg:w-80">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="px-6 py-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest italic">Live Database Sync Active</span>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10">
                        <Plus className="w-4 h-4" /> Global Add
                    </button>
                </div>
            </div>

            {/* Dynamic Viewport Container */}
            <div className="min-h-[600px] mb-12">
                {activeTab === 'blogger' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 italic flex items-center gap-4">
                                <PenTool className="w-8 h-8 text-blue-600" /> Professional Authoring Console
                            </h3>
                            <button className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] bg-blue-50 px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                Write New Article <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: 'Advanced Protocols in Neural Micro-Surgery', status: 'Published', date: 'Feb 04, 2026', category: 'Neurosurgery' },
                                { title: 'AI-Driven Precision Medicine: A 2026 Review', status: 'Draft', date: 'Feb 05, 2026', category: 'Technology' },
                                { title: 'Managing Clinical Fatigue in High-Stress Units', status: 'Published', date: 'Jan 28, 2026', category: 'Staff Wellness' },
                                { title: 'Genetic Mapping & Pre-emptive Diagnosis', status: 'Published', date: 'Jan 15, 2026', category: 'Genetics' },
                                { title: 'Emergency Response Latency Optimization', status: 'Archived', date: 'Dec 12, 2025', category: 'Logistics' }
                            ].map((blog, i) => <BlogCard key={i} {...blog} />)}
                        </div>
                    </div>
                )}

                {activeTab === 'logistics' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 italic flex items-center gap-4">
                                <Ambulance className="w-8 h-8 text-red-600" /> Fleet Availability & SOS Live
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { unit: 'MED-SOS-442', id: 'UUID: AF88-001', status: 'Active', battery: 94, oxygen: 80, location: 'Sector 42, Metro' },
                                { unit: 'MED-AIR-109', id: 'UUID: AF88-002', status: 'Critical SOS', battery: 62, oxygen: 45, location: 'Emergency Bay 01' },
                                { unit: 'MED-GND-771', id: 'UUID: AF88-003', status: 'Refuel', battery: 12, oxygen: 100, location: 'Central Hub' },
                                { unit: 'MED-SOS-220', id: 'UUID: AF88-004', status: 'Active', battery: 88, oxygen: 92, location: 'Rapid Response 04' }
                            ].map((fleet, i) => <FleetCard key={i} {...fleet} />)}
                        </div>
                    </div>
                )}

                {activeTab === 'doctors' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 italic flex items-center gap-4">
                                <Stethoscope className="w-8 h-8 text-indigo-600" /> Specialist Deployment Matrix
                            </h3>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-[3rem] overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Specialist Name</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Department</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Hub Status</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">CMS Role</th>
                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 italic">
                                    {[
                                        { name: 'Dr. Vikram Sethi', dept: 'Cardiology', status: 'Available', role: 'Clinical Editor' },
                                        { name: 'Dr. Sarah Chen', dept: 'Neurology', status: 'On Case', role: 'Domain Lead' },
                                        { name: 'Dr. Michael Ross', dept: 'Oncology', status: 'Offline', role: 'Staff Writer' },
                                        { name: 'Dr. Elena Gilbert', dept: 'Pediatrics', status: 'Available', role: 'Domain Lead' }
                                    ].map((doc, i) => (
                                        <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {doc.name.split(' ')[1].charAt(0)}
                                                    </div>
                                                    <p className="font-bold text-gray-900">{doc.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{doc.dept}</p>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${doc.status === 'Available' ? 'bg-green-500' : doc.status === 'On Case' ? 'bg-orange-500' : 'bg-gray-300'}`} />
                                                    <span className="text-xs font-bold text-gray-700">{doc.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 px-3 py-1 rounded-md">{doc.role}</span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">Access Console</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'enquiry' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-gray-900 italic flex items-center gap-4">
                                <MessageSquare className="w-8 h-8 text-indigo-600" /> Enquiry Automation & Flow Control
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Auto-Response Templates</h4>
                                <div className="space-y-4">
                                    {[
                                        { type: 'Clinical Inquiry', status: 'Active', responses: 142 },
                                        { type: 'Appointment Request', status: 'Active', responses: 89 },
                                        { type: 'Billing Questions', status: 'Paused', responses: 34 },
                                        { type: 'Emergency Contact', status: 'Active', responses: 201 }
                                    ].map((template, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all group">
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm">{template.type}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{template.responses} Auto-Responses</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${template.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {template.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[60px] -mr-24 -mt-24" />
                                <h4 className="text-sm font-black uppercase tracking-widest mb-6 relative z-10">AI Response Intelligence</h4>
                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <p className="text-4xl font-black italic tracking-tighter mb-2">94.2%</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Resolution Without Human</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-black italic tracking-tighter mb-2">1.8s</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Avg. First Response</p>
                                    </div>
                                    <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-50 transition-all shadow-xl mt-6">
                                        Configure AI Logic
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'pharmacy' || activeTab === 'diseases' || activeTab === 'clinical' || activeTab === 'market') && (
                    <div className="flex flex-col items-center justify-center py-20 text-center italic">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-300 mb-8">
                            <Database className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Professional Interface Synching</h3>
                        <p className="text-slate-400 max-w-lg mt-4 font-medium italic">We are mapping the high-density metadata for the <span className="text-blue-600 font-bold">{activeTab}</span> module. Production environment will reflect live changes in real-time.</p>
                        <div className="mt-12 flex gap-4">
                            <div className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] opacity-40 cursor-not-allowed">
                                Manual Control Locked
                            </div>
                            <div className="px-8 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black uppercase tracking-widest text-[10px] animate-pulse">
                                Thread: AF88_CMS_DAEMON
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* System Intelligence Footer */}
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden italic mb-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] -mr-64 -mt-64" />
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl text-center lg:text-left">
                        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5" />
                            </div>
                            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px]">Neural Sync Intelligence</span>
                        </div>
                        <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Global <span className="text-blue-500">CMS</span> Core System</h3>
                        <p className="text-slate-400 text-lg font-medium italic">All changes made in this dashboard are instantly propagated across the 108 Emergency Network, Clinical Portals, and the Public Healthcare Showcase with zero latency.</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-8 mb-4">
                            <div>
                                <p className="text-3xl font-black tracking-tighter italic">98.2%</p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Network Health</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black tracking-tighter italic">0.4ms</p>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Sync Latency</p>
                            </div>
                        </div>
                        <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                            System Diagnostics
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WebsiteCMS;
