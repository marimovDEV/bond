import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiEdit2, FiList, FiLayout, FiVideo, FiAward, FiLogOut, FiBarChart2, FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
        { name: 'Hero Editor', path: '/admin/hero', icon: <FiEdit2 /> },
        { name: 'Reyting Manager', path: '/admin/ranking', icon: <FiList /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <FiBarChart2 /> },
        { name: 'Shon-sharaf Zali', path: '/admin/hall-of-fame', icon: <FiStar /> },
        { name: "Video Qo'llanma", path: '/admin/tutorial', icon: <FiVideo /> },
        { name: 'Hamkorlar', path: '/admin/partners', icon: <FiAward /> },
    ];

    return (
        <aside className="w-64 bg-[#0A1A2F] border-r border-white/10 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0">
            {/* Logo */}
            <div className="p-8 border-b border-white/5">
                <div className="flex flex-col leading-none">
                    <span className="text-cyan-400 text-xl font-black tracking-tighter">BOND</span>
                    <span className="text-[#FFB800] text-[9px] font-black tracking-[0.2em] border border-[#FFB800]/50 px-1 py-0.5 mt-0.5 rounded-sm uppercase">ADMIN PANEL</span>
                </div>
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mt-4">Tizimga kirildi: <span className="text-cyan-400">admin</span></p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 px-3">BOSHQARUV</p>
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive
                                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 px-3">HAVOLALAR</p>
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                    >
                        <FiLayout /> Asosiy sayt
                    </NavLink>
                </div>
            </nav>

            {/* Logout */}
            <div className="p-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm font-bold uppercase tracking-wide"
                >
                    <FiLogOut /> Chiqish
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
