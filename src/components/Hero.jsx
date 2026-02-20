import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 hero-bg min-h-screen flex items-center overflow-hidden bg-[#020817]">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                {/* Glows */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[650px] text-center lg:text-left mx-auto lg:mx-0"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[84px] font-black leading-[1.05] mb-6 tracking-tighter">
                        <span className="text-white block mb-2">Yanvar Kubogi:</span>
                        <span className="text-gradient block">Bond: Aql Janggi 2024</span>
                    </h1>

                    <p className="text-base md:text-lg text-white/50 mb-10 leading-relaxed font-medium max-w-[550px] mx-auto lg:mx-0">
                        Matematika, Ingliz Tili va Informatika Bilimlarini Sinashingiz<br />
                        Sahrinda oflayn catmash va yordamchi o'zidagi onlini
                    </p>

                    {/* Figma Style Countdown */}
                    <div className="flex justify-center lg:justify-start gap-4 mb-12">
                        {[
                            { val: '2', label: 'KUN' },
                            { val: '15', label: 'SOAT' },
                            { val: '4', label: 'MINUT' }
                        ].map((box, i) => (
                            <div key={i} className="bg-[#0A1A2F] border border-cyan-400/20 w-24 h-28 md:w-28 md:h-32 rounded-2xl flex flex-col items-center justify-center shadow-2xl relative group">
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                                <span className="text-3xl md:text-5xl font-black text-white relative z-10">{box.val}</span>
                                <span className="text-[10px] md:text-[12px] font-black text-cyan-400 tracking-widest mt-2 relative z-10">{box.label}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#FF8A00] to-[#FFC700] text-black px-12 py-5 rounded-full text-lg font-black tracking-tight active:scale-95 shadow-[0_10px_40px_rgba(255,138,0,0.3)] hover:shadow-[0_15px_50px_rgba(255,138,0,0.5)] transition-all duration-300 uppercase">
                        Hozir ro'yxatdan o'tish!
                    </button>
                </motion.div>

                {/* Right Column: Image/Illustration Placeholder */}
                <div className="relative hidden lg:flex items-center justify-center h-full">
                    {/* Main Illustration Glow */}
                    <div className="absolute w-[600px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />

                    {/* Visual placeholder for "Students with trophies" */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative z-10 w-full max-w-[500px] aspect-square rounded-[3rem] border border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center p-12 overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                        <div className="text-white/20 text-sm font-bold uppercase tracking-[1em] text-center">
                            Illustration Area<br />
                            <span className="text-[10px] tracking-normal mt-4 block">(Students with Trophies)</span>
                        </div>

                        {/* Abstract floating shapes to keep it visual */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl" />
                        <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
                    </motion.div>

                    {/* Faint Outline Shape from Figma */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[300px] border border-cyan-400/20 rounded-[4rem] rotate-12 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
