import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import BookingModal from '../components/Appointments/BookingModal';
import { Download, Plus, Search, Calendar, Filter, MoreVertical } from 'lucide-react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('http://localhost:5000/api/appointments', config);
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Mock data for display
    const mockAppointments = [
        {
            time: '09:30 AM',
            patient: { name: 'Sarah Jenkins', id: '#4920' },
            doctor: { initials: 'AS', name: 'Dr. A. Smith' },
            department: 'Cardiology',
            type: 'Check-up',
            status: 'Confirmed'
        },
        {
            time: '10:15 AM',
            patient: { name: 'Michael Chen', id: '#4921' },
            doctor: { initials: 'BJ', name: 'Dr. B. Johnson' },
            department: 'Neurology',
            type: 'Follow-up',
            status: 'Pending'
        },
        {
            time: '11:00 AM',
            patient: { name: 'Emily Davis', id: '#4922' },
            doctor: { initials: 'AS', name: 'Dr. A. Smith' },
            department: 'Cardiology',
            type: 'Initial Consult',
            status: 'Cancelled'
        },
        {
            time: '11:45 AM',
            patient: { name: 'Robert Wilson', id: '#4923' },
            doctor: { initials: 'CW', name: 'Dr. C. Williams' },
            department: 'Pediatrics',
            type: 'Vaccination',
            status: 'Completed'
        },
        {
            time: '01:30 PM',
            patient: { name: 'Amanda Lee', id: '#4924' },
            doctor: { initials: 'AS', name: 'Dr. A. Smith' },
            department: 'Cardiology',
            type: 'Surgery Follow-up',
            status: 'Confirmed'
        },
        {
            time: '02:15 PM',
            patient: { name: 'James K.', id: '#4925' },
            doctor: { initials: 'BJ', name: 'Dr. B. Johnson' },
            department: 'Neurology',
            type: 'MRI Review',
            status: 'Confirmed'
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-orange-100 text-orange-700';
            case 'Cancelled':
                return 'bg-red-100 text-red-700';
            case 'Completed':
                return 'bg-gray-100 text-gray-700';
            default:
                return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <Layout title="Appointment Overview">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">142</h3>
                        <span className="text-sm text-green-600 font-medium mb-1">↗5%</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Pending Confirmation</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">12</h3>
                        <span className="text-sm text-red-600 font-medium mb-1">↘2%</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Doctors on Duty</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">45</h3>
                        <span className="text-sm text-gray-600 font-medium mb-1">Active now</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Cancellations</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-gray-900">3</h3>
                        <span className="text-sm text-red-600 font-medium mb-1">↗1%</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl border border-gray-200">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Manage and schedule hospital-wide patient appointments.</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                New Appointment
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Patient, ID, or Doctor..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Doctors</option>
                            <option>Dr. A. Smith</option>
                            <option>Dr. B. Johnson</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>All Departments</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                        </select>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Oct 24, 2023
                        </button>
                        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                            <button className="px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium">
                                ≡ List
                            </button>
                            <button className="px-3 py-2 hover:bg-gray-50 text-gray-600 text-sm font-medium">
                                ▦ Calendar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Department
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Visit Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockAppointments.map((appointment, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{appointment.patient.name}</p>
                                            <p className="text-xs text-gray-500">{appointment.patient.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-semibold text-blue-600">{appointment.doctor.initials}</span>
                                            </div>
                                            <span className="text-sm text-gray-900">{appointment.doctor.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{appointment.department}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-600">{appointment.type}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                            ● {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                            <MoreVertical className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">Showing 1-6 of 142 appointments</p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                            ‹
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                            ›
                        </button>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchAppointments}
            />
        </Layout>
    );
};

export default Appointments;
