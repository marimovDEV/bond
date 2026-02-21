import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';

const Tutorial = () => {
    const { data } = useContent();
    const { tutorial } = data;
    const [isPlaying, setIsPlaying] = useState(false);

    // Determine video source: uploaded file > YouTube URL
    const hasVideo = tutorial.videoBase64 || tutorial.videoUrl;

    const renderVideo = () => {
        if (tutorial.videoBase64) {
            return (
                <video
                    src={tutorial.videoBase64}
                    controls
                    autoPlay
                    className="w-full h-full object-contain bg-black"
                />
            );
        }
        if (tutorial.videoUrl) {
            // Check if it's a local path or external non-YouTube video
            const isLocal = tutorial.videoUrl.startsWith('/') || !tutorial.videoUrl.includes('youtube.com') && !tutorial.videoUrl.includes('youtu.be');

            if (isLocal) {
                return (
                    <video
                        src={tutorial.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-contain bg-black"
                    />
                );
            }

            const embedUrl = tutorial.videoUrl.includes('embed')
                ? tutorial.videoUrl
                : tutorial.videoUrl.replace('watch?v=', 'embed/');
            return (
                <iframe
                    src={`${embedUrl}?autoplay=1`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    title="Tutorial Video"
                />
            );
        }
        return null;
    };

    return (
        <section id="tutorial" className="section-gap relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4"
                    >
                        {tutorial.title.split(' ').map((word, i, arr) =>
                            i === arr.length - 1
                                ? <span key={i} className="text-gradient"> {word}</span>
                                : <span key={i}>{word} </span>
                        )}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-medium"
                    >
                        {tutorial.subtitle}
                    </motion.p>
                </div>

                {/* Video Player */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-[1000px] mx-auto rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl group min-h-[300px] max-h-[80vh] flex items-center justify-center bg-black"
                    onClick={() => !isPlaying && setIsPlaying(true)}
                >
                    {/* Playing State */}
                    {isPlaying && hasVideo ? (
                        <div className="w-full h-full flex items-center justify-center">
                            {renderVideo()}
                        </div>
                    ) : (
                        <>
                            {/* Thumbnail */}
                            <div className={`absolute inset-0 z-10 ${hasVideo ? 'cursor-pointer' : ''} bg-[#0A1A2F]/80 backdrop-blur-sm group-hover:bg-[#0A1A2F]/60 transition-all duration-500`} />
                            {tutorial.thumbnail && (
                                <img
                                    src={tutorial.thumbnail}
                                    alt="Tutorial Thumbnail"
                                    className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                                />
                            )}

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="relative">
                                    {hasVideo && (
                                        <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-ping" />
                                    )}
                                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-transform duration-300 relative z-10 ${hasVideo ? 'bg-gradient-to-r from-cyan-500 to-blue-600 group-hover:scale-110' : 'bg-white/10 border border-white/20'}`}>
                                        <FiPlay className="ml-2" />
                                    </div>
                                    {!hasVideo && (
                                        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/20 text-[10px] uppercase font-bold tracking-widest">
                                            Admin paneldan video yuklang
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Bar */}
                            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-30">
                                <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-black">B</div>
                                    <div>
                                        <p className="text-white text-xs font-black uppercase tracking-widest">BOND OLYMPIAD</p>
                                        <p className="text-white/40 text-[10px] font-medium uppercase">
                                            {hasVideo ? 'VIDEO MAVJUD • Ko\'rish uchun bosing' : 'Video hali yuklanmagan'}
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${hasVideo ? 'bg-cyan-400' : 'bg-white/20'}`} />
                                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                                        {hasVideo ? 'Tayyor' : 'Kutilmoqda'}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* Reset button when playing */}
                {isPlaying && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsPlaying(false)}
                            className="text-white/30 text-xs font-bold uppercase hover:text-white/60 transition-colors"
                        >
                            ← Yopish
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Tutorial;
