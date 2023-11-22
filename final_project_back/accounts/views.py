from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from dj_rest_auth.views import UserDetailsView

from .serializers import UserSerializer, CustomUserDetailsSerializer

# 회원 정보 가져오기
@api_view(['GET'])
def user_info(request):
    if request.method == "GET":
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
# 회원 정보 수정
class CustomUserDetailsView(UserDetailsView):
    serializer_class = CustomUserDetailsSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def perform_update(self, serializer):
        serializer.save()

# 비밀번호 변경
@api_view(['POST'])
def password_change(request):
    user = request.user
    password = request.data.get('password','')
    origin_password = user.password
    newpassword1= request.data.get('newpassword1','')
    newpassword2= request.data.get('newpassword2','')
    
    # 기존 비밀번호와 입력 비밀번호가 동일한지 체크
    if password and check_password(password,origin_password):
        # 새 비밀번호 입력 확인 및 동일한지 체크
        if newpassword1 and newpassword2 and newpassword1 == newpassword2:
            user.set_password(newpassword1)
            user.save()
            return Response({'success' : '비밀번호가 변경되었습니다.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': '새 비밀번호를 바르게 입력해주세요.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': '비밀번호가 틀렸습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def product_join(request):
    if request.method == 'PUT':
        serializer = CustomUserDetailsSerializer(request.PUT, instance=request.user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)