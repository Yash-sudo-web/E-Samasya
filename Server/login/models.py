from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.timezone import now
from .managers import DFUserManager

# Create your models here.
class DFUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    phone = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=254)
    surname = models.CharField(max_length=254)
    email = models.EmailField(max_length=254)
    about = models.TextField()
    profile_img = models.ImageField(upload_to='media', blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=0)
    otp = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)



    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []

    objects = DFUserManager()

    def __str__(self):
        return str(self.phone)
