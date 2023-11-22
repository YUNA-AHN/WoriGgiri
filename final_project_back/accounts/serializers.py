from rest_framework import serializers
from allauth.account import app_settings as allauth_settings
from allauth.utils import get_username_max_length
from allauth.account.adapter import get_adapter
from .models import User
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer


class UserSerializer(serializers.ModelSerializer):
    model = get_user_model()
    fields = ('id', 'username', 'email', 'age', 'money', 'salary', 'financial_products',)
    

class CustomRegisterSerializer(RegisterSerializer):
# 추가할 필드들을 정의합니다.
    nickname = serializers.CharField(
    required=False,
    allow_blank=True,
    max_length=255
    )
    email = serializers.EmailField(required=False)
    age = serializers.IntegerField(required=False)
    money = serializers.IntegerField(required=False)
    salary = serializers.IntegerField(required=False)
    financial_products = serializers.ListField(child=serializers.ListField(), required=False)
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'age': self.validated_data.get('age', ''),
            'money': self.validated_data.get('money', ''),
            'salary': self.validated_data.get('salary', ''),
            'financial_products': self.validated_data.get('financial_products', []),
        }
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nickname','age','money','salary','financial_products']

class CustomUserDetailsSerializer(UserDetailsSerializer):
    nickname = serializers.CharField(
    required=False,
    allow_blank=True,
    max_length=255
    )
    email = serializers.EmailField(required=False)
    age = serializers.IntegerField(required=False)
    money = serializers.IntegerField(required=False)
    salary = serializers.IntegerField(required=False)
    financial_products = serializers.ListField(child=serializers.ListField(), required=False)

    class Meta(UserDetailsSerializer.Meta):
        # 기본 : pk, username, email, first_name, last_name
        fields = UserDetailsSerializer.Meta.fields + ('nickname','age', 'money', 'salary', 'financial_products')
        read_only_fields = ('username',)

    # override
    def get_cleaned_data(self):
        # username, password, email이 디폴트
        data_dict = super().get_cleaned_data() 
        data_dict['age'] = self.validated_data.get('age', None)
        data_dict['money'] = self.validated_data.get('money', None)
        data_dict['salary'] = self.validated_data.get('salary', None)
        data_dict['financial_products'] = self.validated_data.get('financial_products', None)
        return data_dict
    
    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        instance.age = validated_data.get('age', None)
        instance.money = validated_data.get('money', instance.money)
        instance.salary = validated_data.get('salary', instance.salary)
        instance.financial_products = validated_data.get('financial_products')
        instance.save()
        return instance
    
    def save(self):
        user = super().save()
        user.age = self.validated_data.get('age')
        user.money = self.validated_data.get('money')
        user.salary = self.validated_data.get('salary')
        user.financial_products = self.validated_data.get('financial_products', [])
        return user
    
