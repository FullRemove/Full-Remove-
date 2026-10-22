import React, { useState } from 'react';
import { Shield, Menu, X, Lock, CheckCircle2, UserCheck, ChevronRight, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, openAdminModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, adminLogout, customerEmail, customerLogout } = useAuth();
  const { language, setLanguage, isArabic, t } = useLanguage();

  const navLinks = [
    { id: 'services', label: t('nav.services') },
    { id: 'submit', label: t('nav.submit') },
    { id: 'track', label: t('nav.track') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      {/* Top Banner: Zero-Password Guarantee Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            <span className="font-semibold text-white">{t('brand.security_guarantee_title')}</span>
            <span className="hidden sm:inline text-slate-300">{t('brand.security_guarantee_desc')}</span>
            <span className="sm:hidden text-slate-400">{t('brand.security_guarantee_short')}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            {/* Language Selector in top bar */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors border border-slate-700/80 text-[11px] font-medium"
              title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3 h-3 text-blue-400" />
              <span>{isArabic ? 'English' : 'العربية'}</span>
            </button>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t('brand.admin_active')}
                </span>
                <button
                  onClick={() => onNavigate('admin')}
                  className="text-white hover:text-blue-400 underline underline-offset-2 ml-1"
                >
                  {t('brand.dashboard')}
                </button>
                <button
                  onClick={adminLogout}
                  className="text-slate-500 hover:text-slate-300 ml-1 text-[11px]"
                >
                  ({t('brand.exit')})
                </button>
              </div>
            ) : customerEmail ? (
              <div className="flex items-center gap-2">
                <span className="text-blue-400 flex items-center gap-1 truncate max-w-[120px]">
                  <UserCheck className="w-3.5 h-3.5 shrink-0" /> {customerEmail}
                </span>
                <button
                  onClick={() => onNavigate('track')}
                  className="text-white hover:text-blue-400 underline ml-1"
                >
                  {t('brand.my_cases')}
                </button>
                <button
                  onClick={customerLogout}
                  className="text-slate-500 hover:text-slate-300 text-[11px]"
                >
                  ({t('brand.sign_out')})
                </button>
              </div>
            ) : (
              <button
                onClick={openAdminModal}
                className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Admin Staff Access"
              >
                <Lock className="w-3 h-3 text-slate-400" /> {t('brand.admin_portal')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            
            {/* Zone 1: Brand Wordmark with Shield Logo */}
            <button
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 text-start group shrink-0 focus:outline-none cursor-pointer"
            >
              <img
                src="/assets/aistudio/Full_Remove_Shield_Logo_6c15012a.png"
                alt="Full Remove Shield Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col text-start">
                <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  {t('brand.name')}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-700 whitespace-nowrap">
                  {t('brand.subtitle')}
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                      isActive
                        ? 'text-blue-600 font-bold'
                        : 'hover:text-slate-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Language */}
            <div className="flex items-center gap-3 shrink-0">
              
              <button
                onClick={toggleLanguage}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>{isArabic ? 'English' : 'العربية'}</span>
              </button>

              <button
                onClick={() => handleLinkClick('submit')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 group cursor-pointer"
              >
                <span>{t('nav.submit_cta')}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180 mr-1 group-hover:-translate-x-0.5' : 'ml-1 group-hover:translate-x-0.5'} transition-transform`} />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
            <div className="space-y-1">
              <button
                onClick={() => handleLinkClick('home')}
                className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.home')}
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === link.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick('legal')}
                className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 'legal' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('nav.legal')}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={toggleLanguage}
                className="w-full py-2 px-3 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>{isArabic ? 'Switch to English' : 'التحويل إلى اللغة العربية'}</span>
              </button>

              <button
                onClick={() => handleLinkClick('submit')}
                className="w-full py-2.5 px-4 text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                {t('nav.submit_cta')}
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdminModal();
                }}
                className="w-full py-2 px-3 text-center text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                {t('nav.admin_login')}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
