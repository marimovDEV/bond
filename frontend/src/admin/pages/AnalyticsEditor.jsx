import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';

const AnalyticsEditor = () => {
    const { data, updateAnalytics } = useContent();
    const [form, setForm] = useState({ ...data.analytics });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateAnalytics(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleStatChange = (idx, field, value) => {
        const newStats = form.stats.map((s, i) => i === idx ? { ...s, [field]: value } : s);
        setForm({ ...form, stats: newStats });
    };

    const handleAddStat = () => {
        setForm({ ...form, stats: [...form.stats, { label: '', val: '' }] });
    };

    const handleRemoveStat = (idx) => {
        setForm({ ...form, stats: form.stats.filter((_, i) => i !== idx) });
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors";

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Analytics <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Statistika va ko'rsatkichlarni boshqarish</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black'}`}
                >
                    <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Circle Progress */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-lg font-black uppercase tracking-tight">Doiraviy Grafik</h3>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Foiz (%) — 0 dan 100 gacha</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="0.1"
                                value={form.progressPercent}
                                onChange={e => setForm({ ...form, progressPercent: parseFloat(e.target.value) })}
                                className="flex-1 accent-cyan-500"
                            />
                            <span className="text-2xl font-black text-cyan-400 w-16 text-right">{parseFloat(form.progressPercent).toFixed(1)}%</span>
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Yorliq (Label)</label>
                        <input value={form.progressLabel} onChange={e => setForm({ ...form, progressLabel: e.target.value })} className={inputCls} />
                    </div>

                    {/* Preview */}
                    <div className="flex items-center justify-center py-6">
                        <div className="relative w-36 h-36">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" stroke="white" strokeOpacity="0.05" strokeWidth="12" fill="transparent" />
                                <circle cx="60" cy="60" r="50" stroke="#22d3ee" strokeWidth="12" fill="transparent"
                                    strokeDasharray={314}
                                    strokeDashoffset={314 * (1 - form.progressPercent / 100)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black">{parseFloat(form.progressPercent).toFixed(1)}%</span>
                                <span className="text-[8px] text-cyan-400 font-black uppercase tracking-wider">{form.progressLabel}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black uppercase tracking-tight">Statistika Kartalar</h3>
                        <button onClick={handleAddStat} className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1">
                            <FiPlus /> Qo'shish
                        </button>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        {form.stats.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-3 group">
                                <input value={stat.label} onChange={e => handleStatChange(idx, 'label', e.target.value)} placeholder="Yorliq" className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                                <input value={stat.val} onChange={e => handleStatChange(idx, 'val', e.target.value)} placeholder="Qiymat" className="w-28 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-bold text-center outline-none focus:border-cyan-500/50 transition-colors" />
                                <button onClick={() => handleRemoveStat(idx)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsEditor;
