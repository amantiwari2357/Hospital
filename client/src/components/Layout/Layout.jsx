import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children, title, dark = false }) => {
    return (
        <div className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
            <Sidebar dark={dark} />
            <div className="flex flex-col flex-1">
                <Topbar title={title} dark={dark} />
                <main className={`ml-64 pt-16 min-h-screen ${dark ? 'text-white' : ''}`}>
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
