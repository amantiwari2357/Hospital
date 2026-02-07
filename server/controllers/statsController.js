const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Order = require('../models/Order');

// @desc    Get dashboard stats
// @route   GET /api/stats/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalPatientsCount = await Patient.countDocuments();

        // Get today's range
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        const appointmentsTodayCount = await Appointment.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday }
        });

        const activeStaffCount = await User.countDocuments({ role: { $in: ['doctor', 'nurse', 'medical staff', 'hospital staff'] } });

        // Calculate Revenue from Appointments
        const revenueTodayAgg = await Appointment.aggregate([
            { $match: { createdAt: { $gte: startOfToday, $lte: endOfToday }, status: 'Completed' } },
            { $group: { _id: null, total: { $sum: 500 } } } // Still using 500 as a base clinical fee
        ]);
        const revenueTodayValue = revenueTodayAgg[0]?.total || 0;

        // Dynamic Pending Payments (from Order model)
        const pendingPaymentsAgg = await Order.aggregate([
            { $match: { isPaid: false } }, // Or status: 'Pending'
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const pendingPaymentsValue = pendingPaymentsAgg[0]?.total || 0;

        // Fetch visit trends (Last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const trendsAgg = await Appointment.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    visits: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const trends = trendsAgg.map(t => ({
            name: t._id.split('-').slice(1).join('/'),
            visits: t.visits
        }));

        // Calculate "Change %" for stats dynamically (Compared to last 30 days)
        const currentMonthVisits = await Appointment.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        const lastMonthVisits = await Appointment.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } });
        const visitChangePercent = lastMonthVisits === 0 ? 100 : Math.round(((currentMonthVisits - lastMonthVisits) / lastMonthVisits) * 100);

        const currentMonthRevenue = await Appointment.countDocuments({ createdAt: { $gte: thirtyDaysAgo }, status: 'Completed' }); // Using appt count * 500
        const lastMonthRevenue = await Appointment.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }, status: 'Completed' });
        const revenueChangePercent = lastMonthRevenue === 0 ? 100 : Math.round(((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100);

        // Revenue by Department
        const deptAgg = await Appointment.aggregate([
            { $group: { _id: "$department", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const totalDepts = deptAgg.reduce((acc, curr) => acc + curr.count, 0);
        const revenueByDept = deptAgg.map(d => ({
            name: d._id || 'General',
            percentage: Math.round((d.count / (totalDepts || 1)) * 100),
            amount: `$${(d.count * 500).toLocaleString()}`,
            color: ['blue', 'purple', 'indigo', 'orange', 'emerald'][Math.floor(Math.random() * 5)]
        }));

        // Recent Activity (Patient Admissions & Appointments)
        const latestEvents = await Promise.all([
            Patient.find().sort({ createdAt: -1 }).limit(3),
            Appointment.find().sort({ createdAt: -1 }).limit(3)
        ]);

        const recentActivity = [
            ...latestEvents[0].map(p => ({ icon: 'UserPlus', text: `New Patient: ${p.name}`, time: 'Recently', color: 'blue' })),
            ...latestEvents[1].map(a => ({ icon: 'Calendar', text: `${a.type}: ${a.patientName}`, time: 'Recently', color: 'purple' }))
        ].sort(() => 0.5 - Math.random()).slice(0, 5);

        // Doctor Availability
        const doctorsList = await User.find({ role: 'doctor' }).limit(10);
        const doctors = doctorsList.map(d => ({
            name: d.name.startsWith('Dr.') ? d.name : `Dr. ${d.name}`,
            specialty: 'Hospital Staff',
            status: 'Active',
            color: 'green'
        }));

        // Hospital Operations (Bed Occupancy)
        const patientsByWard = await Patient.aggregate([
            { $group: { _id: "$ward", count: { $sum: 1 } } }
        ]);

        const bedOccupancy = {
            icu: patientsByWard.find(w => w._id === 'ICU')?.count || 0,
            general: (patientsByWard.find(w => w._id === 'General Ward')?.count || 0) + (patientsByWard.find(w => w._id === 'Observation')?.count || 0),
            private: patientsByWard.find(w => w._id === 'Private')?.count || 0,
        };

        const opdTodayCount = await Appointment.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            type: { $in: ['Check-up', 'Consultation', 'Follow-up'] }
        });

        const emergencyTodayCount = await Appointment.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            type: 'Emergency'
        });

        const ipdCount = await Patient.countDocuments({
            ward: { $exists: true, $ne: '' }
        });

        const latestPatientsFull = await Patient.find()
            .populate('assignedDoctor', 'name')
            .sort({ createdAt: -1 })
            .limit(10);

        const surgeriesTodayCount = await Appointment.countDocuments({
            createdAt: { $gte: startOfToday, $lte: endOfToday },
            type: 'Surgery'
        });

        res.json({
            totalPatients: { value: totalPatientsCount, change: visitChangePercent },
            appointmentsToday: { value: appointmentsTodayCount, change: visitChangePercent },
            activeStaff: { value: activeStaffCount, status: 'Active' },
            revenueToday: { value: revenueTodayValue, change: revenueChangePercent },
            pendingPayments: { value: pendingPaymentsValue, alert: pendingPaymentsValue > 0 ? 'Action Required' : 'Cleared' },
            trends,
            revenueByDept,
            recentActivity,
            doctors,
            bedOccupancy,
            surgeriesToday: surgeriesTodayCount,
            emergencyToday: emergencyTodayCount,
            dischargesPending: 0,
            patientStats: {
                total: totalPatientsCount,
                ipd: ipdCount,
                opdToday: opdTodayCount,
                emergencyToday: emergencyTodayCount
            },
            latestPatients: latestPatientsFull
        });
    } catch (error) {
        console.error('Final Dynamic Stats Error:', error);
        res.status(500).json({ success: false, message: 'Live data sync failed' });
    }
};

module.exports = { getDashboardStats };

