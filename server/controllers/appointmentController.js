Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
    try {
        console.log("getAppointments query:", req.query);
        const { patientPortalId, doctor } = req.query;
        let query = {};

        if (patientPortalId) {
            query.patientPortalId = patientPortalId;
        }

        if (doctor) {
            query.doctor = doctor;
        }

        const appointments = await Appointment.find(query)
            .populate('doctor', 'name specialization')
            .populate('patientPortalId', 'name')
            .sort({ date: 1, time: 1 });

        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    try {
        const { patientName, doctor, date, time, type, notes, department, patientPortalId } = req.body;

        const appointment = new Appointment({
            patientName,
            patientPortalId,
            doctor,
            date,
            time,
            type,
            notes,
            department
        });

        const createdAppointment = await appointment.save();
        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getAppointments, createAppointment };
