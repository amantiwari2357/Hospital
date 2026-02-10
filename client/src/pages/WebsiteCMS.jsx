import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Globe, ShieldCheck, Pill, Ambulance, Activity, ChevronRight, Settings, Eye, Edit3,
    Database, Clock, UserCircle, LayoutDashboard, PenTool, Briefcase, Stethoscope,
    MessageSquare, Search, Plus, Filter, ArrowUpRight, Wifi, CheckCircle2, XCircle,
    AlertTriangle, FileText, TrendingUp, Star, Trash2
} from 'lucide-react';

const WebsiteCMS = () => {
    const [activeTab, setActiveTab] = useState('diseases');
    const [searchQuery, setSearchQuery] = useState('');
    const [staff, setStaff] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDoc, setEditingDoc] = useState(null);
    const [editingDisease, setEditingDisease] = useState(null);
    const [isAddingDisease, setIsAddingDisease] = useState(false);

    useEffect(() => {
        fetchCMSData();
    }, []);

    const fetchCMSData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : '';
            const headers = { 'Authorization': `Bearer ${token}` };

            const [staffRes, diseaseRes] = await Promise.all([
                fetch('http://localhost:5000/api/staff', { headers }),
                fetch('http://localhost:5000/api/diseases')
            ]);

            const staffData = await staffRes.json();
            const diseaseData = await diseaseRes.json();

            setStaff(Array.isArray(staffData) ? staffData : []);
            setDiseases(Array.isArray(diseaseData) ? diseaseData : []);
        } catch (error) {
            console.error('CMS Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStaff = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const res = await fetch(`http://localhost:5000/api/staff/${editingDoc._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingDoc)
            });
            if (res.ok) {
                setEditingDoc(null);
                fetchCMSData();
            }
        } catch (error) {
            console.error('Update Staff Error:', error);
        }
    };

    const handleSaveDisease = async (e) => {
        e.preventDefault();
        const method = editingDisease?._id ? 'PUT' : 'POST';
        const url = editingDisease?._id
            ? `http://localhost:5000/api/diseases/${editingDisease.id}`
            : 'http://localhost:5000/api/diseases';

        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingDisease)
            });
            if (res.ok) {
                setEditingDisease(null);
                setIsAddingDisease(false);
                fetchCMSData();
            }
        } catch (error) {
            console.error('Save Disease Error:', error);
        }
    };

    const handleDeleteDisease = async (id) => {
        if (!window.confirm('Are you sure you want to delete this disease entry?')) return;
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const res = await fetch(`http://localhost:5000/api/diseases/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchCMSData();
        } catch (error) {
            console.error('Delete Disease Error:', error);
        }
    };

    const mainModules = [
        { id: 'diseases', label: 'Condition Meta', icon: Database, color: 'emerald', desc: 'Disease Database CMS' },
        { id: 'doctors', label: 'Doctor Portals', icon: Stethoscope, color: 'indigo', desc: 'Availability & Profiles' },
        { id: 'blogger', label: 'Blogger Dashboard', icon: PenTool, color: 'blue', desc: 'Personal Blog Management' },
        { id: 'clinical', label: 'Clinical Hub', icon: Activity, color: 'sky', desc: 'Domain & Service CMS' },
        { id: 'logistics', label: 'Fleet & Fleet SOS', icon: Ambulance, color: 'red', desc: 'Ambulance Live Ops' },
        { id: 'pharmacy', label: 'Pharmacy Inventory', icon: Pill, color: 'purple', desc: 'Digital Catalog Manager' },
    ];

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
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === mod.id ? 'bg-white/20' : `bg-blue-50 text-blue-600`
                                }`}>
                                <mod.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className={`font-black uppercase tracking-tighter text-sm ${activeTab === mod.id ? 'text-white' : 'text-gray-900'}`}>{mod.label}</p>
                                <p className={`text-[9px] font-bold uppercase tracking-widest ${activeTab === mod.id ? 'text-blue-100/60' : 'text-gray-400'}`}>{mod.desc}</p>
                            </div>
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
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto">
                    <div className="px-6 py-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest italic">Live Database Sync Active</span>
                    </div>
                    {activeTab === 'diseases' && (
                        <button
                            onClick={() => { setEditingDisease({ id: '', name: '', category: 'General', description: '', symptoms: [], treatments: [], image: '' }); setIsAddingDisease(true); }}
                            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-xl"
                        >
                            <Plus className="w-4 h-4" /> Add Disease
                        </button>
                    )}
                </div>
            </div>

            {/* Dynamic Viewport Container */}
            <div className="min-h-[600px] mb-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Syncing CRM Database..</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'diseases' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {diseases.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map((disease) => (
                                    <div key={disease._id} className="bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:shadow-2xl transition-all group">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                                <Database className="w-6 h-6" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingDisease(disease)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDeleteDisease(disease.id)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-2 italic">{disease.name}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{disease.category}</p>
                                        <p className="text-xs text-gray-500 line-clamp-2 italic">{disease.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'doctors' && (
                            <div className="bg-white border border-gray-100 rounded-[3.5rem] overflow-hidden shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Specialist</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Clinical Domain</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Global Rating</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 italic font-medium">
                                        {staff.filter(s => s.role === 'doctor' && s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((doc) => (
                                            <tr key={doc._id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img src={doc.image || 'https://via.placeholder.com/150'} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-lg" alt="" />
                                                        <div>
                                                            <p className="font-extrabold text-gray-900 text-sm">{doc.name}</p>
                                                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{doc.roleDescription || 'Medical Consultant'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                                        {doc.specialization || doc.department}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                                                        <span className="text-sm font-black text-gray-700">{doc.rating || '5.0'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <button onClick={() => setEditingDoc(doc)} className="px-6 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg italic">
                                                        Edit Profile
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Edit Modals */}
            {(editingDoc || (editingDisease || isAddingDisease)) && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden p-10 relative">
                        {editingDoc ? (
                            <form onSubmit={handleUpdateStaff} className="space-y-6">
                                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-8">Edit Physician Profile</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Display Name</label>
                                        <input type="text" value={editingDoc.name} onChange={e => setEditingDoc({ ...editingDoc, name: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Clinical Domain</label>
                                        <input type="text" value={editingDoc.specialization} onChange={e => setEditingDoc({ ...editingDoc, specialization: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Role Description</label>
                                        <input type="text" value={editingDoc.roleDescription} onChange={e => setEditingDoc({ ...editingDoc, roleDescription: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Profile Rating</label>
                                        <input type="number" step="0.1" value={editingDoc.rating} onChange={e => setEditingDoc({ ...editingDoc, rating: parseFloat(e.target.value) })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Image URL</label>
                                        <input type="text" value={editingDoc.image} onChange={e => setEditingDoc({ ...editingDoc, image: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-10">
                                    <button type="submit" className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all">Save Matrix Update</button>
                                    <button type="button" onClick={() => setEditingDoc(null)} className="px-10 bg-gray-100 text-gray-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Discard</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleSaveDisease} className="space-y-6">
                                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-8">{isAddingDisease ? 'Register Clinical Condition' : 'Modify Condition Meta'}</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Unique Slug (ID)</label>
                                        <input type="text" disabled={!isAddingDisease} value={editingDisease.id} onChange={e => setEditingDisease({ ...editingDisease, id: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Display Name</label>
                                        <input type="text" value={editingDisease.name} onChange={e => setEditingDisease({ ...editingDisease, name: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Risk Category</label>
                                        <input type="text" value={editingDisease.category} onChange={e => setEditingDisease({ ...editingDisease, category: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Cover Image URL</label>
                                        <input type="text" value={editingDisease.image} onChange={e => setEditingDisease({ ...editingDisease, image: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Clinical Description</label>
                                        <textarea rows="3" value={editingDisease.description} onChange={e => setEditingDisease({ ...editingDisease, description: e.target.value })} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold italic resize-none" />
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-10">
                                    <button type="submit" className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all">Publish To Network</button>
                                    <button type="button" onClick={() => { setEditingDisease(null); setIsAddingDisease(false); }} className="px-10 bg-gray-100 text-gray-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default WebsiteCMS;
