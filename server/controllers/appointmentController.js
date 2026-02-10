const Appointment = require('../models/Appointment');
const User = require('../models/User');
const getDoctorSpecialities = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('name specialization department');

        const specialitiesSet = new Set();
        const doctorsBySpeciality = {};

        doctors.forEach(doc => {
            const spec = doc.specialization || doc.department || 'General';
            specialitiesSet.add(spec);

            if (!doctorsBySpeciality[spec]) {
                doctorsBySpeciality[spec] = [];
            }
            doctorsBySpeciality[spec].push(doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`);
        });

        res.json({
            specialities: Array.from(specialitiesSet),
            doctors: doctorsBySpeciality
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

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

// @desc    Get all doctors for public display
// @route   GET /api/appointments/doctors
// @access  Public
const getPublicDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' })
            .select('name specialization roleDescription rating image');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getAppointments, createAppointment, getDoctorSpecialities, getPublicDoctors };
