from django.urls import path

from . import views

urlpatterns = [
    path('', views.user_info),
    path('update/', views.CustomUserDetailsView.as_view()),
    path('password/', views.password_change),
]
