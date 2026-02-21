import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    // Default to 'uz', check localStorage if a preference is saved
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('bond_lang') || 'uz';
    });

    useEffect(() => {
        localStorage.setItem('bond_lang', lang);
    }, [lang]);

    const t = (key) => {
        return translations[lang][key] || key;
    };

    const toggleLanguage = () => {
        setLang(prev => (prev === 'uz' ? 'ru' : 'uz'));
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
