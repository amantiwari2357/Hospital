import React from 'react';
import { medicinesData } from '../../utils/medicinesData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Zap, Star } from 'lucide-react';

const MedicinePreview = () => {
    // Show top 4 medicines
    const featuredMedicines = medicinesData.slice(0, 4);

    return (
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-medical-600/20 blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-600/10 blur-[120px] -ml-48 -mb-48" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-medical-500/20 text-medical-400 px-4 py-2 rounded-full border border-medical-500/30 mb-8 italic">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-black tracking-[0.2em]">Clinical Pharmacy</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight italic uppercase">
                            Medicine <span className="text-medical-500 underline decoration-8 underline-offset-8">Duniya</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl italic">
                            Browse our extensive library of verified medicines and clinical formulations. From daily essentials to specialized therapeutics.
                        </p>
                    </div>
                    <Link
                        to="/medicines"
                        className="group bg-white text-slate-900 px-10 py-6 rounded-[2rem] font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-medical-500 hover:text-white transition-all shadow-2xl shadow-medical-500/20 active:scale-95 italic"
                    >
                        Visit Medicine Duniya <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredMedicines.map((med, index) => (
                        <motion.div
                            key={med.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 group hover:bg-white/10 transition-all cursor-pointer relative"
                        >
                            <div className="h-40 mb-8 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h3 className="text-xl font-black mb-2 italic uppercase tracking-tight group-hover:text-medical-400 transition-colors">{med.name}</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6 italic">{med.category}</p>

                            <div className="flex justify-between items-center mb-8 italic">
                                <span className="text-2xl font-black text-white italic">₹{med.price}</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-black italic">{med.rating}</span>
                                </div>
                            </div>

                            <Link
                                to={`/medicine/${med.id}`}
                                className="w-full bg-white/10 text-white border border-white/10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-medical-600 group-hover:border-medical-600 transition-all italic"
                            >
                                View Medicine <ShoppingBag className="w-4 h-4" />
                            </Link>

                            {med.prescriptionRequired && (
                                <div className="absolute top-6 right-6 bg-red-500/90 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Rx</div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Quick Stats Overlay */}
                <div className="mt-24 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 italic uppercase font-black text-[10px] tracking-[0.4em]">
                    <div className="flex items-center gap-3">
                        <span className="text-medical-500 text-lg">500+</span> Medicines
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-medical-500 text-lg">100%</span> Verified
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-medical-500 text-lg">24H</span> Delivery
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-medical-500 text-lg">24/7</span> Support
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MedicinePreview;
