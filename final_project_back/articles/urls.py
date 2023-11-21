from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.article_list),
    path('<int:pk>/', views.article_detail),
    path('comments/', views.comment_list),
    path('comments/<int:pk>/', views.comment_detail),
    path('createcomments/<int:article_pk>/', views.comment_create),
    path('<int:pk>/likes/', views.likes),
]
