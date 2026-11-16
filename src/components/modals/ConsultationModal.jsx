import React, { useState } from 'react';
import { X, CalendarCheck, ShieldCheck, CheckCircle2, Video, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';

export default function ConsultationModal({ isOpen, onClose, services, initialService = null }) {
  const [meetingType, setMeetingType] = useState('in_person');
  const [selectedService, setSelectedService] = useState(initialService?.id || (services[0]?.id || 1));
  const [selectedDate, setSelectedDate] = useState('فردا (ساعت پذیرش عصر)');
  const [selectedTime, setSelectedTime] = useState('۱۶:۰۰ الی ۱۷:۰۰');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('لطفاً نام و نام خانوادگی و شماره تماس خود را وارد نمایید.');
      return;
    }

    setSubmitting(true);
    try {
      const currentServiceObj = services.find(s => s.id === Number(selectedService));
      const res = await api.bookConsultation({
        full_name: fullName,
        phone,
        email,
        service: Number(selectedService),
        service_title: currentServiceObj ? currentServiceObj.title : 'مشاوره عمومی',
        meeting_type: meetingType,
        preferred_date: selectedDate,
        preferred_time: selectedTime,
        brief_notes: notes
      });

      setSuccessData(res);
      // Trigger festive celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD100', '#FFEE32', '#FFFFFF', '#D6D6D6']
      });
    } catch (err) {
      alert('خطا در ثبت نوبت. لطفاً دوباره تلاش نمایید.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSuccessData(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in text-right">
      <div className="w-full max-w-xl bg-[#262626] border border-[#333533] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333533] bg-[#202020]">
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-[#FFD100]/20 border border-[#FFD100]/40 flex items-center justify-center text-[#FFD100]">
              <CalendarCheck size={18} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">رزرو وقت مشاوره حقوقی تخصصی</h3>
              <span className="text-[11px] text-stone-400">تنظیم مستقیم جلسه با وکیل پایه یک دادگستری</span>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#333533] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {successData ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold text-white">نوبت مشاوره شما با موفقیت ثبت شد</h3>
              <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                {successData.message}
              </p>

              <div className="p-4 rounded-2xl bg-[#1e1e1e] border border-[#333533] text-xs text-stone-300 space-y-2 text-right max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-400">متقاضی:</span>
                  <span className="font-bold text-white">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">موضوع:</span>
                  <span className="font-bold text-[#FFD100]">
                    {services.find(s => s.id === Number(selectedService))?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">نوع جلسه:</span>
                  <span className="font-bold text-white">
                    {meetingType === 'in_person' ? 'حضوری در دفتر ونک' : meetingType === 'online' ? 'مشاوره آنلاین تصویری' : 'مشاوره تلفنی فوری'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">زمان هماهنگ‌شده:</span>
                  <span className="font-bold text-[#FFD100]">{selectedDate} - {selectedTime}</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#FFD100] text-[#202020] font-bold text-xs hover:bg-[#FFEE32] transition cursor-pointer"
              >
                تایید و بازگشت به صفحه اصلی
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Meeting Type Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-2">
                  شیوه برگزاری جلسه مشاوره:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'in_person', label: 'حضوری در دفتر', icon: MapPin },
                    { id: 'online', label: 'آنلاین (ویدئویی)', icon: Video },
                    { id: 'phone', label: 'تلفنی فوری', icon: Phone }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMeetingType(m.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                          meetingType === m.id
                            ? 'bg-[#FFD100] text-[#202020] border-[#FFD100]'
                            : 'bg-[#1e1e1e] text-stone-400 border-[#333533] hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Service Category */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  حوزه و موضوع دعوا یا قرارداد:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#FFD100] outline-hidden"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    روز پیشنهادی:
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FFD100] outline-hidden"
                  >
                    <option value="فردا (ساعت پذیرش عصر)">فردا</option>
                    <option value="پس‌فردا">پس‌فردا</option>
                    <option value="شنبه آینده">شنبه آینده</option>
                    <option value="دوشنبه آینده">دوشنبه آینده</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    بازه زمانی مورد نظر:
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FFD100] outline-hidden"
                  >
                    <option value="۱۰:۰۰ الی ۱۱:۰۰ صبح">۱۰:۰۰ الی ۱۱:۰۰ صبح</option>
                    <option value="۱۲:۰۰ الی ۱۳:۰۰ ظهر">۱۲:۰۰ الی ۱۳:۰۰ ظهر</option>
                    <option value="۱۶:۰۰ الی ۱۷:۰۰ عصر">۱۶:۰۰ الی ۱۷:۰۰ عصر</option>
                    <option value="۱۸:۰۰ الی ۱۹:۰۰ عصر">۱۸:۰۰ الی ۱۹:۰۰ عصر</option>
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    نام و نام خانوادگی *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: سهراب رحمانی"
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FFD100] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5">
                    شماره تلفن همراه *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#FFD100] outline-hidden text-left"
                  />
                </div>
              </div>

              {/* Brief Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1.5">
                  خلاصه موضوع پرونده یا سوال حقوقی (اختیاری):
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="شرح مختصری از ادعا، قرارداد، یا مرحله فعلی رسیدگی در دادگاه..."
                  className="w-full bg-[#1e1e1e] border border-[#333533] rounded-xl px-3 py-2 text-xs text-white focus:border-[#FFD100] outline-hidden resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-bold text-xs hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'در حال ثبت نوبت در تقویم رسمی...' : 'تایید و نهایی‌سازی درخواست نوبت'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
