from django.shortcuts import render

# from rest_framework.response import Response
# from rest_framework.decorators import api_view
# from dj_rest_auth.serializers import UserDetailsSerializer

# from django.conf import settings

# # Create your views here.
# @api_view(['GET'])
# def profile(request, pk):
#     if request.method == "GET":
#         user = settings.AUTH_USER_MODEL.objects.get(pk=pk)
#         serializer = UserDetailsSerializer(user)
#         return Response(serializer.data)