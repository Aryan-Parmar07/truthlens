import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ParticleBackground from './components/ParticleBackground'; // Import here
import { motion, AnimatePresence } from 'framer-motion';

// Import Pages
import Verify from './pages/Verify';
import Results from './pages/Results';
import Privacy from './pages/Privacy';

const AppContent = () => {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 relative overflow-hidden">
      
      {/* 1. BACKGROUND PARTICLES */}
      <ParticleBackground />
      
      {/* 2. SUBTLE GRADIENT OVERLAY (Optional: Makes text readable) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />

      <Sidebar />
      
      <main className="ml-64 flex-1 relative z-10">
        {/* Sticky Topbar */}
        <div className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-zinc-500">
               Platform / <span className="text-white">Verification</span>
            </div>
        </div>

        {/* Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Verify />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/results/:id" element={<Results />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}