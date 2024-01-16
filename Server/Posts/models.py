from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='postImages',null=True,blank=True,default=None)
    userId = models.ForeignKey('login.DFUser',on_delete=models.CASCADE,unique=False,to_field='id',related_name='post_user_id')
    long = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0.0)
    locURL = models.TextField(default="")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    
class Comment(models.Model):
    content = models.TextField()
    postId = models.ForeignKey(Post,on_delete=models.CASCADE,unique=False,to_field='id',related_name='post_id')
    userId = models.ForeignKey('login.DFUser',on_delete=models.CASCADE,unique=False,to_field='id',related_name='comment_user_id')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
