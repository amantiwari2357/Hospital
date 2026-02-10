import { useState } from 'react';
import { X, Search, Calendar as CalendarIcon, Clock } from 'lucide-react';
import axios from 'axios';

const BookingModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        doctor: '',
        date: '',
        time: '',
        type: 'Consultation',
        notes: '',
        department: 'Cardiology'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('https://hospital-40m0.onrender.com/api/appointments', formData, config);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Book Appointment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Patient Name
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={formData.patientName}
                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Search for patient..."
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Doctor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Doctor
                            </label>
                            <select
                                value={formData.doctor}
                                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select doctor</option>
                                <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins</option>
                                <option value="Dr. A. Smith">Dr. A. Smith</option>
                                <option value="Dr. B. Johnson">Dr. B. Johnson</option>
                            </select>
                        </div>

                        {/* Visit Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Visit Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Consultation">Consultation</option>
                                <option value="Check-up">Check-up</option>
                                <option value="Follow-up">Follow-up</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time
                            </label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows="3"
                            placeholder="Add any specific notes for the doctor..."
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
