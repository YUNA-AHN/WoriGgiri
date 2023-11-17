from django.urls import path
from . import views


app_name = 'products'

urlpatterns = [
    path('deposit_products/', views.deposit_products, name='deposit_products' ),
    # path('saving_products/', views.saving_products, name='saving_products' ),
]
