from django.contrib import admin
from .models import Post, Comment

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title','description','userId','image','createdAt','updatedAt','upvotes','downvotes','locURL')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','postId','userId','createdAt','updatedAt')