import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RankingSection from './components/RankingSection';
import HallOfFame from './components/HallOfFame';
import Partners from './components/Partners';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-[#020815] selection:bg-cyan-500/30 selection:text-white">
            <Navbar />
            <main className="overflow-hidden">
                <Hero />
                <div className="section-gap">
                    <RankingSection />
                </div>
                <div className="section-gap -mt-16">
                    <HallOfFame />
                </div>
                <div className="section-gap -mt-16">
                    <Partners />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
