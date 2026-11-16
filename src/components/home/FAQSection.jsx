import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export default function FAQSection({ faqs, onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 lg:py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header with English Watermark (Figma node 10:71 & 10:72) */}
        <div className="text-center relative mb-14">
          <h3 className="font-serif-luxury font-black text-6xl sm:text-7xl lg:text-8xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#D6D6D6]/35 to-transparent select-none uppercase">
            FAQ
          </h3>
          <h2 className="text-3xl sm:text-4xl font-black text-[#D6D6D6] -mt-6 sm:-mt-8 relative z-10">
            سوالات متداول
          </h2>
          <div className="w-16 h-1 bg-[#FFD100] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Accordion Boxes - Exact from Figma Frame 9 (11:68) */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id || index}
                className="overflow-hidden rounded-[20px] transition-all duration-300"
                style={{
                  backgroundColor: '#261f00',
                  border: '1px solid #FFD100',
                  boxShadow: isOpen ? '0 0 20px rgba(255, 209, 0, 0.15)' : 'none'
                }}
              >
                {/* Header / Question bar */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-right transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {/* Gold Circular Chevron Icon */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                      style={{
                        backgroundColor: '#FFD100',
                        color: '#202020',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    >
                      <ChevronDown size={18} className="stroke-[2.5]" />
                    </div>

                    <span className="text-[#D6D6D6] font-medium text-sm sm:text-base leading-relaxed">
                      {faq.question}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#FFD100]/80 hidden sm:inline-block pr-2">
                    {faq.category}
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-[#FFD100]/20 animate-fade-in text-justify">
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-[#262626] border border-[#333533] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <h4 className="text-white font-bold text-sm">پاسخ سوال حقوقی خود را نیافتید؟</h4>
            <p className="text-xs text-stone-400 mt-1">مشاوران حقوقی دفتر آماده پاسخگویی و تعیین وقت ملاقات حضوری هستند.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-[#FFD100] text-[#202020] font-bold text-xs hover:bg-[#FFEE32] transition shrink-0 cursor-pointer"
          >
            طرح سوال در جلسه مشاوره
          </button>
        </div>

      </div>
    </section>
  );
}
