/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { SubmitRequestPage } from './pages/SubmitRequestPage';
import { TrackRequestPage } from './pages/TrackRequestPage';
import { AboutPage } from './pages/AboutPage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'submit', 'track', 'about', 'legal', 'contact', 'admin'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [trackTargetCaseId, setTrackTargetCaseId] = useState<string>('');
  const [trackTargetEmail, setTrackTargetEmail] = useState<string>('');
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>(undefined);

  // Sync hash with currentPage
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'submit', 'track', 'about', 'legal', 'contact', 'admin'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickTrack = (caseId: string) => {
    setTrackTargetCaseId(caseId);
    navigateTo('track');
  };

  const handleCaseCreated = (caseId: string, email: string) => {
    setTrackTargetCaseId(caseId);
    setTrackTargetEmail(email);
  };

  const handleSelectServiceCategory = (categoryTitle: string) => {
    setPreselectedCategory(categoryTitle);
    navigateTo('submit');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onQuickTrack={handleQuickTrack}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectCategory={handleSelectServiceCategory}
          />
        )}

        {currentPage === 'submit' && (
          <SubmitRequestPage
            onNavigate={navigateTo}
            onCaseCreated={handleCaseCreated}
            preselectedCategory={preselectedCategory}
          />
        )}

        {currentPage === 'track' && (
          <TrackRequestPage
            onNavigate={navigateTo}
            initialCaseId={trackTargetCaseId}
            initialEmail={trackTargetEmail}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'legal' && (
          <LegalPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {currentPage === 'admin' && (
          <AdminDashboardPage
            onNavigate={navigateTo}
            openLoginModal={() => setIsAdminModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        openAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => navigateTo('admin')}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
