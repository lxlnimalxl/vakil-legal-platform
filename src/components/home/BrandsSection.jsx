import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Building } from 'lucide-react';
import brandsRowSvg from '../../assets/images/brands-row.svg';

export default function BrandsSection() {
  const brands = [
    { name: 'هلدینگ گلرنگ', label: 'Golrang Group', industry: 'صنایع تولیدی و بازرگانی' },
    { name: 'هلدینگ مپنا', label: 'MAPNA Group', industry: 'پیمانکاری و انرژی' },
    { name: 'دیجی‌کالا', label: 'Digikala', industry: 'تجارت الکترونیک' },
    { name: 'اسنپ', label: 'Snapp!', industry: 'فناوری اطلاعات و حمل‌ونقل' },
    { name: 'همراه اول', label: 'MCI', industry: 'مخابرات و ارتباطات' },
    { name: 'گروه مپنا', label: 'MAPNA', industry: 'پروژه‌های کلان زیرساختی' }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex(curr => (curr === 0 ? brands.length - 4 : curr - 1));
  };

  const next = () => {
    setStartIndex(curr => (curr >= brands.length - 4 ? 0 : curr + 1));
  };

  const visibleBrands = brands.slice(startIndex, startIndex + 5);
  while (visibleBrands.length < 5) {
    visibleBrands.push(brands[visibleBrands.length % brands.length]);
  }

  return (
    <section id="brands" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header with English Watermark (Figma node 11:96 & 11:97) */}
        <div className="text-center relative mb-14">
          <h3 className="font-serif-luxury font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#D6D6D6]/35 to-transparent select-none uppercase">
            Brands That Trusted Us
          </h3>
          <h2 className="text-2xl sm:text-4xl font-black text-[#D6D6D6] -mt-5 sm:-mt-8 relative z-10">
            برندهایی که به ما اعتماد کردند
          </h2>
          <div className="w-16 h-1 bg-[#FFD100] mx-auto mt-4 rounded-full" />
        </div>

        {/* Brands Carousel Container - Matching Figma Group 22 (11:145) */}
        <div className="relative flex items-center justify-center">
          
          {/* Right Arrow (Prev in RTL) */}
          <button
            onClick={prev}
            aria-label="Previous Brands"
            className="absolute right-0 lg:-right-6 z-20 w-9 h-9 rounded-xl bg-[#D6D6D6] hover:bg-white text-[#202020] flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>

          {/* Brands Grid (5 cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl px-8">
            {visibleBrands.map((brand, idx) => (
              <div
                key={`${brand.label}-${idx}`}
                className="bg-[#D6D6D6] hover:bg-white text-[#202020] rounded-2xl p-5 text-center flex flex-col items-center justify-center h-36 shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#333533]/10 flex items-center justify-center mb-2 text-[#333533] group-hover:text-red-700 transition">
                  <Building size={20} />
                </div>
                <div className="font-serif-luxury font-black text-lg text-red-700 tracking-wider">
                  {brand.label}
                </div>
                <div className="text-[11px] font-bold text-stone-700 mt-1">
                  {brand.name}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {brand.industry}
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow (Next in RTL) */}
          <button
            onClick={next}
            aria-label="Next Brands"
            className="absolute left-0 lg:-left-6 z-20 w-9 h-9 rounded-xl bg-[#D6D6D6] hover:bg-white text-[#202020] flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}
