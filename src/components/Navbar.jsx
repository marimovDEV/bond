import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiMail } from 'react-icons/fi';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Olimpiadalar', href: '#' },
        { name: 'Reyting', href: '#' },
        { name: 'Shon-sharaf Zali', href: '#' },
        { name: 'Tayyorgarlik', href: '#' },
        { name: 'Kontaktlar', href: '#' }
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled || isOpen ? 'py-3 backdrop-blur-2xl bg-black/40 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'py-5 bg-transparent'
                }`}>
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex flex-col leading-none shrink-0">
                        <span className="text-cyan-400 text-2xl font-black tracking-tighter">BOND</span>
                        <span className="text-[#FFB800] text-[10px] font-bold tracking-[0.2em] border border-[#FFB800]/30 px-1 py-0.5 mt-0.5 rounded-sm uppercase">OLYMPIAD</span>
                    </div>

                    {/* Navigation - Center (Desktop) */}
                    <nav className="hidden xl:flex items-center gap-6 2xl:gap-10">
                        <ul className="flex items-center gap-6 2xl:gap-8 text-white/70 text-[13px] font-bold tracking-tight">
                            {navLinks.map((link) => (
                                <li key={link.name} className="hover:text-white cursor-pointer transition-colors whitespace-nowrap">{link.name}</li>
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
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 rounded-xl text-[13px] font-bold tracking-tight hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all text-white active:scale-95">
                            Shaxsiy Kabinet
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-2xl text-white/80 hover:text-white transition-colors z-50 relative w-10 h-10 flex items-center justify-center"
                        >
                            {isOpen ? '✕' : '☰'}
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
                        className="fixed inset-0 z-[55] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 lg:hidden"
                    >
                        <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold text-white/80 hover:text-white transition-colors tracking-tight"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <div className="w-full h-px bg-white/10 my-4" />
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => setIsOpen(false)}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(6,182,212,0.3)]"
                            >
                                SHAXSIY KABINET
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
