from django.core.management.base import BaseCommand
from api.models import Service, Article, Testimonial, FAQ, ConsultationBooking, CaseEvaluation


class Command(BaseCommand):
    help = "Seed authentic legal data for the Vakil Legal Counsel platform"

    def handle(self, *args, **options):
        self.stdout.write("Seeding legal data...")

        # Clear existing
        Service.objects.all().delete()
        Article.objects.all().delete()
        Testimonial.objects.all().delete()
        FAQ.objects.all().delete()

        # 1. Services (Matching Figma 4 cards + expanded)
        services_data = [
            {
                "title": "حقوق شرکت‌ها و تجارت بین‌الملل",
                "slug": "corporate-international-law",
                "short_description": "تنظیم قراردادهای تجاری فرامرزی، مشاوره در ادغام و تملک، حاکمیت شرکتی و حل اختلافات سرمایه‌گذاری خارجی.",
                "full_description": "ارائه خدمات تخصصی به هلدینگ‌ها و شرکت‌های بازرگانی در انعقاد قراردادهای بین‌المللی (Incoterms)، تاسیس شعب خارجی، انطباق با مقررات ارزی و بانکی، و داوری در اتاق بازرگانی بین‌المللی (ICC).",
                "icon_name": "Briefcase",
                "successful_cases": 184,
                "order": 1
            },
            {
                "title": "دعاوی ملکی، سرقفلی و اراضی",
                "slug": "real-estate-property-law",
                "short_description": "وکالت در ابطال سند، الزام به تنظیم سند رسمی، تخلیه اماکن تجاری، حق کسب و پیشه و اراضی موات و منابع ملی.",
                "full_description": "پیگیری تخصصی دعاوی پیچیده ثبتی، افراز و دستور فروش املاک مشاع، خلع ید، تصرف عدوانی، و تعیین ارزش سرقفلی در هیئت‌های کارشناسی رسمی دادگستری با استراتژی مدون دفاعی.",
                "icon_name": "Building2",
                "successful_cases": 245,
                "order": 2
            },
            {
                "title": "دعاوی کیفری و جرایم اقتصادی",
                "slug": "criminal-economic-defense",
                "short_description": "دفاع تخصصی در دادگاه‌های انقلاب و کیفری یک در خصوص کلاهبرداری، اخلال در نظام اقتصادی، خیانت در امانت و جعل.",
                "full_description": "حفاظت از حقوق متهمین و شاکیان در پرونده‌های کلان یقه سفیدها، جرایم رایانه‌ای، ارتشاء و اختلاس با تسلط کامل بر آیین دادرسی کیفری و اخذ برائت در شعب دیوان عالی کشور.",
                "icon_name": "Scale",
                "successful_cases": 139,
                "order": 3
            },
            {
                "title": "داوری و قراردادهای پیمانکاری",
                "slug": "arbitration-construction-contracts",
                "short_description": "داوری در قراردادهای شرایط عمومی پیمان (نشریه ۴۳۱۱)، حل و فصل اختلافات ساختمانی و وصول مطالبات ارزی و ریالی.",
                "full_description": "پذیرش داوری و وکالت در مراجع داوری داخلی (مرکز داوری اتاق ایران) و نهادهای داوری خارجی، مطالبه خسارت تاخیر تادیه، فسخ قرارداد و حل اختلافات مالیاتی و تامین اجتماعی پروژه‌ها.",
                "icon_name": "FileSignature",
                "successful_cases": 210,
                "order": 4
            }
        ]

        for s in services_data:
            Service.objects.create(**s)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(services_data)} Practice Areas"))

        # 2. Testimonials (Matching Figma reviews section)
        testimonials_data = [
            {
                "client_name": "مهندس گلچهر شیرازی",
                "client_title": "مدیرعامل هلدینگ توسعه فناوری پایدار",
                "quote": "در پرونده پیچیده شراکت تجاری و داوری بین‌المللی با طرف خارجی، استراتژی حقوقی دقیق و دفاع مستدل ایشان مانع از ورود خسارت سنگین ارزی به مجموعه ما گردید. تعهد و اخلاق حرفه‌ای کم‌نظیر است.",
                "rating": 5.0,
                "avatar_url": "client-avatar.png",
                "order": 1
            },
            {
                "client_name": "دکتر کامران افشار",
                "client_title": "سرمایه‌گذار و انبوه‌ساز پروژه‌های عمرانی",
                "quote": "پرونده ملکی اختلافی بر سر عرصه و اعیان پروژه ۱۲۰ واحدی که بیش از ۵ سال در دادگاه‌ها معطل مانده بود، با درایت و اشراف حقوقی ایشان در کمتر از ۸ ماه با رای قطعی به نفع ما مختومه شد.",
                "rating": 5.0,
                "avatar_url": "client-avatar.png",
                "order": 2
            },
            {
                "client_name": "مهندس سارا رادمنش",
                "client_title": "مدیر حقوقی شرکت تجهیزات پزشکی آریا",
                "quote": "پاسخگویی سریع، تسلط مثال‌زدنی بر قوانین تجارت بین‌الملل و نگارش موشکافانه لوایح دفاعیه، ایشان را به یک مشاور حقوقی راهبردی برای سازمان ما تبدیل کرده است.",
                "rating": 4.9,
                "avatar_url": "client-avatar.png",
                "order": 3
            }
        ]

        for t in testimonials_data:
            Testimonial.objects.create(**t)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(testimonials_data)} Testimonials"))

        # 3. FAQs (Matching Figma 4 FAQ boxes)
        faqs_data = [
            {
                "question": "تعرفه و حق‌الوکاله پرونده‌ها بر چه اساسی تعیین می‌شود؟",
                "answer": "حق‌الوکاله مطابق با آیین‌نامه تعرفه حق‌الوکاله وکلای دادگستری مصوب قوه قضائیه و با توافق مکتوب با موکل (قرارداد الکترونیک وکالت) بر مبنای پیچیدگی موضوع، مرحله رسیدگی (بدوی، تجدیدنظر یا دیوان عالی) و بهای خواسته تعیین می‌گردد و امکان پرداخت اقساطی متناسب با پیشرفت مراحل پرونده پیش‌بینی شده است.",
                "category": "مالی و تعرفه",
                "order": 1
            },
            {
                "question": "آیا امکان دریافت مشاوره حقوقی فوری به صورت آنلاین یا تلفنی وجود دارد؟",
                "answer": "بله؛ از طریق سامانه رزرواسیون سایت می‌توانید زمان مشاوره آنلاین (تصویری) یا تلفنی را در تقویم رزرو کنید. پیش از جلسه، مدارک پرونده توسط کارشناسان بررسی اولیه شده تا در زمان مشاوره، راهکار عملی و مستند ارائه گردد.",
                "category": "خدمات و مشاوره",
                "order": 2
            },
            {
                "question": "مزیت شرط داوری در قراردادهای تجاری نسبت به طرح دعوا در مراجع دادگستری چیست؟",
                "answer": "داوری دارای مزایای بنیادین از جمله سرعت بالاتر در صدور رای، محرمانگی کامل اطلاعات تجاری طرفین، انتخاب داور با تخصص موضوعی، و هزینه کمتر نسبت به فرآیندهای طولانی دادگستری است. همچنین رای داور از طریق دادگاه‌های عمومی لازم‌الاجراست.",
                "category": "قراردادها و داوری",
                "order": 3
            },
            {
                "question": "برای ارزیابی اولیه پرونده در جلسه مشاوره چه مدارکی باید همراه داشته باشیم؟",
                "answer": "برای پرونده‌های ملکی: اسناد مالکیت، بنچاق، پایان‌کار و استعلامات ثبتی؛ برای پرونده‌های تجاری: اصل قراردادها، مکاتبات، صورت‌جلسات هیئت مدیره و فاکتورها؛ و برای دعاوی کیفری: شکواییه، صورت‌مجلس کلانتری و گزارش‌های ضابطین قضایی.",
                "category": "مدارک و اقدامات",
                "order": 4
            }
        ]

        for f in faqs_data:
            FAQ.objects.create(**f)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(faqs_data)} FAQs"))

        # 4. Articles
        articles_data = [
            {
                "title": "نکات طلایی در تنظیم قراردادهای بازرگانی بین‌المللی بر اساس اینکوترمز ۲۰۲۰",
                "slug": "international-trade-contracts-incoterms",
                "category": "تجارت بین‌الملل",
                "summary": "بررسی خطرات انتقال ریسک، تعهدات بیمه و نحوه نگارش شروط حل و فصل اختلافات در مبادلات بازرگانی خارجی.",
                "content": "در قراردادهای خرید و فروش بین‌المللی کالا، انتخاب اصطلاح تجاری مناسب (FOB, CIF, CFR, EXW) نه تنها تعیین‌کننده هزینه حمل و نقل، بلکه مشخص‌کننده لحظه دقیق انتقال ریسک تلف کالا از فروشنده به خریدار است...",
                "read_time_minutes": 6,
                "author_name": "وکیل پایه یک دادگستری",
                "is_featured": True
            },
            {
                "title": "مراحل قانونی مطالبه و تخلیه اماکن تجاری دارای حق سرقفلی و کسب و پیشه",
                "slug": "commercial-property-sarghofli-laws",
                "category": "دعاوی ملکی",
                "summary": "تفاوت‌های بنیادین قانون روابط موجر و مستاجر سال ۵۶ و ۷۶ و شرایط سلب حق سرقفلی مستاجر متخلف.",
                "content": "حق سرقفلی و حق کسب و پیشه از پیچیده‌ترین مفاهیم حقوقی املاک تجاری در ایران هستند. طبق قانون ۵۶، صرف انقضای مدت قرارداد موجب تخلیه ملک نمی‌گردد مگر با اثبات جهات قانونی...",
                "read_time_minutes": 8,
                "author_name": "وکیل پایه یک دادگستری",
                "is_featured": True
            },
            {
                "title": "راهنمای جامع نحوه محاسبه خسارت تاخیر تادیه بر مبنای شاخص بهای کالا و خدمات",
                "slug": "late-payment-interest-calculation-guide",
                "category": "حقوق مدنی",
                "summary": "نحوه فرمول‌بندی و احراز شرایط ماده ۵۲۲ قانون آیین دادرسی مدنی در محاکم دادگستری.",
                "content": "مطابق ماده ۵۲۲ ق.آ.د.م، در دعاویی که موضوع آن دین و از نوع وجه رایج باشد، طلبکار می‌تواند علاوه بر اصل دین، خسارت تاخیر تادیه را بر مبنای تغییر شاخص سالانه بانک مرکزی مطالبه نماید...",
                "read_time_minutes": 5,
                "author_name": "وکیل پایه یک دادگستری",
                "is_featured": False
            }
        ]

        for a in articles_data:
            Article.objects.create(**a)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(articles_data)} Articles"))

        self.stdout.write(self.style.SUCCESS("All legal data seeded successfully!"))
