import React from 'react';
import { FiBookOpen, FiCalendar, FiUsers, FiTarget } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';

const AnalyticsPanel = () => {
    const { data } = useContent();
    const { analytics } = data;
    const pct = parseFloat(analytics.progressPercent) || 0;

    // Circle math for SVG
    const r = 100;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - pct / 100);

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
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                        <circle cx="120" cy="120" r={r} stroke="white" strokeOpacity="0.05" strokeWidth="16" fill="transparent" />
                        <circle cx="120" cy="120" r={r} stroke="#22d3ee" strokeWidth="16" fill="transparent"
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-500"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-4xl md:text-5xl font-black tracking-tighter">{pct.toFixed(1)}%</span>
                        <span className="text-[8px] md:text-[10px] font-bold text-cyan-400 mt-1 uppercase tracking-widest">{analytics.progressLabel}</span>
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
                {analytics.stats.map((stat, i) => (
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
