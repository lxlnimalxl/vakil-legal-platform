from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=200, verbose_name="عنوان خدمت")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="نامک")
    short_description = models.TextField(verbose_name="توضیح کوتاه")
    full_description = models.TextField(blank=True, verbose_name="شرح جامع خدمات")
    icon_name = models.CharField(max_length=50, default="Shield", verbose_name="آیکون")
    successful_cases = models.PositiveIntegerField(default=120, verbose_name="تعداد پرونده‌های موفق")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب نمایش")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "حوزه تخصصی وکالت"
        verbose_name_plural = "حوزه‌های تخصصی وکالت"

    def __str__(self):
        return self.title


class ConsultationBooking(models.Model):
    MEETING_TYPES = [
        ('in_person', 'حضوری در دفتر وکالت'),
        ('online', 'آنلاین (تصویری تخصصی)'),
        ('phone', 'مشاوره تلفنی فوری'),
    ]
    STATUS_CHOICES = [
        ('pending', 'در انتظار بررسی'),
        ('confirmed', 'تایید شده و ثبت در تقویم'),
        ('completed', 'مشاوره انجام شد'),
        ('cancelled', 'لغو شده'),
    ]

    full_name = models.CharField(max_length=150, verbose_name="نام و نام خانوادگی")
    phone = models.CharField(max_length=20, verbose_name="شماره تماس")
    email = models.EmailField(blank=True, verbose_name="پست الکترونیک")
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="موضوع پرونده")
    service_title = models.CharField(max_length=200, blank=True, verbose_name="عنوان موضوع")
    meeting_type = models.CharField(max_length=20, choices=MEETING_TYPES, default='in_person', verbose_name="نوع مشاوره")
    preferred_date = models.CharField(max_length=50, verbose_name="تاریخ انتخابی")
    preferred_time = models.CharField(max_length=50, verbose_name="ساعت انتخابی")
    brief_notes = models.TextField(blank=True, verbose_name="خلاصه ادعا یا سوال")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="وضعیت نوبت")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="زمان ثبت")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "نوبت مشاوره"
        verbose_name_plural = "نوبت‌های مشاوره"

    def __str__(self):
        return f"{self.full_name} - {self.preferred_date} ({self.get_meeting_type_display()})"


class CaseEvaluation(models.Model):
    URGENCY_CHOICES = [
        ('normal', 'عادی (ظرف ۴۸ ساعت)'),
        ('high', 'فوری (ظرف ۲۴ ساعت)'),
        ('critical', 'اضطراری (حضور در مراجع قضایی/مهلت دادخواست)'),
    ]

    full_name = models.CharField(max_length=150, verbose_name="نام متقاضی")
    phone = models.CharField(max_length=20, verbose_name="شماره همراه")
    case_category = models.CharField(max_length=100, verbose_name="شاخه حقوقی")
    dispute_amount = models.BigIntegerField(null=True, blank=True, verbose_name="ارزش مالی تقریبی خواسته (ریال)")
    case_summary = models.TextField(verbose_name="شرح وقایع پرونده")
    urgency = models.CharField(max_length=20, choices=URGENCY_CHOICES, default='normal', verbose_name="میزان اضطرار")
    has_contracts = models.BooleanField(default=False, verbose_name="دارای مستندات و قرارداد مکتوب")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="زمان ثبت")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "ارزیابی تخصصی پرونده"
        verbose_name_plural = "ارزیابی‌های تخصصی پرونده"

    def __str__(self):
        return f"{self.full_name} - {self.case_category}"


class Article(models.Model):
    title = models.CharField(max_length=250, verbose_name="عنوان مقاله")
    slug = models.SlugField(max_length=250, unique=True, verbose_name="نامک")
    category = models.CharField(max_length=100, verbose_name="دسته‌بندی حقوقی")
    summary = models.TextField(verbose_name="چکیده")
    content = models.TextField(verbose_name="متن کامل مقاله")
    read_time_minutes = models.PositiveIntegerField(default=5, verbose_name="مدت زمان مطالعه (دقیقه)")
    author_name = models.CharField(max_length=100, default="وکیل پایه یک دادگستری", verbose_name="نویسنده")
    is_featured = models.BooleanField(default=False, verbose_name="مقاله ویژه")
    created_at = models.DateField(auto_now_add=True, verbose_name="تاریخ انتشار")

    class Meta:
        ordering = ['-created_at']
        verbose_name = "مقاله حقوقی"
        verbose_name_plural = "مقالات حقوقی"

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    client_name = models.CharField(max_length=120, verbose_name="نام موکل")
    client_title = models.CharField(max_length=120, verbose_name="سمت / عنوان")
    quote = models.TextField(verbose_name="نظر موکل")
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0, verbose_name="امتیاز")
    avatar_url = models.CharField(max_length=250, blank=True, verbose_name="آدرس آواتار")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "نظر موکل"
        verbose_name_plural = "نظرات موکلین"

    def __str__(self):
        return f"{self.client_name} ({self.client_title})"


class FAQ(models.Model):
    question = models.CharField(max_length=300, verbose_name="پرسش متداول")
    answer = models.TextField(verbose_name="پاسخ مستند و حقوقی")
    category = models.CharField(max_length=100, default="عمومی", verbose_name="دسته‌بندی")
    order = models.PositiveIntegerField(default=0, verbose_name="ترتیب")

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "سوال متداول"
        verbose_name_plural = "سوالات متداول"

    def __str__(self):
        return self.question
