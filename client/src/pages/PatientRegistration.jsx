import Layout from '../components/Layout/Layout';
import {
    User, Mail, Phone, MapPin, Calendar,
    Home, ChevronRight, UserPlus, Info,
    CreditCard, Shield, Clock, Send,
    Plus, ChevronDown, CheckCircle2, TrendingUp
} from 'lucide-react';

const InputGroup = ({ label, placeholder, icon: Icon, type = "text", required }) => (
    <div className="space-y-3">
        <label className="text-xs font-black text-gray-700 uppercase tracking-widest flex items-center gap-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />}
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all ${Icon ? 'pl-14' : 'px-6'}`}
            />
        </div>
    </div>
);

const SelectGroup = ({ label, options, required, icon: Icon }) => (
    <div className="space-y-3">
        <label className="text-xs font-black text-gray-700 uppercase tracking-widest flex items-center gap-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            {Icon && <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />}
            <select className={`w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pr-12 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none cursor-pointer ${Icon ? 'pl-14' : 'px-6'}`}>
                {options.map((opt, i) => <option key={i}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none transition-transform group-focus-within:rotate-180" />
        </div>
    </div>
);

const PatientRegistration = () => {
    return (
        <Layout title="New Patient Registration">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                            <Home className="w-3 h-3" />
                            <ChevronRight className="w-3 h-3" />
                            <span>Patient Management</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-blue-600">New Registration</span>
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">New Patient Registration</h2>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-[2rem] shadow-sm flex items-center gap-6 pr-10 border-l-[6px] border-l-blue-600">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 scale-110">
                            <div className="w-6 h-6 border-4 border-blue-600 rounded flex items-center justify-center text-[10px] font-black">#</div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Assigned MRN</p>
                            <p className="text-lg font-black text-blue-600 tracking-tight">#2023-8492-X</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column: Form Sections */}
                    <div className="lg:col-span-8 space-y-10 pb-20">
                        {/* Section 1: Basic Info */}
                        <div className="bg-white p-12 rounded-[3rem] border border-gray-50 shadow-sm space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-10"></div>
                            <div className="flex items-center gap-4 border-b border-gray-50 pb-8">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><User className="w-6 h-6" /></div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Basic Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <InputGroup label="First Name" placeholder="Jane" required={true} />
                                <InputGroup label="Last Name" placeholder="Doe" required={true} />
                                <InputGroup label="Date of Birth" placeholder="mm/dd/yyyy" type="date" icon={Calendar} required={true} />
                                <InputGroup label="Age" placeholder="-- yrs" type="number" />
                                <SelectGroup label="Gender" options={['Select Gender', 'Male', 'Female', 'Non-Binary']} required={true} />
                                <SelectGroup label="Blood Group" options={['Select Type', 'A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-']} />
                                <div className="md:col-span-2">
                                    <InputGroup label="National ID / SSN" placeholder="XXX-XX-XXXX" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Contact Details */}
                        <div className="bg-white p-12 rounded-[3rem] border border-gray-50 shadow-sm space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-10"></div>
                            <div className="flex items-center gap-4 border-b border-gray-50 pb-8">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Mail className="w-6 h-6" /></div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Contact Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                <InputGroup label="Phone Number" placeholder="(555) 000-0000" icon={Phone} required={true} />
                                <InputGroup label="Email Address" placeholder="jane.doe@example.com" icon={Mail} />
                                <div className="md:col-span-2">
                                    <InputGroup label="Residential Address" placeholder="123 Main St, Springfield, IL" icon={MapPin} />
                                </div>
                                <InputGroup label="Emergency Contact Name" placeholder="Next of Kin" />
                                <InputGroup label="Emergency Phone" placeholder="(555) 999-9999" icon={Phone} required={true} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visit Details & Summary */}
                    <div className="lg:col-span-4 space-y-8 sticky top-24">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10 relative overflow-hidden group">
                            <div className="absolute top-8 right-8 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Active</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/5"><ShoppingBagIcon className="w-6 h-6" /></div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Visit Details</h3>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Visit Type</p>
                                    <div className="flex p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                                        {['OPD', 'Emergency', 'IPD'].map((type, i) => (
                                            <button key={i} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-blue-600 shadow-sm border border-gray-100 ring-4 ring-blue-500/5' : 'text-gray-400 hover:text-gray-600'}`}>
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <SelectGroup label="Department" options={['General Medicine', 'Cardiology', 'Pediatrics']} icon={BuildingIcon} />
                                <SelectGroup label="Assign Doctor" options={['Dr. Sarah Connor (Available)', 'Dr. Gregory House', 'Dr. Meredith Grey']} icon={StethoscopeIcon} />

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reason for Visit</label>
                                    <textarea
                                        placeholder="Brief description of symptoms..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all h-32 reszie-none"
                                    ></textarea>
                                </div>

                                <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-center gap-5 group/ins relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100/50 rounded-bl-[3rem] -translate-y-1/2 translate-x-1/2 group-hover/ins:scale-150 transition-transform duration-700"></div>
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><CreditCard className="w-5 h-5" /></div>
                                    <div className="relative">
                                        <p className="text-xs font-black text-gray-900 leading-tight">Insurance / Self-Pay</p>
                                        <p className="text-[10px] font-bold text-gray-500 leading-relaxed mt-1">Default payment method is Cash. Add insurance details in the billing section later.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-10">
                                <button className="w-full py-5 bg-blue-600 text-white rounded-3xl text-sm font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 group">
                                    <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-125" />
                                    Confirm Registration
                                </button>
                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">Save Draft</button>
                                    <button className="flex-1 py-4 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                                </div>
                            </div>
                        </div>

                        {/* Daily Registrations Counter */}
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm flex items-center justify-between group overflow-hidden relative">
                            <div className="absolute left-0 top-0 w-1 h-full bg-green-500 group-hover:w-3 transition-all duration-300"></div>
                            <div className="pl-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Today's Registrations</p>
                                <p className="text-3xl font-black text-gray-900">24</p>
                            </div>
                            <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const ShoppingBagIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const BuildingIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const StethoscopeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

export default PatientRegistration;
