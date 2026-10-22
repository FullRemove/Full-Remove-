import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Send, 
  RefreshCw, 
  ExternalLink, 
  Download, 
  Trash2, 
  AlertTriangle,
  Lock,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Mail,
  Server,
  Cloud,
  DollarSign
} from 'lucide-react';
import { CaseRequest, CaseStatus, PlatformType, ContactMessage } from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
  openLoginModal: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate, openLoginModal }) => {
  const { isAdmin, adminUser, adminLogout } = useAuth();
  const { isArabic, t } = useLanguage();

  const [cases, setCases] = useState<CaseRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'cases' | 'messages' | 'hosting'>('cases');

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected case for viewing / editing
  const [selectedCase, setSelectedCase] = useState<CaseRequest | null>(null);
  const [editingCase, setEditingCase] = useState<CaseRequest | null>(null);

  // Status edit form fields
  const [newStatus, setNewStatus] = useState<CaseStatus>('Pending');
  const [newPublicNotes, setNewPublicNotes] = useState<string>('');
  const [newAdminNotes, setNewAdminNotes] = useState<string>('');
  const [newTicketRef, setNewTicketRef] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const loadData = () => {
    setCases(StorageService.getAllCases());
    setMessages(StorageService.getContactMessages());
  };

  useEffect(() => {
    loadData();
    const unsub = StorageService.subscribe(loadData);
    return unsub;
  }, []);

  // Filter cases logic
  const filteredCases = cases.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (platformFilter !== 'all' && c.platform !== platformFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesId = c.id.toLowerCase().includes(q);
      const matchesName = c.clientName.toLowerCase().includes(q);
      const matchesEmail = c.clientEmail.toLowerCase().includes(q);
      const matchesUrl = c.contentUrls.some(u => u.toLowerCase().includes(q));
      if (!matchesId && !matchesName && !matchesEmail && !matchesUrl) return false;
    }
    return true;
  });

  // Calculate metrics
  const totalCount = cases.length;
  const pendingCount = cases.filter(c => c.status === 'Pending').length;
  const underReviewCount = cases.filter(c => c.status === 'Under Review').length;
  const submittedCount = cases.filter(c => c.status === 'Submitted').length;
  const resolvedCount = cases.filter(c => c.status === 'Resolved').length;
  const rejectedCount = cases.filter(c => c.status === 'Rejected').length;

  const handleOpenEdit = (c: CaseRequest) => {
    setEditingCase(c);
    setNewStatus(c.status);
    setNewPublicNotes(c.publicNotes || '');
    setNewAdminNotes(c.adminNotes || '');
    setNewTicketRef(c.platformTicketRef || '');
    setSaveSuccessMsg(null);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    const updated = StorageService.updateCaseStatus(
      editingCase.id,
      newStatus,
      newPublicNotes.trim(),
      newAdminNotes.trim(),
      newTicketRef.trim()
    );

    if (updated) {
      setEditingCase(updated);
      if (selectedCase && selectedCase.id === updated.id) {
        setSelectedCase(updated);
      }
      setSaveSuccessMsg(
        isArabic
          ? `تم تحديث حالة القضية ${updated.id} بنجاح إلى "${updated.status}"!`
          : `Case ${updated.id} status successfully updated to "${newStatus}"!`
      );
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  const handleDeleteCase = (id: string) => {
    const confirmMsg = isArabic 
      ? `هل أنت متأكد من رغبتك في حذف القضية ${id}؟ لا يمكن التراجع عن هذا الإجراء.`
      : `Are you sure you want to delete case ${id}? This action cannot be undone.`;
    if (window.confirm(confirmMsg)) {
      StorageService.deleteCase(id);
      if (selectedCase?.id === id) setSelectedCase(null);
      if (editingCase?.id === id) setEditingCase(null);
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `full_remove_cases_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isAdmin) {
    return (
      <div className="bg-slate-50 py-20 min-h-[80vh] flex items-center justify-center px-4 text-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {isArabic ? 'تسجيل دخول المشرف مطلوب' : 'Admin Authentication Required'}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
            {isArabic
              ? 'لوحة إدارة طلبات فول ريموف مخصصة فقط للمشرفين المعتمدين لمراجعة الشكاوى ومتابعة المنصات.'
              : 'The Full Remove case management console is restricted to authorized staff operators. Please authenticate with your admin credentials.'}
          </p>
          <button
            onClick={openLoginModal}
            className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>{isArabic ? 'الدخول إلى لوحة المشرف' : 'Authenticate to Admin Portal'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-[90vh] py-8 px-4 sm:px-6 lg:px-8 text-start">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/assets/aistudio/Full_Remove_Shield_Logo_6c15012a.png"
              alt="Full Remove Logo"
              className="w-12 h-12 object-contain rounded-xl shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">{t('admin.title')}</h1>
                <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  {isArabic ? 'مشرف نشط' : 'Staff Active'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {t('admin.operator')} {adminUser?.email || 'karwankareemkurd1@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('hosting')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'hosting'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>{isArabic ? 'دليل الاستضافة المجانية' : 'Free-Tier Hosting Guide'}</span>
            </button>
            <button
              onClick={handleExportJson}
              className="px-3 py-2 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isArabic ? 'تصدير JSON' : 'Export JSON'}</span>
            </button>
            <button
              onClick={() => {
                const conf = isArabic 
                  ? 'إعادة ضبط كافة القضايا والرسائل للبيانات التجريبية الأولية؟' 
                  : 'Reset all cases and messages to initial realistic demonstration seed data?';
                if (window.confirm(conf)) {
                  StorageService.resetDemoData();
                }
              }}
              className="px-3 py-2 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
            >
              {isArabic ? 'إعادة تعيين البيانات' : 'Reset Demo Data'}
            </button>
            <button
              onClick={adminLogout}
              className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              {t('brand.exit')}
            </button>
          </div>
        </div>

        {/* Tab switcher: Cases vs Messages vs Hosting Guide */}
        <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('cases')}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === 'cases' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('admin.tab_requests')} ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 relative transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'messages' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            {t('admin.tab_messages')} ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('hosting')}
            className={`pb-3 relative transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'hosting' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            {t('admin.tab_hosting')}
          </button>
        </div>

        {/* TAB 1: CASES TABLE */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            
            {/* KPI Metric Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div 
                onClick={() => setStatusFilter('all')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'all' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t('admin.total_cases')}</p>
                <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{totalCount}</p>
              </div>

              <div 
                onClick={() => setStatusFilter('Pending')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'Pending' ? 'ring-2 ring-amber-500 border-amber-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-amber-600 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {t('track.status_pending')}
                </p>
                <p className="text-2xl font-black text-amber-700 mt-1 font-mono">{pendingCount}</p>
              </div>

              <div 
                onClick={() => setStatusFilter('Under Review')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'Under Review' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-blue-600 font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> {t('track.status_review')}
                </p>
                <p className="text-2xl font-black text-blue-700 mt-1 font-mono">{underReviewCount}</p>
              </div>

              <div 
                onClick={() => setStatusFilter('Submitted')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'Submitted' ? 'ring-2 ring-purple-500 border-purple-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-purple-600 font-bold flex items-center gap-1">
                  <Send className="w-3 h-3" /> {t('track.status_submitted')}
                </p>
                <p className="text-2xl font-black text-purple-700 mt-1 font-mono">{submittedCount}</p>
              </div>

              <div 
                onClick={() => setStatusFilter('Resolved')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'Resolved' ? 'ring-2 ring-emerald-500 border-emerald-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t('track.status_resolved')}
                </p>
                <p className="text-2xl font-black text-emerald-700 mt-1 font-mono">{resolvedCount}</p>
              </div>

              <div 
                onClick={() => setStatusFilter('Rejected')}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  statusFilter === 'Rejected' ? 'ring-2 ring-rose-500 border-rose-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-[11px] uppercase tracking-wider text-rose-600 font-bold flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> {t('track.status_rejected')}
                </p>
                <p className="text-2xl font-black text-rose-700 mt-1 font-mono">{rejectedCount}</p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isArabic ? 'بحث بالمعرف، الاسم، البريد، الرابط...' : 'Search Case ID, name, email, URL...'}
                  className={`w-full py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 ${
                    isArabic ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'
                  }`}
                />
                <Search className={`w-4 h-4 text-slate-400 absolute top-2.5 ${isArabic ? 'right-3' : 'left-3'}`} />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-bold">{isArabic ? 'الحالة:' : 'Status:'}</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold"
                  >
                    <option value="all">{isArabic ? 'كافة الحالات' : 'All Statuses'} ({totalCount})</option>
                    <option value="Pending">{t('track.status_pending')} ({pendingCount})</option>
                    <option value="Under Review">{t('track.status_review')} ({underReviewCount})</option>
                    <option value="Submitted">{t('track.status_submitted')} ({submittedCount})</option>
                    <option value="Resolved">{t('track.status_resolved')} ({resolvedCount})</option>
                    <option value="Rejected">{t('track.status_rejected')} ({rejectedCount})</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-bold">{isArabic ? 'المنصة:' : 'Platform:'}</span>
                  <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold"
                  >
                    <option value="all">{isArabic ? 'جميع المنصات' : 'All Platforms'}</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="X (Twitter)">X (Twitter)</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Reddit">Reddit</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Other">{isArabic ? 'أخرى' : 'Other'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cases Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">{isArabic ? 'معرف القضية' : 'Case ID'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'التاريخ' : 'Date'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'العميل' : 'Client'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'المنصة' : 'Platform'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'النوع' : 'Category'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'الحالة' : 'Status'}</th>
                      <th className="py-3.5 px-4">{isArabic ? 'الأولوية' : 'Urgency'}</th>
                      <th className="py-3.5 px-4 text-end">{isArabic ? 'الإجراءات' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCases.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          {isArabic ? 'لا توجد قضايا مطابقة لمعايير البحث الحالية.' : 'No cases found matching the current search filters.'}
                        </td>
                      </tr>
                    ) : (
                      filteredCases.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">
                            {c.id}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap font-mono tabular-nums">
                            {new Date(c.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900 whitespace-nowrap">{c.clientName}</p>
                            <p className="text-[11px] text-slate-400 truncate max-w-[140px] font-mono">{c.clientEmail}</p>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                            {c.platform}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 truncate max-w-[160px]">
                            {c.category}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              c.status === 'Submitted' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                              c.status === 'Under Review' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              c.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap text-[11px] font-semibold">
                            {c.urgency.split(' ')[0]}
                          </td>
                          <td className="py-3.5 px-4 text-end whitespace-nowrap space-x-1">
                            <button
                              onClick={() => setSelectedCase(c)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title={isArabic ? 'فحص الأدلة والملف' : 'Inspect Full Evidence'}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(c)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title={isArabic ? 'تحديث الحالة والملاحظات' : 'Update Status & Notes'}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCase(c.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title={isArabic ? 'حذف القضية' : 'Delete Case'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {isArabic ? 'رسائل واستفسارات العملاء المستلمة' : 'Customer Contact Messages & Inquiries'} ({messages.length})
            </h3>
            <div className="space-y-3">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">{isArabic ? 'لا توجد رسائل مستلمة بعد.' : 'No contact inquiries received yet.'}</p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{m.name}</span>
                        <span className="text-slate-400 ms-2 font-mono">{m.email}</span>
                      </div>
                      <span className="text-slate-400 tabular-nums font-mono">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-blue-900">{m.subject}</p>
                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100 font-normal">
                      {m.message}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-[11px]">
                      <span className="font-mono text-slate-400">ID: {m.id}</span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${m.email}?subject=RE: ${encodeURIComponent(m.subject)} - Full Remove Support`}
                          className="text-blue-600 hover:underline font-bold"
                        >
                          {isArabic ? 'الرد عبر البريد الإلكتروني' : 'Reply via Email'}
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: FREE-TIER HOSTING & COST WARNING GUIDE */}
        {activeTab === 'hosting' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {isArabic ? 'بنية تحتية مجانية تماماً' : 'Zero-Cost Infrastructure'}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {isArabic ? 'كيفية نشر تطبيق FULL REMOVE على الخدمات المجانية' : 'How to Publish Full Remove on Free-Tier Services'}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {isArabic ? 'دليل عملي لنشر وتشغيل موقع وتطبيق فول ريموف بشكل دائم دون دفع أي رسوم استضافة.' : 'A practical guide to hosting your Full Remove web application permanently without paying hosting fees.'}
              </p>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t('admin.cost_warning_title')}</span>
              </div>
              <p className="leading-relaxed font-normal">
                {t('admin.cost_warning_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Option 1: Google Cloud Run */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span>Google Cloud Run (مجاني)</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {isArabic ? 'التطبيق مهيأ كحاوية خفيفة على Cloud Run بحصة مجانية ضخمة.' : 'Your applet is packaged for Google Cloud Run execution.'}
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-[11px] font-medium">
                  <p><strong>{isArabic ? 'الحصة المجانية:' : 'Free quota:'}</strong> 2,000,000 طلب شهرياً</p>
                  <p><strong>{isArabic ? 'التكلفة:' : 'Cost:'}</strong> $0 / شهرياً</p>
                </div>
              </div>

              {/* Option 2: Vercel / Netlify */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Server className="w-4 h-4 text-emerald-600" />
                  <span>Vercel / Netlify (Hobby Free)</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {isArabic ? 'اربط مستودع GitHub مع Vercel للنشر التلقائي مجاناً تماماً.' : 'Export code to GitHub and connect to Vercel or Netlify.'}
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-[11px] font-medium">
                  <p><strong>{isArabic ? 'الحصة المجانية:' : 'Free quota:'}</strong> 100 GB نقل بيانات شهرياً</p>
                  <p><strong>{isArabic ? 'النطاق المخصص:' : 'Custom Domain:'}</strong> شهادة SSL مجانية</p>
                </div>
              </div>

              {/* Option 3: Firebase Free Spark Plan */}
              <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Firebase Spark Tier</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-normal">
                  {isArabic ? 'قاعدة بيانات Firestore والمصادقة بخطة Spark المجانية.' : 'Firebase Firestore and Auth provide a generous no-cost Spark tier.'}
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-[11px] font-medium">
                  <p><strong>{isArabic ? 'القراءات:' : 'Reads:'}</strong> 50,000 قراءة يومياً مجاناً</p>
                  <p><strong>{isArabic ? 'الكتابات:' : 'Writes:'}</strong> 20,000 كتابة يومياً مجاناً</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODAL: EDIT CASE STATUS & NOTES */}
        {editingCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 text-start">
            <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{t('admin.status_update_title')}: {editingCase.id}</h3>
                  <p className="text-xs text-slate-400">{editingCase.clientName} ({editingCase.platform})</p>
                </div>
                <button
                  onClick={() => setEditingCase(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStatus} className="p-6 space-y-4 text-xs">
                
                {saveSuccessMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {isArabic ? 'حالة التقدم الميداني' : 'Progress Status'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as CaseStatus)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold"
                  >
                    <option value="Pending">{t('track.status_pending')} ({isArabic ? 'مسجلة بانتظار الفحص' : 'Newly logged'})</option>
                    <option value="Under Review">{t('track.status_review')} ({isArabic ? 'جارٍ صياغة المذكرة القانونية' : 'Drafting violation brief'})</option>
                    <option value="Submitted">{t('track.status_submitted')} ({isArabic ? 'تم الرفع لمكتب أمان المنصة' : 'Escalation filed with platform'})</option>
                    <option value="Resolved">{t('track.status_resolved')} ({isArabic ? 'تم التأكد من حذف المحتوى نهائياً' : 'Content confirmed eradicated'})</option>
                    <option value="Rejected">{t('track.status_rejected')} ({isArabic ? 'رفضت المنصة أو الأدلة غير كافية' : 'Platform refused'})</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('admin.ticket_ref_label')}
                  </label>
                  <input
                    type="text"
                    value={newTicketRef}
                    onChange={(e) => setNewTicketRef(e.target.value)}
                    placeholder="e.g. META-IMPER-89214 or TK-SAFETY-991"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 text-slate-900"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'يظهر هذا الرقم للعميل في بوابة التتبع.' : 'Visible to the client on their tracking portal.'}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('admin.public_note_label')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newPublicNotes}
                    onChange={(e) => setNewPublicNotes(e.target.value)}
                    placeholder={isArabic ? "اكتب توضيحاً موجزاً يظهر للعميل (مثال: تم إرسال مذكرة الانتهاك الرسمية لفريق ميتا وننتظر الرد الإداري)..." : "Provide a status explanation for the client..."}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-normal"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {isArabic ? 'ستظهر هذه الملاحظة فوراً للعميل عند الاستعلام عن قضيته.' : 'This note will be immediately visible to the client.'}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t('admin.private_note_label')}
                  </label>
                  <textarea
                    rows={2}
                    value={newAdminNotes}
                    onChange={(e) => setNewAdminNotes(e.target.value)}
                    placeholder={isArabic ? "ملاحظات طاقم العمل الداخلية، قناة التصعيد المستخدمة..." : "Internal thoughts, escalation channel used..."}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-mono"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setEditingCase(null)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    {isArabic ? 'إلغاء' : 'Close'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                  >
                    {t('admin.save_btn')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* MODAL: FULL CASE INSPECTOR */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 text-start">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs uppercase font-bold text-blue-600">{t('admin.case_inspector_title')}</span>
                  <h3 className="text-xl font-black font-mono text-slate-900">{selectedCase.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">{isArabic ? 'اسم العميل:' : 'Client Name:'}</span>
                  <span className="font-bold text-slate-800">{selectedCase.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isArabic ? 'البريد:' : 'Email:'}</span>
                  <span className="font-bold text-slate-800 font-mono truncate block">{selectedCase.clientEmail}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isArabic ? 'المنصة:' : 'Platform:'}</span>
                  <span className="font-bold text-slate-800">{selectedCase.platform}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">{isArabic ? 'الحالة الحالية:' : 'Current Status:'}</span>
                  <span className="font-bold text-blue-600">{selectedCase.status}</span>
                </div>
              </div>

              {/* Target URLs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isArabic ? 'الروابط المسيئة المستهدفة' : 'Offending Target URLs'}
                </h4>
                <div className="space-y-1.5">
                  {selectedCase.contentUrls.map((u, i) => (
                    <a
                      key={i}
                      href={u}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-blue-600 hover:underline font-mono text-xs flex items-center justify-between gap-2 text-left"
                    >
                      <span className="truncate">{u}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Circumstances Statement */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {isArabic ? 'سبب طلب الإزالة وشرح الواقعة' : 'Reason for Removal'}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 font-normal">
                  {selectedCase.reason}
                </p>
              </div>

              {/* Evidence details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {isArabic ? 'تفاصيل الأدلة ووسائل الإثبات' : 'Supporting Evidence Description'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 font-normal">
                  {selectedCase.evidenceDescription || (isArabic ? 'لا توجد تفاصيل إضافية مرفقة.' : 'No additional evidence description provided.')}
                </p>
                {selectedCase.evidenceFileNames && selectedCase.evidenceFileNames.length > 0 && (
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="font-bold">{isArabic ? 'ملفات الإثبات المرفوعة:' : 'Attached Evidence Files:'} </span>
                    <span className="font-mono text-slate-700">{selectedCase.evidenceFileNames.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Internal Admin Notes */}
              {selectedCase.adminNotes && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                  <span className="font-bold text-amber-950 block mb-0.5">{isArabic ? 'ملاحظات المشرف السرية:' : 'Private Staff Notes:'}</span>
                  <p className="text-amber-900 font-mono text-[11px]">{selectedCase.adminNotes}</p>
                </div>
              )}

              {/* Activity Log */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isArabic ? 'سجل تتبع ومراحل القضية' : 'Case Audit Timeline'}
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedCase.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px]">
                      <div>
                        <span className="font-bold text-slate-800">{h.status}: </span>
                        <span className="text-slate-600 font-normal">{h.note}</span>
                      </div>
                      <span className="text-slate-400 font-mono shrink-0 ms-2">
                        {new Date(h.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => {
                    handleOpenEdit(selectedCase);
                    setSelectedCase(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'تعديل الحالة والملاحظات العلنية' : 'Edit Status & Public Notes'}</span>
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs cursor-pointer"
                >
                  {isArabic ? 'إغلاق' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
