import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import ChatWidget from '../components/shared/ChatWidget';
import MedicinePreview from '../components/home/MedicinePreview';
import {
    Stethoscope,
    Tablets,
    CalendarCheck,
    Users,
    ChevronRight,
    ChevronLeft,
    Search,
    Filter,
    Microscope,
    Baby,
    Brain,
    Bone,
    HeartPulse,
    ArrowRight,
    Ambulance
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAllDiseases, setShowAllDiseases] = useState(false);
    const [dynamicDoctors, setDynamicDoctors] = useState([]);
    const [dynamicDiseases, setDynamicDiseases] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    const iconMap = {
        'Cardiology': Stethoscope,
        'Neurology': Brain,
        'Pediatrics': Baby,
        'Orthopedics': Bone,
        'Diagnostics': Microscope,
        'Consultation': Users,
        'General': Stethoscope,
        'Oncology': HeartPulse,
        'Dermatology': Microscope,
        'Psychiatry': Brain
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [drRes, disRes] = await Promise.all([
                    fetch('https://hospital-40m0.onrender.com/api/appointments/doctors'),
                    fetch('https://hospital-40m0.onrender.com/api/diseases')
                ]);
                const drData = await drRes.json();
                const disData = await disRes.json();
                setDynamicDoctors(drData);
                setDynamicDiseases(disData);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const services = [
        { title: 'Emergency Care', icon: Stethoscope, color: 'bg-red-100 text-red-600', description: '24/7 immediate medical attention for critical situations.' },
        { title: 'Health Registry', icon: Users, color: 'bg-blue-100 text-blue-600', description: 'Easy registration for new and returning patients.' },
        { title: 'Online Consultation', icon: CalendarCheck, color: 'bg-green-100 text-green-600', description: 'Video calls with top specialists from your home.' },
        { title: 'Pharmacy', icon: Tablets, color: 'bg-purple-100 text-purple-600', description: 'Order medicines online with home delivery.' },
    ];

    // Build specialities from doctors list
    const specialities = Array.from(new Set(dynamicDoctors.map(d => d.specialization || d.department || 'General')))
        .map(spec => ({
            name: spec,
            icon: iconMap[spec] || Stethoscope
        }));

    return (
        <>
            <Navbar />
            <main>
                <Hero />

                {/* Services Section */}
                <section id="services" className="py-2 bg-white relative overflow-hidden">
                    {/* Background Visuals */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-medical-500/5 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div className="max-w-2xl">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 bg-medical-50 text-medical-600 px-4 py-2 rounded-full border border-medical-100 mb-6 italic"
                                >
                                    <HeartPulse className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Clinical Excellence</span>
                                </motion.div>
                                <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">Our Core <span className="text-medical-600 underline decoration-medical-200 underline-offset-8">Expertise</span></h2>
                                <p className="text-slate-500 font-medium italic">Providing specialized care across various medical domains with precision and passion.</p>
                            </div>
                            <div className="hidden md:flex gap-4">
                                <button
                                    onClick={() => scroll('left')}
                                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-medical-50 hover:text-medical-600 transition-all"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => scroll('right')}
                                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-medical-50 hover:text-medical-600 transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 ml-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Standard</p>
                                    <p className="text-xl font-black text-slate-900 italic">JCI ACCREDITED</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Scroll Hint & Controls */}
                        <div className="flex md:hidden items-center justify-between gap-2 text-slate-400 mb-2 italic">
                            <div className="flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 animate-bounce-x" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Swipe to explore</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm active:scale-90 transition-all">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button onClick={() => scroll('right')} className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm active:scale-90 transition-all">
                                    <ChevronRight className="w-4 h-4 text-medical-600" />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0"
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="snap-center shrink-0 w-[85vw] md:w-auto"
                                >
                                    <Link
                                        to={
                                            service.title === 'Pharmacy' ? '/medicines' :
                                                service.title === 'Online Consultation' ? '/book-appointment' :
                                                    service.title === 'Emergency Care' ? '/emergency' :
                                                        service.title === 'Health Registry' ? '/registry' : '/about'
                                        }
                                        className="h-full p-8 lg:p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-medical-200 hover:shadow-2xl hover:shadow-medical-100 transition-all group cursor-pointer block relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:bg-medical-50 transition-colors" />

                                        <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform shadow-lg shadow-current/10`}>
                                            <service.icon className="w-8 h-8" />
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 mb-4 italic uppercase tracking-tight group-hover:text-medical-600 transition-colors">{service.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8 italic font-medium group-hover:text-slate-600 transition-colors">{service.description}</p>

                                        <div className="flex items-center text-medical-600 font-black text-[10px] uppercase tracking-[0.2em] gap-3 group-hover:gap-5 transition-all italic">
                                            Clinical Access <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NEW: Medical Conditions Showcase (30+ Diseases Section) */}
                <section className="py-2 bg-slate-50 relative overflow-hidden">
                    {/* Background Visuals */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-4 gap-10">
                            <div className="text-center md:text-left w-full md:w-auto">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-medical-600 font-black uppercase tracking-[0.4em] text-[10px] block mb-4 italic"
                                >
                                    Clinical Treatment Index
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter italic"
                                >
                                    Find Your <br className="md:hidden" /> <span className="text-medical-600 underline decoration-medical-200 underline-offset-8">Condition</span>
                                </motion.h2>
                            </div>
                            <div className="relative w-full md:w-[450px]">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-medical-500" />
                                <input
                                    type="text"
                                    placeholder="Search diseases (cancer, acne, etc.)..."
                                    className="w-full pl-16 pr-6 py-6 bg-white rounded-[2rem] border-2 border-slate-100 focus:border-medical-500 focus:ring-0 outline-none transition-all shadow-xl shadow-slate-200/50 font-bold italic text-sm placeholder:text-slate-300 placeholder:italic"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                                    {dynamicDiseases.length} Entries
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {dynamicDiseases
                                .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .slice(0, showAllDiseases || searchQuery ? undefined : 10)
                                .map((disease, index) => (
                                    <motion.div
                                        key={disease.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (index % 10) * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link
                                            to={`/disease/${disease.id}`}
                                            className="group block bg-white p-6 rounded-3xl border border-slate-100 hover:border-medical-300 hover:shadow-xl hover:shadow-medical-100 transition-all text-center h-full flex flex-col items-center justify-center gap-3"
                                        >
                                            <div className="w-12 h-12 bg-medical-50 text-medical-600 rounded-xl flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors">
                                                <Stethoscope className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-medical-700 transition-colors text-sm uppercase tracking-tight">
                                                {disease.name}
                                            </h4>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-full">
                                                {disease.category}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                        </div>

                        {!showAllDiseases && !searchQuery && (
                            <div className="mt-16 flex justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowAllDiseases(true)}
                                    className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-medical-600 transition-all shadow-xl shadow-medical-100 flex items-center gap-4 italic"
                                >
                                    Browse All Clinical Conditions <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        )}

                        {searchQuery && dynamicDiseases.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-300">
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No clinical results for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Ambulance Preview Section */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="bg-slate-900 rounded-[4rem] p-10 lg:p-20 text-white relative overflow-hidden italic">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
                            <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                                <div className="lg:w-1/2">
                                    <div className="inline-flex items-center gap-2 bg-white/10 text-medical-400 px-4 py-2 rounded-full mb-8 font-black uppercase tracking-widest text-[9px]">
                                        <Ambulance className="w-4 h-4 animate-pulse" />
                                        Rapid Response Fleet
                                    </div>
                                    <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-8">
                                        Advanced <br /> <span className="text-medical-500">Ambulance</span> <br /> Network
                                    </h2>
                                    <p className="text-slate-400 text-lg font-medium mb-12 max-w-lg leading-relaxed">
                                        Experience zero-latency emergency transport with our JCI-accredited mobile ICU fleet. 24/7 availability with real-time GPS tracking.
                                    </p>
                                    <div className="flex flex-wrap gap-6">
                                        <Link to="/ambulance" className="bg-medical-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-medical-700 transition-all flex items-center gap-3 shadow-xl shadow-medical-500/20">
                                            Access Hub <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <a href="tel:108" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center gap-3">
                                            Emergency: 108
                                        </a>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Avg. Response', val: '12m', icon: 'âš¡' },
                                        { label: 'Active Fleet', val: '150+', icon: 'ðŸš' },
                                        { label: 'Critical Care', val: '24/7', icon: 'ðŸ¥' },
                                        { label: 'Live Tracking', val: 'GPS', icon: 'ðŸ“' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="text-3xl mb-4">{stat.icon}</div>
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-2xl font-black text-white">{stat.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <MedicinePreview />

                {/* Doctors Section (Restored) */}
                <section id="doctors" className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-slate-900 mb-4">Board-Certified Specialists</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {dynamicDoctors.map((doc, index) => (
                                <div key={doc.name} className="bg-white rounded-[3rem] overflow-hidden shadow-lg border border-slate-100 group">
                                    <div className="h-64 relative overflow-hidden">
                                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-8 text-center">
                                        <h4 className="text-2xl font-black text-slate-900 mb-1">{doc.name}</h4>
                                        <p className="text-medical-600 font-bold text-sm mb-6 uppercase">{doc.roleDescription || doc.specialization}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enquiry Form */}
                <section id="contact" className="py-24 bg-medical-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-6xl font-black mb-6">Quick Clinical Connect</h2>
                            <p className="text-medical-100 font-bold text-lg">Leave your details and our specialists will call you back.</p>
                        </div>
                        <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-12 text-slate-900 shadow-2xl">
                            <form className="space-y-6">
                                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-medical-500 font-bold" />
                                <input type="tel" placeholder="Mobile Number" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-medical-500 font-bold" />
                                <textarea rows="4" placeholder="How can we help?" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-medical-500 font-bold resize-none"></textarea>
                                <button className="w-full bg-medical-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-medical-700 transition-all shadow-xl">
                                    Send Request
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <ChatWidget />
        </>
    );
};

export default Home;
