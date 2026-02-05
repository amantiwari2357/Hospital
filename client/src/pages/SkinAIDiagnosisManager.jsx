import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import {
    Sparkles,
    Search,
    Filter,
    Calendar,
    User,
    Image as ImageIcon,
    AlertCircle,
    CheckCircle2,
    Clock,
    Eye,
    Download,
    Send,
    ArrowLeft,
    TrendingUp,
    Activity,
    Shield,
    Zap,
    FileText,
    Phone,
    Mail
} from 'lucide-react';

const SkinAIDiagnosisManager = () => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'reviewed', 'followup'

    // Mock AI diagnosis submissions
    const diagnoses = [
        {
            id: 'AI-5521',
            patientName: 'Mahan Kumar',
            patientId: 'P-992834',
            phone: '+91 98765 43210',
            email: 'mahan@example.com',
            submittedDate: 'Feb 05, 2024',
            submittedTime: '10:30 AM',
            condition: 'Dermatitis (Probable)',
            confidence: '94.2%',
            severity: 'Moderate',
            status: 'Pending Review',
            imageUrl: '/placeholder-skin.jpg',
            description: 'Detected patterns suggest inflammatory skin response. This could be due to contact with an allergen or irritant.',
            recommendations: [
                'Avoid known allergens and irritants',
                'Use gentle, fragrance-free skincare products',
                'Consider topical corticosteroid cream',
                'Schedule dermatologist consultation if symptoms persist'
            ],
            aiNotes: 'High confidence detection. Pattern matches common contact dermatitis presentations.',
            followupRequired: true
        },
        {
            id: 'AI-5520',
            patientName: 'Priya Sharma',
            patientId: 'P-883421',
            phone: '+91 98123 45678',
            email: 'priya@example.com',
            submittedDate: 'Feb 04, 2024',
            submittedTime: '02:15 PM',
            condition: 'Eczema (Likely)',
            confidence: '89.7%',
            severity: 'Mild',
            status: 'Reviewed',
            imageUrl: '/placeholder-skin.jpg',
            description: 'Characteristic dry, itchy patches consistent with atopic dermatitis.',
            recommendations: [
                'Moisturize regularly with emollient creams',
                'Avoid hot showers',
                'Use mild, unscented soaps',
                'Consider antihistamines for itching'
            ],
            aiNotes: 'Typical eczema presentation. Recommend follow-up if condition worsens.',
            followupRequired: false
        },
        {
            id: 'AI-5519',
            patientName: 'Rahul Verma',
            patientId: 'P-772910',
            phone: '+91 99887 76655',
            email: 'rahul@example.com',
            submittedDate: 'Feb 03, 2024',
            submittedTime: '04:45 PM',
            condition: 'Psoriasis (Possible)',
            confidence: '82.3%',
            severity: 'Moderate',
            status: 'Follow-up Scheduled',
            imageUrl: '/placeholder-skin.jpg',
            description: 'Scaly, raised patches detected. Consistent with plaque psoriasis patterns.',
            recommendations: [
                'Consult dermatologist for definitive diagnosis',
                'Avoid skin trauma (Koebner phenomenon)',
                'Consider phototherapy options',
                'Maintain skin hydration'
            ],
            aiNotes: 'Moderate confidence. Recommend specialist consultation for confirmation.',
            followupRequired: true
        },
        {
            id: 'AI-5518',
            patientName: 'Ananya Iyer',
            patientId: 'P-665432',
            phone: '+91 98234 56789',
            email: 'ananya@example.com',
            submittedDate: 'Feb 02, 2024',
            submittedTime: '11:20 AM',
            condition: 'Acne Vulgaris',
            confidence: '96.8%',
            severity: 'Mild',
            status: 'Reviewed',
            imageUrl: '/placeholder-skin.jpg',
            description: 'Comedones and inflammatory lesions characteristic of acne.',
            recommendations: [
                'Use non-comedogenic skincare products',
                'Consider benzoyl peroxide or salicylic acid treatments',
                'Maintain consistent cleansing routine',
                'Avoid picking or squeezing lesions'
            ],
            aiNotes: 'Very high confidence. Standard acne presentation.',
            followupRequired: false
        }
    ];

    const stats = {
        total: diagnoses.length,
        pending: diagnoses.filter(d => d.status === 'Pending Review').length,
        reviewed: diagnoses.filter(d => d.status === 'Reviewed').length,
        followup: diagnoses.filter(d => d.followupRequired).length,
        avgConfidence: '90.8%'
    };

    const currentDiagnosis = selectedDiagnosis ? diagnoses.find(d => d.id === selectedDiagnosis) : null;

    const filteredDiagnoses = diagnoses.filter(d => {
        if (filterStatus === 'pending') return d.status === 'Pending Review';
        if (filterStatus === 'reviewed') return d.status === 'Reviewed';
        if (filterStatus === 'followup') return d.followupRequired;
        return true;
    });

    if (selectedDiagnosis && currentDiagnosis) {
        // Detailed Diagnosis View
        return (
            <Layout title="AI Diagnosis Details">
                <div className="space-y-6 italic">
                    {/* Back Button */}
                    <button
                        onClick={() => setSelectedDiagnosis(null)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-black uppercase text-[10px] tracking-widest transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Diagnosis List
                    </button>

                    {/* Header */}
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">AI Skin Diagnosis</h2>
                                </div>
                                <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">Diagnosis ID: {currentDiagnosis.id}</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-3 bg-gray-50 rounded-2xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all">
                                    <Send className="w-4 h-4" /> Contact Patient
                                </button>
                            </div>
                        </div>

                        {/* Patient Info */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Patient', value: currentDiagnosis.patientName, icon: User },
                                { label: 'Patient ID', value: currentDiagnosis.patientId, icon: FileText },
                                { label: 'Phone', value: currentDiagnosis.phone, icon: Phone },
                                { label: 'Email', value: currentDiagnosis.email, icon: Mail }
                            ].map((item, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <item.icon className="w-4 h-4 text-gray-400" />
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Analysis Results */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Image & Diagnosis */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-6">Submitted Image</h4>
                            <div className="aspect-square bg-gray-100 rounded-[2rem] mb-6 flex items-center justify-center border-2 border-dashed border-gray-200">
                                <ImageIcon className="w-16 h-16 text-gray-300" />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Submitted</span>
                                    <span className="text-sm font-black text-gray-900">{currentDiagnosis.submittedDate} {currentDiagnosis.submittedTime}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${currentDiagnosis.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-600' :
                                            currentDiagnosis.status === 'Reviewed' ? 'bg-green-100 text-green-600' :
                                                'bg-blue-100 text-blue-600'
                                        }`}>
                                        {currentDiagnosis.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* AI Analysis */}
                        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-[2.5rem] shadow-sm p-8 text-white">
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-5 h-5" />
                                <h4 className="text-sm font-black uppercase tracking-widest">AI Analysis Results</h4>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Detected Condition</p>
                                    <p className="text-2xl font-black">{currentDiagnosis.condition}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Confidence</p>
                                        <p className="text-xl font-black">{currentDiagnosis.confidence}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Severity</p>
                                        <p className="text-xl font-black">{currentDiagnosis.severity}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-200 mb-2">Description</p>
                                    <p className="text-sm font-medium leading-relaxed">{currentDiagnosis.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8">
                        <h4 className="text-xl font-black uppercase tracking-tight text-gray-900 mb-6">AI Recommendations</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {currentDiagnosis.recommendations.map((rec, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm font-bold text-gray-700">{rec}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Notes & Follow-up */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-4">AI System Notes</h4>
                            <p className="text-sm text-gray-700 italic leading-relaxed">{currentDiagnosis.aiNotes}</p>
                        </div>
                        <div className={`rounded-[2.5rem] shadow-sm p-8 ${currentDiagnosis.followupRequired ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-gray-50 border border-gray-100'}`}>
                            <h4 className={`text-sm font-black uppercase tracking-widest mb-4 ${currentDiagnosis.followupRequired ? 'text-white' : 'text-gray-900'}`}>
                                Follow-up Required
                            </h4>
                            <div className="flex items-center gap-3">
                                {currentDiagnosis.followupRequired ? (
                                    <>
                                        <AlertCircle className="w-8 h-8" />
                                        <p className="text-sm font-bold">Patient requires specialist consultation</p>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        <p className="text-sm font-bold text-gray-700">No immediate follow-up needed</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // List View (Default)
    return (
        <Layout title="AI Skin Diagnosis Manager">
            <div className="space-y-8 italic">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {[
                        { label: 'Total Diagnoses', value: stats.total, icon: Sparkles, color: 'purple' },
                        { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'yellow' },
                        { label: 'Reviewed', value: stats.reviewed, icon: CheckCircle2, color: 'green' },
                        { label: 'Follow-up Required', value: stats.followup, icon: AlertCircle, color: 'orange' },
                        { label: 'Avg Confidence', value: stats.avgConfidence, icon: TrendingUp, color: 'blue' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by patient name, ID, condition..."
                            className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending Review</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="followup">Follow-up Required</option>
                        </select>
                    </div>
                </div>

                {/* Diagnoses Table */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Diagnosis ID</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Patient</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Condition</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Confidence</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Severity</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Submitted</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="text-left py-6 px-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredDiagnoses.map(diagnosis => (
                                <tr key={diagnosis.id} className="hover:bg-purple-50/20 transition-all group">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="w-4 h-4 text-purple-600" />
                                            <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{diagnosis.id}</p>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <p className="font-black text-gray-900 uppercase tracking-tight">{diagnosis.patientName}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{diagnosis.patientId}</p>
                                    </td>
                                    <td className="py-6 px-8">
                                        <p className="text-sm font-bold text-gray-700">{diagnosis.condition}</p>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
                                            {diagnosis.confidence}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${diagnosis.severity === 'Mild' ? 'bg-green-50 text-green-600' :
                                                diagnosis.severity === 'Moderate' ? 'bg-yellow-50 text-yellow-600' :
                                                    'bg-red-50 text-red-600'
                                            }`}>
                                            {diagnosis.severity}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <p className="text-sm font-bold text-gray-700">{diagnosis.submittedDate}</p>
                                        <p className="text-xs text-gray-400">{diagnosis.submittedTime}</p>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${diagnosis.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-600' :
                                                diagnosis.status === 'Reviewed' ? 'bg-green-100 text-green-600' :
                                                    'bg-blue-100 text-blue-600'
                                            }`}>
                                            {diagnosis.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <button
                                            onClick={() => setSelectedDiagnosis(diagnosis.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-purple-700 transition-all"
                                        >
                                            <Eye className="w-4 h-4" /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default SkinAIDiagnosisManager;
