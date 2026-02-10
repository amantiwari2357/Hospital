import Layout from '../components/Layout/Layout';
import ProfileForm from '../components/Profile/ProfileForm';
import WeeklySchedule from '../components/Profile/WeeklySchedule';
import { Save, Users, Star, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, login } = useAuth(); // login used to update context
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [weeklyCount, setWeeklyCount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) return;

                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                };

                // Fetch full profile
                const profileRes = await fetch('https://hospital-40m0.onrender.com/api/users/profile', config);
                const profile = await profileRes.json();

                if (profileRes.ok) {
                    setProfileData(profile);
                }

                // Fetch Appointments (existing logic)
                const apptRes = await fetch(`https://hospital-40m0.onrender.com/api/appointments?doctor=${encodeURIComponent(user?.name)}`, config);
                const apptData = await apptRes.json();
                setAppointments(Array.isArray(apptData) ? apptData : []);

                // Calculate stats
                const now = new Date();
                const weekFromNow = new Date();
                weekFromNow.setDate(now.getDate() + 7);
                const count = (Array.isArray(apptData) ? apptData : []).filter(appt => {
                    const d = new Date(appt.date);
                    return d >= now && d <= weekFromNow;
                }).length;
                setWeeklyCount(count);

            } catch (error) {
                console.error("Failed to fetch profile", error);
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleProfileUpdate = (updatedFields) => {
        setProfileData(prev => ({ ...prev, ...updatedFields }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(profileData)
            };

            const response = await fetch('https://hospital-40m0.onrender.com/api/users/profile', config);
            const data = await response.json();

            if (response.ok) {
                toast.success("Profile updated successfully");
                // Update local storage and context if needed
                // Note: deciding not to force re-login, but local user context might need refresh
                // For now, relies on next page load or we could update context manually if expose a setter
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Error updating profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <Layout title="My Profile">
                <div className="flex items-center justify-center h-[60vh]">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="My Profile">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{profileData?.name || user?.name || 'Dr. User'}</h2>
                        <p className="text-gray-500 mt-1">Manage your profile details and working hours availability.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 disabled:opacity-50"
                    >
                        {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-4">
                        <ProfileForm
                            data={profileData || {}}
                            onChange={handleProfileUpdate}
                        />
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
                                        You are currently {profileData?.isOnCall ? <span className="text-blue-600 font-bold">visible</span> : <span className="text-red-600 font-bold">hidden</span>} to patients.
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${profileData?.isOnCall ? 'text-blue-600' : 'text-gray-400'}`}>
                                        {profileData?.isOnCall ? 'Available' : 'Away'}
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={profileData?.isOnCall || false}
                                            onChange={(e) => handleProfileUpdate({ isOnCall: e.target.checked })}
                                            className="sr-only peer"
                                        />
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
                                    <h3 className="text-3xl font-bold text-gray-900">{profileData?.rating || 0}</h3>
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
                                </div>
                                <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-wider">Average Rating</p>
                            </div>
                        </div>

                        {/* Weekly Schedule */}
                        <WeeklySchedule
                            schedule={profileData?.schedule || []}
                            onChange={(newSchedule) => handleProfileUpdate({ schedule: newSchedule })}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
