import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { medicinesData } from '../utils/medicinesData';
import { useCart } from '../context/CartContext';
import MedicineCard from '../components/medicines/MedicineCard';
import {
    ChevronLeft,
    Star,
    ShieldCheck,
    Clock,
    Truck,
    CheckCircle2,
    AlertCircle,
    Package,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MedicineDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [medicine, setMedicine] = useState(null);
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderStep, setOrderStep] = useState(1); // 1: Info, 2: Address, 3: Confirm

    useEffect(() => {
        const found = medicinesData.find(m => m.id === id);
        if (found) setMedicine(found);
    }, [id]);

    if (!medicine) return <div className="pt-32 text-center">Loading clinical data...</div>;

    const handlePlaceOrder = () => {
        setIsOrdering(true);
    };

    const nextStep = () => setOrderStep(prev => prev + 1);
    const prevStep = () => setOrderStep(prev => Math.max(1, prev - 1));

    const confirmOrder = () => {
        setOrderStep(4); // Success state
        setTimeout(() => {
            // In a real app, we'd save the order
        }, 2000);
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64 pb-24">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs mb-12 hover:text-medical-600 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Pharmacy
                </button>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Product Images */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 rounded-[3rem] p-12 lg:p-24 flex items-center justify-center border border-slate-100"
                        >
                            <img
                                src={medicine.image}
                                alt={medicine.name}
                                className="max-w-full h-auto rounded-3xl shadow-2xl scale-110"
                            />
                        </motion.div>

                        <div className="mt-16 grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-medical-600 italic">Composition & Usage</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{medicine.usage}</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] border border-slate-100">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-medical-600 italic">Clinical Description</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{medicine.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info & Order Panel */}
                    <div className="lg:col-span-12 xl:col-span-5 sticky top-32">
                        <div className="bg-white rounded-[3rem] p-10 lg:p-12 border border-slate-100 shadow-xl shadow-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-medical-50 text-medical-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {medicine.category}
                                </span>
                                {medicine.prescriptionRequired && (
                                    <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> Prescription Required
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-none italic uppercase">
                                {medicine.name}
                            </h1>

                            <div className="flex items-center gap-8 mb-10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Unit Price</p>
                                    <p className="text-4xl font-black text-medical-600 leading-none">â‚¹{medicine.price}</p>
                                </div>
                                <div className="h-10 w-px bg-slate-100" />
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                                    <p className="text-2xl font-black text-slate-900 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> {medicine.rating}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Truck className="w-5 h-5 text-medical-500" />
                                    <p className="text-sm font-bold tracking-tight uppercase">Express Delivery within 24 Hours</p>
                                </div>
                                <div className="flex items-center gap-3 text-slate-500">
                                    <Clock className="w-5 h-5 text-medical-500" />
                                    <p className="text-sm font-bold tracking-tight uppercase">Order within next 2hrs for same-day</p>
                                </div>
                            </div>

                            {!isOrdering ? (
                                <button
                                    onClick={handlePlaceOrder}
                                    className="w-full bg-medical-600 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-medical-700 transition-all shadow-xl shadow-medical-100 flex items-center justify-center gap-3"
                                >
                                    Place Order Now <ArrowRight className="w-6 h-6" />
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-50 p-8 rounded-3xl border border-slate-100"
                                >
                                    {orderStep === 1 && (
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight italic">Confirm Details</h4>
                                            <div className="space-y-4 mb-8">
                                                <div className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center italic">
                                                    <span className="text-slate-400 font-bold text-xs uppercase">Quantity</span>
                                                    <span className="font-black text-slate-900">01 Pack</span>
                                                </div>
                                                <div className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center italic">
                                                    <span className="text-slate-400 font-bold text-xs uppercase">Bill Amount</span>
                                                    <span className="font-black text-medical-600 tracking-widest">â‚¹{medicine.price + 50} <span className="text-[10px] text-slate-400">(incl. Delivery)</span></span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={nextStep}
                                                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-all"
                                            >
                                                Proceed to Address
                                            </button>
                                        </div>
                                    )}

                                    {orderStep === 2 && (
                                        <div>
                                            <h4 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight italic">Delivery Address</h4>
                                            <textarea
                                                placeholder="Enter full clinical delivery address..."
                                                className="w-full bg-white p-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-medical-500 font-bold text-sm mb-8 resize-none"
                                                rows="3"
                                            />
                                            <div className="flex gap-4">
                                                <button onClick={prevStep} className="flex-grow bg-slate-200 text-slate-600 py-4 rounded-2xl font-black uppercase text-xs uppercase tracking-widest">Back</button>
                                                <button onClick={confirmOrder} className="flex-[2] bg-medical-500 text-white py-4 rounded-2xl font-black uppercase text-xs uppercase tracking-widest">Place Order</button>
                                            </div>
                                        </div>
                                    )}

                                    {orderStep === 4 && (
                                        <div className="text-center py-4">
                                            <div className="w-20 h-20 bg-medical-100 text-medical-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 mb-2 uppercase italic">Success!</h4>
                                            <p className="text-slate-500 font-bold text-sm mb-8 italic">Your order #CS-{Math.floor(Math.random() * 9000) + 1000} has been confirmed. Tracking details sent via SMS.</p>
                                            <button
                                                onClick={() => navigate('/profile')}
                                                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                            >
                                                Go to Profile <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mt-32">
                    <div className="flex justify-between items-center mb-12">
                        <div className="italic">
                            <h2 className="text-3xl font-black text-slate-900 uppercase italic">People also viewed</h2>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Clinical alternatives in {medicine.category}</p>
                        </div>
                        <Link to="/medicines" className="text-medical-600 font-black uppercase tracking-widest text-[10px] hover:underline italic">Browse All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 italic">
                        {medicinesData
                            .filter(m => m.category === medicine.category && m.id !== medicine.id)
                            .slice(0, 4)
                            .map(m => (
                                <MedicineCard key={m.id} medicine={m} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetail;
