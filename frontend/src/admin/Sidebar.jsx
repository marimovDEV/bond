import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiEdit2, FiList, FiLogOut, FiLayout } from 'react-icons/fi';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
        { name: 'Hero Editor', path: '/admin/hero', icon: <FiEdit2 /> },
        { name: 'Ranking Manager', path: '/admin/ranking', icon: <FiList /> },
    ];

    return (
        <aside className="w-64 bg-[#0A1A2F] border-r border-white/10 flex flex-col h-full overflow-y-auto">
            <div className="p-8">
                <div className="flex flex-col leading-none mb-10">
                    <span className="text-cyan-400 text-xl font-black tracking-tighter">BOND</span>
                    <span className="text-[#FFB800] text-[9px] font-black tracking-[0.2em] border border-[#FFB800]/50 px-1 py-0.5 mt-0.5 rounded-sm uppercase">ADMIN</span>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-8 border-t border-white/5">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white transition-colors text-sm"
                >
                    <FiLayout /> Saytga qaytish
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
