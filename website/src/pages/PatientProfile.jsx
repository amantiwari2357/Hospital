import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import {
    User,
    Calendar,
    FileText,
    Package,
    Bell,
    Settings,
    Activity,
    ArrowUpRight,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    LogOut,
    Loader
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [orders, setOrders] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('patientToken');
        if (!token) {
            navigate('/portal-login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Profile
                const profileRes = await fetch('http://localhost:5000/api/patient-portal/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const profileData = await profileRes.json();

                if (profileData.success) {
                    console.log("Profile Data:", profileData.data);
                    setUser(profileData.data);

                    // Fetch Appointments
                    const fetchUrl = `http://localhost:5000/api/appointments?patientPortalId=${profileData.data._id}`;
                    console.log("Fetching appointments from:", fetchUrl);

                    const apptRes = await fetch(fetchUrl, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    if (apptRes.ok) {
                        const apptData = await apptRes.json();
                        setAppointments(Array.isArray(apptData) ? apptData : []);
                    }

                    // Fetch Orders
                    const orderRes = await fetch('http://localhost:5000/api/orders/myorders', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (orderRes.ok) {
                        const orderData = await orderRes.json();
                        setOrders(Array.isArray(orderData) ? orderData : []);
                    }

                } else {
                    setError('Failed to load profile');
                    if (profileRes.status === 401) {
                        handleLogout();
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('patientToken');
        localStorage.removeItem('patientData');
        navigate('/portal-login');
    };

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen flex items-center justify-center">
                <Loader className="w-8 h-8 text-medical-600 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }



    const consultations = [
        { id: 'CON-102', doctor: 'Dr. Sarah Wilson', speciality: 'Cardiology', date: 'Jan 28, 2024', time: '10:30 AM' },
        { id: 'CON-105', doctor: 'Dr. James Miller', speciality: 'Neurology', date: 'Feb 12, 2024', time: '02:15 PM', status: 'Upcoming' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64 pb-24">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar / Profile Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-medical-500 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-black mb-6 shadow-2xl shadow-medical-200">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 mb-1">{user.name}</h1>
                                <p className="text-medical-600 font-bold text-sm uppercase tracking-widest mb-4 italic">Patient #{user.patientId}</p>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-all mb-8"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 italic">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Blood Group</p>
                                        <p className="text-xl font-black text-slate-900">{user.bloodGroup || 'N/A'}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 italic">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Age</p>
                                        <p className="text-xl font-black text-slate-900">{user.age}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-slate-100 space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-medical-50 group-hover:text-medical-600 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="italic">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Phone</p>
                                        <p className="text-sm font-bold text-slate-700">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-medical-50 group-hover:text-medical-600 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div className="italic">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Email</p>
                                        <p className="text-sm font-bold text-slate-700">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Activity className="w-32 h-32" />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-widest mb-6 relative italic">Health Metrics</h4>
                            <div className="space-y-4 relative italic">
                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <div>
                                        <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1 italic">Height</p>
                                        <p className="text-xl font-black">{user.height}</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-medical-400" />
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1 italic">Weight</p>
                                        <p className="text-xl font-black">{user.weight}</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-medical-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8 italic">

                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">
                            {[
                                { title: 'Appointments', value: appointments.length.toString().padStart(2, '0'), icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { title: 'Prescriptions', value: '00', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
                                { title: 'Active Orders', value: orders.length.toString().padStart(2, '0'), icon: Package, color: 'text-medical-600', bg: 'bg-medical-50' },
                            ].map((card) => (
                                <div key={card.title} className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center shadow-lg shadow-slate-200/50">
                                    <div className={`w-10 h-10 md:w-14 md:h-14 ${card.bg} ${card.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4`}>
                                        <card.icon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <h5 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic truncate w-full">{card.title}</h5>
                                    <p className="text-xl md:text-3xl font-black text-slate-900 italic">{card.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders Table */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 italic">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Medicine Orders</h3>
                                <button className="text-[10px] font-black text-medical-600 uppercase tracking-widest hover:underline italic">View History</button>
                            </div>
                            <div className="space-y-4 italic">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <div key={order._id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-4 group hover:border-medical-200 transition-colors italic">
                                            <div className="flex items-center gap-4 italic">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-medical-500 group-hover:text-white transition-colors italic">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 italic uppercase">
                                                        {order.orderItems.map(i => i.name).join(', ')}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-bold italic">Order ID: #{order._id.slice(-6)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between md:justify-end gap-12 italic">
                                                <div className="text-right italic">
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic leading-none mb-1">Total</p>
                                                    <p className="text-lg font-black text-slate-900 italic">₹{order.totalAmount}</p>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-medical-100 text-medical-600'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-slate-400">
                                        No medicine orders found.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Consultations */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 italic">
                            <div className="flex justify-between items-center mb-10 italic">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Upcoming Consultations</h3>
                                <button onClick={() => navigate('/book-appointment')} className="text-[10px] font-black text-medical-600 uppercase tracking-widest hover:underline italic">Schedule New</button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 italic">
                                {appointments.length > 0 ? (
                                    appointments.map((appt) => (
                                        <div key={appt._id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-colors group italic">
                                            <div className="flex justify-between items-start mb-6 italic">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 italic">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">{appt.status || "Scheduled"}</span>
                                            </div>
                                            <h4 className="text-lg font-black text-slate-900 italic uppercase mb-1">{appt.doctor}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 italic">{appt.department}</p>
                                            <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50 italic">
                                                <p className="text-sm font-black text-slate-700 italic">{new Date(appt.date).toLocaleDateString()}</p>
                                                <span className="text-slate-300">•</span>
                                                <p className="text-sm font-black text-slate-700 italic">{appt.time}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-10 text-slate-400">
                                        No upcoming consultations found.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
