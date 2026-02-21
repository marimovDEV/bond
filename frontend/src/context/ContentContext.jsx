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
        heroImage: null, // base64 or URL
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
    hallOfFame: [
        { id: 1, title: 'Yanvar Kubogi 2024', sub: '1-2-sinfi talabalaridan', date: 'DECEMBER 2024', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop' },
        { id: 2, title: 'Bond Aql Janggi', sub: 'Davlat chempionati', date: 'NOVEMBER 2024', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Respublika Olimpiadasi', sub: '3-4-sinfi talabalaridan', date: 'OCTOBER 2024', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
    ],
    analytics: {
        progressPercent: 33.3,
        progressLabel: 'Shahar Ligasi',
        stats: [
            { label: 'Reytingda', val: '#12' },
            { label: 'Topshiriqlar', val: '89/120' },
            { label: "O'quvchilar", val: '1,247' },
            { label: 'Dars Holati', val: '247' },
        ]
    },
    tutorial: {
        title: "Video Qo'llanma",
        subtitle: "Sizni platformadan foydalanish qulayligi uchun maxsus tayyorlangan video-darslik. Bu yerda barcha savollaringizga javob topasiz.",
        videoUrl: "/videos/IMG_8936.MOV",         // Updated default video
        videoBase64: null,
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    partners: [
        { id: 1, name: "Cambridge Assessment", website: "" },
        { id: 2, name: "British Council", website: "" },
        { id: 3, name: "IDP IELTS", website: "" },
        { id: 4, name: "Uzbekistan Youth Union", website: "" }
    ]
};

// Separate storage for large binary data (images/videos) to avoid JSON size limits
const getBinaryData = () => {
    try {
        return {
            heroImage: localStorage.getItem('bond_hero_image') || null,
            videoBase64: localStorage.getItem('bond_tutorial_video') || null,
        };
    } catch {
        return { heroImage: null, videoBase64: null };
    }
};

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('bond_content_data');
            const base = saved ? JSON.parse(saved) : initialData;
            const binary = getBinaryData();
            // Deep merge: always use initialData as default so no field is ever undefined
            return {
                ...initialData,
                ...base,
                hero: { ...initialData.hero, ...base.hero, heroImage: binary.heroImage },
                analytics: {
                    ...initialData.analytics,
                    ...(base.analytics || {}),
                    stats: Array.isArray(base.analytics?.stats) ? base.analytics.stats : initialData.analytics.stats,
                },
                hallOfFame: Array.isArray(base.hallOfFame) ? base.hallOfFame : initialData.hallOfFame,
                ranking: Array.isArray(base.ranking) ? base.ranking : initialData.ranking,
                partners: Array.isArray(base.partners) ? base.partners : initialData.partners,
                tutorial: {
                    ...initialData.tutorial,
                    ...(base.tutorial || {}),
                    // Force new default video if saved one is empty or still a YouTube link
                    videoUrl: (base.tutorial?.videoUrl && !base.tutorial.videoUrl.includes('youtube'))
                        ? base.tutorial.videoUrl
                        : initialData.tutorial.videoUrl,
                    videoBase64: binary.videoBase64
                },
            };
        } catch {
            return initialData;
        }
    });

    useEffect(() => {
        // Save non-binary data
        const toStore = {
            ...data,
            hero: { ...data.hero, heroImage: null },
            tutorial: { ...data.tutorial, videoBase64: null }
        };
        localStorage.setItem('bond_content_data', JSON.stringify(toStore));

        // Save binary separately
        if (data.hero.heroImage) {
            localStorage.setItem('bond_hero_image', data.hero.heroImage);
        }
        if (data.tutorial.videoBase64) {
            localStorage.setItem('bond_tutorial_video', data.tutorial.videoBase64);
        }
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

    const updateHallOfFame = (newCards) => {
        setData(prev => ({ ...prev, hallOfFame: newCards }));
    };

    const updateAnalytics = (newData) => {
        setData(prev => ({ ...prev, analytics: { ...prev.analytics, ...newData } }));
    };

    return (
        <ContentContext.Provider value={{ data, updateHero, updateRanking, updateTutorial, updatePartners, updateHallOfFame, updateAnalytics }}>
            {children}
        </ContentContext.Provider>
    );
};
