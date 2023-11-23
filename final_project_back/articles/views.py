from django.shortcuts import render, get_list_or_404, get_object_or_404

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Article, Comment
from .serializers import ArticleSerializer, ArticleSerializer, CommentSerializer, LikeArticleSerializer

from django.conf import settings

# Create your views here.
@api_view(['GET', "POST"])
def article_list(request):
    if request.method == "GET":
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            # serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
  
@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, pk):
    article = Article.objects.get(pk=pk)
    user = request.user
    if request.method == "GET":
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    elif request.method == "DELETE":
        if user == article.user:
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        if user == article.user:
            serializer = ArticleSerializer(article, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)


@api_view(['GET'])
def comment_list(request):
    if request.method == "GET":
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET', "DELETE", 'PUT'])
def comment_detail(request, pk):
    comment = Comment.objects.get(pk=pk)
    if request.method == "GET":
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    elif request.method == "DELETE":
        if request.user.is_authenticated:
            if request.user == comment.user:
                comment.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)



@api_view(['POST'])
def comment_create(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=request.user)
        # serializer.save(article=article)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def likes(request, pk):
    article = Article.objects.get(pk=pk)
    user = get_user_model().objects.get(username=request.user)

    if request.user.is_authenticated:
        if article.like_users.filter(id=user.id).exists():
            article.like_users.remove(user)
        else:
            article.like_users.add(user)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    

@api_view(['GET'])
def likes_articles(request):
    user = request.user
    serializer = LikeArticleSerializer(user)
    return Response(serializer.data)