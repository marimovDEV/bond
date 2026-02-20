import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiUser } from 'react-icons/fi';

const RankingManager = () => {
    const { data, updateRanking } = useContent();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm('Haqiqatan ham ushbu foydalanuvchini o\'chirmoqchimisiz?')) {
            updateRanking(data.ranking.filter(r => r.id !== id));
        }
    };

    const startEdit = (student) => {
        setEditingId(student.id);
        setEditForm(student);
    };

    const handleSaveEdit = () => {
        updateRanking(data.ranking.map(r => r.id === editingId ? editForm : r));
        setEditingId(null);
    };

    const handleAdd = () => {
        const newStudent = {
            ...editForm,
            id: Date.now(),
            progress: parseInt(editForm.progress),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${editForm.name}`
        };
        updateRanking([...data.ranking, newStudent]);
        setIsAdding(false);
        setEditForm(null);
    };

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black uppercase tracking-tight">Ranking <span className="text-cyan-400">Manager</span></h1>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">O'quvchilar ro'yxatini boshqarish</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => {
                            setIsAdding(true);
                            setEditForm({ name: '', school: '', progress: 0 });
                        }}
                        className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-black text-sm uppercase flex items-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                    >
                        <FiPlus /> Yangi Qo'shish
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="bg-[#0A1A2F] border border-cyan-500/30 p-8 rounded-[2.5rem] shadow-xl animate-in slide-in-from-top duration-500">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-6">Yangi O'quvchi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input
                            placeholder="Ismi"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50"
                        />
                        <input
                            placeholder="Maktabi"
                            value={editForm.school}
                            onChange={e => setEditForm({ ...editForm, school: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50"
                        />
                        <input
                            type="number"
                            placeholder="Progress %"
                            value={editForm.progress}
                            onChange={e => setEditForm({ ...editForm, progress: e.target.value })}
                            className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50"
                        />
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handleAdd}
                            className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold text-xs uppercase"
                        >Saqlash</button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="bg-white/5 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase"
                        >Bekor qilish</button>
                    </div>
                </div>
            )}

            <div className="bg-[#0A1A2F] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">F.I.SH</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40">Maktab</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-center">Progress %</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.ranking.map((student) => (
                            <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    {editingId === student.id ? (
                                        <input
                                            value={editForm.name}
                                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                            className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <img src={student.avatar} alt="" className="w-8 h-8 rounded-full bg-white/5" />
                                            <span className="font-bold text-sm">{student.name}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-6">
                                    {editingId === student.id ? (
                                        <input
                                            value={editForm.school}
                                            onChange={e => setEditForm({ ...editForm, school: e.target.value })}
                                            className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm w-full"
                                        />
                                    ) : (
                                        <span className="text-white/40 text-sm">{student.school}</span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-center">
                                    {editingId === student.id ? (
                                        <input
                                            type="number"
                                            value={editForm.progress}
                                            onChange={e => setEditForm({ ...editForm, progress: e.target.value })}
                                            className="bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm w-20 text-center"
                                        />
                                    ) : (
                                        <span className="text-cyan-400 font-black text-sm">{student.progress}%</span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {editingId === student.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={handleSaveEdit} className="p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"><FiSave /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-white/5 text-white rounded-lg hover:bg-white/10"><FiX /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => startEdit(student)} className="p-2 text-white/40 hover:text-white transition-colors"><FiEdit /></button>
                                            <button onClick={() => handleDelete(student.id)} className="p-2 text-white/40 hover:text-red-400 transition-colors"><FiTrash2 /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingManager;
