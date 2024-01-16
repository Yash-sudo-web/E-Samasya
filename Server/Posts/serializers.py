from rest_framework.serializers import ModelSerializer
from .models import Post, Comment
from rest_framework import serializers
from rest_flex_fields import FlexFieldsModelSerializer
from DFUser.serializers import UserViewSerializer

class CommentSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        expandable_fields = {
            'userId': UserViewSerializer
        }
        

class PostSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        expandable_fields = {
            'userId': UserViewSerializer,
            'Comment': (CommentSerializer, {'many': True})
        }
