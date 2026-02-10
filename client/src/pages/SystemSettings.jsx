import Layout from '../components/Layout/Layout';
import React from 'react';
import {
    Shield, Settings, Clock, Bell, Share2,
    MoreVertical, ChevronRight, Save,
    History, Plus, CheckCircle2, XCircle,
    User, HardDrive, Smartphone, Globe,
    Search, Filter, Info
} from 'lucide-react';

const PermissionRow = ({ label, permissions }) => (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
        <td className="pl-0 py-8">
            <p className="text-xs font-black text-gray-700 tracking-tight group-hover:text-blue-600 transition-colors">{label}</p>
        </td>
        {permissions.map((val, i) => (
            <td key={i} className="px-6 py-8 text-center">
                <label className="relative inline-flex items-center cursor-pointer group/toggle">
                    <input type="checkbox" className="sr-only peer" checked={val === 'y'} readOnly />
                    <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </td>
        ))}
    </tr>
);

const SystemSettings = () => {
    const roles = [
        { name: 'Super Admin', count: 3, default: true },
        { name: 'Doctor (Head)', count: 12 },
        { name: 'Resident Doctor', count: 45 },
        { name: 'Nurse Practitioner', count: 86 },
        { name: 'Receptionist', count: 8 },
        { name: 'Pharmacist', count: 5 },
        { name: 'Lab Technician', count: 14 },
    ];

    const sections = [
        {
            title: 'CLINICAL RECORDS',
            icon: History,
            items: [
                { label: 'Patient Demographics', perms: ['y', 'y', 'y', 'n', 'y', 'n'] },
                { label: 'Prescriptions & Meds', perms: ['y', 'y', 'y', 'n', 'n', 'y'] },
            ]
        },
        {
            title: 'FINANCIALS',
            icon: Settings,
            items: [
                { label: 'Invoices & Billing', perms: ['y', 'y', 'y', 'n', 'y', 'y'] },
            ]
        },
        {
            title: 'SYSTEM ADMINISTRATION',
            icon: Shield,
            items: [
                { label: 'Staff Management', perms: ['y', 'y', 'y', 'y', 'y', 'y'] },
                { label: 'System Logs', perms: ['y', 'n', 'n', 'n', 'y', 'n'] },
            ]
        }
    ];

    return (
        <Layout title="System Configuration">
            <div className="max-w-[1700px] mx-auto space-y-12 pb-20">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                            <span>Home</span>
                            <ChevronRight className="w-3 h-3 text-gray-300" />
                            <span>System Administration</span>
                            <ChevronRight className="w-3 h-3 text-gray-300" />
                            <span className="text-gray-900">Settings & Roles</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-3">System Configuration</h2>
                        <p className="text-gray-500 font-medium italic">Manage access controls, hospital details, operational hours, and system-wide notification preferences.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                            <History className="w-4 h-4 text-blue-500" /> View Audit Log
                        </button>
                        <button className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                            <Save className="w-5 h-5" /> Save All Changes
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-4 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-6 py-4">Settings Menu</p>
                            {[
                                { label: 'Roles & Permissions', icon: Shield, active: true },
                                { label: 'Hospital Profile', icon: Globe },
                                { label: 'Working Hours', icon: Clock },
                                { label: 'Notification Rules', icon: Bell },
                                { label: 'Integrations', icon: Share2 },
                            ].map((item, i) => (
                                <button key={i} className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.8rem] transition-all group ${item.active ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-xs font-black tracking-tight">{item.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center relative z-10"><Info className="w-5 h-5" /></div>
                            <div className="relative z-10">
                                <h5 className="text-[11px] font-black text-gray-900 tracking-tight">RBAC System</h5>
                                <p className="text-[9px] font-bold text-gray-500 leading-relaxed mt-2 italic">Changes to roles will propagate immediately. Ensure no users are currently performing critical tasks in modified modules.</p>
                            </div>
                        </div>
                    </div>

                    {/* Roles List */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm space-y-8 flex flex-col h-full ring-1 ring-gray-100">
                            <div className="flex justify-between items-center px-2">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight">Active Roles</h3>
                                <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Plus className="w-4 h-4" /></button>
                            </div>
                            <div className="space-y-3 flex-1">
                                {roles.map((role, i) => (
                                    <div key={i} className={`p-6 rounded-[2rem] border transition-all cursor-pointer group flex justify-between items-center ${i === 0 ? 'bg-white border-blue-600 ring-4 ring-blue-500/5 shadow-md' : 'bg-gray-50/50 border-transparent hover:border-blue-200 hover:bg-white'}`}>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-sm font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">{role.name}</h4>
                                                {role.default && <span className="text-[8px] font-black px-2 py-0.5 bg-green-50 text-green-500 rounded-full border border-green-100 uppercase tracking-widest">Default</span>}
                                            </div>
                                            <p className="text-[10px] font-bold text-gray-400">{role.count} Users</p>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 ${i === 0 ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-500'} transition-all`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Permissions Matrix */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-sm space-y-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-100/30 transition-all duration-[2s]"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-50 pb-10 relative z-10">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Super Admin</h3>
                                        <span className="px-5 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100">System Default</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">Full access to all modules and configurations.</p>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="flex-1 md:w-64 relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input type="text" placeholder="Filter permissions..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-medium focus:ring-4 focus:ring-blue-500/5 transition-all" />
                                    </div>
                                    <button className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-blue-600 transition-all shadow-sm"><MoreVertical className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                                            <th className="pl-0 pb-8 min-w-[200px]">Module / Feature</th>
                                            <th className="px-6 pb-8 text-center">View</th>
                                            <th className="px-6 pb-8 text-center">Create</th>
                                            <th className="px-6 pb-8 text-center">Edit</th>
                                            <th className="px-6 pb-8 text-center">Delete</th>
                                            <th className="px-6 pb-8 text-center">Export</th>
                                            <th className="px-6 pb-8 text-center">Approve</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50/50">
                                        {sections.map((section, idx) => (
                                            <React.Fragment key={idx}>
                                                <tr className="bg-gray-50/20">
                                                    <td colSpan="7" className="pl-0 py-8">
                                                        <div className="flex items-center gap-3 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                                                            <section.icon className="w-4 h-4" />
                                                            {section.title}
                                                        </div>
                                                    </td>
                                                </tr>
                                                {section.items.map((item, idy) => (
                                                    <PermissionRow key={`${idx}-${idy}`} label={item.label} permissions={item.perms} />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-end gap-6 pt-10 border-t border-gray-50 relative z-10">
                                <button className="px-10 py-5 border border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all">Cancel</button>
                                <button className="px-12 py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">Save Configuration</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SystemSettings;
