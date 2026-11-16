import React from 'react';
import { Scale, Phone, Mail, MapPin, Send, Globe, Shield, ChevronLeft } from 'lucide-react';
import starEmblem from '../../assets/star-emblem.svg';

export default function Footer({ onOpenBooking, onOpenCalculator }) {
  return (
    <footer id="contact" className="relative bg-[#202020] text-[#D6D6D6] pt-16 pb-12 border-t border-[#333533] overflow-hidden">
      
      {/* Figma Center Giant 8-pointed Golden Star (node 39:21) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-25 z-0 flex justify-center">
        <img
          src={starEmblem}
          alt="Golden Legal Emblem"
          className="w-[360px] sm:w-[480px] h-auto object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#333533]/80">
          
          {/* Col 1: About the Firm (Figma Frame 15 - node 39:56) */}
          <div className="lg:col-span-5 text-right">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD100]/20 to-transparent border border-[#FFD100]/40 flex items-center justify-center text-[#FFD100]">
                <Scale size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">دفتر وکالت و مشاوره حقوقی بین‌المللی</h3>
                <span className="text-xs text-[#FFD100]">وکیل پایه یک دادگستری و مشاور امور تجاری</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed text-justify mb-6">
              ارائه خدمات جامع وکالت تخصصی و داوری در حوزه‌های تجارت بین‌الملل، دعاوی ملکی و ثبتی، جرایم اقتصادی، و تنظیم قراردادهای پیشرفته بازرگانی. هدف ما حراست هوشمندانه و قاطعانه از منافع موکلین در کلیه مراجع قضایی، شبه‌قضایی و هیئت‌های داوری داخلی و بین‌المللی با اتکا به دانش روز و اخلاق حرفه‌ای است.
            </p>

            <div className="flex items-center space-x-3 space-x-reverse">
              <span className="text-xs font-bold text-stone-300">شبکه‌های اجتماعی و ارتباطی:</span>
              <div className="flex items-center space-x-2 space-x-reverse">
                <a
                  href="https://t.me/lxlnimalxl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#333533] hover:bg-[#FFD100] text-stone-300 hover:text-[#202020] flex items-center justify-center transition"
                  aria-label="Telegram"
                >
                  <Send size={15} />
                </a>
                <a
                  href="https://linkedin.com/in/nima-rounaghi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#333533] hover:bg-[#FFD100] text-stone-300 hover:text-[#202020] flex items-center justify-center transition"
                  aria-label="LinkedIn"
                >
                  <Globe size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Useful Links (Figma Frame 16 - node 39:57) */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-white font-bold text-sm mb-5 pb-2 border-b border-[#333533] inline-block">
              لینک‌های مفید و دسترسی سریع
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-[#FFD100] transition flex items-center gap-1.5">
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>صفحه اصلی و معرفی وکیل</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FFD100] transition flex items-center gap-1.5">
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>حوزه‌های تخصصی وکالت</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-[#FFD100] transition flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>محاسبه‌گر هوشمند هزینه دادرسی</span>
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FFD100] transition flex items-center gap-1.5">
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>سوالات متداول و تعرفه حق‌الوکاله</span>
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-[#FFD100] transition flex items-center gap-1.5">
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>یادداشت‌ها و مقالات حقوقی</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#FFD100] hover:underline font-bold transition flex items-center gap-1.5 cursor-pointer text-right mt-2"
                >
                  <ChevronLeft size={13} className="text-[#FFD100]" />
                  <span>ثبت آنلاین نوبت مشاوره حضوری/تلفنی</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Office Address & Contact */}
          <div className="lg:col-span-4 text-right">
            <h4 className="text-white font-bold text-sm mb-5 pb-2 border-b border-[#333533] inline-block">
              اطلاعات تماس و نشانی دفتر
            </h4>
            
            <div className="space-y-3.5 text-xs text-stone-300">
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={18} className="text-[#FFD100] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی سرو، طبقه ۸، واحد ۳۲
                </span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone size={17} className="text-[#FFD100] shrink-0" />
                <a href="tel:02188888888" className="hover:text-[#FFD100] font-bold dir-ltr">
                  ۰۲۱ - ۸۸۸۸ ۸۸۸۸ / ۲۳۴۵۶۷۸۹
                </a>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail size={17} className="text-[#FFD100] shrink-0" />
                <a href="mailto:info@lawyer-vakil.ir" className="hover:text-[#FFD100]">
                  info@lawyer-vakil.ir
                </a>
              </div>

              {/* Office hours */}
              <div className="mt-4 p-3 rounded-xl bg-[#262626] border border-[#333533] text-[11px] text-stone-400">
                <div className="text-white font-bold mb-1">ساعات کاری و پذیرش با هماهنگی قبلی:</div>
                <div>شنبه تا چهارشنبه: ۹:۰۰ الی ۱۸:۰۰</div>
                <div>پنج‌شنبه‌ها: ۹:۰۰ الی ۱۳:۰۰</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal Registration */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Shield size={16} className="text-[#FFD100]" />
            <span>پروانه وکالت پایه یک شماره ۹۴۸۱ - عضو کانون وکلای دادگستری مرکز</span>
          </div>
          <div>
            طراحی و توسعه سیستم توسط{' '}
            <a
              href="https://github.com/lxlnimalxl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD100] font-bold hover:underline"
            >
              سید نیما رونقی
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
