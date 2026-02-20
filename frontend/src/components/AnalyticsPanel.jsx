import React from 'react';
import { FiBookOpen, FiCalendar, FiUsers, FiTarget } from 'react-icons/fi';

const AnalyticsPanel = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Main Analytics Card */}
            <div className="bg-[#0A2540]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col items-center shadow-2xl">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter self-start mb-10 relative">
                    Analytics
                    <span className="absolute -bottom-2 left-0 w-12 h-1 bg-cyan-400 rounded-full" />
                </h2>

                {/* Circular Progress */}
                <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center mb-12">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5 md:hidden" />
                        <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/5 hidden md:block" />
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={502} strokeDashoffset={502 * (1 - 0.333)} className="text-cyan-400 md:hidden" strokeLinecap="round" />
                        <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="16" fill="transparent" strokeDasharray={628} strokeDashoffset={628 * (1 - 0.333)} className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] hidden md:block" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-black tracking-tighter">33.3%</span>
                        <span className="text-[8px] md:text-[10px] font-bold text-cyan-400 mt-1 uppercase tracking-widest">Shahar Ligasi</span>
                    </div>

                    {/* Orbital Icons */}
                    <div className="absolute inset-0 pointer-events-none scale-90">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#1A3A5A] rounded-xl flex items-center justify-center text-white/40 border border-white/5 shadow-xl"><FiUsers className="w-4 h-4" /></div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[#1A3A5A] rounded-xl flex items-center justify-center text-white/40 border border-white/5 shadow-xl"><FiBookOpen className="w-4 h-4" /></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-10 h-10 bg-[#1A3A5A] rounded-xl flex items-center justify-center text-white/40 border border-white/5 shadow-xl"><FiTarget className="w-4 h-4" /></div>
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1A3A5A] rounded-xl flex items-center justify-center text-white/40 border border-white/5 shadow-xl"><FiCalendar className="w-4 h-4" /></div>
                    </div>
                </div>
                <p className="text-white/20 text-xs font-medium italic">Oylik o'sish ko'rsatkichi</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                    { label: 'Reytingda', val: '#12' },
                    { label: 'Topshiriqlar', val: '89/120' },
                    { label: 'O\'quvchilar', val: '1,247' },
                    { label: 'Dars Holati', val: '247' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0A2540]/60 backdrop-blur-xl border border-white/10 rounded-[1.8rem] p-6 flex flex-col justify-center hover:border-cyan-400/30 transition-all group">
                        <p className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1 group-hover:scale-105 transition-transform origin-left">{stat.label}</p>
                        <p className="text-2xl font-black tracking-tight">{stat.val}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsPanel;
