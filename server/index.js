const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB(); // Attempting database connection

const app = express();

const checkDbConnection = require('./middleware/dbCheckMiddleware');

// Simplified Permissive CORS (Production-Ready for multi-origin hospital apps)
app.use(cors({
    origin: function (origin, callback) {
        // Allow any origin that's present (or null for local tests)
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Robust Preflight Handling
app.options('(.*)', cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Apply DB connection check to all API routes
app.use('/api', checkDbConnection);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const statsRoutes = require('./routes/statsRoutes');
const patientPortalRoutes = require('./routes/patientPortalRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const staffRoutes = require('./routes/staffRoutes');
const userRoutes = require('./routes/userRoutes');
const skinDiagnosisRoutes = require('./routes/skinDiagnosisRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/patient-portal', patientPortalRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/diseases', diseaseRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skin-diagnosis', skinDiagnosisRoutes);

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);

// Final Error Handler with CORS explicit header
app.use((err, req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
