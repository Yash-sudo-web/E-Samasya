from django.shortcuts import render
from rest_flex_fields import FlexFieldsModelViewSet, is_expanded
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment
from DFToken.authentication import MultiTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend   
from rest_framework import filters
import django_filters as df
from rest_flex_fields.views import FlexFieldsMixin
from rest_framework import filters
from rest_framework import request
from .test import Gmailer
import threading


# Create your views here.
class PostViewSet(FlexFieldsMixin,ModelViewSet):
    authentication_classes = [MultiTokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['userId']
    search_fields = ['title','description']
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk:
            queryset = Post.objects.filter(id=pk)
        else:
            queryset = Post.objects.all()
        # print all data recieved
        print(self.request.data)
        if is_expanded(self.request, 'userId'):
            queryset = queryset.prefetch_related('userId')
        if is_expanded(self.request, 'Comment'):
            queryset = queryset.prefetch_related('Comment')
        return queryset
    
    # On reaching 25 upvotes print hello
    def perform_update(self, serializer):
        pk = self.kwargs.get('pk')
        if pk:
            serializer.save(id=pk)
        else:
            serializer.save(id=self.request.user.id)
        #  if upvotes field in request
        if 'upvotes' in self.request.data:
            if serializer.validated_data['upvotes'] == 25:
                # Get content from post
                post = Post.objects.get(id=pk)
                content = post.title + " " + post.description
                threading.Thread(target=self.send_mail_in_thread, args=(content,)).start()

    def send_mail_in_thread(self, content):
        if Gmailer(content):
            print("Sent Mail")
        else:
            print("Error")


class CommentViewSet(FlexFieldsModelViewSet):
    authentication_classes = [MultiTokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['postId','userId']
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk:
            queryset = Comment.objects.filter(postId=pk)
        else:
            queryset = Comment.objects.all()
        if is_expanded(self.request, 'userId'):
            queryset = queryset.prefetch_related('userId')
        if is_expanded(self.request, 'postId'):
            queryset = queryset.prefetch_related('postId')
        return queryset
