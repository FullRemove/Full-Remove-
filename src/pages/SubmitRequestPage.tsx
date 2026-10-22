import React, { useState } from 'react';
import { 
  Shield, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  HelpCircle, 
  Upload, 
  FileText,
  AlertTriangle,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { PlatformType, RemovalCategory, CasePriority } from '../types';
import { StorageService } from '../services/storage';
import { useLanguage } from '../context/LanguageContext';

interface SubmitRequestPageProps {
  onNavigate: (page: string) => void;
  onCaseCreated: (caseId: string, email: string) => void;
  preselectedCategory?: string;
}

export const SubmitRequestPage: React.FC<SubmitRequestPageProps> = ({ 
  onNavigate, 
  onCaseCreated,
  preselectedCategory 
}) => {
  const { isArabic, t } = useLanguage();

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [messengerHandle, setMessengerHandle] = useState('');
  const [platform, setPlatform] = useState<PlatformType>('Instagram');
  const [category, setCategory] = useState<RemovalCategory>(() => {
    if (preselectedCategory && (preselectedCategory.includes('Impersonation') || preselectedCategory.includes('انتحال'))) {
      return 'Impersonation & Fake Profile';
    }
    if (preselectedCategory && (preselectedCategory.includes('Photo') || preselectedCategory.includes('الصور'))) {
      return 'Unauthorized Photos / Videos';
    }
    if (preselectedCategory && (preselectedCategory.includes('Defamation') || preselectedCategory.includes('التشهير'))) {
      return 'Defamation & Slander';
    }
    if (preselectedCategory && (preselectedCategory.includes('Doxxing') || preselectedCategory.includes('الدوكسينغ') || preselectedCategory.includes('تسريب'))) {
      return 'Doxxing & Personal Data Leak';
    }
    return 'Impersonation & Fake Profile';
  });
  
  const [contentUrls, setContentUrls] = useState<string[]>(['']);
  const [reason, setReason] = useState('');
  const [evidenceDescription, setEvidenceDescription] = useState('');
  const [urgency, setUrgency] = useState<CasePriority>('Standard (48-72h)');
  const [simulatedFiles, setSimulatedFiles] = useState<string[]>([]);
  
  // Consent Checkboxes
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedNoGuarantee, setAgreedNoGuarantee] = useState(false);
  const [agreedNoPasswords, setAgreedNoPasswords] = useState(false);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // URL input management
  const handleUrlChange = (index: number, val: string) => {
    const updated = [...contentUrls];
    updated[index] = val;
    setContentUrls(updated);
  };

  const addUrlField = () => {
    if (contentUrls.length < 5) {
      setContentUrls([...contentUrls, '']);
    }
  };

  const removeUrlField = (index: number) => {
    if (contentUrls.length > 1) {
      setContentUrls(contentUrls.filter((_, i) => i !== index));
    }
  };

  // Simulated file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setSimulatedFiles([...simulatedFiles, ...names]);
    }
  };

  const removeFile = (name: string) => {
    setSimulatedFiles(simulatedFiles.filter(f => f !== name));
  };

  // Validation
  const validateForm = (): boolean => {
    if (!clientName.trim()) {
      setErrorMessage(isArabic ? 'يرجى كتابة الاسم الكامل أو اسم الجهة الرسمية.' : 'Please provide your full legal name or organization name.');
      return false;
    }
    if (!clientEmail.trim() || !clientEmail.includes('@') || !clientEmail.includes('.')) {
      setErrorMessage(isArabic ? 'يرجى كتابة بريد إلكتروني صحيح لتلقي إشعارات القضية.' : 'Please provide a valid email address so we can send your case updates.');
      return false;
    }
    const cleanUrls = contentUrls.filter(u => u.trim() !== '');
    if (cleanUrls.length === 0) {
      setErrorMessage(isArabic ? 'يرجى إضافة رابط واحد على الأقل للمحتوى أو الحساب المسيء.' : 'Please provide at least one valid link or URL to the offending content.');
      return false;
    }
    if (!reason.trim() || reason.trim().length < 20) {
      setErrorMessage(isArabic ? 'يرجى كتابة شرح للواقعة (لا يقل عن 20 حرفاً).' : 'Please provide a description of the issue (at least 20 characters).');
      return false;
    }
    if (!agreedToTerms || !agreedNoGuarantee || !agreedNoPasswords) {
      setErrorMessage(isArabic ? 'يرجى الموافقة على جميع الإقرارات الإلزامية أسفل النموذج.' : 'Please review and check all mandatory confirmation boxes.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const cleanUrls = contentUrls.filter(u => u.trim() !== '');
      const createdCase = StorageService.createCase({
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim().toLowerCase(),
        clientPhone: clientPhone.trim() || undefined,
        messengerHandle: messengerHandle.trim() || undefined,
        platform,
        category,
        contentUrls: cleanUrls,
        reason: reason.trim(),
        evidenceDescription: evidenceDescription.trim() || (isArabic ? 'تم تقديم الروابط والبيان الأولي من قبل العميل.' : 'Direct links and initial statement provided by client.'),
        evidenceFileNames: simulatedFiles.length > 0 ? simulatedFiles : undefined,
        urgency,
        publicNotes: isArabic 
          ? 'تم تسجيل القضية بنجاح في جدول الاستقبال، وجارٍ فحص البلاغ والأدلة من قبل خبير الإزالة.'
          : 'Request successfully logged. An escalation specialist has been notified and is beginning initial review.'
      });

      setSubmissionSuccess(createdCase.id);
      onCaseCreated(createdCase.id, createdCase.clientEmail);
    } catch {
      setErrorMessage(isArabic ? 'حدث خطأ أثناء حفظ طلبك. يرجى المحاولة مرة أخرى.' : 'An unexpected error occurred while saving your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (submissionSuccess) {
      navigator.clipboard.writeText(submissionSuccess);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // SUCCESS STATE VIEW
  if (submissionSuccess) {
    return (
      <div className="bg-slate-50 py-16 sm:py-24 min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center relative overflow-hidden">
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {t('submit.success_title')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-3">
            {isArabic ? 'تم استلام وتوثيق طلبك بنجاح' : 'Takedown Request Submitted'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6 font-normal">
            {t('submit.success_desc')}
          </p>

          {/* Case ID Box */}
          <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="text-start">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t('submit.case_id_label')}</p>
              <p className="text-2xl font-black font-mono tracking-wider text-blue-400 mt-0.5">{submissionSuccess}</p>
            </div>
            <button
              onClick={handleCopyId}
              className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-700 text-slate-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('submit.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t('submit.copy_id')}</span>
                </>
              )}
            </button>
          </div>

          {/* Details summary */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-start text-xs space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-slate-500">{isArabic ? 'المنصة المستهدفة:' : 'Platform:'}</span>
              <span className="font-bold text-slate-800">{platform}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isArabic ? 'نوع المخالفة:' : 'Category:'}</span>
              <span className="font-bold text-slate-800">{category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isArabic ? 'البريد المسجل:' : 'Contact Email:'}</span>
              <span className="font-bold text-slate-800 font-mono">{clientEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isArabic ? 'درجة الأولوية:' : 'Urgency Level:'}</span>
              <span className="font-bold text-slate-800">{urgency}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('track')}
              className="flex-1 py-3 px-5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('submit.track_now_btn')}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setSubmissionSuccess(null);
                setClientName('');
                setClientEmail('');
                setContentUrls(['']);
                setReason('');
                setEvidenceDescription('');
                setSimulatedFiles([]);
              }}
              className="py-3 px-4 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              {t('submit.submit_another')}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <div className="bg-slate-50 py-12 sm:py-20 text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Lockup */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 inline-block">
            {t('submit.kicker')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('submit.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('submit.desc')}
          </p>
        </div>

        {/* Security / No Password Banner */}
        <div className="mb-8 bg-blue-50/80 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-2xs">
          <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 leading-relaxed">
            <p className="font-bold text-sm text-blue-950 mb-0.5">{t('brand.security_guarantee_title')}</p>
            {t('brand.security_guarantee_desc')}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Contact Information */}
          <div>
            <div className="border-b border-slate-100 pb-3 mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">1</span>
                {t('submit.sec1_title')}
              </h3>
              <p className="text-xs text-slate-500 mt-1 ms-8">
                {t('submit.sec1_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.name_label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isArabic ? "مثال: أحمد عبد الله" : "e.g. Alexander Vance"}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.email_label')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.phone_label')}
                </label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+964 750 ... / +966 50 ..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.messenger_label')}
                </label>
                <input
                  type="text"
                  value={messengerHandle}
                  onChange={(e) => setMessengerHandle(e.target.value)}
                  placeholder="@handle"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Platform & Violation Category */}
          <div>
            <div className="border-b border-slate-100 pb-3 mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">2</span>
                {t('submit.sec2_title')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.platform_label')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PlatformType)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Reddit">Reddit</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Other">{isArabic ? 'منصة أخرى' : 'Other Platform'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.category_label')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as RemovalCategory)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                >
                  <option value="Impersonation & Fake Profile">{isArabic ? 'انتحال شخصية وحساب مزيف' : 'Impersonation & Fake Profile'}</option>
                  <option value="Unauthorized Photos / Videos">{isArabic ? 'صور أو مقاطع فيديو غير مصرح بها' : 'Unauthorized Photos / Videos'}</option>
                  <option value="Defamation & Slander">{isArabic ? 'تشهير وقذف وإساءة سمعة' : 'Defamation & Slander'}</option>
                  <option value="Harassment & Bullying">{isArabic ? 'تحرش ومضايقة إلكترونية' : 'Harassment & Bullying'}</option>
                  <option value="Copyright & Intellectual Property">{isArabic ? 'حقوق ملكية فكرية ونشر' : 'Copyright & Intellectual Property'}</option>
                  <option value="Doxxing & Personal Data Leak">{isArabic ? 'تسريب بيانات خاصة (دوكسينغ)' : 'Doxxing & Personal Data Leak'}</option>
                  <option value="Other">{isArabic ? 'مخالفة أخرى لسياسات المنصة' : 'Other Policy Violation'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('submit.urgency_label')} <span className="text-red-500">*</span>
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as CasePriority)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                >
                  <option value="Standard (48-72h)">{t('submit.urgency_std')}</option>
                  <option value="High Priority (24-48h)">{t('submit.urgency_high')}</option>
                  <option value="Critical Incident (<24h)">{t('submit.urgency_crit')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: URLs & Evidence */}
          <div>
            <div className="border-b border-slate-100 pb-3 mb-5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">3</span>
                {t('submit.sec3_title')}
              </h3>
            </div>

            {/* URL Inputs */}
            <div className="space-y-2 mb-4">
              <label className="block text-xs font-bold text-slate-700">
                {t('submit.urls_label')} <span className="text-red-500">*</span>
              </label>
              {contentUrls.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => handleUrlChange(idx, e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    dir="ltr"
                    className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-slate-900 text-left"
                  />
                  {contentUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUrlField(idx)}
                      className="p-2.5 text-slate-400 hover:text-red-600 rounded-lg border border-slate-200 hover:bg-red-50 cursor-pointer"
                      title="Remove URL"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {contentUrls.length < 5 && (
                <button
                  type="button"
                  onClick={addUrlField}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 mt-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> {t('submit.add_url')}
                </button>
              )}
            </div>

            {/* Reason Description */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('submit.reason_label')} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t('submit.reason_placeholder')}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-normal"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t('submit.reason_hint')}
              </p>
            </div>

            {/* Evidence details */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('submit.evidence_desc_label')}
              </label>
              <textarea
                rows={3}
                value={evidenceDescription}
                onChange={(e) => setEvidenceDescription(e.target.value)}
                placeholder={t('submit.evidence_desc_placeholder')}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-normal"
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t('submit.files_label')}
              </label>
              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 text-center hover:bg-slate-100/70 transition-colors">
                <input
                  type="file"
                  multiple
                  id="evidence-file-input"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.zip,.txt"
                />
                <label
                  htmlFor="evidence-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-xs font-bold text-blue-600 hover:underline">
                    {t('submit.files_browse')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('submit.files_types')}
                  </span>
                </label>
              </div>

              {simulatedFiles.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  {simulatedFiles.map((name, i) => (
                    <div key={i} className="flex items-center justify-between bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
                      <span className="font-mono text-slate-700 truncate">{name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(name)}
                        className="text-slate-400 hover:text-red-500 p-0.5 ml-2 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Section 4: Mandatory Declarations */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t('submit.sec4_title')}
            </h4>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedNoPasswords}
                onChange={(e) => setAgreedNoPasswords(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="leading-relaxed">
                {t('submit.check_passwords')}
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedNoGuarantee}
                onChange={(e) => setAgreedNoGuarantee(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="leading-relaxed">
                {t('submit.check_no_guarantee')}
              </span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="leading-relaxed">
                {t('submit.check_terms')}
              </span>
            </label>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              {t('brand.name')}: <span className="text-slate-800 font-bold">{t('brand.slogan_full')}</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{t('submit.submitting')}</span>
                </>
              ) : (
                <>
                  <Send className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                  <span>{t('submit.submit_btn')}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
