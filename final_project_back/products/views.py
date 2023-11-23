from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
import requests
from . serializers import DepositProductsSerializer, DepositOptionsSerializer, SavingProductsSerializer, SavingOptionsSerializer
from . models import DepositProducts, DepositOptions, SavingProducts, SavingOptions
from accounts.models import User
from accounts.serializers import CustomUserDetailsSerializer

from django.contrib.auth import get_user_model
from django.db.models import Count, Max


# Create your views here.

@api_view(['GET'])
def temp(request):
    api_key = "f6d469a35ac51357c3e810f371a30641"
    url = f'http://finlife.fss.or.kr/finlifeapi/'
    
    params = {
        'auth' : api_key,
        'topFinGrpNo' : '020000',
        'pageNo' : 1,
    }
    saving = 'savingProductsSearch.json'
    saving_response = requests.get(url + saving, params=params).json()

    saving_option_list = saving_response.get('result').get('optionList')
    serializer = DepositOptionsSerializer(data=saving_option_list, many=True)
    if serializer.is_valid(raise_exception=True):
        return JsonResponse(saving_response)


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



@api_view(['GET'])
def deposit_products(request):
    products = DepositProducts.objects.all()
    print(products)
    # options = DepositOptions.objects.filter(fin_prdt_cd)
    serializer = DepositProductsSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def deposit_options(request):
    options = DepositOptions.objects.all()

    # options = DepositOptions.objects.filter(fin_prdt_cd)
    serializer = DepositOptionsSerializer(options, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def saving_products(request):
    products = SavingProducts.objects.all()

    # options = DepositOptions.objects.filter(fin_prdt_cd)
    serializer = SavingProductsSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def saving_options(request):
    options = SavingOptions.objects.all()

    # options = DepositOptions.objects.filter(fin_prdt_cd)
    serializer = SavingOptionsSerializer(options, many=True)
    return Response(serializer.data)


# 조회수를 위한!
@api_view(['POST'])
def deposite_views(request, pk):
    product = DepositProducts.objects.get(pk=pk)
    product.views_count += 1
    product.save()
    return Response(product.views_count)

@api_view(['POST'])
def saving_views(request, pk):
    product = SavingProducts.objects.get(pk=pk)
    product.views_count += 1
    product.save()
    return Response(product.views_count)

# 추천 알고리즘 : 이었던 것
@api_view(['POST'])
def deposit_recommend(request):
    user = get_user_model().objects.get(username=request.user)
    products = request.data.get('financial_products', '')
    age = request.data.get('age', '')
    money = request.data.get('money', '')
    salary = request.data.get('salary', '')

    # 부가 정보가 있는지 확인
    # 부가 정보가 하나도 없다면 => 금리 높은 순 추천!
    # 부가 정보가 하나라도 존재한다면 => 필터 걸고 for문 돌면서 products를 개수 세기

    # filter 걸어서 product에 존재하지 않는 친구들만 남기기
    if not products and not age and not money and not salary:
        pass
        # 상품별 우대금리가 가장 높은 옵션을 기준!
        # 예금 추천
        DepositOptions.objects.values("fin_prdt_cd").annotate(max_intr=Max("intr_rate2"))
        # 적금 추천
        SavingOptions.objects.values("fin_prdt_cd").annotate(max_intr=Max("intr_rate2"))

    else:
        pass
    # return Response({'data':products.split(',')})

    # return Response({'data' : DepositOptions.objects
    #                  .values("fin_prdt_cd")
    #                  .filter()
    #                  .annotate(max_intr=Max("intr_rate2"))
    #                  .order_by('-max_intr')[:3]})

    return Response({'data' : DepositProducts.objects
                     .values("fin_prdt_cd")
                    #  .filter()
                    #  .annotate(max_intr=Max("intr_rate2"))
                     .order_by('-views_count')[:3]})