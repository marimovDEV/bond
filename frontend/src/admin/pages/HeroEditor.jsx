import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiUpload, FiImage, FiX } from 'react-icons/fi';

const HeroEditor = () => {
    const { data, updateHero } = useContent();
    const [formData, setFormData] = useState({ ...data.hero });
    const [saved, setSaved] = useState(false);
    const [imgPreview, setImgPreview] = useState(data.hero.heroImage || null);
    const imgRef = useRef();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setImgPreview(ev.target.result);
            setFormData(prev => ({ ...prev, heroImage: ev.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImgPreview(null);
        setFormData(prev => ({ ...prev, heroImage: null }));
        localStorage.removeItem('bond_hero_image');
    };

    const handleSave = () => {
        updateHero(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors";

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Hero <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Asosiy bo'limni tahrirlash</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'}`}
                >
                    <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left: Text Content */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                    <h3 className="text-lg font-black uppercase tracking-tight">Matnlar</h3>

                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha 1 (Oq rang)</label>
                        <input value={formData.titlePrefix} onChange={e => setFormData({ ...formData, titlePrefix: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha 2 (Gradient)</label>
                        <input value={formData.titleGradient} onChange={e => setFormData({ ...formData, titleGradient: e.target.value })} className={`${inputCls} text-cyan-400 font-bold`} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tavsif</label>
                        <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${inputCls} resize-none`} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tugma Matni</label>
                        <input value={formData.ctaText} onChange={e => setFormData({ ...formData, ctaText: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tugma Havolasi (URL)</label>
                        <input value={formData.ctaLink} onChange={e => setFormData({ ...formData, ctaLink: e.target.value })} className={inputCls} />
                    </div>
                </div>

                {/* Right: Countdown + Image */}
                <div className="space-y-6">

                    {/* Countdown */}
                    <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                        <h3 className="text-lg font-black uppercase tracking-tight">⏱ Countdown (Ortga Sanoq)</h3>
                        <p className="text-white/30 text-xs">Bu yerda belgilangan vaqtdan ortga sanoq boshlaydi</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: 'KUN', field: 'days', max: 365 },
                                { label: 'SOAT', field: 'hours', max: 23 },
                                { label: 'MINUT', field: 'minutes', max: 59 },
                                { label: 'SEKUNDT', field: 'seconds', max: 59 }
                            ].map(({ label, field, max }) => (
                                <div key={field}>
                                    <label className="text-[9px] font-black uppercase text-white/30 mb-2 block tracking-widest text-center">{label}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max={max}
                                        value={formData.countdown?.[field] ?? 0}
                                        onChange={e => setFormData({
                                            ...formData,
                                            countdown: { ...formData.countdown, [field]: Math.max(0, Math.min(max, parseInt(e.target.value) || 0)) }
                                        })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-2 text-center text-xl font-black outline-none focus:border-cyan-500/50 transition-colors"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Image Upload */}
                    <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                        <h3 className="text-lg font-black uppercase tracking-tight">🖼 Hero Rasm</h3>
                        <p className="text-white/30 text-xs">O'ng tomonda ko'rinadigan asosiy rasm (PNG, JPG, WebP)</p>

                        {imgPreview ? (
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group">
                                <img src={imgPreview} alt="Hero" className="w-full h-full object-cover" />
                                <button
                                    onClick={removeImage}
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
                                <FiImage className="text-4xl text-white/20 group-hover:text-cyan-400 transition-colors" />
                                <p className="text-white/30 text-sm font-medium group-hover:text-white/60">Rasm yuklash uchun bosing</p>
                                <p className="text-white/20 text-xs">PNG, JPG, WebP — maks 5MB</p>
                            </div>
                        )}

                        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        <button
                            onClick={() => imgRef.current.click()}
                            className="w-full bg-white/5 border border-white/10 py-3 rounded-2xl text-sm font-bold uppercase text-white/50 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <FiUpload /> {imgPreview ? 'Rasmni almashtirish' : 'Rasm tanlash'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroEditor;
