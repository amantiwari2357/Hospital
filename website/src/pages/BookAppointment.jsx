import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle2, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

const BookAppointment = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        speciality: '',
        doctor: '',
        date: '',
        time: '',
        patientName: '',
        phone: ''
    });

    const [specialities, setSpecialities] = useState([]);
    const [doctorsMap, setDoctorsMap] = useState({});
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchSpecs = async () => {
            try {
                const response = await fetch('https://hospital-40m0.onrender.com/api/appointments/specialities');
                const data = await response.json();
                setSpecialities(data.specialities || []);
                setDoctorsMap(data.doctors || {});
            } catch (error) {
                console.error('Error fetching specialities:', error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchSpecs();
    }, []);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('patientToken');
            const patientData = JSON.parse(localStorage.getItem('patientData'));

            if (!token || !patientData) {
                console.error("User not logged in");
                // For now allow proceed or handle error
            }

            const response = await fetch('https://hospital-40m0.onrender.com/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    patientName: formData.patientName,
                    doctor: formData.doctor,
                    date: formData.date,
                    time: formData.time,
                    department: formData.speciality,
                    phone: formData.phone,
                    patientPortalId: patientData?.id
                })
            });

            if (response.ok) {
                setStep(4);
            } else {
                console.error("Failed to book appointment");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen italic">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 pt-44 lg:pt-64 pb-24">
                <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-20 h-20 bg-medical-500 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-medical-200">
                            <Calendar className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 uppercase italic mb-4">Book Appointment</h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure your clinical consultation in minutes</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center justify-between mb-16 max-w-md mx-auto relative px-4">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${step >= s ? 'bg-medical-500 text-white scale-110' : 'bg-white text-slate-300'
                                    }`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                {loadingData ? (
                                    <div className="col-span-2 py-10 flex flex-col items-center justify-center space-y-4">
                                        <div className="w-8 h-8 border-4 border-medical-500 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing Clinical Units..</p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-8 w-full">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Select Speciality</label>
                                            <select
                                                className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                                value={formData.speciality}
                                                onChange={(e) => setFormData({ ...formData, speciality: e.target.value, doctor: '' })}
                                            >
                                                <option value="">Clinical Domain..</option>
                                                {specialities.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Preferred Doctor</label>
                                            <select
                                                className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                                value={formData.doctor}
                                                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                                disabled={!formData.speciality}
                                            >
                                                <option value="">Consultant..</option>
                                                {doctorsMap[formData.speciality]?.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={!formData.speciality || !formData.doctor}
                                    className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
                                >
                                    Proceed to Schedule
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Pick a Date</label>
                                        <input
                                            type="date"
                                            className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Slot Time</label>
                                        <select
                                            className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="">Select Time..</option>
                                            <option>09:00 AM</option>
                                            <option>11:30 AM</option>
                                            <option>02:15 PM</option>
                                            <option>04:30 PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={handleBack} className="flex-1 bg-slate-100 text-slate-600 py-6 rounded-2xl font-black uppercase text-xs">Back</button>
                                    <button onClick={handleNext} disabled={!formData.date || !formData.time} className="flex-[2] bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs">Final Details</button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-6">
                                    <input
                                        type="text"
                                        placeholder="Patient Full Name.."
                                        className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                        value={formData.patientName}
                                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number.."
                                        className="w-full bg-slate-50 p-5 rounded-2xl border-none font-black text-slate-700 focus:ring-2 focus:ring-medical-500 italic"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!formData.patientName || !formData.phone}
                                    className="w-full bg-medical-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-medical-700 transition-all shadow-xl shadow-medical-100"
                                >
                                    Confirm Booking
                                </button>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase italic mb-4">Appointment Confirmed!</h2>
                                <p className="text-slate-500 font-bold text-sm italic mb-12">
                                    Your session with {formData.doctor} is scheduled for {formData.date} at {formData.time}.
                                    Confirmation details sent via SMS.
                                </p>
                                <div className="space-y-4">
                                    <button onClick={() => window.location.href = '/'} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest">Return Home</button>
                                    <button onClick={() => window.location.href = '/profile'} className="w-full bg-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase text-xs tracking-widest">View in Profile</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
