from django.urls import path
from . import views


app_name = 'products'

urlpatterns = [
    path('deposit_products/', views.deposit_products, name='deposit_products' ),
    path('deposit_options/', views.deposit_options, name="deposit_options"),
    path('saving_products/', views.saving_products, name='saving_products' ),
    path('saving_options/', views.saving_options, name='saving_options' ),


    path('deposit_views/<str:pk>/', views.deposite_views),
    path('saving_views/<str:pk>/', views.saving_views),

    path("temp/", views.temp, name="temp"),

    path('save/', views.save_data, name='save_data'),

    path('recommendation/', views.deposit_recommend),
]
