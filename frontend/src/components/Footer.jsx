import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="pt-12 pb-8 md:pt-16 md:pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-10 mb-12 relative z-10 text-center md:text-left">
                <div className="col-span-2 md:col-span-1 border-b border-white/5 pb-8 md:pb-0 md:border-0">
                    <div className="flex flex-col leading-none mb-4 items-center md:items-start">
                        <span className="text-cyan-400 text-2xl font-black tracking-tighter">BOND</span>
                        <span className="text-[#FFB800] text-[10px] font-bold tracking-[0.2em] border border-[#FFB800]/30 px-1 py-0.5 mt-0.5 rounded-sm uppercase w-fit">OLYMPIAD</span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                        {t('platformDescription')}
                    </p>
                </div>

                <div className="pt-2 md:pt-0">
                    <h4 className="text-sm md:text-lg font-black mb-4 md:mb-6 uppercase tracking-wider md:tracking-normal">{t('navigation')}</h4>
                    <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/40 font-medium">
                        <li className="hover:text-white cursor-pointer transition-colors">{t('olympiads')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('rating')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('preparation')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('fame')}</li>
                    </ul>
                </div>

                <div className="pt-2 md:pt-0">
                    <h4 className="text-sm md:text-lg font-black mb-4 md:mb-6 uppercase tracking-wider md:tracking-normal">{t('contacts')}</h4>
                    <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/40 font-medium">
                        <li className="hover:text-white cursor-pointer transition-colors">{t('aboutUs')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('contacts')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('terms')}</li>
                        <li className="hover:text-white cursor-pointer transition-colors">{t('privacy')}</li>
                    </ul>
                </div>

                <div className="col-span-2 md:col-span-1 pt-8 md:pt-0 border-t border-white/5 md:border-0">
                    <h4 className="text-sm md:text-lg font-black mb-4 md:mb-6 uppercase tracking-wider md:tracking-normal">{t('contacts')}</h4>
                    <ul className="space-y-2 md:space-y-4 text-xs md:text-sm text-white/40 font-medium">
                        <li>{t('emailLabel')} <span className="text-white block md:inline mt-1 md:mt-0">info@bondolimp.uz</span></li>
                        <li>{t('phoneLabel')} <span className="text-white block md:inline mt-1 md:mt-0">+998 71 123 45 67</span></li>
                        <li>{t('addressLabel')} <span className="text-white block md:inline mt-1 md:mt-0">{t('addressData')}</span></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <p className="text-white/20 text-[10px] md:text-xs font-medium text-center md:text-left">
                    © 2024 BOND Olimpiada. {t('copyright')}
                </p>

                <button
                    onClick={scrollToTop}
                    className="w-12 h-12 md:w-14 md:h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-xl md:text-2xl text-black shadow-xl shadow-cyan-500/20 hover:-translate-y-2 transition-all active:scale-95"
                >
                    <FiArrowUp />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
