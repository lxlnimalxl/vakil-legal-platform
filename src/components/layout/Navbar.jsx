import React, { useState } from 'react';
import { Scale, PhoneCall, Calculator, CalendarCheck, Menu, X } from 'lucide-react';
import starEmblem from '../../assets/star-emblem.svg';

export default function Navbar({ onOpenBooking, onOpenCalculator }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#202020]/90 backdrop-blur-md border-b border-[#333533]/60 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD100]/20 to-transparent border border-[#FFD100]/40 flex items-center justify-center text-[#FFD100]">
            <Scale size={22} />
          </div>
          <div>
            <span className="font-serif-luxury font-black text-lg text-white tracking-wider block">
              ADVOCACY & COUNSEL
            </span>
            <span className="text-xs text-[#FFD100] font-medium tracking-wide">
              دفتر وکالت و مشاوره حقوقی بین‌المللی
            </span>
          </div>
        </div>

        {/* Desktop Menu - Exact from Figma node 5:281 */}
        <nav className="hidden md:flex items-center space-x-8 space-x-reverse text-sm font-medium text-[#D6D6D6]">
          <a href="#hero" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            صفحه اصلی
          </a>
          <a href="#services" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            خدمات ما
          </a>
          <a href="#testimonials" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            نظرات موکلین
          </a>
          <a href="#calculator" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100] flex items-center gap-1.5 text-[#FFD100]/90">
            <Calculator size={15} />
            محاسبه هزینه دادرسی
          </a>
          <a href="#faq" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            سوالات متداول
          </a>
          <a href="#articles" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            مقالات
          </a>
          <a href="#contact" className="hover:text-[#FFD100] transition-colors py-1 border-b-2 border-transparent hover:border-[#FFD100]">
            ارتباط با ما
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 space-x-reverse px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-bold text-xs shadow-lg hover:shadow-[#FFD100]/20 hover:scale-102 active:scale-98 transition cursor-pointer"
          >
            <CalendarCheck size={16} />
            <span>رزرو نوبت مشاوره</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#D6D6D6] hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#242424] border-b border-[#333533] px-6 py-4 space-y-3 animate-fade-in">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            صفحه اصلی
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            خدمات ما
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            نظرات موکلین
          </a>
          <a
            href="#calculator"
            onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
            className="block text-sm py-2 text-[#FFD100]"
          >
            محاسبه هزینه دادرسی
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            سوالات متداول
          </a>
          <a
            href="#articles"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            مقالات
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm py-2 text-white hover:text-[#FFD100]"
          >
            ارتباط با ما
          </a>
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center space-x-2 space-x-reverse py-3 rounded-xl bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-bold text-sm"
            >
              <CalendarCheck size={18} />
              <span>رزرو نوبت مشاوره</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
