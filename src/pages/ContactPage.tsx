import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowUpLeft,
  Clock, 
  Phone,
  HelpCircle
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { useLanguage } from '../context/LanguageContext';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { isArabic, t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessageId, setSubmittedMessageId] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorNotice(isArabic ? 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.' : 'Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = StorageService.createContactMessage({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim() || (isArabic ? 'استفسار عام بشأن إزالة محتوى' : 'General Removal Inquiry'),
        message: message.trim()
      });

      setSubmittedMessageId(created.id);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorNotice(isArabic ? 'تعذر إرسال الرسالة حالياً. يرجى المحاولة لاحقاً.' : 'Unable to deliver message right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 py-12 sm:py-20 min-h-[85vh] text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 inline-block">
            {t('contact.kicker')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Direct channels and SLAs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Facebook Messenger Highlight Box */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 w-24 h-24 bg-blue-50 -z-0 ${isArabic ? 'left-0 rounded-br-full' : 'right-0 rounded-bl-full'}`}></div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {t('contact.messenger_title')}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed font-normal">
                  {t('contact.messenger_desc')}
                </p>
                <a
                  href="https://m.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
                >
                  <span>{t('contact.open_messenger')}</span>
                  {isArabic ? <ArrowUpLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                </a>
              </div>
            </div>

            {/* Response Time SLA Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-400">
                {t('contact.sla_title')}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">{isArabic ? 'الحالات الحرجة والدوكسينغ' : 'Critical Incidents & Doxxing'}</p>
                    <p className="text-slate-500 text-[11px]">{isArabic ? 'استجابة في أقل من 12 ساعة' : 'Under 12 hours response window'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">{isArabic ? 'الطلبات والاستفسارات العامة' : 'Standard Removal Inquiries'}</p>
                    <p className="text-slate-500 text-[11px]">{isArabic ? 'استجابة في أقل من 24 ساعة (طوال أيام الأسبوع)' : 'Under 24 hours Monday to Saturday'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Checklist Card */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 text-xs text-rose-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-950">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{t('contact.victim_tip_title')}</span>
              </div>
              <p className="text-[11px] text-rose-800 leading-relaxed font-normal">
                {t('contact.victim_tip_desc')}
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {t('contact.form_title')}
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-normal">
              {isArabic 
                ? 'يرجى تدوين استفسارك أدناه. جميع الاتصالات تخضع لأعلى معايير السرية والأمان.'
                : 'Fill out your message below. All inquiries are held under strict non-disclosure.'}
            </p>

            {submittedMessageId ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-950 text-base">{t('contact.msg_sent_title')}</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  {t('contact.msg_sent_desc')} <code className="font-mono font-bold">{submittedMessageId}</code>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedMessageId(null)}
                  className="px-4 py-2 bg-white text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-50 cursor-pointer"
                >
                  {isArabic ? 'إرسال استفسار آخر' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('contact.form_name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isArabic ? "اسمك الكريم" : "e.g. Rachel Adams"}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('contact.form_email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('contact.form_subject')}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isArabic ? "مثال: استفسار حول سرقة حساب إنستغرام" : "e.g. Inquiry regarding Instagram clone profile"}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('contact.form_msg')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isArabic ? "اشرح مشكلتك، الروابط المتضررة، أو استفسارك بالتفصيل..." : "Describe your situation, affected links, or general question..."}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-normal"
                  />
                </div>

                {errorNotice && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorNotice}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {t('brand.security_guarantee_short')}
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{isArabic ? 'جارٍ الإرسال...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <Send className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                        <span>{t('contact.form_send')}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
