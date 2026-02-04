import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col italic"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-medical-50 text-medical-600 rounded-2xl">
                                    <ShoppingBag className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Your Cart</h2>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cartItems.length} clinical items</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-8 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ShoppingBag className="w-16 h-16 mb-4" />
                                    <p className="font-black uppercase tracking-widest text-sm">Cart is empty</p>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all shadow-sm">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-black text-slate-900 text-sm uppercase leading-tight mb-1">{item.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">₹{item.price}</p>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-medical-600 transition-colors"><Minus className="w-3 h-3" /></button>
                                                    <span className="font-black text-xs min-w-[1rem] text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-medical-600 transition-colors"><Plus className="w-3 h-3" /></button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-slate-50 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Amount</p>
                                    <p className="text-3xl font-black text-medical-600 tracking-tight italic">₹{cartTotal}</p>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </Link>
                                <p className="text-center mt-4 text-[9px] text-slate-400 font-bold uppercase tracking-[0.1em]">
                                    GST & Delivery calculated at next step
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
