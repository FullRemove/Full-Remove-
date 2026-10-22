import React, { useState } from 'react';
import { 
  Shield, 
  UserX, 
  EyeOff, 
  FileWarning, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  HelpCircle,
  FileText,
  Lock,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectCategory }) => {
  const { isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'impersonation' | 'media' | 'defamation' | 'doxxing'>('all');

  const services = [
    {
      id: 'impersonation',
      icon: UserX,
      title: t('home.srv_impersonation_title'),
      badge: isArabic ? 'أولوية متكررة' : 'High Frequency',
      subtitle: isArabic 
        ? 'مساعدة شاملة لإلغاء الحسابات المستنسخة وسرقة الهوية والصفحات الوهمية.'
        : 'Complete removal assistance for cloned accounts, name-stealing, and unauthorized fan or parody pages masquerading as you.',
      overview: isArabic
        ? 'يقوم منتحلو الهوية بنسخ صورك الشخصية، نسخ سيرتك الذاتية، ومراسلة متابعيك وزملائك لطلب أموال أو تشويه سمعتك. نقوم بصياغة إقرار هوية رسمي مدعوم بالوثائق يثبت أولويتك وملكيتك الحصرية للاسم والصورة أمام لجان المراجعة.'
        : 'Impersonators often duplicate your profile pictures, scrape your recent captions, and send malicious direct messages to your contacts, coworkers, or followers. We formulate an expedited identity verification packet that demonstrates primary ownership to the platform moderation teams.',
      applicablePlatforms: ['Instagram', 'Facebook', 'TikTok', 'X (Twitter)', 'LinkedIn'],
      typicalTimeline: isArabic ? '24 إلى 48 ساعة' : '24 to 48 Hours',
      whatWeNeed: isArabic ? [
        'الرابط المباشر للحساب أو الحسابات المزيفة',
        'الرابط المباشر لحسابك الأصلي الحقيقي',
        'إثبات شخصية موثق (بطاقة هوية مموهة أو سجل تجاري/علامة)',
        'لقطات شاشة توضح الرسائل الاحتيالية الموجهة للغير'
      ] : [
        'Direct link to the impersonating account(s)',
        'Direct link to your authentic original profile',
        'Clear proof of identity (masked government ID or trademark registration)',
        'Screenshots of fraudulent activities or DMs sent to third parties'
      ],
      legalBasis: isArabic
        ? 'سياسات حظر انتحال الهوية بالمنصات، حماية حق الصورة والشهرة، مكافحة الاحتيال وانتحال الشخصية.'
        : 'Platform Impersonation Policies, Right of Publicity, Trademark Infringement, and Fraud / Identity Theft regulations.'
    },
    {
      id: 'media',
      icon: EyeOff,
      title: t('home.srv_media_title'),
      badge: isArabic ? 'أولوية خصوصية قصوى' : 'Privacy Priority',
      subtitle: isArabic
        ? 'حذف المقاطع المسربة دون موافقة، الصور الملتقطة في أماكن خاصة، والتسجيلات السرية.'
        : 'Takedown assistance for non-consensual imagery, intimate leaks, hidden camera recordings, and private residence photographs.',
      overview: isArabic
        ? 'عندما تُنشر مواد خاصة دون موافقة صاحبها، فإن الضرر النفسي والمعنوي يكون جسيماً. نقوم بتفعيل مسارات الحذف الفوري تحت بروتوكولات حظر المحتوى غير الرضائي (NCII) وقوانين الخصوصية الرقمية الصارمة.'
        : 'When private media is published without consent, victims suffer immense distress. We prioritize non-consensual media escalation under strict privacy violation clauses and statutory digital copyright frameworks.',
      applicablePlatforms: ['Instagram', 'Facebook', 'TikTok', 'X (Twitter)', 'Reddit', 'Telegram', 'YouTube'],
      typicalTimeline: isArabic ? '12 إلى 36 ساعة (مسار طوارئ)' : '12 to 36 Hours (Emergency queue)',
      whatWeNeed: isArabic ? [
        'الروابط المباشرة للمنشورات أو المقاطع المسربة',
        'تأكيد أنك الشخص الظاهر في المادة أو مالكها القانوني',
        'إقرار بعدم الموافقة على النشر أو بيان يثبت خصوصية المكان'
      ] : [
        'Direct URLs of the offending posts, videos, or forum threads',
        'Confirmation that you are the subject or creator of the media',
        'Declaration of non-consent or evidence demonstrating the private nature of the setting'
      ],
      legalBasis: isArabic
        ? 'بروتوكولات مكافحة نشر الصور الحميمية دون رضا، إخطارات الألفية لحماية حقوق الملكية (DMCA)، وسياسات الخصوصية الدولية.'
        : 'Non-Consensual Imagery (NCII) Protocols, DMCA Copyright Rights, Platform Privacy Directives, and GDPR / State Privacy Statutes.'
    },
    {
      id: 'defamation',
      icon: FileWarning,
      title: t('home.srv_defamation_title'),
      badge: isArabic ? 'حماية السمعة' : 'Reputational Defense',
      subtitle: isArabic
        ? 'مواجهة الادعاءات الكاذبة المثبت بطلانها، وحملات التشويه الممنهجة ضد الأفراد والشركات.'
        : 'Assistance tackling provably false statements of fact, manufactured controversy, and coordinated smear campaigns.',
      overview: isArabic
        ? 'التشهير الرقمي قد يدمر مسيرة مهنية أو عملاً تجارياً بنته سنوات. رغم أن المنصات لا تقوم بدور القضاء، إلا أنها تتدخل بحزم عندما تُثبت المذكرة أن المحتوى يخترق قواعد مناهضة التحرش، والمضايقة، ونشر وثائق مفبركة عمداً.'
        : 'Online defamation can ruin careers, relationships, and commercial enterprises. While platforms generally do not act as fact-checkers, they will act when defamatory content violates their harassment policies, terms of service, or when supported by evidence of intentional deception.',
      applicablePlatforms: ['TikTok', 'YouTube', 'Reddit', 'Facebook Groups', 'Google Reviews'],
      typicalTimeline: isArabic ? '48 إلى 96 ساعة' : '48 to 96 Hours',
      whatWeNeed: isArabic ? [
        'الروابط المباشرة للمنشورات أو المقاطع التشهيرية',
        'تحديد التوقيت الدقيق بالمقطع أو الاقتباس المتضمن للافتراء',
        'أدلة ملموسة تثبت تزييف الادعاءات أو تزوير المستندات'
      ] : [
        'Direct URLs of the defamatory posts or videos',
        'Specific timestamps or quotes containing false assertions of fact',
        'Documentary evidence proving the statements are fabricated or altered'
      ],
      legalBasis: isArabic
        ? 'معايير حظر المضايقة والتحرش بالمنصات، إرشادات مكافحة التضليل المتعمد، وقواعد النزاهة الرقمية.'
        : 'Terms of Service Harassment Standards, Community Defamation Inquiries, False Representation Rules.'
    },
    {
      id: 'doxxing',
      icon: AlertOctagon,
      title: t('home.srv_doxxing_title'),
      badge: isArabic ? 'طوارئ أمنية حرجة' : 'Critical Emergency',
      subtitle: isArabic
        ? 'تدخل فوري عند تسريب عناوين السكن، أرقام الهواتف الشخصية، أو وثائق الهوية الوطنية.'
        : 'Rapid mitigation when bad actors leak home addresses, phone numbers, identity documents, or workplace locations.',
      overview: isArabic
        ? 'تسريب البيانات الحساسة (الدوكسينغ) يمثل تهديداً مباشراً للسلامة الجسدية والعائلية. نستخدم قنوات الإبلاغ عن المخاطر الوشيكة بالمنصات للمطالبة بحجب التغريدة أو المنشور ومسح البيانات فوراً.'
        : 'Doxxing poses immediate physical and psychological safety risks. We utilize specialized trust and safety safety conduits to demand immediate emergency redaction and post suppression.',
      applicablePlatforms: ['X (Twitter)', 'Reddit', 'Telegram', 'Facebook', 'Instagram'],
      typicalTimeline: isArabic ? '6 إلى 24 ساعة (أولوية عاجلة)' : '6 to 24 Hours (Urgent Priority)',
      whatWeNeed: isArabic ? [
        'روابط المنشورات المتضمنة لمعلوماتك وبياناتك الخاصة',
        'توضيح مقتضب حول سياق التهديد أو التحرش الناتج عن التسريب'
      ] : [
        'URLs to the specific posts, tweets, or messages containing your PII',
        'Brief context regarding the threat or harassment situation'
      ],
      legalBasis: isArabic
        ? 'بنود حماية السلامة العامة الطارئة، معايير مكافحة الدوكسينغ، وسياسات حماية البيانات الشخصية الصارمة.'
        : 'Emergency Public Safety Clauses, Anti-Doxxing Community Rules, PII Protection Policies.'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(s => s.id === activeTab);

  const handleStartService = (serviceTitle: string) => {
    if (onSelectCategory) {
      onSelectCategory(serviceTitle);
    }
    onNavigate('submit');
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 border-b border-slate-800 cyber-grid-dense">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 inline-block">
            {t('services.header_kicker')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {t('services.header_title')}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {t('services.header_desc')}
          </p>
          
          {/* Slogan */}
          <div className="mt-6 inline-block py-1.5 px-4 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold">
            {t('brand.slogan_full')}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-slate-200 bg-slate-50 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t('services.filter_all')}
            </button>
            <button
              onClick={() => setActiveTab('impersonation')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'impersonation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t('services.filter_impersonation')}
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t('services.filter_media')}
            </button>
            <button
              onClick={() => setActiveTab('defamation')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'defamation'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t('services.filter_defamation')}
            </button>
            <button
              onClick={() => setActiveTab('doxxing')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'doxxing'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t('services.filter_doxxing')}
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Service Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow text-start"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                          {service.title}
                        </h2>
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleStartService(service.title)}
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t('services.btn_request_this')}</span>
                      {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Service Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                  {/* Description & Legal basis */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {t('services.detailed_desc')}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                        {service.overview}
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <h5 className="font-bold text-slate-800 mb-1">{t('services.legal_basis')}</h5>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {service.legalBasis}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        {t('services.supported_platforms')}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {service.applicablePlatforms.map((p) => (
                          <span
                            key={p}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Requirements & Timelines */}
                  <div className="lg:col-span-5 bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-blue-600" /> {t('services.expected_window')}
                        </span>
                        <span className="font-black text-blue-700 font-mono">
                          {service.typicalTimeline}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {t('services.window_note')}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <h5 className="text-xs font-bold text-slate-800 mb-2">
                        {t('services.required_from_you')}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {service.whatWeNeed.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-[11px] text-slate-400 font-medium">
                        {t('services.reminder_no_pass')}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* What We Do vs What We NEVER Do */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200 text-start">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('services.boundaries_title')}
            </h2>
            <p className="text-xs text-slate-600 mt-2 font-normal">
              {t('services.boundaries_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* What We Do */}
            <div className="bg-white p-7 rounded-2xl border border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-emerald-700 font-black text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t('services.what_we_do_title')}</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 font-normal">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_do_1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_do_2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_do_3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_do_4')}</span>
                </li>
              </ul>
            </div>

            {/* What We NEVER Do */}
            <div className="bg-white p-7 rounded-2xl border border-rose-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-rose-700 font-black text-base">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{t('services.what_we_never_title')}</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 font-normal">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_never_1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_never_2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_never_3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{t('services.what_we_never_4')}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-14 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {t('faq.cta_ready')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6">
            {t('faq.cta_sub')}
          </p>
          <button
            onClick={() => onNavigate('submit')}
            className="px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            {t('nav.submit_cta')}
          </button>
        </div>
      </section>

    </div>
  );
};
