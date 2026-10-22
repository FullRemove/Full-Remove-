import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Shield, 
  CheckCircle2, 
  Clock, 
  Send, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  ArrowRight, 
  ArrowLeft,
  FileText, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { CaseRequest, CaseStatus } from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface TrackRequestPageProps {
  onNavigate: (page: string) => void;
  initialCaseId?: string;
  initialEmail?: string;
}

export const TrackRequestPage: React.FC<TrackRequestPageProps> = ({ 
  onNavigate, 
  initialCaseId = '', 
  initialEmail = '' 
}) => {
  const { isArabic, t } = useLanguage();
  const { customerEmail, customerLogin } = useAuth();

  const [searchCaseId, setSearchCaseId] = useState(initialCaseId);
  const [searchEmail, setSearchEmail] = useState(initialEmail || customerEmail || '');
  const [activeCase, setActiveCase] = useState<CaseRequest | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // If customer is logged in, show all their submitted cases
  const [userCases, setUserCases] = useState<CaseRequest[]>([]);

  const loadCustomerCases = () => {
    if (customerEmail) {
      const all = StorageService.getAllCases();
      const myCases = all.filter(c => c.clientEmail.toLowerCase() === customerEmail.toLowerCase());
      setUserCases(myCases);
    }
  };

  useEffect(() => {
    loadCustomerCases();
    const unsub = StorageService.subscribe(() => {
      loadCustomerCases();
      if (activeCase) {
        const refreshed = StorageService.getCaseById(activeCase.id);
        if (refreshed) setActiveCase(refreshed);
      }
    });
    return unsub;
  }, [customerEmail, activeCase?.id]);

  useEffect(() => {
    if (initialCaseId) {
      performLookup(initialCaseId, initialEmail || customerEmail || '');
    }
  }, [initialCaseId, initialEmail]);

  const performLookup = (idToSearch: string, emailToSearch?: string) => {
    setErrorNotice(null);
    setHasSearched(true);

    const cleanId = idToSearch.trim().toUpperCase();
    if (!cleanId) {
      setErrorNotice(isArabic ? 'يرجى كتابة رقم قضية صحيح (مثال: FR-2026-8842).' : 'Please enter a valid Case ID (e.g. FR-2026-8842).');
      setActiveCase(null);
      return;
    }

    const found = StorageService.getCaseById(cleanId);
    if (!found) {
      setErrorNotice(
        isArabic 
          ? `لم يتم العثور على أي قضية بالرقم "${cleanId}". يرجى التأكد من الرقم أو تقديم طلب جديد.`
          : `No case found with ID "${cleanId}". Please check your Case ID or submit a new request.`
      );
      setActiveCase(null);
      return;
    }

    const cleanEmail = emailToSearch?.trim().toLowerCase();
    if (cleanEmail && found.clientEmail.toLowerCase() !== cleanEmail) {
      setErrorNotice(
        isArabic
          ? 'البريد الإلكتروني المدخل لا يتطابق مع المسجل لهذه القضية لأغراض الخصوصية والأمان.'
          : 'The email address provided does not match the record for this Case ID for confidentiality.'
      );
      setActiveCase(null);
      return;
    }

    customerLogin(found.clientEmail, found.clientName);
    setActiveCase(found);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(searchCaseId, searchEmail);
  };

  const handleCopyCaseId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><Clock className="w-3.5 h-3.5" /> {t('track.status_pending')}</span>;
      case 'Under Review':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> {t('track.status_review')}</span>;
      case 'Submitted':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200"><Send className="w-3.5 h-3.5" /> {t('track.status_submitted')}</span>;
      case 'Resolved':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5" /> {t('track.status_resolved')}</span>;
      case 'Rejected':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200"><XCircle className="w-3.5 h-3.5" /> {t('track.status_rejected')}</span>;
    }
  };

  const getTimelineSteps = (status: CaseStatus) => {
    const steps = [
      { key: 'Pending', label: t('track.step1'), desc: t('track.step1_sub') },
      { key: 'Under Review', label: t('track.step2'), desc: t('track.step2_sub') },
      { key: 'Submitted', label: t('track.step3'), desc: t('track.step3_sub') },
      { key: 'Resolved', label: t('track.step4'), desc: t('track.step4_sub') }
    ];

    const statusWeights: Record<CaseStatus, number> = {
      'Pending': 1,
      'Under Review': 2,
      'Submitted': 3,
      'Resolved': 4,
      'Rejected': 3.5
    };

    const currentWeight = statusWeights[status] || 1;

    return (
      <div className="py-6 border-y border-slate-200/80 my-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentWeight >= stepNum && status !== 'Rejected';
            const isCurrent = (currentWeight === stepNum) || (stepNum === 4 && status === 'Resolved');
            const isRejectedAtEnd = status === 'Rejected' && stepNum === 4;

            return (
              <div key={step.key} className="relative flex flex-col items-start sm:items-center text-start sm:text-center">
                <div 
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black font-mono transition-all mb-2 ${
                    isRejectedAtEnd
                      ? 'bg-rose-100 text-rose-700 border-2 border-rose-500'
                      : isCompleted
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-600 animate-pulse'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isRejectedAtEnd ? (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    stepNum
                  )}
                </div>
                <p className={`text-xs font-bold ${isCurrent || isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                  {isRejectedAtEnd ? (isArabic ? 'رفض من المنصة' : 'Platform Refusal') : step.label}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {isRejectedAtEnd ? (isArabic ? 'قررت المنصة أن المنشور لا يخالف سياستها' : 'Platform determined post did not breach TOS') : step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 py-12 sm:py-20 min-h-[85vh] text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 inline-block">
            {t('track.kicker')}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t('track.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {t('track.desc')}
          </p>
        </div>

        {/* Lookup Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('track.case_id_label')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={searchCaseId}
                    onChange={(e) => setSearchCaseId(e.target.value)}
                    placeholder={t('track.case_id_placeholder')}
                    className={`w-full py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono uppercase text-slate-900 ${
                      isArabic ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'
                    }`}
                  />
                  <Search className={`w-4 h-4 text-slate-400 absolute top-3 ${isArabic ? 'right-3' : 'left-3'}`} />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('track.email_label')}
                </label>
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {t('track.lookup_btn')}
                </button>
              </div>
            </div>

            {/* Quick Demo Cases Selector */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <span className="font-bold">{t('track.demo_title')}</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchCaseId('FR-2026-8842');
                    setSearchEmail('sarah.j@example.com');
                    performLookup('FR-2026-8842', 'sarah.j@example.com');
                  }}
                  className="text-blue-600 hover:underline font-mono text-[11px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
                >
                  FR-2026-8842 ({t('track.status_submitted')})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchCaseId('FR-2026-7319');
                    setSearchEmail('marcus.vance@company.net');
                    performLookup('FR-2026-7319', 'marcus.vance@company.net');
                  }}
                  className="text-emerald-700 hover:underline font-mono text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                >
                  FR-2026-7319 ({t('track.status_resolved')})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchCaseId('FR-2026-6180');
                    setSearchEmail('dkim.tech@gmail.com');
                    performLookup('FR-2026-6180', 'dkim.tech@gmail.com');
                  }}
                  className="text-amber-700 hover:underline font-mono text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200 cursor-pointer"
                >
                  FR-2026-6180 ({t('track.status_pending')})
                </button>
              </div>
            </div>
          </form>

          {/* Error notification */}
          {errorNotice && (
            <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}
        </div>

        {/* ACTIVE CASE DETAILS VIEW */}
        {activeCase && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
            
            {/* Top Bar of Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black font-mono text-slate-900 tracking-wide">
                    {activeCase.id}
                  </h3>
                  <button
                    onClick={() => handleCopyCaseId(activeCase.id)}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                    title={t('submit.copy_id')}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedId && <span className="text-[11px] text-emerald-600 font-bold">{t('submit.copied')}</span>}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  {new Date(activeCase.createdAt).toLocaleDateString()} · {new Date(activeCase.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div>
                {getStatusBadge(activeCase.status)}
              </div>
            </div>

            {/* Visual Timeline */}
            {getTimelineSteps(activeCase.status)}

            {/* Current Specialist Notice */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 sm:p-5">
              <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                {t('track.specialist_update')}
              </h4>
              <p className="text-xs sm:text-sm text-blue-950 font-semibold leading-relaxed">
                {activeCase.publicNotes || (isArabic ? 'طلبك قيد المتابعة الإدارية والتصعيد الرسمي.' : 'Your case is proceeding through standard platform verification workflows.')}
              </p>
              {activeCase.platformTicketRef && (
                <div className="mt-3 pt-2.5 border-t border-blue-200/60 flex items-center gap-2 text-xs text-blue-800">
                  <span className="font-bold">{t('track.docket_ref')}</span>
                  <code className="bg-white px-2 py-0.5 rounded font-mono font-bold text-blue-700 border border-blue-200">
                    {activeCase.platformTicketRef}
                  </code>
                </div>
              )}
            </div>

            {/* Case Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('track.target_info')}
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isArabic ? 'المنصة:' : 'Platform:'}</span>
                    <span className="font-bold text-slate-800">{activeCase.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isArabic ? 'النوع:' : 'Category:'}</span>
                    <span className="font-bold text-slate-800">{activeCase.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isArabic ? 'الأولوية:' : 'Urgency:'}</span>
                    <span className="font-bold text-slate-800">{activeCase.urgency}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">{isArabic ? 'الروابط المستهدفة:' : 'Target URL(s):'}</span>
                    <div className="space-y-1">
                      {activeCase.contentUrls.map((u, i) => (
                        <a
                          key={i}
                          href={u}
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                          className="text-blue-600 hover:underline font-mono text-[11px] truncate block flex items-center gap-1 text-left"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{u}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t('track.reported_circumstances')}
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <p className="text-slate-700 leading-relaxed text-[11px] font-normal">
                    <strong>{isArabic ? 'بيان العميل:' : 'Client Description:'}</strong> {activeCase.reason}
                  </p>
                  {activeCase.evidenceDescription && (
                    <p className="text-slate-500 text-[11px] pt-2 border-t border-slate-200 font-normal">
                      <strong>{isArabic ? 'تفاصيل الإثبات:' : 'Evidence Details:'}</strong> {activeCase.evidenceDescription}
                    </p>
                  )}
                  {activeCase.evidenceFileNames && activeCase.evidenceFileNames.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 text-[11px]">
                      <span className="text-slate-500 font-bold">{isArabic ? 'ملفات الخزينة:' : 'Evidence Vault Files:'} </span>
                      <span className="font-mono text-slate-700">{activeCase.evidenceFileNames.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Case Event Audit Trail */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t('track.activity_log')}
              </h4>
              <div className="space-y-2.5">
                {activeCase.statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{item.status}</span>
                        <span className="text-[11px] text-slate-400 tabular-nums font-mono">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {item.note && <p className="text-slate-600 mt-0.5 text-[11px] font-normal">{item.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions or Supplementary Evidence Box */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
              <span>{t('track.have_evidence')}</span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('track.contact_specialist')}</span>
              </button>
            </div>

          </div>
        )}

        {/* If customer is logged in, show their other open cases */}
        {userCases.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {t('track.all_user_cases')} {customerEmail}
            </h3>
            <div className="space-y-3">
              {userCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveCase(c);
                    setSearchCaseId(c.id);
                  }}
                  className={`p-4 rounded-xl border bg-white cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    activeCase?.id === c.id 
                      ? 'border-blue-500 ring-2 ring-blue-500/10' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{c.id}</span>
                      <span className="text-xs text-slate-500">· {c.platform}</span>
                      <span className="text-xs text-slate-500">· {c.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">
                      {c.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {getStatusBadge(c.status)}
                    {isArabic ? <ArrowLeft className="w-4 h-4 text-slate-400" /> : <ArrowRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
