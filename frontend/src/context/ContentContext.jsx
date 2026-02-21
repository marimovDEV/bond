import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const initialData = {
    hero: {
        olympiads: [
            {
                id: 1,
                titlePrefix: "Yanvar Kubogi:",
                titleGradient: "Bond: Aql Janggi 2024",
                description: "Matematika, Ingliz Tili va Informatika Bilimlarini Sinashingiz\nSahrinda oflayn catmash va yordamchi o'zidagi onlini",
                ctaText: "Ro'yxatdan o'tish",
                ctaLink: "https://bondolympiad.uz/register/",
                heroImage: null,
                countdown: { days: 2, hours: 15, minutes: 4, seconds: 59 }
            },
            {
                id: 2,
                titlePrefix: "Navbatdagi:",
                titleGradient: "BOND Olimpiadasi",
                description: "Matematika, ingliz tili va IT fanlari sinovi.\nData school majmuasida bo'lib o'tadi.",
                ctaText: "Batafsil ma'lumot",
                ctaLink: "https://bondolympiad.uz/register/",
                heroImage: null,
                countdown: { days: 10, hours: 2, minutes: 30, seconds: 0 }
            }
        ]
    },
    ranking: [
        { id: 1, name: "Azizbek Karimov", school: "IDUM 4, Toshkent", progress: 98, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz" },
        { id: 2, name: "Madina Alieva", school: "Prezident Maktabi", progress: 95, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Madina" },
        { id: 3, name: "Sardor Umurzakov", school: "AL Xorazmiy", progress: 92, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor" },
        { id: 4, name: "Guli Shodiya", school: "1-Gimnaziya", progress: 89, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guli" },
        { id: 5, name: "Jasur Bahtiyorov", school: "School 21", progress: 87, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur" }
    ],
    hallOfFame: [
        { id: 1, titleUz: 'Yanvar Kubogi 2024', titleRu: 'Январский Кубок 2024', subUz: '1-2-sinfi talabalaridan', subRu: 'Ученики 1-2 классов', dateUz: 'DEKABR 2024', dateRu: 'ДЕКАБРЬ 2024', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop' },
        { id: 2, titleUz: 'Bond Aql Janggi', titleRu: 'Интеллектуальная Битва Bond', subUz: 'Davlat chempionati', subRu: 'Государственный чемпионат', dateUz: 'NOYABR 2024', dateRu: 'НОЯБРЬ 2024', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, titleUz: 'Respublika Olimpiadasi', titleRu: 'Республиканская Олимпиада', subUz: '3-4-sinfi talabalaridan', subRu: 'Ученики 3-4 классов', dateUz: 'OKTYABR 2024', dateRu: 'ОКТЯБРЬ 2024', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
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

const API_BASE = 'http://localhost:8000/api';

export const ContentProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const [heroRes, rankingRes, tutorialRes, partnersRes] = await Promise.all([
                fetch(`${API_BASE}/hero/`),
                fetch(`${API_BASE}/ranking/`),
                fetch(`${API_BASE}/tutorial/`),
                fetch(`${API_BASE}/partners/`)
            ]);

            const heroData = await heroRes.json();
            const rankingData = await rankingRes.json();
            const tutorialData = await tutorialRes.json();
            const partnersData = await partnersRes.json();

            setData(prev => ({
                ...prev,
                hero: {
                    olympiads: heroData.olympiads.map(o => ({
                        id: o.id,
                        titlePrefixUz: o.title_prefix_uz,
                        titlePrefixRu: o.title_prefix_ru,
                        titleGradientUz: o.title_gradient_uz,
                        titleGradientRu: o.title_gradient_ru,
                        descriptionUz: o.description_uz,
                        descriptionRu: o.description_ru,
                        ctaTextUz: o.cta_text_uz,
                        ctaTextRu: o.cta_text_ru,
                        ctaLink: o.cta_link,
                        heroImage: o.hero_image,
                        eventDate: o.event_date,
                        eventTime: o.event_time,
                        eventLocationUz: o.event_location_uz,
                        eventLocationRu: o.event_location_ru,
                        targetDate: o.target_datetime,
                    }))
                },
                ranking: rankingData.map(r => ({
                    id: r.id,
                    name: r.name,
                    school: r.school,
                    progress: r.progress,
                    avatar: r.avatar
                })),
                tutorial: {
                    ...prev.tutorial,
                    titleUz: tutorialData.title_uz,
                    titleRu: tutorialData.title_ru,
                    subtitleUz: tutorialData.subtitle_uz,
                    subtitleRu: tutorialData.subtitle_ru,
                    videoUrl: tutorialData.video_url || prev.tutorial.videoUrl,
                    thumbnail: tutorialData.thumbnail || prev.tutorial.thumbnail
                },
                partners: partnersData.map(p => ({
                    id: p.id,
                    nameUz: p.name_uz,
                    nameRu: p.name_ru,
                    website: p.website
                }))
            }));
        } catch (error) {
            console.error("Failed to fetch data from API, using initial data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // Sync non-binary data to localStorage as a cache/fallback
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('bond_content_data', JSON.stringify(data));
        }
    }, [data, isLoading]);

    const updateHero = async (newData) => {
        // Optimistic update
        setData(prev => ({ ...prev, hero: { ...prev.hero, ...newData } }));

        // In this multi-olympiad setup, newData.olympiads would be passed
        // We'd loop or handle batch updates. For now, let's keep it simple:
        // Any change triggers an attempt to sync individual items if they have IDs
        if (newData.olympiads) {
            for (const o of newData.olympiads) {
                if (o.id && typeof o.id === 'number') {
                    await fetch(`${API_BASE}/hero_items/${o.id}/`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            title_prefix_uz: o.titlePrefixUz,
                            title_prefix_ru: o.titlePrefixRu,
                            title_gradient_uz: o.titleGradientUz,
                            title_gradient_ru: o.titleGradientRu,
                            description_uz: o.descriptionUz,
                            description_ru: o.descriptionRu,
                            cta_text_uz: o.ctaTextUz,
                            cta_text_ru: o.ctaTextRu,
                            cta_link: o.ctaLink,
                            target_datetime: o.targetDate,
                            event_date: o.eventDate,
                            event_time: o.eventTime,
                            event_location_uz: o.eventLocationUz,
                            event_location_ru: o.eventLocationRu
                        })
                    });
                }
            }
        }
    };

    const updateRanking = async (newRanking) => {
        setData(prev => ({ ...prev, ranking: newRanking }));
        // Sync to backend logic could go here (e.g. bulk update or individual calls)
    };

    const updateTutorial = async (newData) => {
        setData(prev => ({ ...prev, tutorial: { ...prev.tutorial, ...newData } }));
        await fetch(`${API_BASE}/tutorial/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title_uz: newData.titleUz,
                title_ru: newData.titleRu,
                subtitle_uz: newData.subtitleUz,
                subtitle_ru: newData.subtitleRu,
                video_url: newData.videoUrl,
                thumbnail: newData.thumbnail
            })
        });
    };

    const updatePartners = async (newPartners) => {
        setData(prev => ({ ...prev, partners: newPartners }));
    };

    const updateHallOfFame = async (newCards) => {
        setData(prev => ({ ...prev, hallOfFame: newCards }));
    };

    const updateAnalytics = async (newData) => {
        setData(prev => ({ ...prev, analytics: { ...prev.analytics, ...newData } }));
    };

    return (
        <ContentContext.Provider value={{
            data,
            isLoading,
            updateHero,
            updateRanking,
            updateTutorial,
            updatePartners,
            updateHallOfFame,
            updateAnalytics,
            refreshData: fetchAllData
        }}>
            {children}
        </ContentContext.Provider>
    );
};
