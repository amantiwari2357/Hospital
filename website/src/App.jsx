import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiseaseDetail from './pages/DiseaseDetail';
import MedicineDuniya from './pages/MedicineDuniya';
import MedicineDetail from './pages/MedicineDetail';
import PatientProfile from './pages/PatientProfile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AboutUs from './pages/AboutUs';
import MarketInsights from './pages/MarketInsights';
import Specialities from './pages/Specialities';
import BookAppointment from './pages/BookAppointment';
import EmergencyCare from './pages/EmergencyCare';
import HealthRegistry from './pages/HealthRegistry';
import PatientPortal from './pages/PatientPortal';
import ResearchPapers from './pages/ResearchPapers';
import Resources from './pages/Resources';
import Register from './pages/Register';
import PortalLogin from './pages/PortalLogin';
import SkinAI from './pages/SkinAI';
import Ambulance from './pages/Ambulance';
import ClinicalServiceDetail from './pages/ClinicalServiceDetail';
import MegaFooter from './components/layout/MegaFooter';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/cart/CartDrawer';

function App() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen italic">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/disease/:id" element={<DiseaseDetail />} />
            <Route path="/medicines" element={<MedicineDuniya />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/profile" element={<PatientProfile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/market-insights" element={<MarketInsights />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/emergency" element={<EmergencyCare />} />
            <Route path="/registry" element={<HealthRegistry />} />
            <Route path="/portal" element={<PatientPortal />} />
            <Route path="/research" element={<ResearchPapers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal-login" element={<PortalLogin />} />
            <Route path="/skin-ai" element={<SkinAI />} />
            <Route path="/ambulance" element={<Ambulance />} />
            <Route path="/clinical/:category/:service" element={<ClinicalServiceDetail />} />
          </Routes>
        </div>
        <MegaFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
