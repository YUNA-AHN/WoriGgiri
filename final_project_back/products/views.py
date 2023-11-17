from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
import requests
from . serializers import DepositProductsSerializer, DepositOptionsSerializer, SavingOptionsSerializer, SavingOptionsSerializer
from . models import DepositProducts, DepositOptions, SavingProducts, SavingOptions

# Create your views here.


@api_view(['GET'])
def deposit_products(request):
    api_key = "f6d469a35ac51357c3e810f371a30641"
    url = f'http://finlife.fss.or.kr/finlifeapi/depositProductsSearch.json'
    params = {
        'auth' : api_key,
        'topFinGrpNo' : '020000',
        'pageNo' : 1,
    }
    response = requests.get(url, params=params).json()
    base_list = response.get('result').get('baseList')
    option_list = response.get('result').get('optionList')
    print(option_list)
    
    base_serializer = DepositProductsSerializer(data=base_list, many=True)
    if base_serializer.is_valid(raise_exception=True):
        base_serializer.save()
        return Response(base_serializer.data)


    for option in option_list:
        option_serializer = DepositOptionsSerializer(data=option)
        if option_serializer.is_valid(raise_exception=True):
            deposit_product = DepositProducts.objects.get(fin_prdt_cd=option['fin_prdt_cd'])
            option_serializer.save(fin_prdt_cd=deposit_product)
            return Response(option_serializer.data)

    