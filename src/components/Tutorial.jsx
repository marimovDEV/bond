import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

const Tutorial = () => {
    return (
        <section id="tutorial" className="section-gap relative overflow-hidden bg-[#020817]">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4"
                    >
                        Video <span className="text-gradient">Qo'llanma</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-medium"
                    >
                        Sizni platformadan foydalanish qulayligi uchun maxsus tayyorlangan video-darslik.
                        Bu yerda barcha savollaringizga javob topasiz.
                    </motion.p>
                </div>

                {/* Premium Video Player UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-[1000px] mx-auto aspect-video rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl group cursor-pointer"
                >
                    {/* Mock Video Thumbnail */}
                    <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-sm group-hover:bg-[#0A1A2F]/60 transition-all duration-500" />
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                        alt="Platform Tutorial"
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Ping Animation */}
                            <div className="absolute inset-0 bg-cyan-500/30 rounded-full animate-ping" />

                            {/* Main Button */}
                            <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl shadow-[0_0_50px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <FiPlay className="ml-2" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
                        <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                                B
                            </div>
                            <div>
                                <p className="text-white text-xs font-black uppercase tracking-widest">BOND OLYMPIAD</p>
                                <p className="text-white/40 text-[10px] font-medium uppercase">5:24 MIN • HD QUALITY</p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Tizimni organish</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Tutorial;
