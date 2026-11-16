import React from 'react';
import { ArrowLeft, Briefcase, Building2, Scale, FileSignature, CheckCircle } from 'lucide-react';
import service3dIcon from '../../assets/images/service-3d.png';

const ICON_MAP = {
  Briefcase: Briefcase,
  Building2: Building2,
  Scale: Scale,
  FileSignature: FileSignature
};

export default function ServicesSection({ services, onSelectService }) {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title with English Watermark (Figma node 7:7 & 7:8) */}
        <div className="text-center relative mb-20">
          <h3 className="font-serif-luxury font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#D6D6D6]/35 to-transparent select-none uppercase">
            our services
          </h3>
          <h2 className="text-3xl sm:text-4xl font-black text-[#D6D6D6] -mt-6 sm:-mt-8 relative z-10">
            خدمات ما
          </h2>
          <div className="w-16 h-1 bg-[#FFD100] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Cards Grid - Matching Figma Frame 4 (10:66) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon_name] || Scale;

            return (
              <div
                key={service.id}
                className="group relative pt-16 flex flex-col items-center"
              >
                {/* Floating 3D Metallic Element - Protruding over the card (Figma node 10:14) */}
                <div className="absolute top-0 z-20 w-28 h-28 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <img
                    src={service3dIcon}
                    alt={service.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Card Container (Figma node 8:11 - rx:30, fill:#333533, gold gradient border) */}
                <div className="w-full bg-[#333533] rounded-[30px] p-6 pt-16 text-center border border-[#FFD100]/30 hover:border-[#FFD100] transition-all duration-300 shadow-xl group-hover:shadow-[0_20px_35px_rgba(255,209,0,0.12)] flex flex-col justify-between min-h-[300px]">
                  
                  <div>
                    {/* Category Title (Figma node 10:16) */}
                    <h3 className="text-white font-bold text-base sm:text-lg mb-3 leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description (Figma node 10:17) */}
                    <p className="text-[#D6D6D6] text-xs leading-relaxed line-clamp-3">
                      {service.short_description}
                    </p>
                  </div>

                  {/* Footer & Action */}
                  <div className="mt-6 pt-4 border-t border-stone-600/40">
                    <div className="flex items-center justify-between text-[11px] text-[#FFD100] mb-3">
                      <span>پرونده‌های موفق</span>
                      <span className="font-bold font-serif-luxury">{service.successful_cases}+</span>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#202020] hover:bg-[#FFD100] text-[#D6D6D6] hover:text-[#202020] font-bold text-xs flex items-center justify-center space-x-1.5 space-x-reverse transition-colors cursor-pointer"
                    >
                      <span>درخواست وکالت و مشاوره</span>
                      <ArrowLeft size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Assurance Banner */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-[#262626] via-[#333533]/80 to-[#262626] border border-[#FFD100]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-[#FFD100]/10 border border-[#FFD100]/30 flex items-center justify-center text-[#FFD100]">
              <CheckCircle size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">تضمین بالاترین استانداردهای اخلاق حرفه‌ای وکالت</h4>
              <p className="text-xs text-stone-400">انعقاد قرارداد الکترونیک در سامانه رسمی قوه قضائیه با حفظ کامل محرمانگی اسناد موکلین</p>
            </div>
          </div>
          <a
            href="tel:02188888888"
            className="px-5 py-2.5 rounded-xl bg-[#FFD100] text-[#202020] font-bold text-xs hover:bg-[#FFEE32] transition shrink-0"
          >
            مشاوره اضطراری تلفنی
          </a>
        </div>

      </div>
    </section>
  );
}
