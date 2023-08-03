from rest_framework import serializers
from .models import Questions

class Questions_serializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'