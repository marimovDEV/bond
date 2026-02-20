import React from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';

const LiveRanking = () => {
    const students = [
        { rank: '#1', name: 'Alijonov Diyor', exp: '985 EXP', progress: 98, school: 'Samarqand qishlog\'i akademik litseyi', img: 'https://i.pravatar.cc/150?u=1' },
        { rank: '#2', name: 'Sobirov Azamat', exp: '970 EXP', progress: 97, school: '3-sinfi talabalaridan muollo', img: 'https://i.pravatar.cc/150?u=2' },
        { rank: '#4', name: 'Ergasheva Laylo', exp: '940 EXP', progress: 97, school: 'Maktab raxbari bilan maktab', img: 'https://i.pravatar.cc/150?u=4' },
        { rank: '#5', name: 'Rustamov Sardor', exp: '920 EXP', progress: 94, school: 'Prezident maktabi bitiruvchisi', img: 'https://i.pravatar.cc/150?u=5' },
    ];

    return (
        <div className="bg-[#0A2540]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    Live Reyting
                    <span className="w-8 h-1 bg-cyan-400 mt-2 block rounded-full md:hidden lg:block" />
                </h2>
                <div className="flex gap-3">
                    <button className="bg-cyan-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-500/20">Top</button>
                    <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white/80 transition-all">Yangilar</button>
                </div>
            </div>

            <div className="space-y-3 flex-1">
                {students.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(34, 211, 238, 0.3)' }}
                        className="bg-[#0D223B]/40 border border-white/5 rounded-[1.5rem] p-4 flex items-center gap-4 transition-colors group"
                    >
                        <div className="w-10 h-10 bg-[#1A3A5A]/60 rounded-xl flex items-center justify-center text-lg font-black text-cyan-400 border border-white/5">
                            {s.rank}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <img src={s.img} alt={s.name} className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white/10 group-hover:border-cyan-400/30 object-cover relative z-10" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFB800] rounded-full flex items-center justify-center text-[8px] text-black z-20 shadow-lg"><FiAward /></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-sm md:text-base tracking-tight truncate">{s.name}</h3>
                                <span className="text-[9px] md:text-[10px] text-[#FFB800] font-black bg-[#FFB800]/10 px-1.5 py-0.5 md:px-2 md:py-1 rounded-lg border border-[#FFB800]/20 flex items-center gap-1">
                                    <FiAward /> {s.exp}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-white/30 text-[10px] md:text-xs font-medium flex-1 truncate">{s.school}</p>
                                <span className="text-[10px] font-black text-cyan-400 whitespace-nowrap">{s.progress}%</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LiveRanking;
