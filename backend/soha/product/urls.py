from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views
from .views import products,product_img


urlpatterns = [
   # path('verification/', include('verify_email')),
   #path('verify-email/', validateEmailToken, name="validateEmailToken"),
    path('', products, name="products"),
    #path('product_img/',product_img, name="product_img"),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
