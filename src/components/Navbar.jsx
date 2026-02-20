import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiMail, FiX, FiUser, FiLock, FiSend } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'login' | 'contact' | null

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    const navLinks = [
        { name: 'Olimpiadalar', id: 'hero' },
        { name: 'Reyting', id: 'ranking' },
        { name: 'Shon-sharaf Zali', id: 'hall-of-fame' },
        { name: 'Qo\'llanma', id: 'tutorial' },
        { name: 'Hamkorlar', id: 'partners' },
        { name: 'Kontaktlar', id: 'footer', onClick: () => setActiveModal('contact') }
    ];

    const Modal = ({ type, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0A1A2F] border border-white/10 w-full max-w-[420px] rounded-[2.5rem] p-10 shadow-3xl relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors text-xl">
                    <FiX />
                </button>

                {type === 'login' ? (
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Shaxsiy Kabinet</h3>
                        <p className="text-white/40 text-sm mb-8">Tizimga kirish uchun malumotlaringizni kiriting</p>

                        <div className="space-y-4">
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input type="text" placeholder="ID yoki Telefon" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input type="password" placeholder="Parol" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                            </div>
                        </div>

                        <button className="w-full mt-8 bg-cyan-500 text-black py-4 rounded-2xl font-black text-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all">
                            KIRISH
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Bog'lanish</h3>
                        <p className="text-white/40 text-sm mb-8">Savollaringiz bormi? Bizga xabar qoldiring</p>

                        <div className="space-y-4">
                            <input type="text" placeholder="Ismingiz" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                            <input type="text" placeholder="Telefon raqamingiz" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors" />
                            <textarea placeholder="Xabaringiz" rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                        </div>

                        <button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-yellow-400 text-black py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                            YUBORISH <FiSend />
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled || isOpen ? 'py-3 backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'py-5 bg-transparent'
                }`}>
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex flex-col leading-none shrink-0 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="text-cyan-400 text-2xl font-black tracking-tighter">BOND</span>
                        <span className="text-[#FFB800] text-[10px] font-black tracking-[0.2em] border border-[#FFB800] px-1.5 py-0.5 mt-0.5 rounded-sm uppercase">OLYMPIAD</span>
                    </div>

                    {/* Navigation - Center (Desktop) */}
                    <nav className="hidden xl:flex items-center gap-6 2xl:gap-10">
                        <ul className="flex items-center gap-5 2xl:gap-7 text-white/70 text-[12px] font-bold tracking-tight uppercase">
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    className="hover:text-white cursor-pointer transition-colors whitespace-nowrap"
                                    onClick={() => link.onClick ? link.onClick() : scrollToSection(link.id)}
                                >
                                    {link.name}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Actions (Desktop) */}
                    <div className="hidden lg:flex items-center gap-5 shrink-0">
                        <div className="flex items-center gap-4 text-white/50 text-xl mr-2">
                            <FiSearch className="hover:text-white cursor-pointer transition-colors" />
                            <FiBell className="hover:text-white cursor-pointer transition-colors" />
                            <FiMail className="hover:text-white cursor-pointer transition-colors" />
                        </div>
                        <button
                            onClick={() => setActiveModal('login')}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-xl text-[13px] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-white active:scale-95 uppercase"
                        >
                            Kabinet
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-2xl text-white/80 hover:text-white transition-colors z-[100] relative w-10 h-10 flex items-center justify-center"
                        >
                            {isOpen ? <FiX /> : '☰'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[90] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 lg:hidden"
                    >
                        <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => link.onClick ? link.onClick() : scrollToSection(link.id)}
                                    className="text-2xl font-black text-white/80 hover:text-cyan-400 transition-colors tracking-tighter uppercase"
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                            <div className="w-full h-px bg-white/10 my-4" />
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => {
                                    setIsOpen(false);
                                    setActiveModal('login');
                                }}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(6,182,212,0.3)] uppercase"
                            >
                                SHAXSIY KABINET
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <AnimatePresence>
                {activeModal && <Modal type={activeModal} onClose={() => setActiveModal(null)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
