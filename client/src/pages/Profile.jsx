import Layout from '../components/Layout/Layout';
import ProfileForm from '../components/Profile/ProfileForm';
import WeeklySchedule from '../components/Profile/WeeklySchedule';
import { Save, Users, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();
    const [isOnCall, setIsOnCall] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [weeklyCount, setWeeklyCount] = useState(0);

    useEffect(() => {
        if (user) {
            const fetchAppointments = async () => {
                try {
                    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    if (!userInfo || !userInfo.token) {
                        console.error("No token found for profile fetch");
                        return;
                    }

                    // Fetch appointments where doctor name matches logged in user
                    // Note: In real app, use ID. Here we match the string "Dr. First Last"
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` }
                    };
                    const response = await fetch(`http://localhost:5000/api/appointments?doctor=${encodeURIComponent(user.name)}`, config);
                    const data = await response.json();
                    setAppointments(Array.isArray(data) ? data : []);

                    // Calculate weekly stats
                    // Simple check for now: count all future appointments or effectively "active" ones
                    // A better logic would be checking dates.
                    const now = new Date();
                    const weekFromNow = new Date();
                    weekFromNow.setDate(now.getDate() + 7);

                    const count = data.filter(appt => {
                        const d = new Date(appt.date);
                        return d >= now && d <= weekFromNow;
                    }).length;
                    setWeeklyCount(count);

                } catch (error) {
                    console.error("Failed to fetch appointments", error);
                }
            };
            fetchAppointments();
        }
    }, [user]);

    return (
        <Layout title="My Profile">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{user?.name || 'Dr. User'}</h2>
                        <p className="text-gray-500 mt-1">Manage your profile details and working hours availability.</p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-4">
                        <ProfileForm />
                    </div>

                    {/* Right Column - Status & Schedule */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Top Stats/Status Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* On-Call Status */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 mb-1">On-Call Status</p>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-[120px]">
                                        You are currently {isOnCall ? <span className="text-blue-600 font-bold">visible</span> : <span className="text-red-600 font-bold">hidden</span>} to patients.
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isOnCall ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {isOnCall ? 'Available' : 'Away'}
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={isOnCall} onChange={() => setIsOnCall(!isOnCall)} className="sr-only peer" />
                                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Weekly Patients */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                                <h3 className="text-3xl font-bold text-gray-900">{weeklyCount}</h3>
                                <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Patients this week</p>
                            </div>

                            {/* Average Rating */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-3xl font-bold text-gray-900">4.9</h3>
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
                                </div>
                                <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Average Rating</p>
                            </div>
                        </div>

                        {/* Weekly Schedule */}
                        <WeeklySchedule />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
