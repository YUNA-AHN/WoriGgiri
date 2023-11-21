from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view

from dj_rest_auth.views import UserDetailsView

from .serializers import UserSerializer, CustomUserDetailsSerializer

# # Create your views here.
# @api_view(['GET'])
# def profile(request, pk):
#     if request.method == "GET":
#         user = settings.AUTH_USER_MODEL.objects.get(pk=pk)
#         serializer = UserDetailsSerializer(user)
#         return Response(serializer.data)

# 회원 정보 가져오기
@api_view(['GET'])
def user_info(request):
    if request.method == "GET":
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
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