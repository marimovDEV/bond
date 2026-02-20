import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiVideo, FiImage } from 'react-icons/fi';

const TutorialEditor = () => {
    const { data, updateTutorial } = useContent();
    const [form, setForm] = useState(data.tutorial);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateTutorial(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Tutorial <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Video qo'llanma bo'limini tahrirlash</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'}`}
                >
                    <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Matnlar</h3>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha</label>
                        <input
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tavsif</label>
                        <textarea
                            rows="4"
                            value={form.subtitle}
                            onChange={e => setForm({ ...form, subtitle: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none"
                        />
                    </div>
                </div>

                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Media</h3>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest flex items-center gap-2"><FiVideo /> Video URL (YouTube Embed)</label>
                        <input
                            value={form.videoUrl || ''}
                            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                            placeholder="https://www.youtube.com/embed/..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest flex items-center gap-2"><FiImage /> Thumbnail URL (Cover rasm)</label>
                        <input
                            value={form.thumbnail || ''}
                            onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                            placeholder="https://..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>
                    {form.thumbnail && (
                        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
                            <img src={form.thumbnail} alt="preview" className="w-full h-full object-cover opacity-60" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialEditor;
