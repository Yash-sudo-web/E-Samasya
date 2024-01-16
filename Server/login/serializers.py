from rest_framework.serializers import ModelSerializer
from .models import DFUser


class UserViewSerializer(ModelSerializer):
    class Meta:
        model = DFUser
        fields = ['id', 'phone', 'createdAt','otp']