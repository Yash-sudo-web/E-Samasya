from rest_framework.serializers import ModelSerializer
from .models import MultiToken as Token


class TokenSerializer(ModelSerializer):
    class Meta:
        model = Token
        fields = ['user']