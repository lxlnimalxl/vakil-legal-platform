import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Quote, Star } from 'lucide-react';
import clientAvatar from '../../assets/images/client-avatar.png';

export default function TestimonialsSection({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 2 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= testimonials.length - 2 ? 0 : prev + 1));
  };

  // Safe slice of 2 visible items
  const visibleItems = testimonials.slice(currentIndex, currentIndex + 2);
  if (visibleItems.length < 2 && testimonials.length >= 2) {
    visibleItems.push(testimonials[0]);
  }

  return (
    <section id="testimonials" className="relative my-12 lg:my-20">
      {/* Figma exact Polygon Shape SVG Background */}
      <div className="w-full bg-[#333533] relative py-12 px-6">
        {/* Angled top visual flair */}
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D6D6D6] tracking-tight">
              مشتریان درباره ما چه میگویند؟
            </h2>
            <div className="w-16 h-1 bg-[#FFD100] mx-auto mt-3 rounded-full" />
          </div>

          {/* Cards Carousel Container */}
          <div className="relative flex items-center justify-center">
            
            {/* Carousel Prev Button (Right side in RTL) */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute right-0 lg:-right-6 z-20 w-10 h-10 rounded-xl bg-[#D6D6D6] hover:bg-white text-[#202020] flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Testimonials Grid (2 cards displayed side by side as in Figma) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-10">
              {visibleItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-[#D6D6D6] text-[#202020] rounded-3xl p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Top Quote & Avatar Row */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <img
                          src={clientAvatar}
                          alt={item.client_name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#333533]/20 shadow-sm"
                        />
                        <div>
                          <h4 className="font-bold text-[#202020] text-sm sm:text-base leading-tight">
                            {item.client_name}
                          </h4>
                          <span className="text-xs text-stone-600 block mt-0.5">
                            {item.client_title}
                          </span>
                        </div>
                      </div>

                      <Quote className="text-[#333533]/25 w-8 h-8" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 space-x-reverse mb-3 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-stone-800 text-xs sm:text-sm leading-relaxed text-justify">
                      {item.quote}
                    </p>
                  </div>

                  {/* Verification pill */}
                  <div className="mt-4 pt-3 border-t border-stone-300/80 flex items-center justify-between text-[11px] text-stone-600">
                    <span className="font-medium">موکل تاییدشده</span>
                    <span className="text-emerald-700 font-bold">پرونده قطعی مختومه</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Next Button (Left side in RTL) */}
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute left-0 lg:-left-6 z-20 w-10 h-10 rounded-xl bg-[#D6D6D6] hover:bg-white text-[#202020] flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 space-x-reverse mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-[#FFD100]' : 'bg-[#D6D6D6]/40'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
