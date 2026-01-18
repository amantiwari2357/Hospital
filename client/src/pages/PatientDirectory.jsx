import Layout from '../components/Layout/Layout';
import {
    Search, Plus, Filter, MoreVertical,
    ChevronLeft, ChevronRight, Phone, Calendar,
    User, Mail, ArrowRight, UserPlus
} from 'lucide-react';

const PatientRow = ({ name, age, gender, mrn, phone, phoneType, lastVisit, lastVisitDoc, lastVisitDept, status, img, initials }) => (
    <div className="flex items-center px-8 py-8 hover:bg-blue-50/20 transition-all border-b border-gray-50 group">
        <div className="flex-1 flex items-center gap-6">
            <div className="relative">
                {img ? (
                    <img src={img} className="w-14 h-14 rounded-[1.5rem] object-cover shadow-md border-2 border-white ring-1 ring-gray-100" alt="" />
                ) : (
                    <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center font-black text-sm uppercase shadow-md ${initials === 'MR' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {initials}
                    </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div className="w-[200px]">
                <h4 className="text-base font-black text-gray-900 tracking-tight">{name}</h4>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{age} yrs • {gender}</p>
            </div>
        </div>

        <div className="w-[150px]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">MRN ID</p>
            <p className="text-sm font-black text-gray-500 font-mono tracking-tight">{mrn}</p>
        </div>

        <div className="w-[150px]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact</p>
            <p className="text-xs font-black text-gray-700">{phone}</p>
            <p className="text-[10px] font-bold text-gray-400 capitalize">{phoneType}</p>
        </div>

        <div className="flex-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Visit</p>
            <p className="text-xs font-black text-gray-900">{lastVisit}</p>
            <p className="text-[10px] font-bold text-gray-500 tracking-tight">{lastVisitDoc} ({lastVisitDept})</p>
        </div>

        <div className="w-[150px]">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 ${status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    status === 'Checked In' ? 'bg-green-50 text-green-600 border border-green-100' :
                        status === 'Discharged' ? 'bg-gray-100 text-gray-500 border border-gray-200' :
                            'bg-red-50 text-red-600 border border-red-100'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'Scheduled' ? 'bg-blue-400' :
                        status === 'Checked In' ? 'bg-green-400' :
                            status === 'Discharged' ? 'bg-gray-400' :
                                'bg-red-400'
                    }`}></div>
                {status}
            </span>
        </div>

        <div className="w-10 text-right opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 text-gray-300 hover:text-blue-500 transition-colors"><MoreVertical className="w-5 h-5" /></button>
        </div>
    </div>
);

const PatientDirectory = () => {
    const list = [
        { name: 'Sarah Jenkins', age: '34', gender: 'Female', mrn: '#882-901', phone: '(555) 123-4567', phoneType: 'Mobile', lastVisit: 'Oct 12, 2023', lastVisitDoc: 'Dr. Smith', lastVisitDept: 'Cardiology', status: 'Scheduled', img: 'https://i.pravatar.cc/150?u=sarahj' },
        { name: 'Michael Ross', age: '45', gender: 'Male', mrn: '#882-905', phone: '(555) 987-6543', phoneType: 'Home', lastVisit: 'Sep 28, 2023', lastVisitDoc: 'Dr. Wong', lastVisitDept: 'Ortho', status: 'Checked In', initials: 'MR' },
        { name: 'Emma Thompson', age: '28', gender: 'Female', mrn: '#882-912', phone: '(555) 246-8101', phoneType: 'Mobile', lastVisit: 'Aug 15, 2023', lastVisitDoc: 'Dr. House', lastVisitDept: 'Diagnosis', status: 'Discharged', img: 'https://i.pravatar.cc/150?u=emma' },
        { name: 'David Chen', age: '52', gender: 'Male', mrn: '#882-944', phone: '(555) 777-9999', phoneType: 'Work', lastVisit: 'Oct 20, 2023', lastVisitDoc: 'Dr. Strange', lastVisitDept: 'Neuro', status: 'Scheduled', initials: 'DC' },
        { name: 'Linda Martinez', age: '41', gender: 'Female', mrn: '#882-951', phone: '(555) 333-1111', phoneType: 'Mobile', lastVisit: 'Sep 01, 2023', lastVisitDoc: 'Dr. Grey', lastVisitDept: 'General', status: 'No Show', img: 'https://i.pravatar.cc/150?u=linda' },
    ];

    return (
        <Layout title="Patient Directory">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-md-end gap-6">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Patient Directory</h2>
                        <p className="text-sm font-medium text-gray-500 mt-2 flex items-center gap-3 italic">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            Monday, Oct 23, 2023 • Reception Desk A
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 rounded-2xl text-sm font-black text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Plus className="w-5 h-5 text-blue-600" />
                        New Patient
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-50/50 transition-all duration-700"></div>

                    <div className="flex-1 relative w-full lg:w-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Patient Name, Phone Number, or MRN ID (Press '/')"
                            className="w-full pl-16 pr-12 py-5 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[10px] font-black text-gray-300">/</div>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">Filters:</div>
                        {['Department: All', 'Doctor: All', 'Status: Active'].map((filter, i) => (
                            <button key={i} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[11px] font-black text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-3">
                                {filter}
                                <ChevronDown className="w-4 h-4 text-gray-300" />
                            </button>
                        ))}
                        <button className="text-[11px] font-black text-blue-600 hover:underline px-4">Reset all</button>
                    </div>
                </div>

                {/* Patient List Card */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[700px]">
                    {/* Header Row */}
                    <div className="flex items-center px-8 py-6 border-b border-gray-50 bg-gray-50/10 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <div className="flex-1">Patient Name</div>
                        <div className="w-[150px]">MRN ID</div>
                        <div className="w-[150px]">Contact</div>
                        <div className="flex-1">Last Visit</div>
                        <div className="w-[150px]">Status</div>
                        <div className="w-10 text-right">Action</div>
                    </div>

                    {/* List Items */}
                    <div className="flex-1 divide-y divide-gray-50">
                        {list.map((item, i) => (
                            <PatientRow key={i} {...item} />
                        ))}
                    </div>

                    {/* Footer / Pagination */}
                    <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
                        <p className="text-xs font-bold text-gray-400">Showing 5 of 248 patients</p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-white transition-all">Previous</button>
                            <button className="px-6 py-3 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-white transition-all">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const ChevronDown = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
);

export default PatientDirectory;
