import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck, Globe, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { diseasesData } from '../../utils/diseasesData';

const MegaFooter = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Header Section */}
                <div className="grid lg:grid-cols-4 gap-12 mb-4">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-medical-600 rounded-xl text-white">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <span className="text-3xl font-black text-white tracking-tight">Care<span className="text-medical-500">Sync</span></span>
                        </div>
                        <p className="text-lg text-slate-300 font-medium mb-10 max-w-xl leading-relaxed">
                            CareSync Medical Systems is a global leader in integrated healthcare solutions.
                            Our mission is to provide world-class medical consultation and specialized care
                            through advanced AI-driven diagnostics and board-certified expertise.
                        </p>
                        <div className="flex gap-6">
                            <div className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-700">
                                <Phone className="w-6 h-6 text-medical-500" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Emergency Line</p>
                                    <p className="text-white font-black">+1 (800) 999-CARE</p>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-2xl flex items-center gap-4 border border-slate-700">
                                <Mail className="w-6 h-6 text-medical-500" />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">General Inquiry</p>
                                    <p className="text-white font-black">support@caresync.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-2">
                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Primary Services</h4>
                            <ul className="space-y-4 font-bold text-sm">
                                <li><Link to="/" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Emergency Trauma</Link></li>
                                <li><Link to="/" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Digital Pharmacy</Link></li>
                                <li><Link to="/" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> AI Consultation</Link></li>
                                <li><Link to="/" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Surgical Excellence</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Specialized Care</h4>
                            <ul className="space-y-4 font-bold text-sm">
                                <li><Link to="/disease/cancer" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Oncology</Link></li>
                                <li><Link to="/disease/heart-disease" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Cardiology</Link></li>
                                <li><Link to="/disease/diabetes" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Diabetology</Link></li>
                                <li><Link to="/disease/migraine-advance" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Neurology</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Wellness Index</h4>
                            <ul className="space-y-4 font-bold text-sm">
                                <li><Link to="/disease/obesity" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Weight Loss</Link></li>
                                <li><Link to="/disease/smoking-cessation" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Addiction Recovery</Link></li>
                                <li><Link to="/disease/mental-health" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Psychology</Link></li>
                                <li><Link to="/disease/hair-loss" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Cosmetology</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Resources</h4>
                            <ul className="space-y-4 font-bold text-sm">
                                <li><Link to="/profile" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Patient Portal</Link></li>
                                <li><Link to="/blog" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Research Papers</Link></li>
                                <li><Link to="/about" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Institutional Profile</Link></li>
                                <li><Link to="/medicines" className="hover:text-medical-500 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-medical-600" /> Digital Pharmacy</Link></li>
                            </ul>
                        </div>
                    </div>              </div>
            </div>

            {/* Specialized Treatment Mega Grid (Index of 30+ conditions) */}
            <div className="border-t border-slate-800 py-16">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-xs mb-10 text-center">Treatment Directory Index</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4">
                    {diseasesData.map(disease => (
                        <Link key={disease.id} to={`/disease/${disease.id}`} className="text-xs font-bold hover:text-medical-500 transition-colors">
                            {disease.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Heavy Scientific/Medical Content Section (~Strong Medical Disclaimer and Info) */}
            <div className="border-t border-slate-800 py-16 text-slate-500">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h5 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-medical-500" />
                            Medical Excellence & Ethical Guidelines
                        </h5>
                        <p className="text-sm leading-relaxed text-justify">
                            Our institution operates under the highest standards of international healthcare ethics.
                            Every clinical pathway at CareSync is validated against rigorous clinical guidelines and
                            is supervised by a committee of medical experts. We prioritize patient autonomy,
                            non-maleficence, and beneficence in every decision. Our diagnostic frameworks
                            utilize cutting-edge molecular biology, genomics, and advanced imaging technologies
                            to ensure that treatment is precise and targeted. For conditions such as oncology,
                            neurology, and cardiovascular medicine, our protocols involve interdisciplinary
                            multimethodology to mitigate risks and maximize therapeutic efficacy.
                        </p>
                        <p className="text-sm leading-relaxed text-justify">
                            Patients are advised that the information provided on this platform is for educational
                            purposes and should not replace professional medical intervention. Chronic conditions
                            require continuous monitoring and specialized laboratory evaluations to track biomarker
                            progression and systemic response. Our 24/7 patient monitoring systems are designed
                            to track vital parameters and provide real-time alerts to our trauma response units.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h5 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-medical-500" />
                            Operational & Research Infrastructure
                        </h5>
                        <p className="text-sm leading-relaxed text-justify">
                            CareSync invests heavily in R&D to pioneer new treatment modalities for rare
                            and chronic illnesses. Our research labs collaborative with global pharmaceutical
                            entities to conduct phase III clinical trials within our specialized centers.
                            From minimally invasive robotic surgeries to peptide-based dermatological
                            reconstruction, we lead from the front. Our infrastructure is powered by green energy
                            and sustainable medical disposal protocols, ensuring that we care for the planet
                            while caring for you.
                        </p>
                        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700/50">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-4">Accreditation status</p>
                            <div className="flex gap-8 justify-between">
                                <div className="text-center">
                                    <span className="block text-white font-black text-xl">ISO</span>
                                    <span className="text-[9px] font-bold">9001:2015</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-white font-black text-xl">JCI</span>
                                    <span className="text-[9px] font-bold">GOLD SEAL</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-white font-black text-xl">HIPAA</span>
                                    <span className="text-[9px] font-bold">COMPLIANT</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-white font-black text-xl">GDPR</span>
                                    <span className="text-[9px] font-bold">DATA SECURE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-slate-800 pt-10 text-center flex flex-col items-center gap-6">
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <Link to="/" className="hover:text-white transition-colors">Accessibility</Link>
                    <Link to="/" className="hover:text-white transition-colors">Cookie Settings</Link>
                    <Link to="/" className="hover:text-white transition-colors">Legal Notices</Link>
                    <Link to="/" className="hover:text-white transition-colors">Site Map</Link>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    Â© 2026 CareSync International Medical Systems Ltd. All Rights Reserved.
                    Technology powered by CoreEdge Diagnostics.
                </p>
            </div>
        </footer>
    );
};

export default MegaFooter;
