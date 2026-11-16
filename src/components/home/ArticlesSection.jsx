import React from 'react';
import { BookOpen, Clock, ArrowLeft, Tag } from 'lucide-react';

export default function ArticlesSection({ articles, onSelectArticle }) {
  return (
    <section id="articles" className="py-16 lg:py-20 relative bg-[#242424]/60 border-t border-b border-[#333533]/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-full bg-[#FFD100]/10 border border-[#FFD100]/30 text-[#FFD100] text-xs font-bold mb-3">
            <BookOpen size={14} />
            <span>پایگاه دانش حقوقی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#D6D6D6]">
            مقالات و یادداشت‌های تخصصی وکیل
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-xl mx-auto">
            تحلیل کاربردی قوانین تجارت، املاک و آیین دادرسی مدنی جهت افزایش آگاهی حقوقی موکلین
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-[#262626] rounded-3xl p-6 border border-[#333533] hover:border-[#FFD100]/50 transition-all duration-300 flex flex-col justify-between shadow-xl group hover:-translate-y-1"
            >
              <div>
                {/* Category & Time */}
                <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-[#333533]">
                  <span className="flex items-center gap-1.5 text-[#FFD100] font-bold">
                    <Tag size={13} />
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock size={12} />
                    {art.read_time_minutes} دقیقه مطالعه
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#FFD100] transition-colors">
                  {art.title}
                </h3>

                {/* Summary */}
                <p className="text-stone-300 text-xs leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#333533] flex items-center justify-between">
                <span className="text-[11px] text-stone-500">{art.created_at}</span>
                <button
                  onClick={() => onSelectArticle(art)}
                  className="flex items-center space-x-1.5 space-x-reverse text-xs font-bold text-[#FFD100] hover:text-white transition cursor-pointer"
                >
                  <span>مطالعه متن کامل</span>
                  <ArrowLeft size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
