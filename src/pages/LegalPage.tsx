import React, { useState } from 'react';
import { Shield, AlertTriangle, FileText, Lock, Scale, Building, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  onNavigate: (page: string) => void;
  defaultTab?: 'privacy' | 'service' | 'impressum';
}

export const LegalPage: React.FC<LegalPageProps> = ({ onNavigate, defaultTab = 'privacy' }) => {
  const { isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'privacy' | 'service' | 'impressum'>(defaultTab);

  return (
    <div className="bg-slate-50 py-12 sm:py-20 min-h-[85vh] text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 inline-block">
            {t('legal.kicker')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('legal.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('legal.desc')}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-white rounded-t-xl p-1 shadow-2xs gap-1 mb-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {t('legal.tab_privacy')}
          </button>
          <button
            onClick={() => setActiveTab('service')}
            className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'service'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {t('legal.tab_service')}
          </button>
          <button
            onClick={() => setActiveTab('impressum')}
            className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'impressum'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            {t('legal.tab_impressum')}
          </button>
        </div>

        {/* Document Content Box */}
        <div className="bg-white rounded-b-2xl border border-slate-200 shadow-sm p-6 sm:p-10 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-8 font-normal">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs uppercase tracking-wider text-blue-600 font-bold">
                  {isArabic ? 'إصدار الوثيقة 2026.1' : 'Document Version 2026.1'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {isArabic ? 'سياسة الخصوصية وتوجيهات أمان البيانات' : 'Privacy Policy & Data Security Directive'}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {isArabic ? 'سارية المفعول اعتباراً من: أكتوبر 2026 · ممارسة FULL REMOVE المستقلة' : 'Effective Date: October 2026 · Full Remove Practice'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '1. ضمانة حظر كلمات المرور المطلقة' : '1. The Full Remove Zero-Password Guarantee'}
                </h3>
                <p className="mb-2">
                  <strong>
                    {isArabic 
                      ? 'نحن لا نطلب، ولا نجمع، ولا نخزن تحت أي ظرف كلمات مرور حساباتك في شبكات التواصل الاجتماعي، أو رموز التحقق بخطوتين (2FA)، أو ملفات تعريف الارتباط للجلسات.'
                      : 'We do not collect, request, or store social media account passwords, 2-factor authentication codes, or session cookies under any circumstances.'}
                  </strong>
                </p>
                <p>
                  {isArabic
                    ? 'جميع طلبات الإزالة والتصعيد تُدار خارجياً عبر القنوات الرسمية لنزاعات وحماية البيانات بالمنصات ومكاتب الثقة والأمان. يُحظر عليك تماماً تزويد أي شخص يدعي تمثيل فول ريموف ببيانات دخولك الشخصية.'
                    : 'All takedown escalations are executed externally using official platform reporting perimeters, DMCA dispute channels, and Trust & Safety intake desks. You are strictly advised never to provide your passwords to anyone claiming to represent Full Remove.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '2. المعلومات والبيانات التي نجمعها' : '2. Information We Collect'}
                </h3>
                <p className="mb-2">
                  {isArabic
                    ? 'نجمع فقط المعلومات الضرورية لمعالجة وتوثيق طلب الإزالة وإثبات المصلحة المشروعة:'
                    : 'We collect only information necessary to compile and file your content removal claim:'}
                </p>
                <ul className="list-disc ps-5 space-y-1.5 text-xs text-slate-600">
                  <li><strong>{isArabic ? 'بيانات التواصل:' : 'Contact Details:'}</strong> {isArabic ? 'الاسم، البريد الإلكتروني، رقم الهاتف الاختياري، ومعرفات التواصل.' : 'Your name, email address, optional telephone number, and social media handle.'}</li>
                  <li><strong>{isArabic ? 'المحتوى المستهدف:' : 'Target Material:'}</strong> {isArabic ? 'روابط المنشورات، الحسابات، أو المقاطع المسيئة على المنصات.' : 'URLs of offending profiles, posts, videos, or photos on social media networks.'}</li>
                  <li><strong>{isArabic ? 'بيان الواقعة:' : 'Statement & Circumstances:'}</strong> {isArabic ? 'شرح سبب المخالفة والضرر الواقع جراء النشر.' : 'Your explanation of the violation, harassment, defamation, or copyright infringement.'}</li>
                  <li><strong>{isArabic ? 'خزينة الإثبات:' : 'Evidence Vault Items:'}</strong> {isArabic ? 'لقطات الشاشة، الوثائق الرسمية المموهة، أو الصور الأصلية لإثبات الأحقية.' : 'Screenshots, comparative original photos, or masked identity documents provided to establish standing.'}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '3. كيف تُستخدم هذه المعلومات؟' : '3. How Your Information Is Used'}
                </h3>
                <p className="mb-2">
                  {isArabic
                    ? 'تُستخدم بياناتك حصرياً لصياغة مذكرات الطعن بالانتهاك، إثبات الهوية ضد الحسابات المزيفة، وإرسال تحديثات حالة طلبك عبر البريد الإلكتروني.'
                    : 'Your information is utilized strictly to formulate formal takedown notices, verify identity against impersonators, and communicate status updates regarding your Case ID.'}
                </p>
                <p>
                  {isArabic
                    ? 'نحن لا نبيع، ولا نؤجر، ولا نشارك بيانات العملاء مع أي معلنين أو شركات تسويق خارجية على الإطلاق.'
                    : 'We never sell, rent, monetize, or disclose client information to advertisers, third-party marketing firms, or data aggregators.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '4. الحفظ والإتلاف النهائي للبيانات' : '4. Data Retention & Secure Purging'}
                </h3>
                <p>
                  {isArabic
                    ? 'يتم تخزين الملفات والمستندات الحساسة في بيئة مشفرة طوال فترة معالجة القضية. بمجرد وسم القضية بحالة "تم الحذف بنجاح" أو إغلاقها، يتم إتلاف وحذف الوثائق الحساسة نهائياً بعد مرور 30 يوماً، مع الاحتفاظ فقط ببيانات الأرشفة العامة لأغراض التوثيق.'
                    : 'Sensitive evidence files and identity documents are stored in an encrypted silo during active case management. Once a case is marked Resolved or closed, sensitive verification attachments are permanently shredded after 30 days.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICE POLICY & TERMS */}
          {activeTab === 'service' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs uppercase tracking-wider text-blue-600 font-bold">
                  {isArabic ? 'شروط وأحكام التعامل' : 'Terms of Engagement'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {isArabic ? 'سياسة الخدمة وشروط الاستعانة بمساعد الحذف' : 'Service Policy & Engagement Terms'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  FULL REMOVE Freelance Assistance Service
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong className="block mb-1 font-bold text-amber-950">
                  {isArabic ? 'تنبيه جوهري حول قرارات المنصات المستقلة:' : 'Important Notice on Platform Discretion & Outcome:'}
                </strong>
                {isArabic
                  ? 'يقوم فريق فول ريموف بمراجعة الانتهاك وصياغة المذكرات المدعومة بالأدلة ورفعها رسمياً للمنصات. ولكن بما أن شركات التواصل الاجتماعي (ميتا، تيك توك، إكس، جوجل) هي جهات حرة ذات سيادة تقنية على خوادمها، فإن فول ريموف لا يمكنها ولا تضمن بنسبة 100% أن تؤدي كل مراجعة إلى حذف المنشور.'
                  : 'Full Remove assists clients by auditing violations, compiling evidence, and submitting statutory violation notices. However, because content hosts operate as independent gatekeepers, Full Remove cannot and does not guarantee that every takedown request will result in removal.'}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '1. نطاق الخدمات الحرة المستقلة' : '1. Scope of Independent Freelance Services'}
                </h3>
                <ul className="list-disc ps-5 space-y-1 text-xs text-slate-600">
                  <li>{isArabic ? 'فحص الروابط ومطابقتها مع إرشادات المجتمع وشروط الخدمة.' : 'Reviewing client-submitted links against platform Community Standards and Terms of Service.'}</li>
                  <li>{isArabic ? 'صياغة المذكرات القانونية وإخطارات حماية الخصوصية وحقوق النشر (DMCA).' : 'Drafting and formatting structured takedown packets, DMCA notices, and Right of Publicity filings.'}</li>
                  <li>{isArabic ? 'تقديم الإخطارات عبر مكاتب الأمان ونزاعات الملكية بالمنصات.' : 'Submitting escalation packets through publicly available and specialized platform reporting desks.'}</li>
                  <li>{isArabic ? 'مراقبة الروابط وتحديث العميل بسجل زمني واضح.' : 'Monitoring URL status and maintaining client case logs.'}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '2. إقرارات ومسؤوليات العميل' : '2. Client Representations & Warranties'}
                </h3>
                <p className="mb-2">
                  {isArabic ? 'بتقديمك لهذا الطلب، فإنك تقر وتضمن ما يلي:' : 'By submitting a request, the client certifies that:'}
                </p>
                <ul className="list-disc ps-5 space-y-1 text-xs text-slate-600">
                  <li>{isArabic ? 'أنك الشخص المعني صاحب المصلحة أو ممثله القانوني المفوض.' : 'They are the authentic individual, copyright owner, or authorized representative.'}</li>
                  <li>{isArabic ? 'أن كافة الوقائع والأدلة المقدمة صحيحة وغير مصطنعة.' : 'All assertions of defamation, unauthorized publication, or impersonation are truthful.'}</li>
                  <li>{isArabic ? 'أنك لن تستخدم الخدمة لمحاولة كتم حرية الصحافة أو الآراء النقدية المشروعة.' : 'They will not use Full Remove to suppress legitimate whistleblowing or lawful reviews.'}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '3. إفصاح المدفوعات والمعاملات المالية' : '3. Payment & Billing Disclosures'}
                </h3>
                <p>
                  {isArabic
                    ? 'في هذه النسخة الأولية، يتم تقديم الفحص الأولي وتسجيل البلاغات دون أي رسوم إلكترونية مفروضة مسبقاً. لا يحتوي الموقع على بوابات دفع آلي حالياً ولا يتم خصم أي مبالغ من بطاقاتك دون اتفاق خطي منفصل.'
                    : 'As an initial preview service, basic case intake and triage auditing are provided without charge. Full Remove does not process automated credit card transactions on this site without prior written agreement.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? '4. حدود المسؤولية' : '4. Limitation of Liability'}
                </h3>
                <p>
                  {isArabic
                    ? 'لا تتحمل فول ريموف أو أي من مشغليها المستقلين أي مسؤولية قانونية عن قرارات المنصات بالرفض أو التأخير الناتج عن أعباء مراجعي تلك الشركات، أو عن الأضرار اللاحقة الناتجة عن محتوى نشره أطراف مجهولون.'
                    : 'In no event shall Full Remove, its freelance operators, or affiliates be liable for any indirect or consequential damages arising out of platform moderation decisions or delays.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: IMPRESSUM & LEGAL DISCLAIMER */}
          {activeTab === 'impressum' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs uppercase tracking-wider text-blue-600 font-bold">
                  {isArabic ? 'إشعار البيانات القانونية' : 'Statutory Notice'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {isArabic ? 'الإشعار القانوني وبيان الاستقلالية (Impressum)' : 'Impressum & Mandatory Legal Disclaimer'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isArabic ? 'معلومات الإفصاح والشفافية الرقمية وفق المعايير الدولية.' : 'Information according to international digital service transparency regulations.'}
                </p>
              </div>

              {/* Legal Limitations Box */}
              <div className="p-5 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 font-bold text-blue-400">
                  <Scale className="w-5 h-5 shrink-0" />
                  <span>{isArabic ? 'إخلاء مسؤولية حاسم بشأن الحدود القانونية' : 'Mandatory Disclaimer on Legal Limitations'}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {isArabic
                    ? 'فول ريموف (FULL REMOVE) هي خدمة حرة ومستقلة للمساعدة الإدارية والتقنية في إسقاط المحتوى وحماية الخصوصية. فول ريموف ليست مكتب محاماة، ولا توظف محامين في صفة تمثيل قانوني، ولا تقدم ترافعاً أو دفاعاً أمام المحاكم القضائية. التواصل مع فول ريموف لا يُنشئ علاقة محامٍ وموكل قانونية. إذا كانت واقعتك تستدعي مذكرات قضائية رسمية أو دعاوى تعويض مدني، يجب عليك توكيل محامٍ معتمد ومرخص في دولتك.'
                    : 'Full Remove is an independent freelance digital privacy and takedown assistance service. Full Remove is NOT a law firm, does not employ licensed practicing attorneys in a corporate firm capacity, and does not provide legal representation in courts of law. Communications with Full Remove do NOT constitute an attorney-client privileged relationship.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? 'إفصاح عدم التبعية لأي منصة تواصل اجتماعي' : 'Third-Party Platform Non-Affiliation Notice'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {isArabic
                    ? 'تؤكد فول ريموف استقلاليتها التامة عن كافة المنصات الرقمية ومواقع الاستضافة:'
                    : 'Full Remove is completely independent of all social media networks and hosting providers:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>Meta Platforms Inc.:</strong> {isArabic ? 'غير تابعة وغير معتمدة من فيسبوك أو إنستغرام أو واتساب.' : 'Not affiliated with, endorsed by, or partnered with Instagram, Facebook, or WhatsApp.'}
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>ByteDance Ltd.:</strong> {isArabic ? 'غير تابعة وغير معتمدة من منصة تيك توك.' : 'Not affiliated with, endorsed by, or partnered with TikTok.'}
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>X Corp.:</strong> {isArabic ? 'غير تابعة وغير معتمدة من منصة إكس (تويتر سابقاً).' : 'Not affiliated with, endorsed by, or partnered with X (formerly Twitter).'}
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong>Google LLC / Alphabet:</strong> {isArabic ? 'غير تابعة وغير معتمدة من يوتيوب أو محرك جوجل.' : 'Not affiliated with, endorsed by, or partnered with YouTube or Google Search.'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {isArabic ? 'بيانات الممارسة' : 'Service Identity'}
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                  <p><strong>العلامة:</strong> FULL REMOVE</p>
                  <p><strong>الشعار:</strong> "{t('brand.slogan')}"</p>
                  <p><strong>طبيعة الخدمة:</strong> {isArabic ? 'ممارسة حرة مستقلة للمساعدة في حذف المحتوى المسيء' : 'Independent Freelance Digital Takedown & Privacy Consulting'}</p>
                  <p><strong>البريد:</strong> support@fullremove.online</p>
                  <p><strong>ماسنجر:</strong> https://m.me/fullremove</p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
