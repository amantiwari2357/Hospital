import { Activity, Heart, Thermometer, Wind } from 'lucide-react';

const PatientCard = ({ patient }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Critical':
                return 'border-red-500 bg-red-50';
            case 'Stable':
                return 'border-green-500 bg-green-50';
            case 'Observation':
                return 'border-orange-500 bg-orange-50';
            default:
                return 'border-gray-300 bg-white';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Critical':
                return 'bg-red-100 text-red-700';
            case 'Stable':
                return 'bg-green-100 text-green-700';
            case 'Observation':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Simple line chart data simulation
    const generateMiniChart = (baseValue) => {
        const points = [];
        for (let i = 0; i < 20; i++) {
            const variance = (Math.random() - 0.5) * 20;
            points.push(baseValue + variance);
        }
        return points;
    };

    const heartRateData = generateMiniChart(patient.vitals?.heartRate || 75);
    const maxHR = Math.max(...heartRateData);
    const minHR = Math.min(...heartRateData);

    return (
        <div className={`bg-white rounded-xl border-2 ${getStatusColor(patient.status)} p-5 hover:shadow-lg transition-all`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            {patient.name.split(' ')[0].charAt(0)}{patient.name.split(' ')[1]?.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                        <p className="text-sm text-gray-500">{patient.bedNumber}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(patient.status)}`}>
                    {patient.status.toUpperCase()}
                </span>
            </div>

            {/* Patient Info */}
            <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">{patient.age} {patient.gender.charAt(0)}</span> â€¢ {patient.diagnosis}
                </p>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Heart Rate with Mini Chart */}
                <div className="col-span-2 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-medium text-gray-600">HR (bpm)</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{patient.vitals?.heartRate}</span>
                    </div>
                    {/* Mini Line Chart */}
                    <svg width="100%" height="40" className="mt-1">
                        <polyline
                            fill="none"
                            stroke={patient.status === 'Critical' ? '#ef4444' : patient.status === 'Stable' ? '#10b981' : '#f59e0b'}
                            strokeWidth="2"
                            points={heartRateData.map((val, i) => {
                                const x = (i / (heartRateData.length - 1)) * 100;
                                const y = 40 - ((val - minHR) / (maxHR - minHR)) * 35;
                                return `${x}%,${y}`;
                            }).join(' ')}
                        />
                    </svg>
                </div>

                {/* Blood Pressure */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-medium text-gray-600">BP (mmHg)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{patient.vitals?.bloodPressure}</p>
                </div>

                {/* Temperature */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-medium text-gray-600">Temp (Â°C)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{patient.vitals?.temperature}</p>
                </div>

                {/* SpO2 */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-4 h-4 text-cyan-500" />
                        <span className="text-xs font-medium text-gray-600">SpO2 (%)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{patient.vitals?.oxygenSaturation}</p>
                </div>

                {/* Resp. Rate */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-600">Resp. Rate</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">28</p>
                </div>
            </div>

            {/* Last Checked */}
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>â— Last checked: {Math.floor(Math.random() * 60)} mins ago by {patient.assignedDoctor || 'Dr. Emily'}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    ðŸ“‹ Record Vitals
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default PatientCard;
