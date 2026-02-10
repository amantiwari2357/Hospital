import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Search, Plus, Mail, Phone, MapPin,
    MoreVertical, ChevronRight, UserPlus,
    Upload, X, Camera, Building, User,
    Shield, CheckCircle2, AlertCircle
} from 'lucide-react';

const AddStaffModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="p-10 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Add New Staff</h3>
                        <p className="text-sm font-medium text-gray-500 mt-2 italic">Create a new profile for hospital personnel.</p>
                    </div>
                    <button onClick={onClose} className="p-3 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-12 space-y-12 pb-32">
                    {/* Photo Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-all relative overflow-hidden">
                                <Camera className="w-8 h-8 mb-2" />
                                <span className="text-[10px] font-black uppercase">Upload</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20">
                                <Plus className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-6 uppercase tracking-widest">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex items-center gap-3">
                                <User className="w-4 h-4 text-blue-500" /> Personal Information
                            </h4>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">First Name</label>
                                    <input type="text" placeholder="Jane" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Last Name</label>
                                    <input type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none">Email Address</label>
                                    <input type="email" placeholder="jane.doe@hms.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none">Phone Number</label>
                                    <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex items-center gap-3">
                                <Shield className="w-4 h-4 text-blue-500" /> Role Assignment
                            </h4>
                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Department</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                                        <option>Select Department</option>
                                        <option>Cardiology</option>
                                        <option>Pediatrics</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Role</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                                        <option>Select Role</option>
                                        <option>Doctor</option>
                                        <option>Nurse</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Employee ID</label>
                                    <input type="text" defaultValue="EMP-001" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-black text-gray-500 focus:ring-4 focus:ring-blue-500/5 outline-none focus:border-blue-500 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-white border-t border-gray-50 flex gap-4">
                    <button onClick={onClose} className="flex-1 py-5 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                    <button className="flex-1 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">Save Profile</button>
                </div>
            </div>
        </div>
    );
};

const StaffDirectory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const staff = [
        { name: 'Dr. Sarah Jenkins', email: 'sarah.j@hms.com', role: 'Chief Surgeon', id: 'DOC-082', dept: 'Cardiology', phone: '+1 (555) 000-0000', img: 'https://i.pravatar.cc/150?u=sarahj' },
        { name: 'James Miller', email: 'j.miller@hms.com', role: 'Senior Nurse', id: 'NRS-115', dept: 'Emergency Room', phone: '+1 (555) 000-0000', img: 'https://i.pravatar.cc/150?u=jamesm' },
        { name: 'Dr. Ayesha Khan', email: 'ayesha.k@hms.com', role: 'Consultant', id: 'DOC-104', dept: 'Pediatrics', phone: '+1 (555) 000-0000', img: 'https://i.pravatar.cc/150?u=ayeshak' },
        { name: 'Robert Wilson', email: 'r.wilson@hms.com', role: 'Pharmacist', id: 'PHR-055', dept: 'Pharmacy', phone: '+1 (555) 000-0000', initial: 'RW' },
    ];

    return (
        <Layout title="Staff Directory">
            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                            <span>Home</span>
                            <ChevronRight className="w-3 h-3 text-gray-300" />
                            <span className="text-gray-900">Staff Management</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">Staff Directory</h2>
                        <p className="text-gray-500 font-medium italic">Manage access, roles, and personal details for 148 active members.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-10 py-5 bg-blue-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                        <Plus className="w-5 h-5 text-white/70" /> Add New Staff
                    </button>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                    <div className="flex-1 relative">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or email"
                            className="w-full bg-gray-50 border border-gray-50 rounded-2xl py-5 pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Staff Table */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <th className="px-8 py-6">Staff Member</th>
                                    <th className="px-6 py-6 font-black">Role</th>
                                    <th className="px-6 py-6 font-black">Department</th>
                                    <th className="px-6 py-6 font-black">Contact</th>
                                    <th className="px-8 py-6 text-right font-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {staff.map((item, i) => (
                                    <tr key={i} className="group hover:bg-blue-50/20 transition-all cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                {item.img ? (
                                                    <img src={item.img} className="w-12 h-12 rounded-[1.2rem] object-cover shadow-sm ring-2 ring-white" alt="" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-[1.2rem] bg-gray-100 flex items-center justify-center font-black text-xs text-gray-500 uppercase">{item.initial}</div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 leading-tight">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 mt-1">{item.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div>
                                                <p className="text-[11px] font-black text-gray-700 leading-tight">{item.role}</p>
                                                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">ID: {item.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{item.dept}</span>
                                        </td>
                                        <td className="px-6 py-6 text-[11px] font-black text-gray-600 font-mono tracking-tight">{item.phone}</td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-3 text-gray-300 hover:text-blue-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="text-xs font-bold text-gray-400 text-center italic">Showing 1 to 10 of 148 results</p>

                <AddStaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </Layout>
    );
};

export default StaffDirectory;
