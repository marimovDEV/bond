import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiUpload, FiImage, FiX, FiPlus, FiTrash2, FiChevronRight } from 'react-icons/fi';

const HeroEditor = () => {
    const { data, updateHero } = useContent();
    const [olympiads, setOlympiads] = useState([...data.hero.olympiads]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [saved, setSaved] = useState(false);
    const imgRef = useRef();

    const currentOlympiad = olympiads[selectedIndex] || olympiads[0];

    const handleUpdate = (field, value) => {
        const updated = [...olympiads];
        updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
        setOlympiads(updated);
    };

    const handleCountdownUpdate = (field, value) => {
        const updated = [...olympiads];
        updated[selectedIndex] = {
            ...updated[selectedIndex],
            countdown: { ...updated[selectedIndex].countdown, [field]: value }
        };
        setOlympiads(updated);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            handleUpdate('heroImage', ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const addOlympiad = () => {
        const newO = {
            id: Date.now(),
            titlePrefix: "Yangi Olimpiada",
            titleGradient: "Sarlavha",
            description: "Tavsif",
            ctaText: "Ro'yxatdan o'tish",
            ctaLink: "https://bondolympiad.uz",
            heroImage: null,
            countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 }
        };
        setOlympiads([...olympiads, newO]);
        setSelectedIndex(olympiads.length);
    };

    const removeOlympiad = (index) => {
        if (olympiads.length <= 1) return;
        const updated = olympiads.filter((_, i) => i !== index);
        setOlympiads(updated);
        setSelectedIndex(Math.max(0, index - 1));
    };

    const handleSave = () => {
        updateHero({ olympiads });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors";

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Hero <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Karuselni boshqarish</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'}`}
                >
                    <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: List of Olympiads */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-[#0A1A2F] border border-white/10 p-6 rounded-[2rem] space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Olimpiadalar</h3>
                            <button
                                onClick={addOlympiad}
                                className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all"
                            >
                                <FiPlus />
                            </button>
                        </div>
                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {olympiads.map((o, idx) => (
                                <div
                                    key={o.id}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${selectedIndex === idx ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                                >
                                    <div className="flex-1 min-w-0 pr-4">
                                        <p className={`text-xs font-black truncate ${selectedIndex === idx ? 'text-cyan-400' : 'text-white'}`}>{o.titlePrefix}</p>
                                        <p className="text-[10px] text-white/30 truncate uppercase tracking-widest">{o.titleGradient}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {olympiads.length > 1 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeOlympiad(idx); }}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-500 transition-all"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        )}
                                        <FiChevronRight className={selectedIndex === idx ? 'text-cyan-400' : 'text-white/20'} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Editor Form */}
                <div className="lg:col-span-8 space-y-8">
                    {currentOlympiad ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Text Content */}
                            <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                                <h3 className="text-lg font-black uppercase tracking-tight">Matnlar</h3>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha 1</label>
                                    <input value={currentOlympiad.titlePrefix} onChange={e => handleUpdate('titlePrefix', e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha 2 (Gradient)</label>
                                    <input value={currentOlympiad.titleGradient} onChange={e => handleUpdate('titleGradient', e.target.value)} className={`${inputCls} text-cyan-400 font-bold`} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tavsif</label>
                                    <textarea rows="3" value={currentOlympiad.description} onChange={e => handleUpdate('description', e.target.value)} className={`${inputCls} resize-none`} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tugma Matni</label>
                                        <input value={currentOlympiad.ctaText} onChange={e => handleUpdate('ctaText', e.target.value)} className={inputCls} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Link (URL)</label>
                                        <input value={currentOlympiad.ctaLink} onChange={e => handleUpdate('ctaLink', e.target.value)} className={inputCls} />
                                    </div>
                                </div>
                            </div>

                            {/* Countdown & Image */}
                            <div className="space-y-8">
                                {/* Countdown */}
                                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                                    <h3 className="text-lg font-black uppercase tracking-tight">⏱ Countdown</h3>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[
                                            { label: 'KUN', field: 'days', max: 365 },
                                            { label: 'SOAT', field: 'hours', max: 23 },
                                            { label: 'MINUT', field: 'minutes', max: 59 },
                                            { label: 'SEKUNDT', field: 'seconds', max: 59 }
                                        ].map(({ label, field, max }) => (
                                            <div key={field}>
                                                <label className="text-[8px] font-black uppercase text-white/30 mb-1 block tracking-widest text-center">{label}</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={max}
                                                    value={currentOlympiad.countdown[field]}
                                                    onChange={e => handleCountdownUpdate(field, Math.max(0, Math.min(max, parseInt(e.target.value) || 0)))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 text-center text-lg font-black outline-none focus:border-cyan-500/50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                                    <h3 className="text-lg font-black uppercase tracking-tight">🖼 Hero Rasm</h3>
                                    {currentOlympiad.heroImage ? (
                                        <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group">
                                            <img src={currentOlympiad.heroImage} alt="Hero" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => handleUpdate('heroImage', null)}
                                                className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => imgRef.current.click()}
                                            className="border-2 border-dashed border-white/10 rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
                                        >
                                            <FiImage className="text-3xl text-white/20 group-hover:text-cyan-400" />
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Rasm yuklash</p>
                                        </div>
                                    )}
                                    <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-[#0A1A2F] border border-white/10 rounded-[2.5rem] p-20 text-center">
                            <div>
                                <FiChevronRight className="text-6xl text-white/5 mx-auto mb-4" />
                                <p className="text-white/20 font-black uppercase tracking-widest">Tahrirlash uchun olimpiadani tanlang</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroEditor;
