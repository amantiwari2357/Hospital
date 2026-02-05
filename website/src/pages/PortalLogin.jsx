import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import {
    ShieldAlert,
    Lock,
    Fingerprint,
    FileText,
    Activity,
    Database,
    ArrowRight,
    ShieldCheck,
    Key,
    UserCircle,
    Building2,
    Mail,
    Phone,
    User,
    Calendar,
    MapPin,
    Heart,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PortalLogin = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [loginType, setLoginType] = useState('patient'); // 'patient' or 'institutional'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Registration form state
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: 'Male',
        phone: '',
        address: '',
        bloodGroup: 'O+'
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/patient-portal/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (data.success) {
                // Store token and patient data
                localStorage.setItem('patientToken', data.data.token);
                localStorage.setItem('patientData', JSON.stringify(data.data.patient));

                setSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    navigate('/profile');
                }, 1500);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (registerData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/patient-portal/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password,
                    age: parseInt(registerData.age),
                    gender: registerData.gender,
                    phone: registerData.phone,
                    address: registerData.address,
                    bloodGroup: registerData.bloodGroup
                })
            });

            // Parse JSON response once
            const responseData = await response.json();

            if (response.ok) {
                // Store token and patient data
                localStorage.setItem('patientToken', responseData.data.token); // Assuming data.data.token based on original success block
                localStorage.setItem('patientData', JSON.stringify(responseData.data.patient)); // Assuming data.data.patient

                // Show success message
                setSuccess(`Registration successful! Your Patient ID is: ${responseData.data.patient.patientId}`);

                // Redirect to profile after short delay
                setTimeout(() => {
                    navigate('/patient-profile');
                    window.location.reload(); // Ensure auth state updates
                }, 1500);
            } else {
                setError(responseData.message || 'Registration failed'); // Assuming message is directly in responseData for errors
            }
        } catch (err) {
            setError('Server error. Please try again later.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-24 italic">
            <Navbar />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-medical-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 lg:pt-64 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Branding & Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-8"
                        >
                            <ShieldCheck className="w-4 h-4 text-medical-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Secure Protocol v2.4</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.9] mb-10 italic uppercase tracking-tighter"
                        >
                            {mode === 'login' ? 'Access' : 'Join'} <br /> <span className="text-medical-600">Portal</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 font-medium mb-16 leading-relaxed"
                        >
                            {mode === 'login'
                                ? 'Secure access to your complete medical records, appointments, and health data.'
                                : 'Create your patient account and get instant access to all our healthcare services.'
                            }
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start gap-4 group">
                                <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Lock className="w-6 h-6 text-medical-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 uppercase italic mb-2">256-bit Encryption</h4>
                                    <p className="text-slate-500 font-medium italic">Your data is protected with military-grade security protocols.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-4 bg-white rounded-2xl shadow-xl border border-slate-100 group-hover:scale-110 transition-transform">
                                    <Database className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black text-slate-800 uppercase italic mb-2">Immutable Logs</h4>
                                    <p className="text-slate-500 font-medium italic">Every access attempt is recorded on our secure institutional ledger.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100"
                    >
                        {/* Mode Selector */}
                        <div className="flex bg-slate-100 p-2 rounded-3xl mb-8">
                            <button
                                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${mode === 'login' ? 'bg-white text-medical-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${mode === 'register' ? 'bg-white text-medical-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Register
                            </button>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 rounded-2xl flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <p className="text-sm font-bold text-red-700">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 bg-green-50 rounded-2xl flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <p className="text-sm font-bold text-green-700">{success}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        {mode === 'login' && (
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email</label>
                                    <div className="relative flex items-center">
                                        <Mail className="absolute left-6 w-5 h-5 text-slate-300" />
                                        <input
                                            type="email"
                                            required
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                            placeholder="your.email@example.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none italic"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Password</label>
                                    <div className="relative flex items-center">
                                        <Key className="absolute left-6 w-5 h-5 text-slate-300" />
                                        <input
                                            type="password"
                                            required
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            placeholder="••••••••••••"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none italic"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-medical-600 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Logging in...' : 'Unlock Portal'} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        )}

                        {/* Registration Form */}
                        {mode === 'register' && (
                            <form className="space-y-6" onSubmit={handleRegister}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                                        <div className="relative flex items-center">
                                            <User className="absolute left-4 w-4 h-4 text-slate-300" />
                                            <input
                                                type="text"
                                                required
                                                value={registerData.name}
                                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Age</label>
                                        <div className="relative flex items-center">
                                            <Calendar className="absolute left-4 w-4 h-4 text-slate-300" />
                                            <input
                                                type="number"
                                                required
                                                value={registerData.age}
                                                onChange={(e) => setRegisterData({ ...registerData, age: e.target.value })}
                                                placeholder="28"
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email</label>
                                    <div className="relative flex items-center">
                                        <Mail className="absolute left-6 w-5 h-5 text-slate-300" />
                                        <input
                                            type="email"
                                            required
                                            value={registerData.email}
                                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                            placeholder="your.email@example.com"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Phone</label>
                                    <div className="relative flex items-center">
                                        <Phone className="absolute left-6 w-5 h-5 text-slate-300" />
                                        <input
                                            type="tel"
                                            required
                                            value={registerData.phone}
                                            onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Gender</label>
                                        <select
                                            value={registerData.gender}
                                            onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Blood Group</label>
                                        <div className="relative flex items-center">
                                            <Heart className="absolute left-4 w-4 h-4 text-slate-300" />
                                            <select
                                                value={registerData.bloodGroup}
                                                onChange={(e) => setRegisterData({ ...registerData, bloodGroup: e.target.value })}
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                            >
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Address</label>
                                    <div className="relative flex items-center">
                                        <MapPin className="absolute left-6 top-5 w-5 h-5 text-slate-300" />
                                        <input
                                            type="text"
                                            value={registerData.address}
                                            onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                                            placeholder="123 Main St, City"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 focus:ring-2 focus:ring-medical-500 font-bold outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Password</label>
                                        <div className="relative flex items-center">
                                            <Key className="absolute left-4 w-4 h-4 text-slate-300" />
                                            <input
                                                type="password"
                                                required
                                                value={registerData.password}
                                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Confirm</label>
                                        <div className="relative flex items-center">
                                            <Key className="absolute left-4 w-4 h-4 text-slate-300" />
                                            <input
                                                type="password"
                                                required
                                                value={registerData.confirmPassword}
                                                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-medical-500 font-bold outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-medical-600 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        )}

                        {/* Emergency Hook */}
                        <div className="mt-8 p-6 bg-red-50 rounded-3xl flex items-center gap-4">
                            <div className="bg-red-100 p-2 rounded-xl">
                                <ShieldAlert className="w-5 h-5 text-red-600" />
                            </div>
                            <p className="text-[9px] font-bold text-red-700 uppercase leading-relaxed">
                                Medical Emergency? <br />
                                <span className="font-black">Call: +1 (800) EMERGENCY</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PortalLogin;
