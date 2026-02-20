import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiPlus, FiTrash2, FiSave, FiImage } from 'react-icons/fi';

const HallOfFameEditor = () => {
    const { data, updateHallOfFame } = useContent();
    const [cards, setCards] = useState(data.hallOfFame);
    const [saved, setSaved] = useState(false);
    const fileRefs = useRef({});

    const handleSave = () => {
        updateHallOfFame(cards);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleAdd = () => {
        setCards([...cards, { id: Date.now(), title: '', sub: '', date: '', img: '' }]);
    };

    const handleDelete = (id) => {
        setCards(cards.filter(c => c.id !== id));
    };

    const handleChange = (id, field, value) => {
        setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
    };

    const handleImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => handleChange(id, 'img', ev.target.result);
        reader.readAsDataURL(file);
    };

    const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-cyan-500/50 transition-colors";

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Hall of Fame <span className="text-cyan-400">Editor</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Shon-sharaf zali kartalarini boshqarish</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleAdd} className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase flex items-center gap-2 hover:bg-white/10 transition-all">
                        <FiPlus /> Qo'shish
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 transition-all active:scale-95 ${saved ? 'bg-green-500 text-white' : 'bg-cyan-500 text-black'}`}
                    >
                        <FiSave /> {saved ? 'Saqlandi! ✓' : 'Saqlash'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.id} className="bg-[#0A1A2F] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all">
                        {/* Image Preview */}
                        <div className="relative h-48 bg-white/5 cursor-pointer group/img" onClick={() => fileRefs.current[card.id]?.click()}>
                            {card.img ? (
                                <img src={card.img} alt="" className="w-full h-full object-cover opacity-70 group-hover/img:opacity-90 transition-opacity" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiImage className="text-4xl text-white/20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold uppercase">Rasm yuklash</span>
                            </div>
                        </div>
                        <input
                            ref={el => fileRefs.current[card.id] = el}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageUpload(card.id, e)}
                        />

                        {/* Fields */}
                        <div className="p-6 space-y-3">
                            <input value={card.title} onChange={e => handleChange(card.id, 'title', e.target.value)} placeholder="Sarlavha" className={inputCls} />
                            <input value={card.sub} onChange={e => handleChange(card.id, 'sub', e.target.value)} placeholder="Tavsif" className={inputCls} />
                            <input value={card.date} onChange={e => handleChange(card.id, 'date', e.target.value)} placeholder="Sana (DECEMBER 2024)" className={inputCls} />
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="w-full py-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 mt-2"
                            >
                                <FiTrash2 /> O'chirish
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HallOfFameEditor;
