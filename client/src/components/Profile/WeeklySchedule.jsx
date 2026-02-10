import { Clock, Plus, Copy, X } from 'lucide-react';
import { useState } from 'react';

const DaySchedule = ({ day, slots, onAddSlot, onRemoveSlot, onUpdateSlot }) => (
    <div className="py-6 border-b border-gray-50 last:border-0">
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-gray-900 w-12">{day}</span>
            <div className="flex-1 flex flex-wrap gap-3 px-4">
                {slots && slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <div key={index} className="flex flex-col gap-1 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl group hover:bg-blue-100 transition-all relative min-w-[180px]">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                <input
                                    type="text"
                                    value={slot.time}
                                    onChange={(e) => onUpdateSlot(index, { ...slot, time: e.target.value })}
                                    className="text-xs font-bold text-blue-600 bg-transparent border-none focus:outline-none focus:ring-0 w-full p-0"
                                />
                            </div>
                            <input
                                type="text"
                                value={slot.label}
                                onChange={(e) => onUpdateSlot(index, { ...slot, label: e.target.value })}
                                className="text-[10px] text-blue-400 bg-transparent border-none focus:outline-none focus:ring-0 w-full p-0"
                            />
                            <button
                                onClick={() => onRemoveSlot(index)}
                                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-2.5 h-2.5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl py-3 flex items-center justify-center">
                        <button
                            onClick={onAddSlot}
                            className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 hover:text-gray-600 transition-all"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Add Availability
                        </button>
                    </div>
                )}
                {slots && slots.length > 0 && (
                    <button
                        onClick={onAddSlot}
                        className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all h-fit self-center"
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    </div>
);

const WeeklySchedule = ({ schedule = [], onChange }) => {
    // Default structure if empty
    const defaultDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Merge existing schedule with defaults to ensure all days are present
    const displaySchedule = defaultDays.map(day => {
        const existing = schedule.find(s => s.day === day);
        return existing || { day, slots: [] };
    });

    const handleAddSlot = (dayIndex) => {
        // Simple prompt for now, could be a modal in future
        // Format expectations: "09:00 - 12:00"
        // Label expectations: "Clinic"
        // For MVP speed, just adding a default slot or could use simple window.prompt
        // Better UX: State for "adding" mode. 
        // Let's use a simple default and let them edit (or just add default for now)

        const newSlot = { time: '09:00 - 17:00', label: 'Consultation' };

        const newSchedule = [...displaySchedule];
        newSchedule[dayIndex] = {
            ...newSchedule[dayIndex],
            slots: [...(newSchedule[dayIndex].slots || []), newSlot]
        };

        // Filter out empty days on save? Or keep structure?
        // Let's keep structure to be safe.
        onChange(newSchedule);
    };

    const handleUpdateSlot = (dayIndex, slotIndex, updatedSlot) => {
        const newSchedule = [...displaySchedule];
        const day = newSchedule[dayIndex];
        const newSlots = [...day.slots];
        newSlots[slotIndex] = updatedSlot;

        newSchedule[dayIndex] = { ...day, slots: newSlots };
        onChange(newSchedule);
    };

    const handleRemoveSlot = (dayIndex, slotIndex) => {
        const newSchedule = [...displaySchedule];
        const day = newSchedule[dayIndex];
        const newSlots = [...day.slots];
        newSlots.splice(slotIndex, 1);

        newSchedule[dayIndex] = { ...day, slots: newSlots };
        onChange(newSchedule);
    };

    const handleCopyPrevious = () => {
        // Copy slots from Mon to all days? Or just fills?
        // Let's unimplemented or simple fill Mon-Fri
        // Logic: if Mon has slots, copy to Tue-Fri
        const mon = displaySchedule.find(d => d.day === 'Mon');
        if (mon && mon.slots.length > 0) {
            const newSchedule = displaySchedule.map(d => {
                if (['Sat', 'Sun'].includes(d.day)) return d;
                return { ...d, slots: [...mon.slots] };
            });
            onChange(newSchedule);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-md-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Weekly Schedule</h3>
                        <p className="text-sm text-gray-500">Manage your weekly availability.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCopyPrevious}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all"
                        >
                            <Copy className="w-3.5 h-3.5" />
                            Copy Mon to Week
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {displaySchedule.map((dayInfo, i) => (
                    <DaySchedule
                        key={dayInfo.day}
                        {...dayInfo}
                        onAddSlot={() => handleAddSlot(i)}
                        onRemoveSlot={(slotIndex) => handleRemoveSlot(i, slotIndex)}
                        onUpdateSlot={(slotIndex, updatedSlot) => handleUpdateSlot(i, slotIndex, updatedSlot)}
                    />
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
                        <p className="text-[11px] text-orange-700 font-medium">No upcoming time off scheduled.</p>
                    </div>
                </div>
                {/* <button className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-all">Edit</button> */}
            </div>
        </div>
    );
};

export default WeeklySchedule;
