const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
    const appointments = await Appointment.find({}).populate('doctor', 'name');
    res.json(appointments);
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
    const { patientName, doctor, date, time, type, notes, department } = req.body;

    const appointment = new Appointment({
        patientName,
        doctor,
        date,
        time,
        type,
        notes,
        department
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
};

module.exports = { getAppointments, createAppointment };
