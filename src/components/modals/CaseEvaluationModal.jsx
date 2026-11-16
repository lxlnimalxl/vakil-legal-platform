import React, { useState } from 'react';
import { X, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

export default function CaseEvaluationModal({ isOpen, onClose }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('دعاوی ملکی و ثبتی');
  const [disputeAmount, setDisputeAmount] = useState('');
  const [summary, setSummary] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [hasContracts, setHasContracts] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone || !summary) {
      alert('لطفاً نام، شماره تماس و شرح پرونده را وارد فرمایید.');
      return;
    }

    setSubmitting(true);
    try {
      await api.submitCaseEvaluation({
        full_name: fullName,
        phone,
        case_category: category,
        dispute_amount: disputeAmount ? parseInt(disputeAmount.replace(/,/g, '')) * 10 : null,
        case_summary: summary,
        urgency,
        has_contracts: hasContracts
      });
      setSubmitted(true);
    } catch (err) {
      alert('خطا در ارسال اطلاعات');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setSummary('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in text-right">
      <div className="w-full max-w-lg bg-[#262626] border border-[#333533] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333533] bg-[#202020]">
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-[#FFD100]/20 border border-[#FFD100]/40 flex items-center justify-center text-[#FFD100]">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">ارزیابی تخصصی و محرمانه پرونده</h3>
              <span className="text-[11px] text-stone-400">بررسی ادله و ارائه نقشه راه حقوقی</span>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#333533] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-lg font-bold text-white">پرونده شما با موفقیت دریافت شد</h3>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                مستندات و توضیحات شما در صف بررسی تخصصی کارگروه حقوقی قرار گرفت. ظرف ۲۴ الی ۴۸ ساعت آینده جهت اعلام نتیجه ارزیابی با شما تماس حاصل خواهد شد.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#FFD100] text-[#202020] font-bold text-xs hover:bg-[#FFEE32] transition cursor-pointer"
              >
                تایید و بستن پنجره
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: نیما رونقی"
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFD100] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    شماره تماس مستقیم *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFD100] outline-hidden text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    شاخه حقوقی پرونده:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFD100] outline-hidden"
                  >
                    <option value="دعاوی ملکی و ثبتی">دعاوی ملکی و ثبتی</option>
                    <option value="حقوق شرکت‌ها و قراردادها">حقوق شرکت‌ها و قراردادها</option>
                    <option value="دعاوی کیفری و کلاهبرداری">دعاوی کیفری و کلاهبرداری</option>
                    <option value="داوری و تجارت بین‌الملل">داوری و تجارت بین‌الملل</option>
                    <option value="امور خانواده و ماترک">امور خانواده و ماترک</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    ارزش مالی تقریبی خواسته (تومان):
                  </label>
                  <input
                    type="text"
                    value={disputeAmount}
                    onChange={(e) => setDisputeAmount(e.target.value)}
                    placeholder="مثال: ۲,۰۰۰,۰۰۰,۰۰۰"
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFD100] outline-hidden text-left"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  میزان اولویت و فوریت رسیدگی:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'normal', label: 'عادی (۴۸ ساعت)' },
                    { id: 'high', label: 'فوری (۲۴ ساعت)' },
                    { id: 'critical', label: 'اضطراری (حضور دادگاه)' }
                  ].map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setUrgency(u.id)}
                      className={`p-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        urgency === u.id
                          ? 'bg-[#FFD100] text-[#202020] border-[#FFD100]'
                          : 'bg-[#1e1e1e] text-stone-400 border-[#333533]'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  شرح وقایع، اقدامات انجام‌شده و خواسته دقیق شما *
                </label>
                <textarea
                  required
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="شرح کامل تاریخچه اختلاف، اقدامات طرف مقابل، و مدارکی که در دست دارید..."
                  className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl p-3 text-xs text-white focus:border-[#FFD100] outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse text-xs text-stone-300">
                <input
                  type="checkbox"
                  id="has_contracts"
                  checked={hasContracts}
                  onChange={(e) => setHasContracts(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-[#FFD100] accent-[#FFD100] cursor-pointer"
                />
                <label htmlFor="has_contracts" className="cursor-pointer">
                  اصل قراردادها و مستندات کتبی جهت ارائه در جلسه حضوری موجود است.
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-bold text-xs hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'در حال ارسال اطلاعات پرونده...' : 'ثبت جهت بررسی و تعیین وقت ارزیابی'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
