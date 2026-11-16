import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, ShieldAlert, Check } from 'lucide-react';
import { api } from '../../services/api';

export default function CourtFeeCalculator({ onOpenBooking }) {
  const [claimType, setClaimType] = useState('financial');
  const [stage, setStage] = useState('first_instance');
  const [amountToman, setAmountToman] = useState('500000000'); // Default 500 million Toman
  const [result, setResult] = useState(() => api.calculateCourtFee(500000000, 'first_instance', 'financial'));

  const handleCalculate = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountToman.replace(/,/g, '')) || 0;
    const res = api.calculateCourtFee(parsedAmount, stage, claimType);
    setResult(res);
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '۰';
    return Number(num).toLocaleString('fa-IR');
  };

  return (
    <section id="calculator" className="py-16 lg:py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-full bg-[#FFD100]/10 border border-[#FFD100]/30 text-[#FFD100] text-xs font-bold mb-3">
            <Calculator size={14} />
            <span>ابزار هوشمند حقوقی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#D6D6D6]">
            محاسبه‌گر آنلاین هزینه دادرسی دادگاه‌ها
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl mx-auto">
            محاسبه دقیق هزینه تمبر دادرسی بر مبنای آخرین تعرفه خدمات قضایی و ماده ۳ قانون وصول برخی از درآمدهای دولت
          </p>
        </div>

        {/* Calculator Box */}
        <div className="bg-[#262626] rounded-3xl border border-[#333533] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form (col-span-7) */}
            <form onSubmit={handleCalculate} className="lg:col-span-7 space-y-6">
              
              {/* Claim Type */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-2.5">
                  نوع دعوا:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setClaimType('financial'); }}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 space-x-reverse cursor-pointer ${
                      claimType === 'financial'
                        ? 'bg-[#FFD100] text-[#202020] shadow-md'
                        : 'bg-[#333533] text-stone-400 hover:text-white'
                    }`}
                  >
                    <span>دعاوی مالی (چک، سفته، مطالبات)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setClaimType('non_financial'); }}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 space-x-reverse cursor-pointer ${
                      claimType === 'non_financial'
                        ? 'bg-[#FFD100] text-[#202020] shadow-md'
                        : 'bg-[#333533] text-stone-400 hover:text-white'
                    }`}
                  >
                    <span>دعاوی غیرمالی (تخلیه، خانواده)</span>
                  </button>
                </div>
              </div>

              {/* Amount Input (Only for financial claims) */}
              {claimType === 'financial' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-stone-300">
                      بهای خواسته یا مبلغ مورد مطالبه:
                    </label>
                    <span className="text-xs text-[#FFD100] font-bold">
                      {formatNumber(amountToman.replace(/,/g, ''))} تومان
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={amountToman}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setAmountToman(val);
                      }}
                      className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-4 py-3 text-white text-base focus:border-[#FFD100] outline-hidden text-left pl-20 font-serif-luxury"
                      placeholder="۵۰۰,۰۰۰,۰۰۰"
                    />
                    <span className="absolute left-4 top-3.5 text-xs text-stone-400 font-bold pointer-events-none">
                      تومان
                    </span>
                  </div>
                </div>
              )}

              {/* Stage Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-2.5">
                  مرحله رسیدگی قضایی:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { key: 'first_instance', label: 'بدوی (دادگاه حقوقی)' },
                    { key: 'appeal', label: 'تجدیدنظر استان' },
                    { key: 'supreme_court', label: 'فرجام‌خواهی (دیوان)' }
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStage(s.key)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition text-center cursor-pointer ${
                        stage === s.key
                          ? 'bg-[#333533] text-[#FFD100] border border-[#FFD100]'
                          : 'bg-[#1e1e1e] text-stone-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-bold text-sm shadow-xl hover:shadow-[#FFD100]/20 transition cursor-pointer"
              >
                محاسبه هزینه تمبر دادرسی
              </button>

            </form>

            {/* Results Card (col-span-5) */}
            <div className="lg:col-span-5 bg-[#1e1e1e] rounded-2xl p-6 border border-[#333533] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#333533]">
                <span className="text-xs text-stone-400">مرحله محاسبه‌شده:</span>
                <span className="text-xs font-bold text-[#FFD100]">{result?.stage}</span>
              </div>

              <div className="space-y-2.5 py-1 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>هزینه دادرسی قانونی:</span>
                  <span className="font-bold text-white font-serif-luxury">{formatNumber(result?.fee_toman)} تومان</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>تعرفه دفاتر خدمات الکترونیک:</span>
                  <span className="font-bold font-serif-luxury">{formatNumber(result?.electronic_service_fee_toman)} تومان</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>مبنای قانونی:</span>
                  <span className="text-[11px] text-stone-300">{result?.formula_applied}</span>
                </div>
              </div>

              {/* Total Estimated Box */}
              <div className="p-4 rounded-xl bg-[#262626] border border-[#FFD100]/30 text-center">
                <span className="text-xs text-stone-400 block mb-1">کل هزینه تخمینی ثبت دادخواست:</span>
                <span className="text-2xl font-black text-[#FFD100] font-serif-luxury block">
                  {formatNumber(result?.total_estimated_toman)} <span className="text-xs text-stone-300 font-sans">تومان</span>
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">
                  (معادل {formatNumber((result?.total_estimated_toman || 0) * 10)} ریال)
                </span>
              </div>

              {/* Legal Tip & CTA */}
              <div className="p-3 rounded-xl bg-[#333533]/50 text-[11px] text-stone-300 flex items-start space-x-2 space-x-reverse">
                <Info size={16} className="text-[#FFD100] shrink-0 mt-0.5" />
                <span>
                  نکته: در صورت صدور حکم به نفع شما، کلیه هزینه‌های دادرسی پرداختی به عنوان خسارات دادرسی از خوانده وصول خواهد شد.
                </span>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-xl bg-[#333533] hover:bg-[#FFD100] text-white hover:text-[#202020] text-xs font-bold transition cursor-pointer"
              >
                مشاوره جهت کاهش هزینه یا تقاضای اعسار
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
