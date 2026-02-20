import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const initialData = {
    hero: {
        titlePrefix: "Yanvar Kubogi:",
        titleGradient: "Bond: Aql Janggi 2024",
        description: "Matematika, Ingliz Tili va Informatika Bilimlarini Sinashingiz\nSahrinda oflayn catmash va yordamchi o'zidagi onlini",
        ctaText: "Ro'yxatdan o'tish",
        ctaLink: "https://bondolympiad.uz",
        countdown: {
            days: 2,
            hours: 15,
            minutes: 4,
            seconds: 59
        }
    },
    ranking: [
        { id: 1, name: "Azizbek Karimov", school: "IDUM 4, Toshkent", progress: 98, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz" },
        { id: 2, name: "Madina Alieva", school: "Prezident Maktabi", progress: 95, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Madina" },
        { id: 3, name: "Sardor Umurzakov", school: "AL Xorazmiy", progress: 92, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor" },
        { id: 4, name: "Guli Shodiya", school: "1-Gimnaziya", progress: 89, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guli" },
        { id: 5, name: "Jasur Bahtiyorov", school: "School 21", progress: 87, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur" }
    ],
    tutorial: {
        title: "Video Qo'llanma",
        subtitle: "Sizni platformadan foydalanish qulayligi uchun maxsus tayyorlangan video-darslik. Bu yerda barcha savollaringizga javob topasiz.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    partners: [
        { id: 1, name: "Cambridge Assessment" },
        { id: 2, name: "British Council" },
        { id: 3, name: "IDP IELTS" },
        { id: 4, name: "Uzbekistan Youth Union" }
    ]
};

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('bond_content_data');
        return saved ? JSON.parse(saved) : initialData;
    });

    useEffect(() => {
        localStorage.setItem('bond_content_data', JSON.stringify(data));
    }, [data]);

    const updateHero = (newData) => {
        setData(prev => ({ ...prev, hero: { ...prev.hero, ...newData } }));
    };

    const updateRanking = (newRanking) => {
        setData(prev => ({ ...prev, ranking: newRanking }));
    };

    const updateTutorial = (newData) => {
        setData(prev => ({ ...prev, tutorial: { ...prev.tutorial, ...newData } }));
    };

    const updatePartners = (newPartners) => {
        setData(prev => ({ ...prev, partners: newPartners }));
    };

    return (
        <ContentContext.Provider value={{ data, updateHero, updateRanking, updateTutorial, updatePartners }}>
            {children}
        </ContentContext.Provider>
    );
};
