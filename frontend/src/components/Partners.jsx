import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const Partners = () => {
    const { data } = useContent();
    const { partners } = data;
    const { lang, t } = useLanguage();

    return (
        <section className="py-12 md:py-20 max-w-[1400px] mx-auto px-6">
            <div className="bg-[#0A2540]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 text-center shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-black mb-8 md:mb-10 uppercase tracking-tighter">{t('ourPartners')}</h2>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {partners.filter(p => p.nameUz || p.nameRu).map((p) => (
                        <div key={p.id} className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 border border-white/10 text-base md:text-lg font-black tracking-tight hover:bg-cyan-500/10 hover:border-cyan-400/40 hover:text-cyan-400 transition-all cursor-default group">
                            {lang === 'uz' ? p.nameUz : p.nameRu}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
