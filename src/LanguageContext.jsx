import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('preferredLanguage') || 'tr');

    useEffect(() => {
        localStorage.setItem('preferredLanguage', lang);
    }, [lang]);

    const t = (section, key) => {
        try {
            return translations[lang][section][key] || translations['en'][section][key] || key;
        } catch (e) {
            return key;
        }
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
