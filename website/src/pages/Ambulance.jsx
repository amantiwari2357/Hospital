import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    Ambulance as AmbulanceIcon,
    Clock,
    MapPin,
    CheckCircle2,
    ShieldCheck,
    Zap,
    HeartPulse,
    ArrowRight,
    Navigation,
    Info,
    Timer,
    Activity as ActivityIcon
} from 'lucide-react';

const Ambulance = () => {
    const [selectedType, setSelectedType] = useState('BLS');
    const [view, setView] = useState('info'); // info, booking, tracking
    const [bookingStep, setBookingStep] = useState(1);

    // Tracking States
    const [trackTime, setTrackTime] = useState(8 * 60); // 8 minutes in seconds
    const [trackDistance, setTrackDistance] = useState(4.2);

    useEffect(() => {
        let interval;
        if (view === 'tracking') {
            interval = setInterval(() => {
                setTrackTime(prev => {
                    if (prev <= 0) return 8 * 60; // Reset for simulation loop
                    return prev - 1;
                });
                setTrackDistance(prev => {
                    if (prev <= 0.1) return 4.2; // Reset for simulation loop
                    return parseFloat((prev - 0.005).toFixed(3));
                });
            }, 100); // Fast update for smooth feel
        } else {
            setTrackTime(8 * 60);
            setTrackDistance(4.2);
        }
        return () => clearInterval(interval);
    }, [view]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const ambulanceTypes = [
        {
            id: 'BLS',
            name: 'Basic Life Support (BLS)',
            description: 'Equipped with essential medical gear for non-critical emergencies.',
            features: ['Oxygen Support', 'Basic First Aid', 'Vital Monitoring', 'Professional Paramedic'],
            price: '₹1,500',
            icon: AmbulanceIcon,
            color: 'bg-blue-500'
        },
        {
            id: 'ALS',
            name: 'Advanced Life Support (ALS)',
            description: 'Mobile ICUs for critical trauma and cardiac emergencies.',
            features: ['Defibrillator', 'Ventilator', 'Advanced Meds', 'Critical Care Specialist'],
            price: '₹3,500',
            icon: HeartPulse,
            color: 'bg-medical-600'
        },
        {
            id: 'NEO',
            name: 'Neonatal Ambulance',
            description: 'Specialized care for newborns requiring immediate transport.',
            features: ['Neonatal Incubator', 'Pediatric Vent', 'Neonatal Specialist', 'Temp Control'],
            price: '₹4,500',
            icon: Zap,
            color: 'bg-purple-600'
        }
    ];

    const stats = [
        { label: 'Network Reach', value: 'Global', icon: MapPin },
        { label: 'Avg. Response', value: '12 Mins', icon: Clock },
        { label: 'Accredited Unit', value: 'JCI Level', icon: ShieldCheck },
        { label: 'Units Active', value: '150+', icon: Navigation }
    ];

    return (
        <div className="min-h-screen bg-slate-50 italic">
            <Navbar />

            {/* Floating Mobile SOS */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%]">
                <button
                    onClick={() => setView('booking')}
                    className="w-full bg-red-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all outline-none"
                >
                    <Phone className="w-4 h-4 animate-pulse" /> Instant SOS Booking
                </button>
            </div>

            <main className="pt-32 lg:pt-64 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {view === 'info' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Hero Section */}
                            <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 lg:mb-20">
                                <div className="max-w-2xl">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full border border-red-100 mb-6 lg:mb-8 font-black uppercase tracking-[0.2em] text-[10px]"
                                    >
                                        <Zap className="w-4 h-4 animate-pulse" />
                                        24/7 Rapid Response
                                    </motion.div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-4xl lg:text-8xl font-black text-slate-900 leading-tight uppercase tracking-tighter mb-6 lg:mb-8 italic"
                                    >
                                        Emergency <br /> <span className="text-medical-600 underline decoration-medical-200 underline-offset-8">Ambulance</span>
                                    </motion.h1>
                                    <p className="text-slate-500 text-sm lg:text-lg font-medium leading-relaxed italic mb-8 lg:mb-10 max-w-xl">
                                        Experience the world's most advanced mobile clinical fleet. Real-time tracking, life-support equipped, and zero-latency response.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={() => setView('booking')}
                                            className="bg-slate-900 text-white px-8 lg:px-10 py-5 lg:py-6 rounded-2xl lg:rounded-[2.5rem] font-black uppercase text-[10px] lg:text-xs tracking-widest flex items-center justify-center gap-4 hover:bg-medical-600 transition-all shadow-2xl"
                                        >
                                            <AmbulanceIcon className="w-5 h-5" /> SOS Booking
                                        </button>
                                        <button
                                            onClick={() => setView('tracking')}
                                            className="bg-white text-slate-900 border-2 border-slate-100 px-8 lg:px-10 py-5 lg:py-6 rounded-2xl lg:rounded-[2.5rem] font-black uppercase text-[10px] lg:text-xs tracking-widest flex items-center justify-center gap-4 hover:border-medical-500 transition-all shadow-xl"
                                        >
                                            Track Live <Navigation className="w-5 h-5 text-medical-600" />
                                        </button>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-8 lg:p-10 rounded-[3rem] lg:rounded-[4rem] border border-slate-100 shadow-2xl w-full lg:w-96 text-center"
                                >
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-medical-50 text-medical-600 rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <ActivityIcon className="w-8 h-8 lg:w-10 lg:h-10 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 uppercase italic mb-2">Network Status</h3>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-8 italic">Global Availability</p>

                                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 mb-8">
                                        <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-100 italic">
                                            <span className="font-bold text-green-700 text-[9px] uppercase">Active Units</span>
                                            <span className="font-black text-green-900">42</span>
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-400">
                                            <span className="font-bold text-[9px] uppercase">In Transit</span>
                                            <span className="font-black text-slate-900/40">12</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                                        <p className="text-[9px] font-black uppercase tracking-widest mb-1 italic opacity-60">Avg. Response</p>
                                        <p className="text-3xl lg:text-4xl font-black italic">12:35</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest mt-1 italic text-medical-400">Minutes</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20 lg:mb-24">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center shadow-lg shadow-slate-200/50 italic">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center mb-3 lg:mb-4">
                                            <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                                        </div>
                                        <h5 className="text-[8px] lg:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</h5>
                                        <p className="text-lg lg:text-2xl font-black text-slate-900 italic uppercase leading-none">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Choice of Fleet */}
                            <div className="mb-20 lg:mb-24">
                                <div className="text-center mb-12 lg:mb-16">
                                    <h2 className="text-3xl lg:text-6xl font-black text-slate-900 italic uppercase mb-4 leading-tight lg:leading-none">The <span className="text-medical-600 underline underline-offset-4 decoration-medical-200">Elite Fleet</span></h2>
                                    <p className="text-slate-500 font-medium italic text-xs lg:text-base px-4">Instant dispatch system for world-class clinical emergencies.</p>
                                </div>

                                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 italic">
                                    {ambulanceTypes.map((type) => (
                                        <motion.div
                                            key={type.id}
                                            whileHover={{ y: -10 }}
                                            className={`bg-white p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3.5rem] border-2 transition-all cursor-pointer group ${selectedType === type.id ? 'border-medical-500 shadow-2xl shadow-medical-100' : 'border-slate-50'}`}
                                            onClick={() => setSelectedType(type.id)}
                                        >
                                            <div className={`w-14 h-14 lg:w-16 lg:h-16 ${type.color} text-white rounded-2xl flex items-center justify-center mb-8 lg:mb-10 shadow-xl group-hover:rotate-12 transition-transform`}>
                                                <type.icon className="w-7 h-7 lg:w-8 lg:h-8" />
                                            </div>
                                            <h3 className="text-xl lg:text-2xl font-black text-slate-900 uppercase mb-4 italic leading-tight">{type.name}</h3>
                                            <p className="text-slate-500 text-xs lg:text-sm font-medium mb-8 leading-relaxed italic">{type.description}</p>

                                            <div className="grid grid-cols-2 gap-y-3 lg:block lg:space-y-4 mb-8 lg:mb-10 italic">
                                                {type.features.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 lg:gap-3 text-slate-900 font-bold text-[9px] lg:text-xs uppercase tracking-tight">
                                                        <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-medical-500" /> {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between items-end pt-6 lg:pt-8 border-t border-slate-50">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Starts from</p>
                                                    <p className="text-2xl lg:text-3xl font-black text-slate-900 italic">{type.price}</p>
                                                </div>
                                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center group-hover:bg-medical-600 transition-colors">
                                                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {view === 'booking' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto italic">
                            <button onClick={() => setView('info')} className="mb-8 flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-medical-600">
                                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Info
                            </button>

                            <div className="bg-white rounded-[3rem] p-8 lg:p-16 border border-slate-100 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-medical-500/5 blur-[80px] -mr-32 -mt-32" />

                                <div className="text-center mb-12 relative z-10">
                                    <h2 className="text-3xl lg:text-5xl font-black text-slate-900 uppercase italic mb-2 tracking-tighter">SOS <span className="text-medical-600">Request</span></h2>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic">Step {bookingStep} of 2</p>
                                </div>

                                {bookingStep === 1 ? (
                                    <div className="space-y-8 relative z-10">
                                        <div className="grid gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                                                <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border-none rounded-2xl py-6 px-10 font-bold focus:ring-2 focus:ring-medical-500 transition-all text-sm outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Emergency Contact</label>
                                                <input type="tel" placeholder="+91 0000 0000" className="w-full bg-slate-50 border-none rounded-2xl py-6 px-10 font-bold focus:ring-2 focus:ring-medical-500 transition-all text-sm outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Service Type</label>
                                                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                                    {['BLS', 'ALS', 'NEO'].map(type => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setSelectedType(type)}
                                                            className={`py-4 rounded-xl border-2 font-black text-[11px] transition-all ${selectedType === type ? 'border-medical-500 bg-medical-50 text-medical-600 shadow-md' : 'border-slate-50 text-slate-400 hover:border-slate-200'}`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => setBookingStep(2)} className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-medical-600 transition-all shadow-xl">
                                            Next: Location Details
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-8 relative z-10">
                                        <div className="p-6 lg:p-8 bg-slate-50 rounded-2xl lg:rounded-3xl border border-slate-100 italic">
                                            <div className="flex items-center gap-4 text-medical-600 mb-6 font-black uppercase tracking-widest text-[10px]">
                                                <MapPin className="w-5 h-5" /> Current Location Detected
                                            </div>
                                            <p className="text-slate-900 font-bold text-sm leading-relaxed mb-4 italic">Mahan Hospital Clinical Center, 4th Block, West Wing</p>
                                            <button className="text-medical-600 font-bold uppercase text-[9px] tracking-widest hover:underline flex items-center gap-2">
                                                <ActivityIcon className="w-3 h-3" /> Pin Precise Location
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button onClick={() => setBookingStep(1)} className="bg-slate-50 text-slate-400 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">Back</button>
                                            <button onClick={() => setView('tracking')} className="bg-medical-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-medical-700 transition-all shadow-xl">Dispatch Now</button>
                                        </div>
                                        <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-widest italic flex items-center justify-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-green-500" /> JCI Certified Dispatch System
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {view === 'tracking' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto italic">
                            <button onClick={() => { setView('info'); setBookingStep(1); }} className="mb-8 flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-medical-600">
                                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
                            </button>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Animated Map Overlay */}
                                <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-6 lg:p-10 text-white min-h-[400px] lg:min-h-[550px] relative overflow-hidden flex flex-col justify-end group">
                                    {/* Cinematic Background SVG Map */}
                                    <div className="absolute inset-0 z-0 opacity-40">
                                        <svg viewBox="0 0 800 550" className="w-full h-full">
                                            <defs>
                                                <pattern id="dispatchGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                                                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                                </pattern>
                                                <filter id="neonGlow">
                                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                                </filter>
                                            </defs>
                                            <rect width="100%" height="100%" fill="url(#dispatchGrid)" />

                                            {/* Dynamic Route Path */}
                                            <motion.path
                                                d="M 120 450 L 250 450 L 250 250 L 600 250 L 600 120"
                                                fill="none"
                                                stroke="rgba(14, 165, 233, 0.2)"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                strokeDasharray="10 12"
                                                initial={{ strokeDashoffset: 200 }}
                                                animate={{ strokeDashoffset: 0 }}
                                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                            />

                                            {/* Patient Hub (Target) */}
                                            <g transform="translate(600, 120)">
                                                <circle r="25" fill="rgba(239, 68, 68, 0.15)">
                                                    <animate attributeName="r" values="15;30;15" dur="2s" repeatCount="indefinite" />
                                                </circle>
                                                <circle r="8" fill="#ef4444" filter="url(#neonGlow)" />
                                                <text y="-25" textAnchor="middle" className="text-[10px] font-black fill-white uppercase tracking-widest italic">Patient Site</text>
                                            </g>

                                            {/* Animated Ambulance Unit */}
                                            <motion.g
                                                initial={{ offsetDistance: "0%" }}
                                                animate={{ offsetDistance: "100%" }}
                                                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                                                style={{
                                                    offsetPath: "path('M 120 450 L 250 450 L 250 250 L 600 250 L 600 120')",
                                                    offsetRotate: "auto"
                                                }}
                                            >
                                                {/* Pulse Halo */}
                                                <circle r="35" fill="rgba(14, 165, 233, 0.08)">
                                                    <animate attributeName="r" values="30;45;30" dur="1.5s" repeatCount="indefinite" />
                                                </circle>

                                                {/* Unit Sprite */}
                                                <foreignObject x="-22" y="-22" width="44" height="44">
                                                    <div className="w-full h-full bg-medical-500 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-[0_0_30px_rgba(14,165,233,0.6)]">
                                                        <AmbulanceIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                </foreignObject>

                                                <text y="45" textAnchor="middle" className="text-[9px] font-black fill-medical-400 uppercase tracking-widest italic">UNIT-442</text>
                                            </motion.g>
                                        </svg>
                                    </div>

                                    <div className="relative z-10 space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 font-black uppercase tracking-widest text-[10px]"
                                        >
                                            <Timer className="w-4 h-4 text-medical-400" /> Real-time Arrival: {formatTime(trackTime)}
                                        </motion.div>
                                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
                                            <div className="flex justify-between items-end mb-6">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Unit</p>
                                                    <p className="text-xl lg:text-2xl font-black uppercase italic">MED-SOS-442</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-2">
                                                        <ActivityIcon className="w-3 h-3" /> Live Precision
                                                    </p>
                                                    <p className="text-xl lg:text-2xl font-black italic">{trackDistance.toFixed(1)} KM</p>
                                                </div>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: '0%' }}
                                                    animate={{ width: `${(1 - (trackTime / (8 * 60))) * 100}%` }}
                                                    className="h-full bg-medical-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100 shadow-xl">
                                        <h3 className="text-xl font-black text-slate-900 uppercase italic mb-8">Clinical Team</h3>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 uppercase italic">Dr. James Miller</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-none mt-1">Lead Specialist</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <button className="w-full bg-slate-50 border border-slate-100 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-medical-50 hover:text-medical-600 transition-all flex items-center justify-center gap-3">
                                                <Phone className="w-4 h-4" /> Call Specialist
                                            </button>
                                            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-medical-600 transition-all flex items-center justify-center gap-3">
                                                Share Vital Pre-Log
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3rem] border border-slate-100 shadow-xl">
                                        <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6">Dispatch Log</h3>
                                        <div className="space-y-6">
                                            {[
                                                { time: '01:52', status: 'SOS Signal Received', done: true },
                                                { time: '01:53', status: 'Unit Assigned', done: true },
                                                { time: '01:54', status: 'En Route to Location', done: true },
                                                { time: 'NOW', status: 'Navigating Traffic', done: false }
                                            ].map((log, i) => (
                                                <div key={i} className={`flex items-start gap-4 ${!log.done ? 'opacity-100' : 'opacity-40'}`}>
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${log.done ? 'bg-green-500' : 'bg-medical-500 animate-pulse'}`} />
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-900 uppercase italic leading-none">{log.status}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-1">{log.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Quick Booking Info */}
                    <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden italic text-center lg:text-left">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-600/20 blur-[150px] -mr-64 -mt-64" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <h3 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter italic mb-8 leading-none">Instant <span className="text-medical-400">SOS</span> Dispatch</h3>
                                <p className="text-slate-400 text-lg font-medium italic mb-10">Our AI dispatch system instantly identifies the closest unit to your location, significantly reducing response time compared to traditional services.</p>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-60 italic text-[10px] font-black uppercase tracking-[0.3em]">
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> GPS Tracked</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> ICU Equipped</span>
                                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Certified Crew</span>
                                </div>
                            </div>
                            <button className="bg-medical-500 text-white rounded-full px-12 py-12 font-black uppercase tracking-widest text-xl hover:bg-medical-600 transition-all shadow-2xl shadow-medical-500/30 flex flex-col items-center group">
                                <Phone className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" /> CALL 108
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ambulance;
