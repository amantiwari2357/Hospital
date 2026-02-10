import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { blogPosts } from '../utils/blogData';
import { Clock, User, ArrowLeft, ArrowRight, Share2, Bookmark, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const found = blogPosts.find(p => p.id === id);
        if (found) setPost(found);
    }, [id]);

    if (!post) return <div className="pt-32 text-center italic font-black">Scanning database for article...</div>;

    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    return (
        <div className="bg-white min-h-screen pb-24 italic">
            <Navbar />

            {/* ProgressBar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-medical-600/10 z-[60]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-full bg-medical-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                />
            </div>

            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64">
                {/* Meta Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <Link to="/blog" className="flex items-center gap-2 text-medical-600 font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to Clinical Insights
                    </Link>
                    <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-full border border-slate-100 mb-8 font-black uppercase tracking-widest text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-medical-500 animate-pulse" />
                        {post.category} Analysis
                    </div>
                    <h1 className="text-4xl lg:text-7xl font-black text-slate-900 mb-10 tracking-tight leading-none italic uppercase">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2"><User className="w-4 h-4 text-medical-600" /> {post.author}</div>
                        <div className="h-4 w-px bg-slate-200" />
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-medical-600" /> {post.date}</div>
                        <div className="h-4 w-px bg-slate-200" />
                        <div className="flex items-center gap-2"><Share2 className="w-4 h-4 text-medical-600" /> Share Findings</div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="rounded-[4rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 mb-24 shadow-2xl shadow-slate-200 border-8 border-slate-50">
                    <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-12 gap-16 relative">
                    {/* Left Sidebar Tools */}
                    <div className="hidden lg:block lg:col-span-1 sticky top-40 h-fit space-y-8">
                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-50 hover:text-medical-600 transition-all"><Bookmark className="w-5 h-5" /></button>
                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-50 hover:text-medical-600 transition-all"><Share2 className="w-5 h-5" /></button>
                        <button className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-50 hover:text-medical-600 transition-all"><MessageCircle className="w-5 h-5" /></button>
                    </div>

                    <div className="lg:col-span-8 text-lg font-medium text-slate-600 leading-relaxed space-y-8 italic">
                        {post.content.split('\n').map((paragraph, i) => (
                            paragraph.trim() && <p key={i}>{paragraph.trim()}</p>
                        ))}
                    </div>

                    {/* Right Sidebar: Related */}
                    <div className="lg:col-span-3 space-y-12 italic">
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic">Related Insights</h4>
                            <div className="space-y-10">
                                {relatedPosts.map(rp => (
                                    <Link key={rp.id} to={`/blog/${rp.id}`} className="group block">
                                        <h5 className="font-black text-slate-900 leading-tight uppercase text-sm mb-3 group-hover:text-medical-600 transition-colors italic line-clamp-2">{rp.title}</h5>
                                        <div className="flex items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest gap-2 italic">
                                            {rp.category} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-medical-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-xl shadow-medical-200">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-3xl" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4">Newsletter</h4>
                            <p className="font-bold text-sm leading-relaxed mb-6 italic">Get clinical updates delivered to your inbox.</p>
                            <input type="email" placeholder="Email.." className="w-full bg-white/20 border-none rounded-xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-white mb-4 placeholder:text-white/50 text-white font-bold" />
                            <button className="w-full bg-white text-medical-600 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:shadow-xl transition-all">Subscribe</button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
