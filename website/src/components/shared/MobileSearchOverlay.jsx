import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Stethoscope, Tablets, User, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileSearchOverlay = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const tabs = [
        { id: 'All', label: 'All', icon: Search },
        { id: 'Doctors', label: 'Doctors', icon: User },
        { id: 'Diseases', label: 'Conditions', icon: Stethoscope },
        { id: 'Medicines', label: 'Medicines', icon: Tablets },
    ];

    // Mock data for immediate feedback - In production, this would fetch from API
    const mockData = {
        Doctors: [
            { id: 1, name: 'Dr. Sarah Smith', role: 'Cardiologist', type: 'Doctor' },
            { id: 2, name: 'Dr. John Doe', role: 'Neurologist', type: 'Doctor' },
        ],
        Diseases: [
            { id: 1, name: 'Fever', category: 'General', type: 'Disease' },
            { id: 2, name: 'Migraine', category: 'Neurology', type: 'Disease' },
        ],
        Medicines: [
            { id: 1, name: 'Paracetamol', category: 'Analgesic', type: 'Medicine' },
            { id: 2, name: 'Amoxicillin', category: 'Antibiotic', type: 'Medicine' },
        ]
    };

    useEffect(() => {
        if (!searchQuery) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        // Simulate API delay
        const timer = setTimeout(() => {
            let filtered = [];
            if (activeTab === 'All') {
                filtered = [
                    ...mockData.Doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())),
                    ...mockData.Diseases.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())),
                    ...mockData.Medicines.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                ];
            } else {
                filtered = mockData[activeTab]?.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())) || [];
            }
            setResults(filtered);
            setIsSearching(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, activeTab]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 bg-white z-[70] flex flex-col pt-safe-top"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-600" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search CareSync..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-12 pr-4 font-bold text-slate-900 focus:ring-2 focus:ring-medical-500/20 transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 bg-slate-50 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 py-2 overflow-x-auto no-scrollbar border-b border-slate-50">
                        <div className="flex gap-3 min-w-max">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-medical-600 text-white shadow-lg shadow-medical-200'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-grow overflow-y-auto p-6 bg-slate-50/50">
                        {isSearching ? (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-3">
                                <Activity className="w-8 h-8 animate-spin text-medical-500" />
                                <span className="font-bold text-xs uppercase tracking-widest">Searching...</span>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Results for "{searchQuery}"</p>
                                {results.map((item, idx) => (
                                    <Link
                                        key={`${item.type}-${item.id}-${idx}`}
                                        to="#" // Link to respective detail page
                                        onClick={onClose}
                                        className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm active:scale-[0.98] transition-all"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-medical-50 text-medical-600 rounded-xl">
                                                {item.type === 'Doctor' ? <User className="w-5 h-5" /> :
                                                    item.type === 'Medicine' ? <Tablets className="w-5 h-5" /> :
                                                        <Stethoscope className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{item.name}</h4>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.role || item.category}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300" />
                                    </Link>
                                ))}
                            </div>
                        ) : searchQuery && !isSearching ? (
                            <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-4">
                                <Search className="w-12 h-12 text-slate-200" />
                                <p className="font-bold text-sm">No results found.</p>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-slate-400 font-medium italic text-sm">Start typing to search...</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileSearchOverlay;
