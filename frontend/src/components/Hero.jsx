import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Hero = () => {
    const { data } = useContent();
    const { hero } = data;

    const [timeLeft, setTimeLeft] = useState({ ...hero.countdown });

    // Reset countdown when admin changes values
    useEffect(() => {
        setTimeLeft({ ...hero.countdown });
    }, [hero.countdown.days, hero.countdown.hours, hero.countdown.minutes, hero.countdown.seconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [hero.countdown.days, hero.countdown.hours, hero.countdown.minutes]);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 hero-bg min-h-screen flex items-center overflow-hidden bg-[#020817]">
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-[650px] text-center lg:text-left mx-auto lg:mx-0"
                >
                    {/* Logo */}
                    <div className="flex flex-col leading-none mb-12 items-center lg:items-start scale-110 origin-center lg:origin-left">
                        <span className="text-cyan-400 text-4xl font-black tracking-tighter">BOND</span>
                        <span className="text-[#FFB800] text-[12px] font-black tracking-[0.3em] border-2 border-[#FFB800] px-3 py-1 mt-1 rounded-md uppercase">OLYMPIAD</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-[72px] lg:text-[84px] font-black leading-[0.98] mb-8 tracking-tighter">
                        <span className="text-white block mb-2">{hero.titlePrefix}</span>
                        <span className="text-gradient block">{hero.titleGradient}</span>
                    </h1>

                    <p className="text-base md:text-lg text-white/50 mb-12 leading-relaxed font-medium max-w-[550px] mx-auto lg:mx-0 whitespace-pre-line">
                        {hero.description}
                    </p>

                    {/* Countdown */}
                    <div className="flex justify-center lg:justify-start gap-3 mb-16 flex-wrap">
                        {[
                            { val: timeLeft.days, label: 'KUN' },
                            { val: timeLeft.hours, label: 'SOAT' },
                            { val: timeLeft.minutes, label: 'MINUT' },
                            { val: timeLeft.seconds, label: 'SEKUNDT' }
                        ].map((box, i) => (
                            <div key={i} className="bg-[#0A1A2F] border border-cyan-400/20 w-20 h-24 md:w-24 md:h-28 rounded-3xl flex flex-col items-center justify-center shadow-2xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-2xl md:text-4xl font-black text-white relative z-10 tabular-nums">{String(box.val ?? 0).padStart(2, '0')}</span>
                                <span className="text-[9px] md:text-[11px] font-black text-cyan-400 tracking-widest mt-2 relative z-10">{box.label}</span>
                            </div>
                        ))}
                    </div>

                    <a
                        href={hero.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#FF8A00] to-[#FFC700] text-black px-12 py-5 rounded-full text-lg font-black tracking-tight active:scale-95 shadow-[0_10px_40px_rgba(255,138,0,0.3)] hover:shadow-[0_15px_50px_rgba(255,138,0,0.5)] transition-all duration-300 uppercase text-center"
                    >
                        {hero.ctaText}
                    </a>
                </motion.div>

                {/* Right: Hero Image */}
                <div className="relative hidden lg:flex items-center justify-center h-full">
                    <div className="absolute w-[600px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />

                    <motion.div
                        animate={!hero.heroImage ? { y: [0, -15, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative z-10 w-full max-w-[520px] aspect-square rounded-[4rem] border border-white/10 backdrop-blur-sm bg-white/5 flex items-center justify-center overflow-hidden shadow-2xl"
                    >
                        {hero.heroImage ? (
                            <img
                                src={hero.heroImage}
                                alt="Hero Illustration"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                                <div className="text-center relative z-10 space-y-3">
                                    <div className="text-white/10 text-sm font-bold uppercase tracking-[1em]">ILLUSTRATION</div>
                                    <div className="text-white/10 text-xs font-medium uppercase tracking-widest">Admin paneldan rasm yuklang</div>
                                </div>
                            </>
                        )}
                    </motion.div>

                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[450px] h-[350px] border border-cyan-400/20 rounded-[5rem] rotate-12 pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
