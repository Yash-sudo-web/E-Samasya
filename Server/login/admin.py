from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import DFUser

# Register your models here.
@admin.register(DFUser)
class AdminUser(UserAdmin):
    fieldsets = (
        (None, {'fields': ('phone',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone','is_staff', 'is_active')}
         ),
    )
    list_filter = ['phone']
    list_display = [
        'id',
        'name',
        'surname',
        'phone',
        'email',
        'about',
        'profile_img',
        'otp',
        'createdAt'
    ]
    ordering = ['phone']
    search_fields = ('phone','name','surname',)
    filter_horizontal = ()