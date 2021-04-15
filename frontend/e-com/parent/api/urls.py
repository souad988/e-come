from django.urls import path
from .views import ParentListView, KidListView

urlpatterns = [
    path('', ParentListView.as_view()),
    path('kid', KidListView.as_view()),

]
