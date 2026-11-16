from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ServiceViewSet,
    ConsultationBookingViewSet,
    CaseEvaluationViewSet,
    ArticleViewSet,
    TestimonialViewSet,
    FAQViewSet,
    calculate_court_fee
)

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'consultations', ConsultationBookingViewSet, basename='consultation')
router.register(r'cases', CaseEvaluationViewSet, basename='case')
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'faqs', FAQViewSet, basename='faq')

urlpatterns = [
    path('', include(router.urls)),
    path('calculate-court-fee/', calculate_court_fee, name='calculate_court_fee'),
]
