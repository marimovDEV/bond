import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiArrowRight } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const HallOfFame = () => {
    const { data } = useContent();
    const { lang, t } = useLanguage();
    const cards = data.hallOfFame;

    return (
        <section className="py-20 max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-3">
                    {t('hallOfFame')} <span className="text-gradient">{t('hallOfFameSubtitle')}</span>
                </h2>
                <p className="text-white/60 text-base">G'oliblar va yutuqlarimizning ajoyib laxzalari</p>
                <div className="w-24 h-1 bg-cyan-500 mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {cards.map((c, i) => (
                    <motion.div
                        key={c.id || i}
                        whileHover={{ y: -10 }}
                        className="group relative overflow-hidden rounded-[2.5rem] bg-[#0A192F]/60 border border-white/10"
                    >
                        <div className="h-80 overflow-hidden relative">
                            {c.img ? (
                                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <FiAward className="text-6xl text-white/10" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent" />
                            {(c.dateUz || c.dateRu) && (
                                <div className="absolute top-6 left-6 bg-[#00D1FF]/10 backdrop-blur-md border border-[#00D1FF]/20 px-4 py-2 rounded-xl text-[10px] font-black text-[#00D1FF] tracking-widest uppercase">
                                    {lang === 'uz' ? c.dateUz : c.dateRu}
                                </div>
                            )}
                            <div className="absolute top-6 right-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl text-black shadow-lg shadow-orange-500/40">
                                <FiAward />
                            </div>
                        </div>

                        <div className="p-8">
                            <h3 className="text-xl font-black mb-2 group-hover:text-cyan-400 transition-colors">{lang === 'uz' ? c.titleUz : c.titleRu}</h3>
                            <p className="text-white/40 text-xs mb-6">{lang === 'uz' ? c.subUz : c.subRu}</p>
                            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#0095FF] hover:border-[#0095FF] transition-all font-bold group-hover:shadow-[0_0_20px_rgba(0,149,255,0.3)]">
                                {t('seeMore')} <FiArrowRight />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HallOfFame;
