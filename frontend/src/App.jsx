import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RankingSection from './components/RankingSection';
import HallOfFame from './components/HallOfFame';
import Partners from './components/Partners';
import Tutorial from './components/Tutorial';
import Footer from './components/Footer';

// Admin
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import Dashboard from './admin/pages/Dashboard';
import HeroEditor from './admin/pages/HeroEditor';
import RankingManager from './admin/pages/RankingManager';
import TutorialEditor from './admin/pages/TutorialEditor';
import PartnersManager from './admin/pages/PartnersManager';

const LandingPage = () => (
    <>
        <Navbar />
        <main className="overflow-hidden">
            <div id="hero"><Hero /></div>
            <div id="ranking" className="section-gap"><RankingSection /></div>
            <div id="hall-of-fame" className="section-gap -mt-16"><HallOfFame /></div>
            <div id="tutorial"><Tutorial /></div>
            <div id="partners" className="section-gap -mt-16"><Partners /></div>
        </main>
        <Footer />
    </>
);

function App() {
    return (
        <AuthProvider>
            <ContentProvider>
                <Router>
                    <div className="min-h-screen bg-[#020815] selection:bg-cyan-500/30 selection:text-white">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />

                            {/* Admin Login */}
                            <Route path="/admin/login" element={<AdminLogin />} />

                            {/* Protected Admin Routes */}
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <AdminLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Dashboard />} />
                                <Route path="hero" element={<HeroEditor />} />
                                <Route path="ranking" element={<RankingManager />} />
                                <Route path="tutorial" element={<TutorialEditor />} />
                                <Route path="partners" element={<PartnersManager />} />
                            </Route>

                            {/* Catch-all */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </Router>
            </ContentProvider>
        </AuthProvider>
    );
}

export default App;
