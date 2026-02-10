import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Sparkles,
    Search,
    Filter,
    Calendar,
    User,
    Image as ImageIcon,
    AlertCircle,
    CheckCircle2,
    Clock,
    Eye,
    Download,
    Send,
    ArrowLeft,
    ArrowRight,
    TrendingUp,
    Activity,
    Shield,
    Zap,
    FileText,
    Phone,
    Mail
} from 'lucide-react';

const SkinAIDiagnosisManager = () => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [diagnoses, setDiagnoses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [verdict, setVerdict] = useState({ condition: '', isConfirmed: false, finalNotes: '' });
    const [chatOpen, setChatOpen] = useState(false);
    const [quickView, setQuickView] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const fetchDiagnoses = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo || !userInfo.token) return;

            const response = await fetch('https://hospital-40m0.onrender.com/api/skin-diagnosis', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("Server returned non-JSON response");
            }

            const data = await response.json();

            if (response.ok) {
                const formattedData = data.map(d => ({
                    id: d._id,
                    patientName: d.patientName || 'Anonymous',
                    patientId: d.patientId || 'N/A',
                    phone: d.phone || 'N/A',
                    email: d.email || 'N/A',
                    submittedDate: new Date(d.createdAt).toLocaleDateString(),
                    submittedTime: new Date(d.createdAt).toLocaleTimeString(),
                    condition: d.aiAnalysis?.condition || 'Unknown',
                    confidence: d.aiAnalysis?.confidence || '0%',
                    severity: d.aiAnalysis?.severity || 'Unknown',
                    status: d.status,
                    imageUrl: d.imageUrl,
                    description: d.aiAnalysis?.description || '',
                    recommendations: d.aiAnalysis?.suggestions || [],
                    aiNotes: 'AI analysis completed.',
                    followupRequired: d.aiAnalysis?.isUrgent || false,
                    interactions: d.interactions || [],
                    hotspots: d.aiAnalysis?.hotspots || []
                }));
                setDiagnoses(formattedData);
            }
        } catch (error) {
            console.error("Failed to fetch diagnoses", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitVerdict = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`https://hospital-40m0.onrender.com/api/skin-diagnosis/${selectedDiagnosis}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    status: 'Reviewed',
                    doctorVerdict: {
                        condition: verdict.condition || (diagnoses.find(d => d.id === selectedDiagnosis)?.condition),
                        isConfirmed: verdict.isConfirmed,
                        finalNotes: verdict.finalNotes
                    }
                })
            });
            if (response.ok) {
                alert("Clinical verdict saved. AI model reinforced!");
                fetchDiagnoses();
                setSelectedDiagnosis(null);
            }
        } catch (error) {
            console.error("Verdict save failed", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const response = await fetch(`https://hospital-40m0.onrender.com/api/skin-diagnosis/${selectedDiagnosis}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({
                    interaction: {
                        sender: 'Doctor',
                        message: newMessage
                    }
                })
            });
            if (response.ok) {
                setNewMessage('');
                fetchDiagnoses();
            }
        } catch (error) {
            console.error("Message send failed", error);
        }
    };

    useEffect(() => {
        fetchDiagnoses();
        const interval = setInterval(fetchDiagnoses, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentDiagnosis = selectedDiagnosis ? diagnoses.find(d => d.id === selectedDiagnosis) : null;

    const filteredDiagnoses = diagnoses.filter(d => {
        const matchesSearch = d.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.id.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;
        if (filterStatus === 'pending') return d.status === 'Pending Review';
        if (filterStatus === 'reviewed') return d.status === 'Reviewed';
        if (filterStatus === 'followup') return d.followupRequired;
        return true;
    });

    const stats = {
        total: diagnoses.length,
        pending: diagnoses.filter(d => d.status === 'Pending Review').length,
        reviewed: diagnoses.filter(d => d.status === 'Reviewed').length,
        followup: diagnoses.filter(d => d.followupRequired).length,
        avgConfidence: diagnoses.length > 0
            ? Math.round(diagnoses.reduce((acc, curr) => acc + parseFloat(curr.confidence), 0) / diagnoses.length) + '%'
            : '0%'
    };

    return (
        <Layout title={selectedDiagnosis ? "Diagnosis Details" : "AI Skin Diagnosis Manager"}>
            <div className="space-y-8 italic">
                {selectedDiagnosis && currentDiagnosis ? (
                    // 1. DETAILED VIEW
                    <div className="space-y-6">
                        <button
                            onClick={() => setSelectedDiagnosis(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-black uppercase text-[10px] tracking-widest transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Diagnosis List
                        </button>

                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Sparkles className="w-6 h-6 text-purple-600" />
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">AI Skin Diagnosis</h2>
                                    </div>
                                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Diagnosis ID: {currentDiagnosis.id}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="p-3 bg-gray-50 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setChatOpen(!chatOpen)}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all"
                                    >
                                        <Send className="w-4 h-4" /> {chatOpen ? 'Hide Interactions' : 'Interactions'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { label: 'Patient', value: currentDiagnosis.patientName, icon: User },
                                    { label: 'Patient ID', value: currentDiagnosis.patientId, icon: FileText },
                                    { label: 'Phone', value: currentDiagnosis.phone, icon: Phone },
                                    { label: 'Email', value: currentDiagnosis.email, icon: Mail }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <item.icon className="w-4 h-4 text-gray-400" />
                                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Submitted Image</h4>
                                <div className="aspect-square bg-gray-100 rounded-[2rem] mb-6 flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden">
                                    {currentDiagnosis.imageUrl ? (
                                        <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                                            <img
                                                src={currentDiagnosis.imageUrl}
                                                alt="Diagnostic"
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '';
                                                }}
                                            />
                                            {/* Hotspot Overlay for Doctors */}
                                            {Array.isArray(currentDiagnosis.hotspots) && currentDiagnosis.hotspots.map((hotspot, idx) => (
                                                <div
                                                    key={idx}
                                                    className="absolute z-10 group"
                                                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
                                                >
                                                    <button
                                                        onClick={() => setActiveHotspot(hotspot)}
                                                        className={`w-6 h-6 rounded-full border border-white shadow-lg flex items-center justify-center transition-all animate-pulse ${activeHotspot === hotspot ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'}`}
                                                    >
                                                        <ArrowRight className="w-3 h-3 text-white transform rotate-[-45deg]" />
                                                    </button>
                                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {hotspot.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <ImageIcon className="w-16 h-16 text-gray-300" />
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Submitted</span>
                                        <span className="text-sm font-black text-gray-900">{currentDiagnosis.submittedDate} {currentDiagnosis.submittedTime}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Status</span>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${currentDiagnosis.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-600' :
                                            currentDiagnosis.status === 'Reviewed' ? 'bg-green-100 text-green-600' :
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                            {currentDiagnosis.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Hotspot Detail Card for Doctors */}
                                {activeHotspot && (
                                    <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-2xl">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-[9px] font-black text-purple-600 uppercase tracking-widest">AI Detection Detail</p>
                                            <button onClick={() => setActiveHotspot(null)}>
                                                <Clock className="w-3 h-3 text-gray-400" />
                                            </button>
                                        </div>
                                        <h5 className="text-sm font-black text-gray-900 mb-2">{activeHotspot.label}</h5>
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-gray-600 leading-relaxed italic border-l-2 border-purple-200 pl-3">
                                                <strong>Guidance:</strong> {activeHotspot.guidance}
                                            </p>
                                            <p className="text-[10px] text-gray-600 leading-relaxed italic border-l-2 border-purple-200 pl-3">
                                                <strong>Clinical Context:</strong> {activeHotspot.problem}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] shadow-sm p-8 text-white">
                                <div className="flex items-center gap-2 mb-6">
                                    <Sparkles className="w-5 h-5" />
                                    <h4 className="text-sm font-black uppercase tracking-widest">AI Analysis Results</h4>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Detected Condition</p>
                                        <p className="text-2xl font-black">{currentDiagnosis.condition}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Confidence</p>
                                            <p className="text-xl font-black">{currentDiagnosis.confidence}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Severity</p>
                                            <p className="text-xl font-black">{currentDiagnosis.severity}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Description</p>
                                        <p className="text-sm font-medium leading-relaxed">{currentDiagnosis.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                                <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">AI Recommendations</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {Array.isArray(currentDiagnosis.recommendations) && currentDiagnosis.recommendations.map((rec, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm font-bold text-gray-700">{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-[3rem] border-2 border-purple-100 shadow-xl shadow-purple-500/5 p-8">
                                <h4 className="text-xl font-black uppercase tracking-tight text-purple-600 mb-6 flex items-center gap-2">
                                    <Activity className="w-6 h-6" /> Clinical Verdict
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                                        <input
                                            type="checkbox"
                                            checked={verdict.isConfirmed}
                                            onChange={(e) => setVerdict({ ...verdict, isConfirmed: e.target.checked })}
                                            className="w-5 h-5 accent-purple-600"
                                        />
                                        <p className="text-xs font-black text-purple-900 uppercase tracking-widest">Confirm AI Diagnosis</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Final Condition Name</label>
                                        <input
                                            type="text"
                                            placeholder={currentDiagnosis.condition}
                                            value={verdict.condition}
                                            onChange={(e) => setVerdict({ ...verdict, condition: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Doctor's Clinical Notes</label>
                                        <textarea
                                            placeholder="Add corrective notes for AI training..."
                                            value={verdict.finalNotes}
                                            onChange={(e) => setVerdict({ ...verdict, finalNotes: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium h-24"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmitVerdict}
                                        className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-700 transition-all shadow-lg"
                                    >
                                        Submit Verdict & Train AI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // 2. LIST VIEW
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[
                                { label: 'Total Diagnoses', value: stats.total, icon: Sparkles, color: 'purple' },
                                { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'yellow' },
                                { label: 'Reviewed', value: stats.reviewed, icon: CheckCircle2, color: 'green' },
                                { label: 'Follow-up Required', value: stats.followup, icon: AlertCircle, color: 'orange' },
                                { label: 'Avg Confidence', value: stats.avgConfidence, icon: TrendingUp, color: 'blue' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 
                                        ${stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                                            stat.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                                                stat.color === 'green' ? 'bg-green-50 text-green-600' :
                                                    stat.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-blue-50 text-blue-600'}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between gap-6">
                            <div className="relative flex-1 max-w-xl">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by patient name, ID, condition..."
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending Review</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="followup">Follow-up Required</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Diagnosis ID</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Patient</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Submitted</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                        <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredDiagnoses.map(diagnosis => (
                                        <tr key={diagnosis.id} className="hover:bg-purple-50/20 transition-all group">
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-3">
                                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                                    <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{diagnosis.id}</p>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8">
                                                <p className="font-black text-gray-900 uppercase tracking-tight">{diagnosis.patientName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{diagnosis.patientId}</p>
                                            </td>
                                            <td className="py-6 px-8 text-sm font-bold text-gray-700">
                                                {diagnosis.submittedDate}
                                                <span className="block text-[10px] text-gray-400">{diagnosis.submittedTime}</span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${diagnosis.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-600' :
                                                    diagnosis.status === 'Reviewed' ? 'bg-green-100 text-green-600' :
                                                        'bg-blue-100 text-blue-600'}`}>
                                                    {diagnosis.status}
                                                </span>
                                            </td>
                                            <td className="py-6 px-8">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => setQuickView(diagnosis)} className="p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                                                        <Zap className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => setSelectedDiagnosis(diagnosis.id)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all shadow-lg">
                                                        <Eye className="w-4 h-4" /> Full View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* SHARED MODALS & OVERLAYS */}
                {chatOpen && currentDiagnosis && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[600px]">
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 italic">Interaction Log</h3>
                                <button onClick={() => setChatOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all">
                                    <ArrowLeft className="w-5 h-5 rotate-90" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 space-y-4">
                                {!Array.isArray(currentDiagnosis.interactions) || currentDiagnosis.interactions.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-300 italic">
                                        <Mail className="w-12 h-12 mb-4" />
                                        <p>No recorded interactions yet.</p>
                                    </div>
                                ) : (
                                    currentDiagnosis.interactions.map((msg, i) => (
                                        <div key={i} className={`flex flex-col ${msg.sender === 'Doctor' ? 'items-end' : 'items-start'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-3xl ${msg.sender === 'Doctor' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                                                <p className="text-sm font-medium">{msg.message}</p>
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-1">{msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="p-8 border-t border-gray-100 flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Send clinical message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold"
                                />
                                <button onClick={handleSendMessage} className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg">
                                    <Send className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {quickView && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                        <div className="bg-white w-full max-w-lg rounded-[3.5rem] shadow-2xl overflow-hidden relative border border-white/20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] -mr-32 -mt-32" />
                            <div className="p-10 relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 transform rotate-6 border-4 border-white overflow-hidden">
                                    {quickView.imageUrl ? (
                                        <img src={quickView.imageUrl} alt="Skin" className="w-full h-full object-cover -rotate-6 scale-110" />
                                    ) : (
                                        <Sparkles className="w-10 h-10 text-white" />
                                    )}
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-2">AI Analysis <span className="text-purple-600">Summary</span></h3>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-12 italic">ID: {quickView.id}</p>
                                <div className="w-full space-y-4 mb-10">
                                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center transition-all hover:scale-[1.02]">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 leading-none">Detected Condition</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tight italic">{quickView.condition}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex flex-col items-center">
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 leading-none">Confidence</p>
                                            <p className="text-2xl font-black text-blue-600 tracking-tighter">{quickView.confidence}</p>
                                        </div>
                                        <div className={`p-6 rounded-[2rem] border flex flex-col items-center ${quickView.severity === 'High' ? 'bg-red-50 border-red-100 text-red-600' :
                                            quickView.severity === 'Moderate' ? 'bg-orange-50 border-orange-100 text-orange-600' :
                                                'bg-green-50 border-green-100 text-green-600'}`}>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 leading-none opacity-60">Severity</p>
                                            <p className="text-2xl font-black tracking-tighter">{quickView.severity}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 w-full">
                                    <button onClick={() => setQuickView(null)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Dismiss</button>
                                    <button onClick={() => { setSelectedDiagnosis(quickView.id); setQuickView(null); }} className="flex-1 py-5 bg-purple-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-500/20">Full Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SkinAIDiagnosisManager;
