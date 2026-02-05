import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Calendar,
    CreditCard,
    Package,
    Settings,
    Shield,
    FileText,
    TrendingUp,
    Activity,
    Clock,
    User,
    Clipboard,
    Pill,
    Globe,
    MessageSquare,
    Navigation,
    Sparkles
} from 'lucide-react';

const Sidebar = ({ dark = false }) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Main Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Reception Console', path: '/reception' },
        { icon: Activity, label: 'Nurse Dashboard', path: '/nurse-dashboard' },
        { icon: User, label: 'Clinical Overview', path: '/clinical-overview' },
        { icon: User, label: 'Patient Chart', path: '/patient-chart' },
        { icon: Clipboard, label: 'Consultation', path: '/consultation' },
        { icon: TrendingUp, label: 'Finance Reports', path: '/reports' },
        { icon: CreditCard, label: 'Refunds & Adj.', path: '/refunds' },
        { icon: Pill, label: 'MAR Record', path: '/mar' },
        { icon: Activity, label: 'Record Vitals', path: '/record-vitals' },
        { icon: Users, label: 'Staff Management', path: '/staff' },
        { icon: UserPlus, label: 'Patient Management', path: '/patients' },
        { icon: User, label: 'Patient Directory', path: '/patient-directory' },
        { icon: UserPlus, label: 'New Registration', path: '/patient-registration' },
        { icon: User, label: 'Patient Profile', path: '/patient-profile' },
        { icon: Calendar, label: 'Appointments', path: '/appointments' },
        { icon: CreditCard, label: 'Billing Dashboard', path: '/billing' },
        { icon: FileText, label: 'Invoices', path: '/invoices' },
        { icon: CreditCard, label: 'Payment Logs', path: '/payments' },
        { icon: Activity, label: 'Lab Reports', path: '/lab-reports' },
        { icon: Clock, label: 'Queue Status', path: '/queue' },
        { icon: Globe, label: 'Website Management', path: '/website-cms' },
        { icon: Navigation, label: 'Navigation Manager', path: '/navbar-manager' },
        { icon: Users, label: 'Patient Manager', path: '/patient-manager' },
        { icon: Sparkles, label: 'AI Skin Diagnosis', path: '/skin-ai-manager' },
        { icon: MessageSquare, label: 'Enquiry Center', path: '/enquiries' },
        { icon: User, label: 'My Profile', path: '/profile' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`w-64 h-screen fixed left-0 top-0 border-r flex flex-col transition-colors duration-300 ${dark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-200'}`}>
            {/* Logo */}
            <div className={`p-6 border-b ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className={`text-lg font-bold tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>MedCore HMS</h1>
                        <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>v2.4.0 Enterprise</p>
                    </div>
                </div>
            </div>

            {/* Menu Items - Scrollable */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${active
                                ? (dark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600')
                                : (dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-700 hover:bg-gray-50')
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? (dark ? 'text-blue-400' : 'text-blue-600') : (dark ? 'text-gray-500' : 'text-gray-400')}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* System Section */}
            <div className={`p-4 border-t ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>System</p>
                <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${isActive('/settings')
                        ? (dark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600')
                        : (dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-700 hover:bg-gray-50')
                        }`}
                >
                    <Settings className={`w-5 h-5 ${isActive('/settings') ? (dark ? 'text-blue-400' : 'text-blue-600') : (dark ? 'text-gray-500' : 'text-gray-400')}`} />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
