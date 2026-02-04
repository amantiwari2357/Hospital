import React from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    HelpCircle,
    Book,
    Video,
    FileText,
    Users,
    Download,
    Search,
    Clipboard,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

const Resources = () => {
    const resourceCategories = [
        { title: 'Patient Manuals', icon: Book, count: '12 Guides', desc: 'Step-by-step documentation on clinical procedures and post-op care.' },
        { title: 'Video Education', icon: Video, count: '45+ Videos', desc: 'High-definition explainers of complex medical concepts.' },
        { title: 'Clinical Protocols', icon: Clipboard, count: '124 Records', desc: 'Standard operating procedures for global medical standards.' },
        { title: 'Form Library', icon: FileText, count: '18 Forms', desc: 'Downloadable consent forms and registration documentation.' },
        { title: 'Support Network', icon: Users, count: 'Global Registry', desc: 'Directories for specialized support and patient advocacy groups.' },
        { title: 'Knowledge Base', icon: HelpCircle, count: '800+ Articles', desc: 'Searchable clinical wiki for patient and professional use.' }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            <div className="bg-medical-600 pt-44 lg:pt-64 pb-32 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-900/50 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 className="text-6xl lg:text-9xl font-black mb-12 tracking-tighter leading-none italic uppercase">
                        Clinical <span className="text-white underline decoration-white underline-offset-8">Resources</span>
                    </h1>
                    <p className="text-white/80 text-xl font-medium leading-relaxed max-w-2xl mx-auto italic mb-16">
                        A comprehensive ecosystem of clinical intelligence, patient education, and institutional documentation.
                    </p>

                    {/* Integrated Search */}
                    <div className="max-w-3xl mx-auto relative group">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-medical-600" />
                        <input
                            type="text"
                            placeholder="Find guides, protocols, or clinical explainers..."
                            className="w-full bg-white rounded-[2.5rem] py-8 pl-20 pr-12 text-slate-900 font-black text-lg focus:ring-8 focus:ring-white/20 outline-none transition-all shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 italic">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {resourceCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-slate-200 border border-slate-50 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-medical-50 text-medical-600 rounded-2xl flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-all duration-500">
                                        <cat.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{cat.count}</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase italic leading-none">{cat.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic mb-10">
                                    {cat.desc}
                                </p>
                            </div>
                            <button className="flex items-center gap-4 text-medical-600 font-black uppercase tracking-widest text-[11px] group-hover:gap-6 transition-all">
                                Access Category <ArrowUpRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Popular Resources List */}
                <div className="mt-32 grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8 italic">
                        <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase italic underline decoration-slate-200 decoration-8 underline-offset-10">Trending Downloads</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'Post-Op Heart Care Protocol 2025', size: '2.4 MB', type: 'PDF' },
                                { name: 'Institutional Patient Rights & Charter', size: '1.1 MB', type: 'DOCX' },
                                { name: 'Clinical Onboarding Framework v4.2', size: '5.8 MB', type: 'EPUB' },
                                { name: 'Robotic Surgery Preparation Guide', size: '12.0 MB', type: 'PDF' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] flex items-center justify-between border border-slate-100 hover:border-medical-200 transition-all cursor-pointer shadow-sm group">
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-medical-600 transition-colors">
                                            <Download className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 italic uppercase text-sm">{item.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{item.type} • {item.size}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-medical-600 group-hover:translate-x-2 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 italic sticky top-40">
                        <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-medical-500/20 blur-3xl" />
                            <h3 className="text-2xl font-black mb-8 uppercase italic leading-none">Need Live Detail?</h3>
                            <p className="text-slate-400 font-medium italic mb-10 leading-relaxed text-sm">
                                If you can't find a specific clinical protocol or resource, reach out to our institutional library board.
                            </p>
                            <button className="w-full bg-medical-600 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-medical-600 transition-all shadow-xl">
                                Support Hotline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
