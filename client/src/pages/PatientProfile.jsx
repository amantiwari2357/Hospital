import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import {
    User,
    Search,
    Filter,
    Calendar,
    FileText,
    Package,
    Activity,
    Phone,
    Mail,
    MapPin,
    Heart,
    Pill,
    Stethoscope,
    Clock,
    TrendingUp,
    AlertCircle,
    Edit3,
    Eye,
    Plus,
    Download,
    Send,
    ArrowLeft,
    ChevronRight,
    Grid,
    List,
    Loader,
    X,
    Save,
    Check
} from 'lucide-react';

const PatientProfile = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Edit Modal State
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/patient-portal/all');
            const data = await response.json();
            if (data.success) {
                setPatients(data.data);
            } else {
                setError('Failed to fetch patients');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (patient) => {
        setEditFormData({ ...patient });
        setIsEditing(true);
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:5000/api/patient-portal/update/${editFormData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData)
            });
            const data = await response.json();

            if (data.success) {
                // Update local state
                setPatients(patients.map(p => p._id === editFormData._id ? data.data : p));
                if (selectedPatient && selectedPatient === editFormData._id) {
                    // If currently viewing details, update selection maybe?
                    // Actually list update is enough usually.
                }
                setIsEditing(false);
                setEditFormData(null);
                alert('Patient updated successfully!');
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Server error updating patient');
        } finally {
            setIsSaving(false);
        }
    };

    const patientDetails = {
        // Mock details for demonstration - in production, fetch from API
    };

    const currentPatient = selectedPatient ? patients.find(p => p._id === selectedPatient || p.patientId === selectedPatient) : null;
    const currentDetails = selectedPatient ? patientDetails[selectedPatient] : null;

    if (loading) {
        return (
            <Layout title="Patient Management">
                <div className="flex items-center justify-center h-96">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Patient Management">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-red-600 font-bold">{error}</p>
                    <button
                        onClick={() => { setError(''); setLoading(true); fetchPatients(); }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </Layout>
        );
    }

    if (selectedPatient && currentPatient) {
        // Detailed Profile View
        return (
            <Layout title="Patient Profile">
                <div className="space-y-6 italic">
                    {/* Back Button */}
                    <button
                        onClick={() => setSelectedPatient(null)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-black uppercase text-[10px] tracking-widest transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Patient List
                    </button>

                    {/* Patient Header */}
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white text-2xl font-black">
                                    {currentPatient.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-1">{currentPatient.name}</h2>
                                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Patient #{currentPatient.patientId}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEditClick(currentPatient)}
                                    className="p-3 bg-gray-50 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                                    title="Edit Patient"
                                >
                                    <Edit3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentPatient, null, 2));
                                        const downloadAnchorNode = document.createElement('a');
                                        downloadAnchorNode.setAttribute("href", dataStr);
                                        downloadAnchorNode.setAttribute("download", `${currentPatient.name}_profile.json`);
                                        document.body.appendChild(downloadAnchorNode);
                                        downloadAnchorNode.click();
                                        downloadAnchorNode.remove();
                                    }}
                                    className="p-3 bg-gray-50 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                                    title="Download Profile"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => window.open(`mailto:${currentPatient.email}?subject=Message from Hospital&body=Dear ${currentPatient.name},`)}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all"
                                >
                                    <Send className="w-4 h-4" /> Send Message
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Age', value: currentPatient.age, icon: User },
                                { label: 'Blood Group', value: currentPatient.bloodGroup, icon: Heart },
                                { label: 'Phone', value: currentPatient.phone, icon: Phone },
                                { label: 'Email', value: currentPatient.email, icon: Mail }
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

                    {/* Tabs */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-2 flex gap-2">
                        {['overview', 'consultations', 'orders', 'vitals'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && currentDetails && (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Health Metrics</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Height</span>
                                        <span className="text-lg font-black text-gray-900">{currentDetails.height}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Weight</span>
                                        <span className="text-lg font-black text-gray-900">{currentDetails.weight}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-[2.5rem] shadow-sm p-8 text-white">
                                <h4 className="text-sm font-black uppercase tracking-widest mb-6">Allergies & Conditions</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-red-200 mb-2">Allergies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {currentDetails.allergies.map((allergy, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {allergy}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-red-200 mb-2">Chronic Conditions</p>
                                        <div className="flex flex-wrap gap-2">
                                            {currentDetails.chronicConditions.map((condition, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {condition}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'consultations' && currentDetails && (
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                            <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">Consultation History</h4>
                            <div className="space-y-4">
                                {currentDetails.consultations.map(con => (
                                    <div key={con.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="font-black text-gray-900 uppercase tracking-tight mb-1">{con.doctor}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{con.speciality}</p>
                                            </div>
                                            {con.status && (
                                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                                    {con.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
                                            <span>{con.date}</span>
                                            <span className="text-gray-300">•</span>
                                            <span>{con.time}</span>
                                        </div>
                                        {con.notes && (
                                            <p className="mt-3 text-xs text-gray-600 italic">{con.notes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && currentDetails && (
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                            <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">Medicine Orders</h4>
                            <div className="space-y-4">
                                {currentDetails.recentOrders.map(order => (
                                    <div key={order.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <Package className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 uppercase tracking-tight">{order.item}</p>
                                                <p className="text-[10px] text-gray-400 font-bold">Order ID: {order.id} • {order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <p className="text-lg font-black text-gray-900">{order.amount}</p>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'vitals' && currentDetails && (
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                            <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">Vital Signs History</h4>
                            <div className="space-y-4">
                                {currentDetails.vitals.map((vital, i) => (
                                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{vital.date}</p>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">BP</p>
                                                <p className="text-lg font-black text-gray-900">{vital.bp}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Pulse</p>
                                                <p className="text-lg font-black text-gray-900">{vital.pulse}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Temp</p>
                                                <p className="text-lg font-black text-gray-900">{vital.temp}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">SpO2</p>
                                                <p className="text-lg font-black text-gray-900">{vital.spo2}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        );
    }

    // Table View (Default)
    return (
        <Layout title="Patient Management">
            <div className="space-y-8 italic">
                {/* Header & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Patients', value: patients.length, icon: User, color: 'blue' },
                        { label: 'Active', value: patients.filter(p => p.status === 'Active').length, icon: Activity, color: 'green' },
                        { label: 'Total Appointments', value: patients.reduce((sum, p) => sum + p.appointments, 0), icon: Calendar, color: 'purple' },
                        { label: 'Active Orders', value: patients.reduce((sum, p) => sum + p.orders, 0), icon: Package, color: 'orange' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients by name, ID, email..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex gap-2 bg-gray-50 p-1 rounded-2xl">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`p-2 rounded-xl transition-all ${viewMode === 'cards' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                        </div>
                        <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:bg-gray-100 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
                            <Plus className="w-4 h-4" /> Add Patient
                        </button>
                    </div>
                </div>

                {/* Patients Cards View */}
                {viewMode === 'cards' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.map(patient => (
                            <div
                                key={patient._id}
                                onClick={() => setSelectedPatient(patient.patientId)}
                                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-[2rem] flex items-center justify-center font-black text-gray-400 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {patient.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{patient.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{patient.patientId}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${patient.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {patient.status}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Phone className="w-3 h-3 text-gray-400" />
                                        <span className="font-bold text-gray-700">{patient.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Mail className="w-3 h-3 text-gray-400" />
                                        <span className="font-bold text-gray-700 truncate">{patient.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Heart className="w-3 h-3 text-gray-400" />
                                        <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest">{patient.bloodGroup}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-black text-gray-900">{patient.appointments}</p>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Appts</p>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-black text-gray-900">{patient.prescriptions}</p>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Rx</p>
                                    </div>
                                    <div className="text-center p-2 bg-gray-50 rounded-xl">
                                        <p className="text-xs font-black text-gray-900">{patient.orders}</p>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Orders</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs">
                                    <span className="text-gray-400 font-bold">Last visit: {patient.lastVisit}</span>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Patients Table */}
                {viewMode === 'table' && (
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Patient</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Blood Group</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Last Visit</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {patients.map(patient => (
                                    <tr key={patient._id} className="hover:bg-blue-50/20 transition-all group">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 uppercase tracking-tight">{patient.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{patient.patientId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <p className="text-sm font-bold text-gray-700">{patient.phone}</p>
                                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{patient.email}</p>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-widest">
                                                {patient.bloodGroup}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <p className="text-sm font-bold text-gray-700">{patient.lastVisit}</p>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${patient.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8">
                                            <button
                                                onClick={() => setSelectedPatient(patient.patientId)}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all group"
                                            >
                                                View Profile <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && editFormData && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Edit Patient</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">ID: {editFormData.patientId}</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={editFormData.name}
                                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone</label>
                                    <input
                                        type="text"
                                        value={editFormData.phone}
                                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Age</label>
                                    <input
                                        type="number"
                                        value={editFormData.age}
                                        onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Gender</label>
                                    <select
                                        value={editFormData.gender}
                                        onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Blood Group</label>
                                    <select
                                        value={editFormData.bloodGroup}
                                        onChange={(e) => setEditFormData({ ...editFormData, bloodGroup: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Status</label>
                                    <select
                                        value={editFormData.status || 'Active'}
                                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Discharged">Discharged</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Address</label>
                                    <input
                                        type="text"
                                        value={editFormData.address}
                                        onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center gap-2 items-center"
                                >
                                    {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default PatientProfile;
