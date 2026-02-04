import React from 'react';
import Navbar from '../components/layout/Navbar';
import { marketTrends, priceComparisons } from '../utils/marketData';
import {
    TrendingUp,
    BarChart3,
    PieChart,
    ArrowUpCircle,
    ArrowDownCircle,
    Zap,
    ShieldCheck,
    Globe,
    Activity,
    ChevronRight,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const MarketInsights = () => {
    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-medical-600/5" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 bg-medical-500/20 text-medical-400 px-4 py-2 rounded-full border border-medical-500/30 mb-8 italic">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-[10px] uppercase font-black tracking-widest">Live Market Intelligence</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-none italic uppercase">
                                Medicine <span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Universe</span> Trends
                            </h1>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed italic max-w-xl">
                                Real-time clinical market analysis, price volatility tracking, and cross-comparison of brand vs generic therapeutics.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 flex gap-8 italic">
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Global Share</p>
                                <p className="text-3xl font-black text-white">+24.8%</p>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Volatility</p>
                                <p className="text-3xl font-black text-medical-500">Low</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Dashboard */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Price Comparison Card */}
                    <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 italic">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase italic">Savings Index</h2>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Brand vs Generic Clinical Comparison</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400"><BarChart3 className="w-5 h-5" /></div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {priceComparisons.map((item, i) => (
                                <div key={i} className="group p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-medical-200 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-medical-600 shadow-sm font-black">
                                                {item.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 italic uppercase">{item.name}</h4>
                                                <span className="text-[9px] font-black text-medical-500 uppercase tracking-widest bg-medical-50 px-2 py-0.5 rounded-full">{item.efficacy}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-12">
                                            <div className="text-center">
                                                <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Brand Price</p>
                                                <p className="font-black text-slate-500 line-through text-sm">₹{item.brandPrice}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Generic Price</p>
                                                <p className="font-black text-medical-600 text-lg">₹{item.genericPrice}</p>
                                            </div>
                                            <div className="bg-medical-500 text-white px-4 py-2 rounded-xl text-center shadow-lg shadow-medical-100">
                                                <p className="text-[8px] font-black uppercase leading-none mb-1">Save</p>
                                                <p className="font-black text-sm leading-none">{item.savings}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mini Visualization */}
                                    <div className="mt-6 h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '20%' }}
                                            className="h-full bg-medical-500"
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '80%' }}
                                            className="h-full bg-slate-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:col-span-4 space-y-8 italic">
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Activity className="w-32 h-32" />
                            </div>
                            <h3 className="text-sm font-black uppercase tracking-widest mb-10 text-medical-500">Market Adoption</h3>
                            <div className="space-y-8 relative">
                                {marketTrends.map((trend, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span>{trend.category}</span>
                                            <span className="text-medical-400">{trend.marketShare}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${trend.marketShare}%` }}
                                                className="h-full bg-medical-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 italic">Global Indices</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <ArrowUpCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Oncology</p>
                                    <p className="text-lg font-black text-slate-900">+18%</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <ArrowDownCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Insulin</p>
                                    <p className="text-lg font-black text-slate-900">-4.2%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Trend Analysis */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 italic">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { title: 'Generic Bio-equivalence', desc: 'Detailed analysis of why 98% of modern generics meet the same clinical endpoint as original research brands.', icon: Zap },
                        { title: 'Supply Chain Blockchain', desc: 'All medicine in Medicine Universe is tracked via immutable ledgers from synthesis to delivery.', icon: ShieldCheck },
                        { title: 'Global Price Equilibrium', desc: 'Understanding the impact of regional manufacturing hubs on healthcare affordability indexes.', icon: Globe },
                    ].map((card, i) => (
                        <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-medical-600 mb-8 border border-slate-100">
                                <card.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase italic">{card.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed italic mb-8">{card.desc}</p>
                            <button className="flex items-center gap-2 text-medical-600 font-black uppercase tracking-widest text-[10px] hover:gap-4 transition-all uppercase">
                                View Full Data <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketInsights;
