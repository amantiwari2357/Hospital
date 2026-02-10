import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Menu,
    Plus,
    Edit3,
    Trash2,
    Save,
    X,
    ChevronDown,
    ChevronUp,
    Link as LinkIcon,
    Grid,
    List,
    Eye,
    Database
} from 'lucide-react';

const NavbarManager = () => {
    const [activeSection, setActiveSection] = useState('clinical');
    const [isEditing, setIsEditing] = useState(null);

    // Mock data - in production this would come from backend
    const [clinicalDomains, setClinicalDomains] = useState([
        { id: 1, name: 'Cardiology', href: '/disease/cardiology', order: 1, visible: true },
        { id: 2, name: 'Neurology', href: '/disease/neurology', order: 2, visible: true },
        { id: 3, name: 'Oncology', href: '/disease/oncology', order: 3, visible: true },
        { id: 4, name: 'Pediatrics', href: '/disease/pediatrics', order: 4, visible: true }
    ]);

    const [operationalLinks, setOperationalLinks] = useState([
        { id: 1, name: 'Patient Portal', href: '/portal', icon: 'LayoutDashboard', visible: true },
        { id: 2, name: 'Research Papers', href: '/research', icon: 'Database', visible: true },
        { id: 3, name: 'Ambulance Hub', href: '/ambulance', icon: 'Ambulance', visible: true },
        { id: 4, name: 'Digital Pharmacy', href: '/medicines', icon: 'Tablets', visible: true }
    ]);

    const [megaMenuData, setMegaMenuData] = useState({
        'Cardiology': [
            'Interventional Cardiology',
            'Electrophysiology',
            'Heart Failure Program',
            'Valve Clinic'
        ],
        'Neurology': [
            'Stroke Center',
            'Epilepsy Clinic',
            'Movement Disorders'
        ]
    });

    const sections = [
        { id: 'clinical', label: 'Clinical Domains', icon: Grid, count: clinicalDomains.length },
        { id: 'operational', label: 'Operational Links', icon: LinkIcon, count: operationalLinks.length },
        { id: 'megamenu', label: 'Mega Menu Content', icon: Menu, count: Object.keys(megaMenuData).length }
    ];

    return (
        <Layout title="Navbar Management">
            <div className="space-y-8 italic">
                {/* Header */}
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">
                                Navigation <span className="text-blue-600">Control Center</span>
                            </h2>
                            <p className="text-slate-400 text-sm font-medium">
                                Manage all website navigation elements from a single dashboard
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl text-gray-600 font-black uppercase text-[10px] tracking-widest hover:bg-gray-100 transition-all">
                                <Eye className="w-4 h-4" /> Preview Changes
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/10">
                                <Save className="w-4 h-4" /> Publish to Website
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-4">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-1 p-6 rounded-[2rem] border transition-all ${activeSection === section.id
                                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/20'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <section.icon className="w-6 h-6" />
                                <span className={`text-xs font-black px-3 py-1 rounded-full ${activeSection === section.id ? 'bg-white/20' : 'bg-gray-100'
                                    }`}>
                                    {section.count}
                                </span>
                            </div>
                            <p className="font-black uppercase tracking-tight text-sm">{section.label}</p>
                        </button>
                    ))}
                </div>

                {/* Clinical Domains Section */}
                {activeSection === 'clinical' && (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Clinical Domain Tabs</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Horizontal navigation bar items</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
                                <Plus className="w-4 h-4" /> Add Domain
                            </button>
                        </div>
                        <div className="p-8">
                            <table className="w-full">
                                <thead className="border-b border-gray-100">
                                    <tr>
                                        <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Order</th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Domain Name</th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Link Path</th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Visibility</th>
                                        <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {clinicalDomains.map((domain, idx) => (
                                        <tr key={domain.id} className="hover:bg-blue-50/20 transition-all group">
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronUp className="w-3 h-3 text-gray-400" /></button>
                                                    <span className="font-black text-gray-900 text-sm">{domain.order}</span>
                                                    <button className="p-1 hover:bg-gray-100 rounded"><ChevronDown className="w-3 h-3 text-gray-400" /></button>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4">
                                                <p className="font-black text-gray-900 uppercase tracking-tight">{domain.name}</p>
                                            </td>
                                            <td className="py-6 px-4">
                                                <code className="text-xs font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-600">{domain.href}</code>
                                            </td>
                                            <td className="py-6 px-4">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={domain.visible} className="sr-only peer" />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </td>
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Operational Links Section */}
                {activeSection === 'operational' && (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Operational Portal Links</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Layer 3 navigation items</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
                                <Plus className="w-4 h-4" /> Add Portal Link
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {operationalLinks.map(link => (
                                <div key={link.id} className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-blue-200 transition-all group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100">
                                                <Database className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{link.name}</p>
                                                <code className="text-[9px] font-mono text-gray-400">{link.href}</code>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={link.visible} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white border border-gray-200 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-2">
                                            <Edit3 className="w-3 h-3" /> Edit
                                        </button>
                                        <button className="w-10 bg-white border border-gray-200 py-2 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mega Menu Section */}
                {activeSection === 'megamenu' && (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Mega Menu Sub-Services</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Dropdown content for each clinical domain</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            {Object.entries(megaMenuData).map(([domain, services]) => (
                                <div key={domain} className="border border-gray-100 rounded-[2rem] overflow-hidden">
                                    <div className="p-6 bg-gray-50 flex items-center justify-between">
                                        <h4 className="font-black text-gray-900 uppercase tracking-tight">{domain}</h4>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-blue-700 transition-all">
                                            <Plus className="w-3 h-3" /> Add Service
                                        </button>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {services.map((service, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-all">
                                                <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">{service}</span>
                                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-lg transition-all">
                                                    <X className="w-3 h-3 text-red-600" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sync Status Footer */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -mr-48 -mt-48" />
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">Live Sync Active</span>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">Navigation Database</h3>
                            <p className="text-slate-400 text-sm font-medium italic">All changes are instantly reflected on the website after publishing</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-black italic tracking-tighter">{clinicalDomains.length + operationalLinks.length}</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Total Nav Items</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black italic tracking-tighter">0.2ms</p>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Sync Latency</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NavbarManager;
