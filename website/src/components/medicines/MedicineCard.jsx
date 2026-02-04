import React from 'react';
import { ShoppingCart, Star, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MedicineCard = ({ medicine }) => {
    const cart = useCart();
    const addToCart = cart?.addToCart;

    if (!medicine) return null;
    return (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-5 hover:shadow-2xl hover:shadow-medical-100 transition-all group flex flex-col h-full">
            <div className="relative h-48 mb-6 overflow-hidden rounded-2xl bg-slate-50">
                <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    {medicine.prescriptionRequired && (
                        <div className="bg-red-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Rx
                        </div>
                    )}
                    <div className="bg-white/90 backdrop-blur-md text-slate-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {medicine.rating}
                    </div>
                </div>
            </div>

            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-medical-600 transition-colors">
                        {medicine.name}
                    </h3>
                    <span className="text-xl font-black text-medical-600">₹{medicine.price}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 bg-slate-50 inline-block px-3 py-1 rounded-full border border-slate-100">
                    {medicine.category}
                </p>
                <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">
                    {medicine.description}
                </p>
            </div>

            <div className="flex gap-3 mt-auto">
                <Link
                    to={`/medicine/${medicine.id}`}
                    className="flex-grow bg-slate-900 text-white text-center py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                    <Info className="w-4 h-4" /> View Details
                </Link>
                <button
                    onClick={() => addToCart && addToCart(medicine)}
                    className="p-3.5 bg-medical-500 text-white rounded-2xl hover:bg-medical-600 transition-all shadow-lg shadow-medical-100"
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default MedicineCard;
