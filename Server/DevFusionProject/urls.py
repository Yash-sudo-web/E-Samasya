from django.contrib import admin
from django.urls import path, include
from login.views import user_signin
from DFToken.views import get_token
from DFUser.views import UserViewSet
from django.conf import settings
from django.conf.urls.static import static
from Posts.views import PostViewSet, CommentViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/signin', user_signin),
    path('api/v1/gettoken', get_token),
    path('api/v1/user', UserViewSet.as_view({'get':'list'})),
    path('api/v1/user/<int:pk>', UserViewSet.as_view({'get':'list','patch':'partial_update','post':'create'})),
    path('api/v1/post', PostViewSet.as_view({'get':'list','post':'create'})),
    path('api/v1/post/<int:pk>', PostViewSet.as_view({'get':'list','patch':'partial_update'})),
    path('api/v1/comment', CommentViewSet.as_view({'get':'list','post':'create'})),
    path('api/v1/comment/<int:pk>', CommentViewSet.as_view({'get':'list'})),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)