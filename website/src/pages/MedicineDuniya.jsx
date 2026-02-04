import React, { useState, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import MedicineCard from '../components/medicines/MedicineCard';
import { medicinesData } from '../utils/medicinesData';
import { Search, Filter, ShoppingBag, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MedicineDuniya = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const categories = ['All', ...new Set(medicinesData.map(m => m.category))];

    const filteredMedicines = useMemo(() => {
        return medicinesData.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const suggestions = useMemo(() => {
        if (!searchQuery) return [];
        return medicinesData
            .filter(m => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()))
            .slice(0, 5);
    }, [searchQuery]);

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <Navbar />

            {/* Header Section */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-medical-600/10 opacity-50" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-medical-500/20 text-medical-400 px-4 py-2 rounded-full border border-medical-500/30 mb-8">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-black tracking-[0.2em]">Global Pharmacy Network</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">Medicine <span className="text-medical-500">Duniya</span></h1>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                                Access over 500+ clinical-grade medicines, supplements, and specialized pharmaceutical solutions with verified door-step delivery.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-medical-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-medical-500/50">
                                <ShoppingBag className="w-10 h-10 text-white" />
                            </div>
                            <span className="text-4xl font-black mb-1">500+</span>
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Clinical Products</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by medicine name or laboratory brand..."
                                className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-medical-500 transition-all font-bold text-slate-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            {/* Smart Suggestions */}
                            <AnimatePresence>
                                {suggestions.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 w-full bg-white mt-4 rounded-3xl shadow-2xl border border-slate-100 z-40 overflow-hidden"
                                    >
                                        {suggestions.map((s) => (
                                            <button
                                                key={s.id}
                                                className="w-full px-8 py-4 text-left hover:bg-slate-50 flex items-center gap-4 group transition-colors"
                                                onClick={() => {
                                                    setSearchQuery(s.name);
                                                    // Hide suggestions
                                                }}
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-medical-50 text-medical-600 flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors">
                                                    <Zap className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm italic">{s.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.category}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-medical-500 transition-colors" />
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-3 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isFilterOpen ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
                            >
                                <Filter className="w-4 h-4" /> {selectedCategory !== 'All' ? selectedCategory : 'Filter'}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-6"
                            >
                                <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-medical-500 text-white shadow-lg shadow-medical-100' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-black text-slate-900 italic">Showing {filteredMedicines.length} clinical results</h2>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Sorted by <span className="text-slate-900">Popularity</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredMedicines.slice(0, 20).map((medicine) => (
                        <motion.div
                            key={medicine.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <MedicineCard medicine={medicine} />
                        </motion.div>
                    ))}
                </div>

                {filteredMedicines.length > 20 && (
                    <div className="mt-20 text-center">
                        <button className="bg-white border-2 border-slate-900 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-95">
                            Load All 500+ Medicines
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicineDuniya;
