import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { blogPosts } from '../utils/blogData';
import { Search, Clock, User, ArrowRight, MessageSquare, Tag, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Header Section */}
            <div className="bg-slate-900 pt-44 lg:pt-64 pb-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-medical-600/10 blur-[120px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight italic uppercase">
                                Clinical <span className="text-medical-500">Insights</span>
                            </h1>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                                Evidence-based medical articles, research breakthroughs, and wellness guides authored by our board-certified experts.
                            </p>
                        </div>
                        <Link
                            to="/market-insights"
                            className="bg-medical-500/10 border border-medical-500/20 p-8 rounded-[2.5rem] group hover:bg-medical-500 transition-all duration-500 flex items-center gap-6 italic"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-medical-600 shadow-xl">
                                <TrendingUp className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <p className="text-[10px] text-medical-400 group-hover:text-white/60 font-black uppercase tracking-widest mb-1 italic">New Analytical Tool</p>
                                <h4 className="text-lg font-black text-white italic uppercase leading-none">Market Trend Hub <ArrowRight className="inline w-5 h-5 ml-2" /></h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col lg:flex-row gap-6">
                    <div className="relative flex-grow">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search medical articles, research, ethics..."
                            className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-medical-500 transition-all font-bold text-slate-700 italic"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-medical-500 text-white shadow-lg shadow-medical-200' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-white hover:border-medical-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 italic">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200 transition-all cursor-pointer flex flex-col h-full"
                        >
                            <Link to={`/blog/${post.id}`} className="block relative h-64 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-medical-600">
                                    {post.category}
                                </div>
                            </Link>

                            <div className="p-10 flex flex-col flex-grow italic">
                                <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight italic uppercase group-hover:text-medical-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-8 italic">
                                    {post.excerpt}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="mt-auto flex items-center gap-2 text-medical-600 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
                                >
                                    Read Full Analysis <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
