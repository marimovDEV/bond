import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiRefreshCw } from 'react-icons/fi';

const HeroEditor = () => {
    const { data, updateHero } = useContent();
    const [formData, setFormData] = useState(data.hero);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHero(formData);
        alert('Hero bo\'limi muvaffaqiyatli saqlandi!');
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight">Hero <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Asosiy sahifani tahrirlash</p>
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all active:scale-95"
                >
                    <FiSave /> Saqlash
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Text Content */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] shadow-xl space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                        Matnlar
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha Oldi (White)</label>
                            <input
                                type="text"
                                value={formData.titlePrefix}
                                onChange={e => setFormData({ ...formData, titlePrefix: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Asosiy Sarlavha (Gradient)</label>
                            <input
                                type="text"
                                value={formData.titleGradient}
                                onChange={e => setFormData({ ...formData, titleGradient: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors font-bold text-cyan-400"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tavsif (Description)</label>
                            <textarea
                                rows="4"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none leading-relaxed"
                            />
                        </div>
                    </div>
                </div>

                {/* Action & Timer */}
                <div className="space-y-8">
                    <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] shadow-xl space-y-6">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            Tugma & Timer
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tugma Matni</label>
                                <input
                                    type="text"
                                    value={formData.ctaText}
                                    onChange={e => setFormData({ ...formData, ctaText: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Kun</label>
                                    <input
                                        type="number"
                                        value={formData.countdown.days}
                                        onChange={e => setFormData({ ...formData, countdown: { ...formData.countdown, days: parseInt(e.target.value) } })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-center text-lg font-black outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Soat</label>
                                    <input
                                        type="number"
                                        value={formData.countdown.hours}
                                        onChange={e => setFormData({ ...formData, countdown: { ...formData.countdown, hours: parseInt(e.target.value) } })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-center text-lg font-black outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Minut</label>
                                    <input
                                        type="number"
                                        value={formData.countdown.minutes}
                                        onChange={e => setFormData({ ...formData, countdown: { ...formData.countdown, minutes: parseInt(e.target.value) } })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-center text-lg font-black outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 text-white/40">
                        <FiRefreshCw className="text-xl animate-spin-slow" />
                        <p className="text-xs font-medium italic">O'zgarishlar saqlangandan so'ng darhol asosiy sahifada aks etadi.</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default HeroEditor;
