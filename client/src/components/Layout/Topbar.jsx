import { Search, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ title, dark = false }) => {
    const { user, logout } = useAuth();

    return (
        <div className={`h-16 fixed top-0 right-0 left-64 z-10 border-b transition-colors duration-300 ${dark ? 'bg-[#0f172a] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="h-full px-8 flex items-center justify-between">
                {/* Title */}
                <h2 className={`text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h2>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="relative group">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${dark ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
                        <input
                            type="text"
                            placeholder="Search patients, doctors, records..."
                            className={`pl-10 pr-12 py-2.5 w-[400px] border rounded-xl text-sm transition-all outline-none ${dark
                                    ? 'bg-[#1e293b] border-gray-700 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10'
                                    : 'bg-gray-50 border-gray-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5'
                                }`}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200/20 bg-gray-500/10">
                            <span className="text-[10px] font-bold text-gray-500 tracking-tighter">âŒ˜ K</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className={`p-2.5 rounded-xl border transition-all ${dark ? 'bg-[#1e293b] border-gray-700 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className={`p-2.5 rounded-xl border transition-all ${dark ? 'bg-[#1e293b] border-gray-700 text-gray-400 hover:text-white' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                            <HelpCircle className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className={`flex items-center gap-4 pl-6 border-l ${dark ? 'border-gray-800' : 'border-gray-200'}`}>
                        <div className="text-right flex flex-col items-end">
                            <p className={`text-sm font-black tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Dr. Sarah Smith'}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
                                {user?.role || 'Super Admin'}
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
                            {user?.name?.charAt(0) || 'S'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
