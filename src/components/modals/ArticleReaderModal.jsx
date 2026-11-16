import React from 'react';
import { X, BookOpen, Clock, Tag, Calendar, User, Share2 } from 'lucide-react';

export default function ArticleReaderModal({ article, onClose, onOpenBooking }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in text-right">
      <div className="w-full max-w-2xl bg-[#262626] border border-[#333533] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333533] bg-[#202020]">
          <div className="flex items-center space-x-2 space-x-reverse text-xs text-[#FFD100]">
            <BookOpen size={16} />
            <span className="font-bold">{article.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#333533] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-4">
              {article.title}
            </h2>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pb-4 border-b border-[#333533]">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-[#FFD100]" />
                {article.author_name}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#FFD100]" />
                {article.created_at}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#FFD100]" />
                {article.read_time_minutes} دقیقه مطالعه
              </span>
            </div>
          </div>

          {/* Lead Summary */}
          <div className="p-4 rounded-2xl bg-[#333533]/50 border-r-4 border-[#FFD100] text-stone-200 text-xs sm:text-sm leading-relaxed font-medium">
            {article.summary}
          </div>

          {/* Full Content */}
          <div className="text-xs sm:text-sm text-stone-300 leading-loose space-y-4 text-justify">
            <p>{article.content}</p>
            <p>
              در نظام حقوقی کنونی، پیشگیری از وقوع اختلافات قراردادی از طریق نظارت مستمر وکیل متخصص در مراحل مذاکره و پیش‌نویس، همواره بسیار کم‌هزینه‌تر و مطمئن‌تر از ورود به دادرسی‌های طولانی‌مدت در محاکم عمومی دادگستری است. آگاهی از ظرایف و مواعد قانونی، ضامن صیانت از حقوق و دارایی‌های شما خواهد بود.
            </p>
          </div>

          {/* Need help banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#202020] to-[#262626] border border-[#FFD100]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm">نیاز به مشاوره پیرامون این موضوع دارید؟</h4>
              <p className="text-[11px] text-stone-400 mt-0.5">می‌توانید همین حالا وقت مشاوره حقوقی خود را رزرو فرمایید.</p>
            </div>
            <button
              onClick={() => { onClose(); onOpenBooking(); }}
              className="px-5 py-2.5 rounded-xl bg-[#FFD100] text-[#202020] font-bold text-xs hover:bg-[#FFEE32] transition shrink-0 cursor-pointer"
            >
              درخواست مشاوره فوری
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
