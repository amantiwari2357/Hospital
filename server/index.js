const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB(); // Attempting database connection

const app = express();

const checkDbConnection = require('./middleware/dbCheckMiddleware');

app.use(cors());
app.use(express.json());

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

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
