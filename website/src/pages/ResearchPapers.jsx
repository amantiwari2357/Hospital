import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Microscope,
    Share2,
    ExternalLink,
    Download,
    Database,
    Search,
    Filter,
    Award,
    TrendingUp
} from 'lucide-react';

const ResearchPapers = () => {
    const papers = [
        {
            title: 'AI-Driven Peptide Mapping in Neuro-Regenerative Protocols',
            author: 'Dr. James Miller et al.',
            journal: 'Lancet Clinical AI',
            year: '2025',
            impact: '8.4 IF',
            category: 'Neurology'
        },
        {
            title: 'Precision Oncology: Molecular Matching in Stage IV Sarcoma',
            author: 'CareSync Global Research Group',
            journal: 'Nature Medicine',
            year: '2024',
            impact: '9.2 IF',
            category: 'Oncology'
        },
        {
            title: 'Nanotech Delivery Systems for Lipid-Lowering Therapies',
            author: 'Dr. Sarah Wilson',
            journal: 'Journal of Cardiology',
            year: '2024',
            impact: '7.1 IF',
            category: 'Cardiology'
        },
        {
            title: 'Robotic-Assisted Pediatric Surgery: A 1000 Case Review',
            author: 'CareSync Pediatrics Board',
            journal: 'Surgical Innovation',
            year: '2023',
            impact: '6.5 IF',
            category: 'Pediatrics'
        }
    ];

    return (
        <div className="bg-white min-h-screen pb-24 italic">
            <Navbar />

            <div className="bg-slate-900 pt-44 lg:pt-64 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-medical-600/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="text-center lg:text-left">
                            <h1 className="text-6xl lg:text-9xl font-black mb-10 tracking-tighter leading-none italic uppercase">
                                Research <span className="text-medical-500 underline decoration-medical-500 underline-offset-8">Papers</span>
                            </h1>
                            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl italic">
                                Peer-reviewed clinical studies and breakthrough research published by the CareSync Institutional Board.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center">
                                <p className="text-4xl font-black italic">500+</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-medical-400 mt-2">Publications</p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 text-center">
                                <p className="text-4xl font-black italic">12.4</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-medical-400 mt-2">Avg Impact Factor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 italic">
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-20">
                    <div className="flex-grow relaitve">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Search library by DOI, author, or keyword..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 pl-16 pr-8 font-black text-sm focus:ring-2 focus:ring-medical-500/20 italic"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest">
                            <Filter className="w-4 h-4" /> Filter Library
                        </button>
                        <button className="bg-medical-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-medical-100">
                            <Share2 className="w-4 h-4" /> Submit Manuscript
                        </button>
                    </div>
                </div>

                {/* Papers Grid */}
                <div className="grid lg:grid-cols-2 gap-10">
                    {papers.map((paper, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-8">
                                    <span className="px-5 py-2 bg-medical-50 text-medical-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {paper.category}
                                    </span>
                                    <div className="flex gap-4">
                                        <button className="text-slate-300 hover:text-medical-500 transition-colors"><Download className="w-5 h-5" /></button>
                                        <button className="text-slate-300 hover:text-medical-500 transition-colors"><ExternalLink className="w-5 h-5" /></button>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 italic leading-tight uppercase group-hover:text-medical-600 transition-colors cursor-pointer">
                                    {paper.title}
                                </h3>
                                <div className="flex items-center gap-4 text-slate-500 font-bold italic text-sm mb-12">
                                    <Database className="w-4 h-4 text-medical-500" />
                                    <span>{paper.author} â€¢ {paper.journal}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                                <div className="flex gap-8">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Impact</p>
                                        <p className="text-lg font-black text-slate-900 italic mt-1">{paper.impact}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Published</p>
                                        <p className="text-lg font-black text-slate-900 italic mt-1">{paper.year}</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-medical-600 font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                                    Read Abstract <TrendingUp className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Institutional Board CTA */}
                <div className="mt-32 p-16 bg-slate-50 rounded-[5rem] flex flex-col md:flex-row items-center gap-12 italic border border-slate-100">
                    <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-xl">
                        <Award className="w-12 h-12 text-medical-600" />
                    </div>
                    <div className="flex-grow">
                        <h2 className="text-3xl font-black text-slate-900 uppercase italic mb-4">Institutional Ethics & Board Review</h2>
                        <p className="text-slate-500 font-medium leading-relaxed italic">
                            All research published via CareSync undergoes rigorous peer review by our Institutional Review Board (IRB) to ensure the highest clinical standards.
                        </p>
                    </div>
                    <button className="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-medical-600 transition-all shadow-xl whitespace-nowrap">
                        Review Guidelines
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResearchPapers;
