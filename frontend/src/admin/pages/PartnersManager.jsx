import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiPlus, FiTrash2, FiSave, FiLink } from 'react-icons/fi';

const PartnersManager = () => {
    const { data, updatePartners } = useContent();
    const [partners, setPartners] = useState(data.partners);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updatePartners(partners);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleAdd = () => {
        setPartners([...partners, { id: Date.now(), nameUz: '', nameRu: '', website: '' }]);
    };

    const handleDelete = (id) => {
        setPartners(partners.filter(p => p.id !== id));
    };

    const handleChange = (id, field, value) => {
        setPartners(partners.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Partners <span className="text-cyan-400">Manager</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Hamkorlar ro'yxatini boshqarish</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleAdd} className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase flex items-center gap-2 hover:bg-white/10 transition-all">
                        <FiPlus /> Qo'shish
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'}`}
                    >
                        <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {partners.map((partner, idx) => (
                    <div key={partner.id} className="bg-[#0A1A2F] border border-white/10 p-6 rounded-[2rem] flex items-center gap-6 group hover:border-white/20 transition-all">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/30 text-lg font-black shrink-0">
                            {idx + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    value={partner.nameUz || ''}
                                    onChange={e => handleChange(partner.id, 'nameUz', e.target.value)}
                                    placeholder="Nomi (UZ)"
                                    className="bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                />
                                <input
                                    value={partner.nameRu || ''}
                                    onChange={e => handleChange(partner.id, 'nameRu', e.target.value)}
                                    placeholder="Nomi (RU)"
                                    className="bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                <input
                                    value={partner.website || ''}
                                    onChange={e => handleChange(partner.id, 'website', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-5 text-sm outline-none focus:border-cyan-500/50 transition-colors"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(partner.id)}
                            className="text-white/20 hover:text-red-400 transition-colors text-lg p-2 opacity-0 group-hover:opacity-100"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                ))}

                {partners.length === 0 && (
                    <div className="text-center py-20 text-white/20 font-bold uppercase tracking-widest text-sm">
                        Hozircha hamkorlar yo'q. "Qo'shish" tugmasini bosing.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnersManager;
