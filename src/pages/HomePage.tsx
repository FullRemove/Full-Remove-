import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Search, 
  UserX, 
  FileWarning, 
  EyeOff, 
  AlertOctagon, 
  Lock, 
  ExternalLink, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onQuickTrack: (caseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickTrack }) => {
  const { isArabic, t } = useLanguage();
  const [trackInput, setTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onQuickTrack(trackInput.trim());
    } else {
      onNavigate('track');
    }
  };

  const capabilities = [
    {
      icon: UserX,
      title: t('home.srv_impersonation_title'),
      description: t('home.srv_impersonation_desc'),
      stats: t('home.srv_impersonation_stat')
    },
    {
      icon: EyeOff,
      title: t('home.srv_media_title'),
      description: t('home.srv_media_desc'),
      stats: t('home.srv_media_stat')
    },
    {
      icon: FileWarning,
      title: t('home.srv_defamation_title'),
      description: t('home.srv_defamation_desc'),
      stats: t('home.srv_defamation_stat')
    },
    {
      icon: AlertOctagon,
      title: t('home.srv_doxxing_title'),
      description: t('home.srv_doxxing_desc'),
      stats: t('home.srv_doxxing_stat')
    }
  ];

  const steps = [
    {
      num: '01',
      title: t('process.step1_title'),
      description: t('process.step1_desc')
    },
    {
      num: '02',
      title: t('process.step2_title'),
      description: t('process.step2_desc')
    },
    {
      num: '03',
      title: t('process.step3_title'),
      description: t('process.step3_desc')
    },
    {
      num: '04',
      title: t('process.step4_title'),
      description: t('process.step4_desc')
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 cyber-grid border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              
              {/* Slogan Pill / Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{t('brand.name')}</span>
                <span aria-hidden="true" className="text-blue-300">·</span>
                <span className="text-slate-800 font-semibold">{t('brand.slogan_full')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight lg:leading-[1.18]">
                {t('hero.title_start')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500">
                  {t('hero.title_gradient')}
                </span>
              </h1>

              {/* Body prose */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('hero.desc')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('submit')}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{t('hero.cta_submit')}</span>
                  {isArabic ? (
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                <button
                  onClick={() => onNavigate('track')}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span>{t('hero.cta_track')}</span>
                </button>
              </div>

              {/* Zero Password Security Promise */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('hero.pill_passwords')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('hero.pill_confidential')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('hero.pill_tos')}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Shield Card + Quick Track */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 relative">
                
                {/* Shield Icon Top Lockup */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <img
                    src="/assets/aistudio/Full_Remove_Shield_Logo_6c15012a.png"
                    alt="Full Remove Logo"
                    className="w-16 h-16 object-contain rounded-2xl shadow-sm shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-black text-slate-900">{t('brand.name')}</h3>
                    <p className="text-xs text-blue-600 font-bold">{t('hero.track_title')}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{t('hero.track_subtitle')}</p>
                  </div>
                </div>

                {/* Instant Track Form */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('hero.track_label')}
                  </label>
                  <form onSubmit={handleTrackSubmit} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={trackInput}
                        onChange={(e) => setTrackInput(e.target.value)}
                        placeholder={t('hero.track_placeholder')}
                        className={`w-full py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono uppercase ${
                          isArabic ? 'pr-8 pl-3' : 'pl-8 pr-3'
                        }`}
                      />
                      <Search className={`w-3.5 h-3.5 text-slate-400 absolute top-2.5 ${isArabic ? 'right-2.5' : 'left-2.5'}`} />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {t('hero.track_btn')}
                    </button>
                  </form>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{t('hero.track_demo')}</span>
                    <button
                      type="button"
                      onClick={() => setTrackInput('FR-2026-8842')}
                      className="text-blue-600 hover:underline font-mono"
                    >
                      FR-2026-8842
                    </button>
                  </div>
                </div>

                {/* Quick Trust Highlights */}
                <div className="space-y-3 bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs">
                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">{t('hero.trust_no_false_title')}</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{t('hero.trust_no_false_desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">{t('hero.trust_discretion_title')}</p>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{t('hero.trust_discretion_desc')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    onClick={() => onNavigate('services')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>{t('hero.explore_services')}</span>
                    {isArabic ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Platforms Supported Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            {t('strip.title')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-700 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-500"></span> Instagram</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Facebook</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-black"></span> TikTok</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-900"></span> X (Twitter)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600"></span> YouTube</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Reddit</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-700"></span> LinkedIn</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Telegram</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-wider text-blue-600 font-bold mb-2">
              {t('home.services_kicker')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t('home.services_title')}
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              {t('home.services_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{item.stats}</span>
                    <button
                      onClick={() => onNavigate('submit')}
                      className="text-blue-600 font-bold group-hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t('nav.submit')}</span>
                      {isArabic ? (
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <span>{t('home.view_all_services')}</span>
              {isArabic ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

      {/* The 4-Step Process Section */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl mb-16 text-start">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">
              {t('process.kicker')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-2 text-white">
              {t('process.title')}
            </h2>
            <p className="mt-3 text-slate-400 text-base leading-relaxed">
              {t('process.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between text-start">
                <div>
                  <span className="text-2xl font-black text-blue-400 font-mono">{step.num}</span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{t('process.standard_proc')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Slogan Banner Inside Process */}
          <div className="mt-16 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-slate-900 border border-blue-500/30 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {t('process.banner_kicker')}
              </p>
              <h3 className="text-2xl font-black text-white mt-1">
                {t('process.banner_title')}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                {t('process.banner_desc')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('submit')}
              className="px-6 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-blue-50 rounded-xl transition-all whitespace-nowrap shadow-md cursor-pointer"
            >
              {t('process.banner_btn')}
            </button>
          </div>

        </div>
      </section>

      {/* Realistic Real-World Scenarios */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              {t('scenarios.kicker')}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('scenarios.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                {t('scenarios.c1_tag')}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">
                {t('scenarios.c1_title')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t('scenarios.c1_desc')}
              </p>
              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>{isArabic ? 'وقت الحل:' : 'Resolution time:'}</span>
                <span className="font-bold text-slate-800">{t('scenarios.c1_res')}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                {t('scenarios.c2_tag')}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">
                {t('scenarios.c2_title')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t('scenarios.c2_desc')}
              </p>
              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>{isArabic ? 'وقت الحل:' : 'Resolution time:'}</span>
                <span className="font-bold text-slate-800">{t('scenarios.c2_res')}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                {t('scenarios.c3_tag')}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-3 mb-2">
                {t('scenarios.c3_title')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t('scenarios.c3_desc')}
              </p>
              <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>{isArabic ? 'وقت الحل:' : 'Resolution time:'}</span>
                <span className="font-bold text-slate-800">{t('scenarios.c3_res')}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ & CTA section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('faq.title')}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {t('faq.desc')}
            </p>
          </div>

          <div className="space-y-4 text-start">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                {t('faq.q1')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('faq.a1')}
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                {t('faq.q2')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('faq.a2')}
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                {t('faq.q3')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('faq.a3')}
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                {t('faq.q4')}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('faq.a4')}
              </p>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center shadow-lg">
            <h3 className="text-2xl font-black">{t('faq.cta_ready')}</h3>
            <p className="text-xs text-blue-100 max-w-xl mx-auto mt-2 mb-6 leading-relaxed">
              {t('faq.cta_sub')}
            </p>
            <button
              onClick={() => onNavigate('submit')}
              className="px-6 py-3 bg-white text-blue-700 font-bold text-xs rounded-xl shadow-md hover:bg-blue-50 transition-colors cursor-pointer"
            >
              {t('faq.cta_btn')}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
