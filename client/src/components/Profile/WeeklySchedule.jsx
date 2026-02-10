import { Clock, Plus, Copy } from 'lucide-react';

const DaySchedule = ({ day, slots, onAdd }) => (
    <div className="py-6 border-b border-gray-50 last:border-0">
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-900 w-12">{day}</span>
            <div className="flex-1 flex flex-wrap gap-3 px-4">
                {slots && slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl group cursor-pointer hover:bg-blue-100 transition-all">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-bold text-blue-600 whitespace-nowrap">{slot.time}</span>
                            <p className="text-[10px] text-blue-400 hidden group-hover:block">{slot.label}</p>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl py-3 flex items-center justify-center">
                        <button className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 hover:text-gray-600 transition-all">
                            <Plus className="w-3.5 h-3.5" />
                            Add Availability
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
);

const WeeklySchedule = () => {
    const schedule = [
        { day: 'Mon', slots: [{ time: '09:00 - 12:00', label: 'General Checkup' }, { time: '14:00 - 17:00', label: 'Surgery' }] },
        { day: 'Tue', slots: [{ time: '10:00 - 16:00', label: 'Consultations' }] },
        { day: 'Wed', slots: [] },
        { day: 'Thu', slots: [{ time: '09:00 - 14:00', label: 'Rounds' }] },
        { day: 'Fri', slots: [{ time: '09:00 - 13:00', label: 'Clinic' }] },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-md-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Weekly Schedule</h3>
                        <p className="text-sm text-gray-500">Click and drag to set availability slots.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
                            <Copy className="w-3.5 h-3.5" />
                            Copy Last Week
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">
                            <Plus className="w-3.5 h-3.5" />
                            Add Slot
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {schedule.map(dayInfo => (
                    <DaySchedule key={dayInfo.day} {...dayInfo} />
                ))}
            </div>

            <div className="p-4 m-6 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-md">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Upcoming Time Off</p>
                        <p className="text-[11px] text-orange-700 font-medium">You have scheduled vacation from <span className="font-bold">Dec 24 to Dec 26</span>. Patients will be notified automatically.</p>
                    </div>
                </div>
                <button className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-all">Edit</button>
            </div>
        </div>
    );
};

export default WeeklySchedule;
