import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            const success = login(username, password);
            if (success) {
                navigate('/admin');
            } else {
                setError('Login yoki parol noto\'g\'ri!');
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#020815] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="w-full max-w-[420px] relative z-10">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="flex flex-col leading-none items-center mb-4">
                        <span className="text-cyan-400 text-4xl font-black tracking-tighter">BOND</span>
                        <span className="text-[#FFB800] text-[11px] font-black tracking-[0.3em] border border-[#FFB800] px-2 py-0.5 mt-1 rounded-sm uppercase">ADMIN</span>
                    </div>
                    <h1 className="text-white/40 text-sm font-medium uppercase tracking-widest">Boshqaruv Tizimi</h1>
                </div>

                {/* Card */}
                <div className="bg-[#0A1A2F] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />

                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Tizimga Kirish</h2>
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-8">Admin hisob ma'lumotlari</p>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                            <FiAlertCircle className="shrink-0" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-lg" />
                            <input
                                type="text"
                                placeholder="Login"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                required
                            />
                        </div>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 text-lg" />
                            <input
                                type="password"
                                placeholder="Parol"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Tekshirilmoqda...' : 'KIRISH'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
