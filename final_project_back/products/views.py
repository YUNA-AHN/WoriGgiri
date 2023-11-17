from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
import requests
from . serializers import DepositProductsSerializer, DepositOptionsSerializer, SavingProductsSerializer, SavingOptionsSerializer
from . models import DepositProducts, DepositOptions, SavingProducts, SavingOptions

# Create your views here.


@api_view(['GET'])
def save_data(request):
    api_key = "f6d469a35ac51357c3e810f371a30641"
    url = f'http://finlife.fss.or.kr/finlifeapi/'
    
    params = {
        'auth' : api_key,
        'topFinGrpNo' : '020000',
        'pageNo' : 1,
    }

    deposit = 'depositProductsSearch.json'


    deposit_response = requests.get(url + deposit, params=params).json()
    deposit_base_list = deposit_response.get('result').get('baseList')
    deposit_option_list = deposit_response.get('result').get('optionList')
    # print(option_list)
    
    deposit_base_serializer = DepositProductsSerializer(data=deposit_base_list, many=True)
    if deposit_base_serializer.is_valid(raise_exception=True):
        deposit_base_serializer.save()
        # return Response(base_serializer.data)


    for deposit_option in deposit_option_list:
        deposit_option_serializer = DepositOptionsSerializer(data=deposit_option)
        if deposit_option_serializer.is_valid(raise_exception=True):
            deposit_product = DepositProducts.objects.get(fin_prdt_cd=deposit_option['fin_prdt_cd'])
            deposit_option_serializer.save(fin_prdt_cd=deposit_product)
    # return Response(deposit_option_serializer.data)

    saving = 'savingProductsSearch.json'

    saving_response = requests.get(url + saving, params=params).json()
    saving_base_list = saving_response.get('result').get('baseList')
    saving_option_list = saving_response.get('result').get('optionList')
    # print(option_list)
    
    saving_base_serializer = SavingProductsSerializer(data=saving_base_list, many=True)
    if saving_base_serializer.is_valid(raise_exception=True):
        saving_base_serializer.save()
        # return Response(base_serializer.data)


    for saving_option in saving_option_list:
        saving_option_serializer = SavingOptionsSerializer(data=saving_option)
        if saving_option_serializer.is_valid(raise_exception=True):
            saving_product = SavingProducts.objects.get(fin_prdt_cd=saving_option['fin_prdt_cd'])
            saving_option_serializer.save(fin_prdt_cd=saving_product)
    return Response(saving_option_serializer.data)




# @api_view(['GET'])
# def saving_products(request):
#     api_key = "f6d469a35ac51357c3e810f371a30641"
#     url = f'http://finlife.fss.or.kr/finlifeapi/'
#     saving = 'savingProductsSearch.json'
#     params = {
#         'auth' : api_key,
#         'topFinGrpNo' : '020000',
#         'pageNo' : 1,
#     }
#     saving_response = requests.get(url + saving, params=params).json()
#     saving_base_list = saving_response.get('result').get('baseList')
#     saving_option_list = saving_response.get('result').get('optionList')
#     # print(option_list)
    
#     saving_base_serializer = SavingProductsSerializer(data=saving_base_list, many=True)
#     if saving_base_serializer.is_valid(raise_exception=True):
#         saving_base_serializer.save()
#         # return Response(base_serializer.data)


#     for saving_option in saving_option_list:
#         saving_option_serializer = SavingOptionsSerializer(data=saving_option)
#         if saving_option_serializer.is_valid(raise_exception=True):
#             saving_product = SavingProducts.objects.get(fin_prdt_cd=saving_option['fin_prdt_cd'])
#             saving_option_serializer.save(fin_prdt_cd=saving_product)
#     return Response(saving_option_serializer.data)


@api_view(['GET'])
def deposit_products(request):
    products = DepositProducts.objects.all()

    # options = DepositOptions.objects.filter(fin_prdt_cd)
    serializer = DepositProductsSerializer(products, many=True)
    return Response(serializer.data)