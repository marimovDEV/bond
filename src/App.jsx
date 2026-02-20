import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RankingSection from './components/RankingSection';
import HallOfFame from './components/HallOfFame';
import Partners from './components/Partners';
import Tutorial from './components/Tutorial';
import Footer from './components/Footer';

// Admin Imports (to be created)
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import HeroEditor from './admin/pages/HeroEditor';
import RankingManager from './admin/pages/RankingManager';

const LandingPage = () => (
    <>
        <Navbar />
        <main className="overflow-hidden">
            <div id="hero">
                <Hero />
            </div>

            <div id="ranking" className="section-gap">
                <RankingSection />
            </div>

            <div id="hall-of-fame" className="section-gap -mt-16">
                <HallOfFame />
            </div>

            <div id="tutorial">
                <Tutorial />
            </div>

            <div id="partners" className="section-gap -mt-16">
                <Partners />
            </div>
        </main>
        <Footer />
    </>
);

function App() {
    return (
        <ContentProvider>
            <Router>
                <div className="min-h-screen bg-[#020815] selection:bg-cyan-500/30 selection:text-white">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="hero" element={<HeroEditor />} />
                            <Route path="ranking" element={<RankingManager />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </ContentProvider>
    );
}

export default App;
