import React from 'react';
import { useContent } from '../../context/ContentContext';
import { FiUsers, FiClock, FiStar, FiActivity } from 'react-icons/fi';

const Dashboard = () => {
    const { data } = useContent();

    const stats = [
        { name: 'Olimpiada Qatnashchilari', value: '1,280', icon: <FiUsers />, color: 'text-cyan-400' },
        { name: 'Reytingdagi O\'quvchilar', value: data.ranking.length, icon: <FiActivity />, color: 'text-blue-400' },
        { name: 'Qolgan Vaqt (Kun)', value: data.hero.countdown.days, icon: <FiClock />, color: 'text-orange-400' },
        { name: 'Hamkorlar', value: data.partners.length, icon: <FiStar />, color: 'text-yellow-400' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black uppercase tracking-tight">Admin <span className="text-cyan-400">Dashboard</span></h1>
                <p className="text-white/40 text-sm font-medium uppercase tracking-widest">BOND OLYMPIAD boshqaruv tizimi</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#0A1A2F] border border-white/10 p-6 rounded-[2rem] shadow-xl">
                        <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 text-2xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{stat.name}</p>
                        <p className="text-3xl font-black">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] shadow-xl">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">So'nggi O'zgarishlar</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                <FiActivity />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white/80">Loyiha tahrirlandi</p>
                                <p className="text-[10px] text-white/30 uppercase font-black">2 soat avval • Admin</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
