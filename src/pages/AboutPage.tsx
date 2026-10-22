import React from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  EyeOff, 
  UserCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Scale
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="bg-white text-start">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-b border-slate-800 cyber-grid-dense">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold mb-4">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('about.kicker')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            {t('about.desc')}
          </p>

          <div className="mt-6 font-mono text-xs text-blue-400 font-bold tracking-wider">
            {t('brand.slogan_full')}
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
          
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              {t('about.story_title')}
            </h2>
            <p className="mb-4">
              {t('about.story_p1')}
            </p>
            <p className="mb-4">
              {t('about.story_p2')}
            </p>
            <p>
              {t('about.story_p3')}
            </p>
          </div>

          {/* Slogan Philosophy */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200">
            <h3 className="text-lg font-black text-blue-950 mb-2">
              {t('about.slogan_box_title')}
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              {t('about.slogan_box_desc')}
            </p>
          </div>

          {/* The 5 Non-Negotiable Core Ethics */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              {t('about.principles_title')}
            </h2>
            <div className="space-y-4">
              
              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t('about.p1_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('about.p1_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t('about.p2_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('about.p2_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t('about.p3_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('about.p3_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t('about.p4_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('about.p4_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t('about.p5_title')}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t('about.p5_desc')}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Legal Boundary Notice */}
          <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('about.disclosure_title')}</span>
            </div>
            <p className="leading-relaxed">
              {t('about.disclosure_desc')}
            </p>
          </div>

          {/* CTA */}
          <div className="pt-8 text-center">
            <button
              onClick={() => onNavigate('submit')}
              className="px-6 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t('nav.submit_cta')}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
