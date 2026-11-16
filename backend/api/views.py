from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Service, ConsultationBooking, CaseEvaluation, Article, Testimonial, FAQ
from .serializers import (
    ServiceSerializer,
    ConsultationBookingSerializer,
    CaseEvaluationSerializer,
    ArticleSerializer,
    TestimonialSerializer,
    FAQSerializer
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ConsultationBookingViewSet(viewsets.ModelViewSet):
    queryset = ConsultationBooking.objects.all()
    serializer_class = ConsultationBookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'message': 'درخواست مشاوره حقوقی شما با موفقیت ثبت شد و پیامک تایید ارسال گردید.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)


class CaseEvaluationViewSet(viewsets.ModelViewSet):
    queryset = CaseEvaluation.objects.all()
    serializer_class = CaseEvaluationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'message': 'اطلاعات پرونده شما با موفقیت دریافت شد. تیم ارزیابی حقوقی ظرف ۲۴ الی ۴۸ ساعت با شما تماس خواهند گرفت.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


@api_view(['POST'])
def calculate_court_fee(request):
    """
    محاسبه آنلاین و دقیق هزینه دادرسی دعاوی حقوقی
    بر اساس قانون آیین دادرسی مدنی و جدول تعرفه مصوب قوه قضائیه
    """
    try:
        data = request.data
        claim_type = data.get('claim_type', 'financial')
        stage = data.get('stage', 'first_instance')
        amount_toman = float(data.get('amount_toman', 0))

        if claim_type == 'financial':
            amount_rial = amount_toman * 10
            # محاسبات مرحله بدوی
            if stage == 'first_instance':
                threshold_rial = 200_000_000  # ۲۰۰ میلیون ریال (۲۰ میلیون تومان)
                if amount_rial <= threshold_rial:
                    fee_rial = amount_rial * 0.025
                    rate_desc = "۲.۵ درصد تا سقف ۲۰ میلیون تومان"
                else:
                    fee_rial = (threshold_rial * 0.025) + ((amount_rial - threshold_rial) * 0.035)
                    rate_desc = "۲.۵ درصد تا ۲۰ میلیون تومان + ۳.۵ درصد نسبت به مازاد"
                stage_label = "مرحله بدوی (دادگاه عمومی حقوقی)"
            elif stage == 'appeal':
                fee_rial = amount_rial * 0.045
                rate_desc = "۴.۵ درصد نسبت به بهای خواسته"
                stage_label = "مرحله تجدیدنظر"
            elif stage == 'supreme_court':
                fee_rial = amount_rial * 0.055
                rate_desc = "۵.۵ درصد نسبت به بهای خواسته"
                stage_label = "مرحله فرجام‌خواهی و اعاده دادرسی"
            else:
                fee_rial = amount_rial * 0.025
                rate_desc = "۲.۵ درصد"
                stage_label = "مرحله بدوی"

            fee_toman = fee_rial / 10
            law_reference = "بند ۱۲ ماده ۳ قانون وصول برخی از درآمدهای دولت و مصرف آن در موارد معین"

            return Response({
                'claim_type': 'مالی',
                'stage': stage_label,
                'claim_amount_toman': amount_toman,
                'fee_toman': round(fee_toman),
                'fee_rial': round(fee_rial),
                'formula_applied': rate_desc,
                'statutory_reference': law_reference,
                'electronic_service_fee_toman': 40000,
                'total_estimated_toman': round(fee_toman + 40000)
            })

        else:
            # دعاوی غیرمالی
            base_fee = 150000  # ۱۵۰ هزار تومان میانگین مصوب دعاوی غیرمالی
            return Response({
                'claim_type': 'غیرمالی (اعم از دعاوی خانوادگی، ابطال تمبر، ثبت احوال، تصرف عدوانی)',
                'stage': 'کلیه مراحل رسیدگی',
                'claim_amount_toman': 0,
                'fee_toman': base_fee,
                'fee_rial': base_fee * 10,
                'formula_applied': 'تعرفه مقطوع دعاوی غیرمالی',
                'statutory_reference': 'تعرفه مصوب بودجه سالانه و خدمات الکترونیک قضایی',
                'electronic_service_fee_toman': 40000,
                'total_estimated_toman': base_fee + 40000
            })

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
