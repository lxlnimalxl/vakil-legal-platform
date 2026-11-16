from rest_framework import serializers
from .models import Service, ConsultationBooking, CaseEvaluation, Article, Testimonial, FAQ


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ConsultationBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationBooking
        fields = '__all__'


class CaseEvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseEvaluation
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
