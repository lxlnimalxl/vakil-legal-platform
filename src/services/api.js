// Hybrid API Service for Vakil Legal Platform
// Connects to Django REST backend (http://127.0.0.1:8000/api/)
// Gracefully falls back to deterministic local mock data for static GitHub Pages hosting.

const DJANGO_API_BASE = 'http://127.0.0.1:8000/api';

const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "حقوق شرکت‌ها و تجارت بین‌الملل",
    slug: "corporate-international-law",
    short_description: "تنظیم قراردادهای تجاری فرامرزی، مشاوره در ادغام و تملک، حاکمیت شرکتی و حل اختلافات سرمایه‌گذاری خارجی.",
    full_description: "ارائه خدمات تخصصی به هلدینگ‌ها و شرکت‌های بازرگانی در انعقاد قراردادهای بین‌المللی (Incoterms)، تاسیس شعب خارجی، انطباق با مقررات ارزی و بانکی، و داوری در اتاق بازرگانی بین‌المللی (ICC).",
    icon_name: "Briefcase",
    successful_cases: 184,
    order: 1
  },
  {
    id: 2,
    title: "دعاوی ملکی، سرقفلی و اراضی",
    slug: "real-estate-property-law",
    short_description: "وکالت در ابطال سند، الزام به تنظیم سند رسمی، تخلیه اماکن تجاری، حق کسب و پیشه و اراضی موات و منابع ملی.",
    full_description: "پیگیری تخصصی دعاوی پیچیده ثبتی، افراز و دستور فروش املاک مشاع، خلع ید، تصرف عدوانی، و تعیین ارزش سرقفلی در هیئت‌های کارشناسی رسمی دادگستری با استراتژی مدون دفاعی.",
    icon_name: "Building2",
    successful_cases: 245,
    order: 2
  },
  {
    id: 3,
    title: "دعاوی کیفری و جرایم اقتصادی",
    slug: "criminal-economic-defense",
    short_description: "دفاع تخصصی در دادگاه‌های انقلاب و کیفری یک در خصوص کلاهبرداری، اخلال در نظام اقتصادی، خیانت در امانت و جعل.",
    full_description: "حفاظت از حقوق متهمین و شاکیان در پرونده‌های کلان یقه سفیدها، جرایم رایانه‌ای، ارتشاء و اختلاس با تسلط کامل بر آیین دادرسی کیفری و اخذ برائت در شعب دیوان عالی کشور.",
    icon_name: "Scale",
    successful_cases: 139,
    order: 3
  },
  {
    id: 4,
    title: "داوری و قراردادهای پیمانکاری",
    slug: "arbitration-construction-contracts",
    short_description: "داوری در قراردادهای شرایط عمومی پیمان (نشریه ۴۳۱۱)، حل و فصل اختلافات ساختمانی و وصول مطالبات ارزی و ریالی.",
    full_description: "پذیرش داوری و وکالت در مراجع داوری داخلی (مرکز داوری اتاق ایران) و نهادهای داوری خارجی، مطالبه خسارت تاخیر تادیه، فسخ قرارداد و حل اختلافات مالیاتی و تامین اجتماعی پروژه‌ها.",
    icon_name: "FileSignature",
    successful_cases: 210,
    order: 4
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    client_name: "مهندس گلچهر شیرازی",
    client_title: "مدیرعامل هلدینگ توسعه فناوری پایدار",
    quote: "در پرونده پیچیده شراکت تجاری و داوری بین‌المللی با طرف خارجی، استراتژی حقوقی دقیق و دفاع مستدل ایشان مانع از ورود خسارت سنگین ارزی به مجموعه ما گردید. تعهد و اخلاق حرفه‌ای کم‌نظیر است.",
    rating: 5.0,
    avatar_url: "client-avatar.png",
    order: 1
  },
  {
    id: 2,
    client_name: "دکتر کامران افشار",
    client_title: "سرمایه‌گذار و انبوه‌ساز پروژه‌های عمرانی",
    quote: "پرونده ملکی اختلافی بر سر عرصه و اعیان پروژه ۱۲۰ واحدی که بیش از ۵ سال در دادگاه‌ها معطل مانده بود، با درایت و اشراف حقوقی ایشان در کمتر از ۸ ماه با رای قطعی به نفع ما مختومه شد.",
    rating: 5.0,
    avatar_url: "client-avatar.png",
    order: 2
  },
  {
    id: 3,
    client_name: "مهندس سارا رادمنش",
    client_title: "مدیر حقوقی شرکت تجهیزات پزشکی آریا",
    quote: "پاسخگویی سریع، تسلط مثال‌زدنی بر قوانین تجارت بین‌الملل و نگارش موشکافانه لوایح دفاعیه، ایشان را به یک مشاور حقوقی راهبردی برای سازمان ما تبدیل کرده است.",
    rating: 4.9,
    avatar_url: "client-avatar.png",
    order: 3
  }
];

