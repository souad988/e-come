from django.urls import path,include
from rest_framework_simplejwt import views as jwt_views
from .views import MyObtainTokenPairView, CustomUserCreate,login
urlpatterns = [
   # path('verification/', include('verify_email')),
   #path('verify-email/', validateEmailToken, name="validateEmailToken"),
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('login/', login, name="login"),
    path('token/obtain/', MyObtainTokenPairView.as_view(),
         name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
]
