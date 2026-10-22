import React, { useState } from 'react';
import { Lock, X, Shield, KeyRound, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminLogin } = useAuth();
  const { isArabic, t } = useLanguage();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = adminLogin(passcode);
    if (success) {
      setPasscode('');
      onSuccess();
      onClose();
    } else {
      setError(
        isArabic 
          ? 'رمز المرور غير صحيح. استخدم "admin123" أو اضغط على زر الدخول التجريبي السريع أدناه.' 
          : 'Invalid admin credentials. Use "admin123" or click the demo button below.'
      );
    }
  };

  const handleQuickDemo = () => {
    setPasscode('admin123');
    const success = adminLogin('admin123');
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 text-start">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-lg border border-blue-500/40">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {isArabic ? 'بوابة إدارة FULL REMOVE' : 'Full Remove Admin Portal'}
              </h3>
              <p className="text-xs text-slate-400">
                {isArabic ? 'صلاحيات وصول موظفي إدارة القضايا' : 'Restricted staff case management access'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-xs text-slate-600 mb-4 leading-relaxed font-normal">
            {isArabic
              ? 'لوحة تحكم المشرف المعتمد لمراجعة طلبات الإزالة، تحديث مراحل العمل، تحرير الملاحظات العلنية للعملاء، وإدارة تذاكر التصعيد.'
              : 'Authorized administrator console for reviewing requests, updating verification status, modifying public case notes, and managing platform escalation tickets.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? 'البريد الإلكتروني المعتمد للمشرف' : 'Admin Email'}
              </label>
              <input
                type="email"
                value="karwankareemkurd1@gmail.com"
                disabled
                dir="ltr"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed font-mono text-left"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isArabic ? 'رمز المرور السري (Passcode)' : 'Access Passcode'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={isArabic ? 'أدخل الرمز السري (مثال: admin123)' : 'Enter admin passcode (e.g. admin123)'}
                  autoFocus
                  className={`w-full py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 ${
                    isArabic ? 'pr-9 pl-3.5' : 'pl-9 pr-3.5'
                  }`}
                />
                <KeyRound className={`w-4 h-4 text-slate-400 absolute top-3 ${isArabic ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isArabic ? 'تسجيل الدخول إلى لوحة المشرف' : 'Authenticate to Admin Console'}</span>
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold">{isArabic ? 'للاختبار والمراجعة السريعة:' : 'Testing & Evaluation:'}</span>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <span>{isArabic ? 'دخول تجريبي بضغطة واحدة' : 'Instant 1-Click Demo Login'}</span>
                {isArabic ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {isArabic ? 'الرمز التجريبي:' : 'Passcode:'} <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">admin123</code>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