const DEFAULT_FAQS = [
  {
    id: 1,
    question: "تعرفه و حق‌الوکاله پرونده‌ها بر چه اساسی تعیین می‌شود؟",
    answer: "حق‌الوکاله مطابق با آیین‌نامه تعرفه حق‌الوکاله وکلای دادگستری مصوب قوه قضائیه و با توافق مکتوب با موکل (قرارداد الکترونیک وکالت) بر مبنای پیچیدگی موضوع، مرحله رسیدگی (بدوی، تجدیدنظر یا دیوان عالی) و بهای خواسته تعیین می‌گردد و امکان پرداخت اقساطی متناسب با پیشرفت مراحل پرونده پیش‌بینی شده است.",
    category: "مالی و تعرفه",
    order: 1
  },
  {
    id: 2,
    question: "آیا امکان دریافت مشاوره حقوقی فوری به صورت آنلاین یا تلفنی وجود دارد؟",
    answer: "بله؛ از طریق سامانه رزرواسیون سایت می‌توانید زمان مشاوره آنلاین (تصویری) یا تلفنی را در تقویم رزرو کنید. پیش از جلسه، مدارک پرونده توسط کارشناسان بررسی اولیه شده تا در زمان مشاوره، راهکار عملی و مستند ارائه گردد.",
    category: "خدمات و مشاوره",
    order: 2
  },
  {
    id: 3,
    question: "مزیت شرط داوری در قراردادهای تجاری نسبت به طرح دعوا در مراجع دادگستری چیست؟",
    answer: "داوری دارای مزایای بنیادین از جمله سرعت بالاتر در صدور رای، محرمانگی کامل اطلاعات تجاری طرفین، انتخاب داور با تخصص موضوعی، و هزینه کمتر نسبت به فرآیندهای طولانی دادگستری است. همچنین رای داور از طریق دادگاه‌های عمومی لازم‌الاجراست.",
    category: "قراردادها و داوری",
    order: 3
  },
  {
    id: 4,
    question: "برای ارزیابی اولیه پرونده در جلسه مشاوره چه مدارکی باید همراه داشته باشیم؟",
    answer: "برای پرونده‌های ملکی: اسناد مالکیت، بنچاق، پایان‌کار و استعلامات ثبتی؛ برای پرونده‌های تجاری: اصل قراردادها، مکاتبات، صورت‌جلسات هیئت مدیره و فاکتورها؛ و برای دعاوی کیفری: شکواییه، صورت‌مجلس کلانتری و گزارش‌های ضابطین قضایی.",
    category: "مدارک و اقدامات",
    order: 4
  }
];

const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: "نکات طلایی در تنظیم قراردادهای بازرگانی بین‌المللی بر اساس اینکوترمز ۲۰۲۰",
    slug: "international-trade-contracts-incoterms",
    category: "تجارت بین‌الملل",
    summary: "بررسی خطرات انتقال ریسک، تعهدات بیمه و نحوه نگارش شروط حل و فصل اختلافات در مبادلات بازرگانی خارجی.",
    content: "در قراردادهای خرید و فروش بین‌المللی کالا، انتخاب اصطلاح تجاری مناسب (FOB, CIF, CFR, EXW) نه تنها تعیین‌کننده هزینه حمل و نقل، بلکه مشخص‌کننده لحظه دقیق انتقال ریسک تلف کالا از فروشنده به خریدار است. درج دقیق شرایط فورس ماژور و قانون حاکم بر قرارداد از بروز دعاوی پرهزینه جلوگیری می‌کند.",
    read_time_minutes: 6,
    author_name: "وکیل پایه یک دادگستری",
    is_featured: true,
    created_at: "۱۴۰۳/۱۱/۲۰"
  },
  {
    id: 2,
    title: "مراحل قانونی مطالبه و تخلیه اماکن تجاری دارای حق سرقفلی و کسب و پیشه",
    slug: "commercial-property-sarghofli-laws",
    category: "دعاوی ملکی",
    summary: "تفاوت‌های بنیادین قانون روابط موجر و مستاجر سال ۵۶ و ۷۶ و شرایط سلب حق سرقفلی مستاجر متخلف.",
    content: "حق سرقفلی و حق کسب و پیشه از پیچیده‌ترین مفاهیم حقوقی املاک تجاری در ایران هستند. طبق قانون ۵۶، صرف انقضای مدت قرارداد موجب تخلیه ملک نمی‌گردد مگر با اثبات جهات قانونی مانند تغییر شغل، تعدی و تفریط، یا نیاز شخصی موجر.",
    read_time_minutes: 8,
    author_name: "وکیل پایه یک دادگستری",
    is_featured: true,
    created_at: "۱۴۰۳/۱۱/۱۵"
  },
  {
    id: 3,
    title: "راهنمای جامع نحوه محاسبه خسارت تاخیر تادیه بر مبنای شاخص بهای کالا و خدمات",
    slug: "late-payment-interest-calculation-guide",
    category: "حقوق مدنی",
    summary: "نحوه فرمول‌بندی و احراز شرایط ماده ۵۲۲ قانون آیین دادرسی مدنی در محاکم دادگستری.",
    content: "مطابق ماده ۵۲۲ ق.آ.د.م، در دعاویی که موضوع آن دین و از نوع وجه رایج باشد، طلبکار می‌تواند علاوه بر اصل دین، خسارت تاخیر تادیه را بر مبنای تغییر شاخص سالانه بانک مرکزی مطالبه نماید، مشروط بر آنکه مطالبه قانونی کرده باشد و مدیون تمکن مالی داشته باشد.",
    read_time_minutes: 5,
    author_name: "وکیل پایه یک دادگستری",
    is_featured: false,
    created_at: "۱۴۰۳/۱۱/۱۰"
  }
];

