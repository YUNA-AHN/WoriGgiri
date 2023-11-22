from rest_framework import serializers
from .models import Article, Comment

from django.contrib.auth import get_user_model

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ('user', 'article')
        # read_only_fields = ('article',)


class ArticleSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    like_users = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')
    like_count = serializers.IntegerField(source='like_users.count', read_only=True)

    class Meta:
        model = Article
        # fields = ("id", "title","created_at", "user", "like_users")
        # read_only_fields  = ('like_users',)
        read_only_fields  = ('user', )

        fields = "__all__"

class LikeArticleSerializer(serializers.ModelSerializer):
    article_set =  ArticleSerializer(many=True, read_only=True)
    like_articles = ArticleSerializer(many=True, allow_null=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        # fields = ('username',)
        fields = "__all__"