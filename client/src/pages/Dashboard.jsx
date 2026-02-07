import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import StatsCard from '../components/Dashboard/StatsCard';
import VisitTrendsChart from '../components/Dashboard/VisitTrendsChart';
import {
    Users,
    Calendar,
    UserCheck,
    DollarSign,
    AlertCircle,
    UserPlus,
    CalendarPlus,
    FileText,
    Pill,
    Activity
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo || !userInfo.token) {
                    console.log("No valid token found, skipping stats fetch.");
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/stats/dashboard', config);
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Icon mapping for dynamic activity
    const iconMap = {
        UserPlus,
        FileText,
        AlertCircle,
        Calendar,
        CalendarPlus,
        Users
    };

    const displayActivity = stats?.recentActivity?.map(a => ({
        ...a,
        icon: iconMap[a.icon] || UserPlus
    })) || [];

    const displayDoctors = stats?.doctors || [];

    const displayRevenueByDept = stats?.revenueByDept || [];


    const totalBeds = (stats?.bedOccupancy?.icu || 0) + (stats?.bedOccupancy?.general || 0) + (stats?.bedOccupancy?.private || 0);
    const totalCapacity = 90; // Fixed capacity for percentage calculation
    const totalOccupancyPercent = Math.round((totalBeds / totalCapacity) * 100);

    if (loading) {
        return (
            <Layout title="Control Center">
                <div className="flex items-center justify-center h-96">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <Layout title="Control Center">
            {/* Stats Grid with Staggered Animation */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
            >
                <StatsCard
                    title="Total Patients"
                    value={stats?.totalPatients?.value || 0}
                    change={stats?.totalPatients?.change || 0}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Appointments Today"
                    value={stats?.appointmentsToday?.value || 0}
                    change={stats?.appointmentsToday?.change || 0}
                    icon={Calendar}
                    color="blue"
                />
                <StatsCard
                    title="Active Staff"
                    value={stats?.activeStaff?.value || 0}
                    status={stats?.activeStaff?.status || 'Active'}
                    icon={UserCheck}
                    color="purple"
                />
                <StatsCard
                    title="Revenue Today"
                    value={`$${(stats?.revenueToday?.value || 0).toLocaleString()}`}
                    change={stats?.revenueToday?.change || 0}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    title="Pending Payments"
                    value={`$${(stats?.pendingPayments?.value || 0).toLocaleString()}`}
                    status="Action Required"
                    icon={AlertCircle}
                    color="orange"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart with premium container */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-5 group-hover:opacity-10 transition duration-1000 group-hover:duration-200"></div>
                    <VisitTrendsChart data={stats?.trends} />
                </motion.div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2">
                            <UserPlus className="w-6 h-6" />
                            <span className="text-sm font-medium">Admit</span>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2">
                            <CalendarPlus className="w-6 h-6" />
                            <span className="text-sm font-medium">Book Appt</span>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2">
                            <FileText className="w-6 h-6" />
                            <span className="text-sm font-medium">Invoice</span>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all flex flex-col items-center gap-2">
                            <Pill className="w-6 h-6" />
                            <span className="text-sm font-medium">Prescribe</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Revenue by Department */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Department</h3>
                    <div className="space-y-4">
                        {displayRevenueByDept.length > 0 ? displayRevenueByDept.map((dept) => (
                            <div key={dept.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full bg-${dept.color}-500`}></div>
                                        <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-900">{dept.amount}</span>
                                        <span className="text-sm text-gray-500">{dept.percentage}%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className={`bg-${dept.color}-500 h-2 rounded-full transition-all`}
                                        style={{ width: `${dept.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-6 text-gray-400 font-medium italic">No revenue data available</div>
                        )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">Total Revenue Identified</span>
                            <span className="text-lg font-bold text-gray-900">
                                ${displayRevenueByDept.reduce((acc, curr) => acc + parseInt(curr.amount.replace(/[^0-9]/g, '') || 0), 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Doctor Availability */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {displayActivity.length > 0 ? displayActivity.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className={`w-8 h-8 rounded-lg bg-${activity.color}-50 flex items-center justify-center flex-shrink-0`}>
                                            <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="text-center py-6 text-gray-400 font-medium italic">No recent activity detected</div>
                            )}
                        </div>
                    </div>

                    {/* Doctor Availability */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Doctor Availability</h3>
                        <div className="space-y-3">
                            {displayDoctors.length > 0 ? displayDoctors.map((doctor, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {doctor.name.split(' ').pop().charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{doctor.name}</p>
                                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${doctor.color === 'green' ? 'bg-green-100 text-green-700' :
                                        doctor.color === 'red' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {doctor.status}
                                    </span>
                                </div>
                            )) : (
                                <div className="text-center py-6 text-gray-400 font-medium italic">No medical staff found</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Hospital Operations */}
            <div className="mt-6 bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Hospital Operations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bed Occupancy */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600">Bed Occupancy</span>
                            <span className="text-sm font-bold text-gray-900">{totalOccupancyPercent || 0}% Total</span>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">ICU</span>
                                    <span className="font-semibold">{stats?.bedOccupancy?.icu || 0}/10</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(stats?.bedOccupancy?.icu || 0) * 10}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">General Ward</span>
                                    <span className="font-semibold">{stats?.bedOccupancy?.general || 0}/60</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${((stats?.bedOccupancy?.general || 0) / 60) * 100}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">Private Rooms</span>
                                    <span className="font-semibold">{stats?.bedOccupancy?.private || 0}/20</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${((stats?.bedOccupancy?.private || 0) / 20) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Availability Summary */}
                    <div className="border-l border-gray-200 pl-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-600">Doctor Availability</span>
                        </div>
                        <div className="space-y-2">
                            {displayDoctors.slice(0, 3).map((doctor, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">{doctor.name}</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${doctor.color === 'green' ? 'bg-green-100 text-green-700' :
                                        doctor.color === 'red' ? 'bg-red-100 text-red-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {doctor.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="border-l border-gray-200 pl-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Emergency Cases</span>
                                <span className="text-lg font-bold text-red-600">{stats?.emergencyToday || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Surgeries Today</span>
                                <span className="text-lg font-bold text-blue-600">{stats?.surgeriesToday || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Discharges Pending</span>
                                <span className="text-lg font-bold text-green-600">{stats?.dischargesPending || 0}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