async function fetchWithFallback(endpoint, options = {}, fallbackData = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${DJANGO_API_BASE}/${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    // Backend offline or running in static demo mode
  }
  return fallbackData;
}

export const api = {
  async getServices() {
    const data = await fetchWithFallback('services/', {}, DEFAULT_SERVICES);
    return data || DEFAULT_SERVICES;
  },

  async getTestimonials() {
    const data = await fetchWithFallback('testimonials/', {}, DEFAULT_TESTIMONIALS);
    return data || DEFAULT_TESTIMONIALS;
  },

  async getFAQs() {
    const data = await fetchWithFallback('faqs/', {}, DEFAULT_FAQS);
    return data || DEFAULT_FAQS;
  },

  async getArticles() {
    const data = await fetchWithFallback('articles/', {}, DEFAULT_ARTICLES);
    return data || DEFAULT_ARTICLES;
  },

  async bookConsultation(bookingData) {
    const res = await fetchWithFallback('consultations/', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }, null);

    if (res) return res;

    // Fallback local storage
    const stored = JSON.parse(localStorage.getItem('vakil_consultations') || '[]');
    const record = {
      id: Date.now(),
      ...bookingData,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    stored.push(record);
    localStorage.setItem('vakil_consultations', JSON.stringify(stored));
    return {
      message: 'نوبت مشاوره شما با موفقیت ثبت شد (حالت پایدار محلی). کد پیگیری: VKL-' + Math.floor(100000 + Math.random() * 900000),
      data: record
    };
  },

  async submitCaseEvaluation(caseData) {
    const res = await fetchWithFallback('cases/', {
      method: 'POST',
      body: JSON.stringify(caseData)
    }, null);

    if (res) return res;

    const stored = JSON.parse(localStorage.getItem('vakil_cases') || '[]');
    const record = {
      id: Date.now(),
      ...caseData,
      created_at: new Date().toISOString()
    };
    stored.push(record);
    localStorage.setItem('vakil_cases', JSON.stringify(stored));
    return {
      message: 'ارزیابی پرونده شما ثبت شد. کارشناسان حقوقی به زودی با شما تماس خواهند گرفت.',
      data: record
    };
  },

  calculateCourtFee(amountToman, stage = 'first_instance', claimType = 'financial') {
    if (claimType !== 'financial') {
      const baseFee = 150000;
      return {
        claim_type: 'دعاوی غیرمالی',
        stage: 'کلیه مراحل دادرسی',
        fee_toman: baseFee,
        fee_rial: baseFee * 10,
        formula_applied: 'تعرفه مقطوع دعاوی غیرمالی',
        electronic_service_fee_toman: 40000,
        total_estimated_toman: baseFee + 40000
      };
    }

    const amountRial = amountToman * 10;
    let feeRial = 0;
    let rateDesc = '';
    let stageLabel = '';

    if (stage === 'first_instance') {
      const thresholdRial = 200000000;
      if (amountRial <= thresholdRial) {
        feeRial = amountRial * 0.025;
        rateDesc = '۲.۵ درصد تا سقف ۲۰ میلیون تومان';
      } else {
        feeRial = (thresholdRial * 0.025) + ((amountRial - thresholdRial) * 0.035);
        rateDesc = '۲.۵ درصد تا ۲۰ میلیون تومان + ۳.۵ درصد نسبت به مازاد';
      }
      stageLabel = 'مرحله بدوی (دادگاه حقوقی)';
    } else if (stage === 'appeal') {
      feeRial = amountRial * 0.045;
      rateDesc = '۴.۵ درصد نسبت به بهای خواسته';
      stageLabel = 'مرحله تجدیدنظر';
    } else {
      feeRial = amountRial * 0.055;
      rateDesc = '۵.۵ درصد نسبت به بهای خواسته';
      stageLabel = 'مرحله فرجام‌خواهی و دیوان عالی';
    }

    const feeToman = Math.round(feeRial / 10);
    return {
      claim_type: 'دعاوی مالی',
      stage: stageLabel,
      claim_amount_toman: amountToman,
      fee_toman: feeToman,
      fee_rial: feeRial,
      formula_applied: rateDesc,
      electronic_service_fee_toman: 40000,
      total_estimated_toman: feeToman + 40000
    };
  }
};
