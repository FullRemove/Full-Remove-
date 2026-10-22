import React from 'react';
import { Shield, MessageSquare, Mail, AlertTriangle, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, openAdminModal }) => {
  const { isArabic, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top trust statement */}
      <div className="border-b border-slate-900 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/Full_Remove_Shield_Logo_6c15012a.png"
              alt="Full Remove Logo"
              className="w-12 h-12 object-contain rounded-xl shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-white font-black text-lg tracking-tight">{t('brand.name')}</p>
              <p className="text-blue-400 font-semibold text-sm">{t('brand.slogan_full')}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('submit')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.submit_cta')}
            </button>
            <a
              href="https://m.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              <span>Facebook Messenger</span>
              {isArabic ? <ArrowUpLeft className="w-3 h-3 text-slate-400" /> : <ArrowUpRight className="w-3 h-3 text-slate-400" />}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Ethos */}
          <div className="space-y-4 md:col-span-1">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {isArabic ? 'عن فول ريموف' : 'About Full Remove'}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isArabic
                ? 'خدمة مستقلة للمساعدة في حذف المحتوى غير المصرح به، الحسابات المزيفة، وحملات التشهير على منصات التواصل الاجتماعي.'
                : 'Independent online content removal and takedown assistance for individuals, public figures, and professionals facing impersonation, unauthorized media, and harassment across social media.'}
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                <span>{t('hero.pill_passwords')}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                <span>{t('hero.pill_tos')}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Removal Services */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {isArabic ? 'خدمات الحذف' : 'Removal Services'}
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('home.srv_impersonation_title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('home.srv_media_title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('home.srv_defamation_title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('home.srv_doxxing_title')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Navigation */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {isArabic ? 'إدارة الطلبات' : 'Case Management'}
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>
                <button onClick={() => onNavigate('submit')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('nav.submit')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('track')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('nav.track')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <button onClick={openAdminModal} className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-start">
                  {t('nav.admin_login')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              {isArabic ? 'الحوكمة والسياسات' : 'Legal & Governance'}
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('legal.tab_privacy')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('legal.tab_service')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer text-start">
                  {t('legal.tab_impressum')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Regulatory & Legal Limitation Disclaimer Box */}
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('footer.disclaimer_title')}</span>
          </div>
          <p className="leading-relaxed">
            {t('footer.disclaimer_text')}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FULL REMOVE. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300 transition-colors cursor-pointer">
              {t('footer.privacy_link')}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300 transition-colors cursor-pointer">
              {t('footer.terms_link')}
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('legal')} className="hover:text-slate-300 transition-colors cursor-pointer">
              {t('footer.impressum_link')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
