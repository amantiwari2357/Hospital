import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/layout/Navbar';
import {
    MapPin,
    Phone,
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowLeft,
    CheckCircle2,
    Loader,
    ShoppingBag,
    ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('patientToken');
            if (!token) {
                alert('Please login to place an order');
                navigate('/portal-login');
                return;
            }

            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                    medicine: item._id || item.id
                })),
                shippingAddress,
                paymentMethod: 'COD',
                totalAmount: cartTotal
            };

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setOrderSuccess(true);
                clearCart();
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                const err = await response.json();
                alert(err.message || 'Error placing order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !orderSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col italic pt-32">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center p-8">
                    <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                        <ShoppingBag className="w-10 h-10 text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/medicines')}
                        className="bg-medical-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest"
                    >
                        Browse Medicines
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 italic">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-24">
                <AnimatePresence mode="wait">
                    {orderSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-medical-100 border border-medical-50"
                        >
                            <div className="w-24 h-24 bg-medical-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-medical-200">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">Order Placed Successfully!</h2>
                            <p className="text-slate-500 font-medium text-lg mb-8 max-w-md mx-auto">
                                Your clinical prescription and medicines are being prepared for delivery. Redirecting to your profile...
                            </p>
                            <div className="flex items-center justify-center gap-2 text-medical-600 font-black uppercase tracking-widest text-xs">
                                <Truck className="w-4 h-4" /> Expected Delivery: 24-48 Hours
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left Column: Form */}
                            <div className="lg:col-span-8 space-y-8">
                                <button
                                    onClick={() => navigate('/medicines')}
                                    className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to Pharmacy
                                </button>

                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="p-4 bg-medical-50 text-medical-600 rounded-2xl">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Delivery Address</h2>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Where should we deliver your clinical items?</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 italic">Detailed Street Address</label>
                                                <input
                                                    type="text" name="address" required value={shippingAddress.address} onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-slate-700 focus:ring-2 focus:ring-medical-500 outline-none transition-all"
                                                    placeholder="e.g. House No, Building, Area"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 italic">City</label>
                                                <input
                                                    type="text" name="city" required value={shippingAddress.city} onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-slate-700 focus:ring-2 focus:ring-medical-500 outline-none transition-all"
                                                    placeholder="e.g. New Delhi"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 italic">Postal Code</label>
                                                <input
                                                    type="text" name="postalCode" required value={shippingAddress.postalCode} onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-slate-700 focus:ring-2 focus:ring-medical-500 outline-none transition-all"
                                                    placeholder="XXXXXX"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2 italic">
                                                    <Phone className="w-3 h-3" /> Contact Phone
                                                </label>
                                                <input
                                                    type="tel" name="phone" required value={shippingAddress.phone} onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-slate-700 focus:ring-2 focus:ring-medical-500 outline-none transition-all"
                                                    placeholder="+91 XXXXX XXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-slate-100">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="p-4 bg-medical-50 text-medical-600 rounded-2xl">
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Payment Method</h2>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Secure payment options</p>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-medical-50 rounded-[2rem] border-2 border-medical-500 flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full border-4 border-medical-500 bg-white shadow-inner" />
                                                    <div>
                                                        <p className="font-black text-slate-900 uppercase text-xs italic tracking-widest">Cash on Delivery (COD)</p>
                                                        <p className="text-[10px] text-medical-600 font-bold uppercase tracking-widest leading-none mt-1">Pay when you receive your medicines</p>
                                                    </div>
                                                </div>
                                                <Truck className="w-6 h-6 text-medical-500" />
                                            </div>
                                        </div>

                                        <button
                                            type="submit" disabled={loading}
                                            className="w-full bg-slate-900 text-white rounded-[2rem] py-6 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-300 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <>Confirm Order & Ship <ArrowRight className="w-4 h-4" /></>}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-4 space-y-8">
                                <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full sticky top-44">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 italic">Order Summary</h3>

                                    <div className="flex-grow space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 italic">
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                                                    </div>
                                                    <span className="absolute -top-2 -right-2 bg-slate-900 text-white w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-black text-slate-900 text-[10px] uppercase leading-tight line-clamp-2">{item.name}</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-6 border-t font-bold uppercase text-[10px] tracking-widest">
                                        <div className="flex justify-between text-slate-400">
                                            <span>Subtotal</span>
                                            <span>₹{cartTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400">
                                            <span>Shipping Cost</span>
                                            <span className="text-green-600">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-slate-900 pt-4 text-sm font-black italic">
                                            <span className="tracking-tighter">Total Amount</span>
                                            <span className="text-2xl tracking-tighter">₹{cartTotal}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
                                        <ShieldCheck className="w-5 h-5 text-medical-600" />
                                        <p className="text-[9px] text-slate-400 font-bold uppercase leading-tight">
                                            Your clinical delivery is protected by <span className="text-slate-900 font-black italic">MedCore Guarantee</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Checkout;
