import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiSave, FiUpload, FiVideo, FiImage, FiX, FiYoutube } from 'react-icons/fi';

const TutorialEditor = () => {
    const { data, updateTutorial } = useContent();
    const [form, setForm] = useState({ ...data.tutorial });
    const [saved, setSaved] = useState(false);
    const [uploadMode, setUploadMode] = useState(data.tutorial.videoBase64 ? 'file' : 'url');
    const videoRef = useRef();
    const thumbRef = useRef();

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setForm(prev => ({ ...prev, videoBase64: ev.target.result, videoUrl: '' }));
        };
        reader.readAsDataURL(file);
    };

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setForm(prev => ({ ...prev, thumbnail: ev.target.result }));
        };
        reader.readAsDataURL(file);
    };

    const removeVideo = () => {
        setForm(prev => ({ ...prev, videoBase64: null }));
        localStorage.removeItem('bond_tutorial_video');
    };

    const handleSave = () => {
        updateTutorial(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors";

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

                {/* Left: Text */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                    <h3 className="text-lg font-black uppercase tracking-tight">Matnlar</h3>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Sarlavha</label>
                        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Tavsif</label>
                        <textarea rows="4" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={`${inputCls} resize-none`} />
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Cover Rasm (Thumbnail)</label>
                        {form.thumbnail ? (
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group mb-3">
                                <img src={form.thumbnail} alt="thumbnail" className="w-full h-full object-cover opacity-70" />
                                <button
                                    onClick={() => setForm(prev => ({ ...prev, thumbnail: '' }))}
                                    className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                >
                                    <FiX />
                                </button>
                            </div>
                        ) : null}
                        <div className="flex gap-3">
                            <button
                                onClick={() => thumbRef.current.click()}
                                className="flex-1 bg-white/5 border border-white/10 py-3 rounded-2xl text-xs font-bold uppercase text-white/50 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <FiImage /> Rasm Yuklash
                            </button>
                            <input
                                placeholder="Yoki URL kiriting..."
                                value={form.thumbnail && !form.thumbnail.startsWith('data:') ? form.thumbnail : ''}
                                onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-xs outline-none focus:border-cyan-500/50"
                            />
                        </div>
                        <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                    </div>
                </div>

                {/* Right: Video */}
                <div className="bg-[#0A1A2F] border border-white/10 p-8 rounded-[2.5rem] space-y-5">
                    <h3 className="text-lg font-black uppercase tracking-tight">🎬 Video</h3>

                    {/* Mode Tabs */}
                    <div className="flex gap-2 p-1 bg-white/5 rounded-2xl">
                        <button
                            onClick={() => setUploadMode('url')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${uploadMode === 'url' ? 'bg-cyan-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            <FiYoutube /> YouTube / URL
                        </button>
                        <button
                            onClick={() => setUploadMode('file')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${uploadMode === 'file' ? 'bg-cyan-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                            <FiUpload /> Fayl Yuklash
                        </button>
                    </div>

                    {uploadMode === 'url' ? (
                        <div>
                            <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">YouTube Embed URL</label>
                            <input
                                value={form.videoUrl || ''}
                                onChange={e => setForm({ ...form, videoUrl: e.target.value, videoBase64: null })}
                                placeholder="https://www.youtube.com/embed/..."
                                className={inputCls}
                            />
                            <p className="text-white/20 text-[10px] mt-2">YouTube videosini embed qilish uchun: youtube.com/watch?v=XXX → youtube.com/embed/XXX</p>
                            {form.videoUrl && (
                                <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 aspect-video">
                                    <iframe src={form.videoUrl} className="w-full h-full" allowFullScreen title="preview" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="text-[10px] font-black uppercase text-white/30 mb-2 block tracking-widest">Video Fayl (MP4, WebM)</label>
                            {form.videoBase64 ? (
                                <div className="space-y-3">
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video group bg-black">
                                        <video src={form.videoBase64} controls className="w-full h-full object-contain" />
                                        <button
                                            onClick={removeVideo}
                                            className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-10"
                                        >
                                            <FiX />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => videoRef.current.click()}
                                        className="w-full bg-white/5 border border-white/10 py-3 rounded-2xl text-xs font-bold uppercase text-white/50 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <FiUpload /> Videoni almashtirish
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => videoRef.current.click()}
                                    className="border-2 border-dashed border-white/10 rounded-2xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group"
                                >
                                    <FiVideo className="text-5xl text-white/20 group-hover:text-cyan-400 transition-colors" />
                                    <p className="text-white/30 text-sm font-medium group-hover:text-white/60">Video yuklash uchun bosing</p>
                                    <p className="text-white/20 text-xs">MP4, WebM — maks 50MB</p>
                                </div>
                            )}
                            <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialEditor;
