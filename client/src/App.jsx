import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import FinancialReports from './pages/FinancialReports';
import Invoices from './pages/Invoices';
import LabReports from './pages/LabReports';
import QueueStatus from './pages/QueueStatus';
import NurseDashboard from './pages/NurseDashboard';
import MAR from './pages/MAR';
import PatientChart from './pages/PatientChart';
import Consultation from './pages/Consultation';
import PatientManagement from './pages/PatientManagement';
import PatientDirectory from './pages/PatientDirectory';
import PatientRegistration from './pages/PatientRegistration';
import PatientProfile from './pages/PatientProfile';
import PaymentLogs from './pages/PaymentLogs';
import ReceptionConsole from './pages/ReceptionConsole';
import RefundsAdjustments from './pages/RefundsAdjustments';
import StaffDirectory from './pages/StaffDirectory';
import SystemSettings from './pages/SystemSettings';
import RecordVitals from './pages/RecordVitals';
import ClinicalOverview from './pages/ClinicalOverview';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reception" element={<ReceptionConsole />} />
          <Route path="/nurse-dashboard" element={<NurseDashboard />} />
          <Route path="/clinical-overview" element={<ClinicalOverview />} />
          <Route path="/mar" element={<MAR />} />
          <Route path="/patient-chart" element={<PatientChart />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/refunds" element={<RefundsAdjustments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<FinancialReports />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/lab-reports" element={<LabReports />} />
          <Route path="/queue" element={<QueueStatus />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/patient-directory" element={<PatientDirectory />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/payments" element={<PaymentLogs />} />
          <Route path="/staff" element={<StaffDirectory />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/record-vitals" element={<RecordVitals />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
