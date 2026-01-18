import { useState, useEffect } from 'react';
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

    const recentActivity = [
        { icon: UserPlus, text: 'Dr. Smith added a new patient', time: '2 minutes ago', color: 'blue' },
        { icon: FileText, text: 'Invoice #4022 paid', time: '15 minutes ago', color: 'green' },
        { icon: AlertCircle, text: 'Low stock: Surgical Gloves', time: '1 hour ago', color: 'orange' },
    ];

    const doctors = [
        { name: 'Dr. James', specialty: 'Cardiology', status: 'Available', color: 'green' },
        { name: 'Dr. Linda', specialty: 'Surgery', status: 'In Surgery', color: 'red' },
        { name: 'Dr. Chen', specialty: 'General', status: 'Off Duty', color: 'gray' },
    ];

    if (loading) {
        return (
            <Layout title="Control Center">
                <div className="flex items-center justify-center h-96">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Control Center">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                <StatsCard
                    title="Total Patients"
                    value={stats?.totalPatients?.value || 12450}
                    change={stats?.totalPatients?.change || 12}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="Appointments Today"
                    value={stats?.appointmentsToday?.value || 84}
                    change={stats?.appointmentsToday?.change || 5}
                    icon={Calendar}
                    color="blue"
                />
                <StatsCard
                    title="Active Staff"
                    value={stats?.activeStaff?.value || 142}
                    status={stats?.activeStaff?.status || 'Stable'}
                    icon={UserCheck}
                    color="purple"
                />
                <StatsCard
                    title="Revenue Today"
                    value={`$${(stats?.revenueToday?.value || 45200).toLocaleString()}`}
                    change={stats?.revenueToday?.change || 8}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    title="Pending Payments"
                    value={`$${(stats?.pendingPayments?.value || 12050).toLocaleString()}`}
                    status="Action Required"
                    icon={AlertCircle}
                    color="orange"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2">
                    <VisitTrendsChart />
                </div>

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
                        {[
                            { name: 'Cardiology', percentage: 40, amount: '$1.2M', color: 'blue' },
                            { name: 'Orthopedics', percentage: 30, amount: '$900K', color: 'purple' },
                            { name: 'Neurology', percentage: 20, amount: '$600K', color: 'indigo' },
                            { name: 'Others', percentage: 10, amount: '$300K', color: 'gray' },
                        ].map((dept) => (
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
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">Total</span>
                            <span className="text-lg font-bold text-gray-900">$1.2M</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity & Doctor Availability */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => {
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
                            })}
                        </div>
                    </div>

                    {/* Doctor Availability */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Doctor Availability</h3>
                        <div className="space-y-3">
                            {doctors.map((doctor, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                            {doctor.name.split(' ')[1].charAt(0)}
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
                            ))}
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
                            <span className="text-sm font-bold text-gray-900">82% Total</span>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">ICU</span>
                                    <span className="font-semibold">9/10</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">General Ward</span>
                                    <span className="font-semibold">45/60</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-gray-600">Private Rooms</span>
                                    <span className="font-semibold">12/20</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
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
                            {doctors.map((doctor, index) => (
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
                                <span className="text-lg font-bold text-red-600">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Surgeries Today</span>
                                <span className="text-lg font-bold text-blue-600">7</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Discharges Pending</span>
                                <span className="text-lg font-bold text-green-600">5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
