import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import ServicesSection from './components/home/ServicesSection';
import CourtFeeCalculator from './components/home/CourtFeeCalculator';
import FAQSection from './components/home/FAQSection';
import BrandsSection from './components/home/BrandsSection';
import ArticlesSection from './components/home/ArticlesSection';
import Footer from './components/layout/Footer';
import ConsultationModal from './components/modals/ConsultationModal';
import CaseEvaluationModal from './components/modals/CaseEvaluationModal';
import ArticleReaderModal from './components/modals/ArticleReaderModal';
import { api } from './services/api';
import { PhoneCall, CalendarCheck, ArrowUp } from 'lucide-react';

export default function App() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCaseEvalOpen, setIsCaseEvalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [srvs, tests, fqs, arts] = await Promise.all([
          api.getServices(),
          api.getTestimonials(),
          api.getFAQs(),
          api.getArticles()
        ]);
        setServices(srvs);
        setTestimonials(tests);
        setFaqs(fqs);
        setArticles(arts);
      } catch (err) {
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (service = null) => {
    setSelectedServiceForBooking(service);
    setIsBookingOpen(true);
  };

  const handleOpenCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#202020] text-[#D6D6D6] flex flex-col selection:bg-[#FFD100]/30 selection:text-white">
      {/* Top Engineering Indicator Pill */}
      <div className="bg-[#181818] border-b border-[#333533]/80 py-1.5 px-4 text-center text-[11px] text-stone-400 font-medium">
        <span>سامانه جامع خدمات وکالت و مشاوره حقوقی بین‌المللی — معماری فول‌استک (React 19 + Django REST Framework)</span>
      </div>

      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenBooking={() => handleOpenBooking(null)}
          onOpenCaseEvaluation={() => setIsCaseEvalOpen(true)}
        />

        <TestimonialsSection testimonials={testimonials} />

        <ServicesSection
          services={services}
          onSelectService={(s) => handleOpenBooking(s)}
        />

        <CourtFeeCalculator
          onOpenBooking={() => handleOpenBooking(null)}
        />

        <FAQSection
          faqs={faqs}
          onOpenBooking={() => handleOpenBooking(null)}
        />

        <BrandsSection />

        <ArticlesSection
          articles={articles}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking(null)}
        onOpenCalculator={handleOpenCalculator}
      />

      {/* Floating Emergency Consultation Action */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col items-center gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-[#262626] border border-[#333533] text-stone-300 hover:text-white hover:border-[#FFD100] flex items-center justify-center shadow-lg transition cursor-pointer"
          >
            <ArrowUp size={18} />
          </button>
        )}

        <button
          onClick={() => handleOpenBooking(null)}
          className="flex items-center space-x-2 space-x-reverse px-5 py-3 rounded-full bg-gradient-to-r from-[#FFD100] to-[#FFEE32] text-[#202020] font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          <CalendarCheck size={17} />
          <span>رزرو وقت مشاوره</span>
        </button>
      </div>

      {/* Modals */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        initialService={selectedServiceForBooking}
      />

      <CaseEvaluationModal
        isOpen={isCaseEvalOpen}
        onClose={() => setIsCaseEvalOpen(false)}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => handleOpenBooking(null)}
      />
    </div>
  );
}
