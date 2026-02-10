import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Menu, X, Phone, HeartPulse, User, ShoppingBag, Search,
    ShieldAlert, ChevronRight, Activity, ArrowRight, BookOpen,
    Database, LayoutDashboard, Tablets, ChevronLeft, Sparkles,
    Ambulance
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { clinicalMegaMenus } from '../../utils/megaMenuData';

const Navbar = () => {
    const cart = useCart();
    const setIsCartOpen = cart?.setIsCartOpen;
    const cartCount = cart?.cartCount || 0;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState(null);
    const [isHoveringMenu, setIsHoveringMenu] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const location = useLocation();
    const tabsRef = useRef(null);

    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('patientToken');
        setIsAuthenticated(!!token);
    }, [location]);

    const scroll = (direction) => {
        if (tabsRef.current) {
            const scrollAmount = 300;
            tabsRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const clinicalTabs = [
        { name: 'Cardiology', href: '/disease/cardiology' },
        { name: 'Neurology', href: '/disease/neurology' },
        { name: 'Oncology', href: '/disease/oncology' },
        { name: 'Pediatrics', href: '/disease/pediatrics' },
        { name: 'Orthopedics', href: '/disease/orthopedics' },
        { name: 'Dermatology', href: '/disease/dermatology' },
        { name: 'Gastroenterology', href: '/disease/gastro' },
        { name: 'Ophthalmology', href: '/disease/eye' },
        { name: 'Urology', href: '/disease/urology' },
        { name: 'Psychiatry', href: '/disease/mind' },
        { name: 'Endocrinology', href: '/disease/endocrine' },
        { name: 'Nephrology', href: '/disease/kidney' },
        { name: 'Pulmonology', href: '/disease/lung' },
        { name: 'Rheumatology', href: '/disease/bone' },
        { name: 'Hematology', href: '/disease/blood' },
        { name: 'Dentistry', href: '/disease/dental' },
        { name: 'Gynecology', href: '/disease/women' },
        { name: 'Radiology', href: '/disease/scan' },
        { name: 'Pathology', href: '/disease/lab' },
        { name: 'Immuno', href: '/disease/immune' },
        { name: 'Surgery', href: '/disease/surgery' },
        { name: 'Nutrition', href: '/disease/diet' }
    ];

    const operationalLinks = [
        { name: 'Patient Portal', href: '/portal', icon: LayoutDashboard },
        { name: 'Research Papers', href: '/research', icon: Database },
        { name: 'Lab Resources', href: '/resources', icon: BookOpen },
        { name: 'Ambulance Hub', href: '/ambulance', icon: Ambulance },
        { name: 'Digital Pharmacy', href: '/medicines', icon: Tablets },
        { name: 'Market Hub', href: '/market-insights', icon: Activity },
    ];

    const getSubLinks = (name) => {
        return clinicalMegaMenus[name] || clinicalMegaMenus['General'];
    };

    const handleMouseEnter = (name) => {
        setActiveMegaMenu(name);
        setIsHoveringMenu(true);
    };

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-500`}
            onMouseLeave={() => setActiveMegaMenu(null)}
        >
            <div className={`max-w-[99%] mx-auto transition-all duration-500 overflow-hidden ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl rounded-none py-2 translate-y-0' : 'bg-white shadow-xl rounded-[3rem] py-4 mt-4 translate-y-0'
                } px-6 border border-slate-100 relative z-20`}>

                {/* LAYER 1: BRAND & GLOBAL SEARCH & MAIN ACTIONS */}
                <div className="flex justify-between items-center gap-8 mb-4">
                    <Link to="/" className="flex items-center gap-2 shrink-0 group">
                        <div className="p-3 rounded-2xl bg-medical-500 text-white shadow-lg shadow-medical-200 group-hover:rotate-12 transition-transform">
                            <HeartPulse className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900 italic uppercase">
                            Care<span className="text-medical-600">Sync</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex flex-grow max-w-xl relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-medical-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Clinical domains, medicines, or experts..."
                            className="w-full bg-slate-50 border-none rounded-full py-4 pl-14 pr-6 font-bold text-[11px] focus:ring-2 focus:ring-medical-500/20 italic transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link to="/emergency" className="hidden sm:flex bg-red-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all gap-2 items-center shadow-lg shadow-red-100">
                            <ShieldAlert className="w-4 h-4 animate-pulse" />
                            EMERGENCY
                        </Link>

                        <Link to="/ambulance" className="hidden 2xl:flex bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-medical-600 transition-all gap-2 items-center shadow-lg shadow-slate-100 italic">
                            <Ambulance className="w-4 h-4" />
                            AMBULANCE
                        </Link>

                        <Link to="/skin-ai" className="hidden xl:flex bg-medical-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-medical-600 transition-all gap-2 items-center shadow-lg shadow-medical-100 group">
                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            AI SKIN SCAN
                        </Link>

                        <div className="h-10 w-px bg-slate-100 mx-2 hidden lg:block" />

                        <button onClick={() => setIsCartOpen && setIsCartOpen(true)} className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-medical-50 hover:text-medical-600 transition-all relative group">
                            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-medical-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {isAuthenticated ? (
                            <Link to="/profile" className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-medical-50 hover:text-medical-600 transition-all group">
                                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Link>
                        ) : (
                            <Link to="/portal-login" className="px-6 py-3 bg-medical-600 text-white rounded-2xl hover:bg-medical-700 transition-all font-bold text-sm uppercase tracking-wider">
                                Login
                            </Link>
                        )}

                        <Link to="/ambulance" className="p-3.5 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-all group flex sm:hidden items-center justify-center border border-red-100">
                            <Ambulance className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link to="/skin-ai" className="p-3.5 bg-slate-50 text-slate-600 rounded-2xl hover:bg-medical-50 hover:text-medical-600 transition-all group flex xl:hidden items-center justify-center">
                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-medical-600" />
                        </Link>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-3 text-slate-600 hover:text-medical-600">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* LAYER 2: CLINICAL DOMAINS (HORIZONTAL SCROLL) */}
                <div className="hidden lg:block border-y border-slate-50 py-3 relative group/tabs">
                    {/* Scroll Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 transition-all hover:bg-medical-50 hover:text-medical-600"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div
                        ref={tabsRef}
                        className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1"
                    >
                        {clinicalTabs.map((tab, i) => (
                            <Link
                                key={i}
                                to={tab.href}
                                onMouseEnter={() => handleMouseEnter(tab.name)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-transparent ${activeMegaMenu === tab.name || location.pathname === tab.href
                                    ? 'bg-medical-600 text-white shadow-xl shadow-medical-100'
                                    : 'text-slate-500 hover:text-medical-600 hover:bg-medical-50 hover:border-medical-100'
                                    } `}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-100 transition-all hover:bg-medical-50 hover:text-medical-600"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* LAYER 3: OPERATIONAL PORTALS (HIGH PROMINENCE) */}
                <div className="hidden lg:flex justify-left items-center gap-3 pt-2 relative z-10">
                    {operationalLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all group ${location.pathname === link.href ? 'text-medical-600' : 'text-slate-400 hover:text-slate-900'
                                } `}
                        >
                            <link.icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${location.pathname === link.href ? 'text-medical-600' : 'text-slate-300 group-hover:text-medical-500'
                                } `} />
                            <span className="text-[9px] font-black uppercase tracking-[0.15em] italic">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                    <div className="absolute right-0 top-2">
                        <Link
                            to="/book-appointment"
                            className="flex items-center gap-1.5 text-medical-600 font-black uppercase text-[9px] tracking-widest hover:gap-3 transition-all"
                        >
                            Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mega-Menu Overlay (Handles Clinical Domains) */}
            <AnimatePresence>
                {activeMegaMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        onMouseEnter={() => setIsHoveringMenu(true)}
                        onMouseLeave={() => setActiveMegaMenu(null)}
                        className="absolute top-[105%] left-[10%] w-[80%] bg-white/98 backdrop-blur-3xl border border-slate-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] p-8 z-10 rounded-[3rem]"
                    >
                        <div className="max-w-7xl mx-auto flex gap-6">
                            <div className="w-1/4">
                                <span className="text-medical-600 font-black uppercase tracking-[0.4em] text-[9px] block mb-2 italic">Clinical Domain</span>
                                <h3 className="text-3xl font-black text-slate-900 italic uppercase leading-tight mb-4">
                                    {activeMegaMenu}
                                </h3>
                                <p className="text-slate-500 font-medium italic text-[11px] mb-6 leading-relaxed">
                                    Specialized clinical pathways.
                                </p>
                                <Link
                                    to="/research"
                                    className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-medical-600 transition-all no-underline"
                                >
                                    Protocols <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="w-3/4 grid grid-cols-3 gap-x-8 gap-y-3 border-l border-slate-100 pl-2">
                                {getSubLinks(activeMegaMenu).map((sub, i) => (
                                    <Link
                                        key={i}
                                        to={`/clinical/${activeMegaMenu.toLowerCase()}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="group flex items-center gap-4 py-1.5 cursor-pointer"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-slate-100 group-hover:bg-medical-500 group-hover:scale-150 transition-all" />
                                        <span className="text-[12px] font-extrabold text-slate-500 uppercase tracking-tight group-hover:text-medical-600 transition-colors italic whitespace-nowrap">
                                            {sub}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="lg:hidden absolute top-0 left-0 w-full h-screen bg-white z-[60] p-10 overflow-y-auto italic"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <span className="text-2xl font-black italic uppercase">Care<span className="text-medical-600">Sync</span></span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-100 rounded-2xl"><X className="w-8 h-8 text-slate-600" /></button>
                        </div>
                        <div className="space-y-12">
                            {/* Mobile Emergency & AI Scan Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/emergency" className="flex items-center justify-center gap-3 bg-red-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-100 italic">
                                    <ShieldAlert className="w-4 h-4 animate-pulse" /> Emergency
                                </Link>
                                <Link to="/ambulance" className="flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-slate-200 italic">
                                    <Ambulance className="w-4 h-4" /> Ambulance
                                </Link>
                            </div>
                            <Link to="/skin-ai" className="flex items-center justify-center gap-3 bg-medical-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-lg shadow-medical-100 italic w-full">
                                <Sparkles className="w-4 h-4" /> AI Skin Scan
                            </Link>

                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">Clinical Portals</p>
                                <div className="grid gap-5">
                                    {operationalLinks.map(link => (
                                        <Link key={link.name} to={link.href} className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl group">
                                            <link.icon className="w-8 h-8 text-medical-600" />
                                            <div className="flex-grow">
                                                <p className="text-xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">{link.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Institutional Access</p>
                                            </div>
                                            <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-medical-500 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">All Clinical Expertise</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {clinicalTabs.map(t => (
                                        <Link key={t.name} to={t.href} className="p-5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 text-center border border-transparent hover:border-medical-100 hover:text-medical-600 transition-all italic">
                                            {t.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Link to="/book-appointment" className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-4 shadow-2xl">
                                <Phone className="w-5 h-5" /> Book Appointment
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
