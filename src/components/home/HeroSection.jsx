import React from 'react';
import { Calendar, FileText, Phone, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import lawyerHero from '../../assets/images/lawyer-hero.png';
import sparkleSvg from '../../assets/sparkle.svg';

export default function HeroSection({ onOpenBooking, onOpenCaseEvaluation }) {
  const credentials = [
    'کارشناس ارشد تجارت بین‌الملل از دانشگاه علامه طباطبایی',
    'دانشجوی دکتری حقوق بین‌الملل و داوری تجاری',
    'عضو اتحادیه بین‌المللی وکلای دادگستری (IBA)',
    'مشاور حقوقی بسیاری از شرکت‌های دولتی و خصوصی',
    'سابقه درخشان در پرونده‌های خانواده و همچنین پرونده‌های مهاجرتی',
    'رسیدگی به پرونده‌های بین‌المللی و قراردادهای تجاری'
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FFD100]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#333533]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column in RTL: Lawyer Portrait (Figma 4:17) */}
          <div className="lg:col-span-5 order-2 lg:order-2 flex justify-center relative">
            <div className="relative group max-w-md w-full">
              {/* Golden orbital glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#FFD100]/20 via-[#333533]/20 to-transparent rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition duration-700" />
              
              {/* Cutout image container */}
              <div className="relative z-10">
                <img
                  src={lawyerHero}
                  alt="وکیل دادگستری و مشاور حقوقی بین‌المللی"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter contrast-105"
                />
                {/* Gradient bottom blend */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#202020] via-[#202020]/70 to-transparent" />
              </div>

              {/* Floating verified badge */}
              <div className="absolute bottom-8 right-2 z-20 bg-[#262626]/90 backdrop-blur-md border border-[#FFD100]/40 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 space-x-reverse animate-float">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD100] to-[#FFEE32] flex items-center justify-center text-[#202020] shadow-md">
                  <ShieldCheck size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">وکیل پایه یک دادگستری</div>
                  <div className="text-[#FFD100] text-[11px] font-medium">عضو کانون وکلای دادگستری مرکز</div>
                </div>
              </div>

              {/* Success rate metric badge */}
              <div className="absolute top-12 left-0 z-20 bg-[#262626]/90 backdrop-blur-md border border-[#333533] rounded-2xl p-3.5 shadow-xl hidden sm:flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-[#333533] border border-[#FFD100]/30 flex items-center justify-center text-[#FFD100]">
                  <Award size={22} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">۹۴٪ موفقیت</div>
                  <div className="text-stone-400 text-[11px]">در آراء قطعی محاکم تجاری</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column in RTL: Typography and Credentials from Figma */}
          <div className="lg:col-span-7 order-1 lg:order-1 text-right relative">
            
            {/* Elegant English Watermark & Golden Sparkle (Figma node 4:97 & 6:2) */}
            <div className="relative inline-block w-full">
              <div className="flex items-center justify-start lg:justify-start gap-4">
                <h3 className="font-serif-luxury font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#D6D6D6]/35 to-transparent select-none">
                  Lawyer
                </h3>
                <img
                  src={sparkleSvg}
                  alt="Golden Sparkle"
                  className="w-16 h-16 lg:w-20 lg:h-20 animate-pulse pointer-events-none -mt-4"
                />
              </div>

              {/* Main Persian Heading (Figma node 4:95) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#D6D6D6] tracking-tight -mt-4 lg:-mt-6 mb-6">
                وکیل دادگستری
              </h1>
            </div>

            {/* Credential Bullet Points (Figma node 4:99) */}
            <div className="space-y-3.5 my-6 max-w-2xl">
              {credentials.map((cred, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 space-x-reverse text-[#EDEDED] text-sm sm:text-base leading-relaxed hover:text-white transition-colors"
                >
                  <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#FFD100] shadow-[0_0_8px_#FFD100]" />
                  <span className="font-normal">{cred}</span>
                </div>
              ))}
            </div>

            {/* Trust Counters */}
            <div className="grid grid-cols-3 gap-4 my-8 p-4 rounded-2xl bg-[#262626]/60 border border-[#333533] max-w-xl">
              <div className="text-center">
                <div className="text-[#FFD100] font-black text-xl lg:text-2xl font-serif-luxury">15+</div>
                <div className="text-xs text-stone-400 mt-1">سال سابقه وکالت</div>
              </div>
              <div className="text-center border-x border-[#333533]">
                <div className="text-[#FFD100] font-black text-xl lg:text-2xl font-serif-luxury">350+</div>
                <div className="text-xs text-stone-400 mt-1">پرونده تجاری و داوری</div>
              </div>
              <div className="text-center">
                <div className="text-[#FFD100] font-black text-xl lg:text-2xl font-serif-luxury">94%</div>
                <div className="text-xs text-stone-400 mt-1">احکام پیروز قطعی</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center space-x-2 space-x-reverse px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-extrabold text-sm shadow-xl hover:shadow-[#FFD100]/25 hover:scale-102 active:scale-98 transition cursor-pointer"
              >
                <Calendar size={18} />
                <span>درخواست نوبت مشاوره حقوقی</span>
              </button>

              <button
                onClick={onOpenCaseEvaluation}
                className="flex items-center space-x-2 space-x-reverse px-6 py-3.5 rounded-2xl bg-[#333533]/80 hover:bg-[#333533] border border-[#FFD100]/30 text-white font-bold text-sm hover:border-[#FFD100] transition cursor-pointer"
              >
                <FileText size={18} className="text-[#FFD100]" />
                <span>ارزیابی تخصصی پرونده</span>
              </button>

              <a
                href="tel:02188888888"
                className="flex items-center space-x-2 space-x-reverse px-4 py-3.5 rounded-2xl text-stone-400 hover:text-[#FFD100] text-sm transition"
              >
                <Phone size={17} />
                <span>تماس فوری: ۲۳۴۵۶۷۸۹-۰۲۱</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
