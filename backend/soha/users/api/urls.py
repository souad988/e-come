from django.urls import path
from .views import CustomUserListView

urlpatterns = [
    path('', CustomUserListView.as_view()),


]
