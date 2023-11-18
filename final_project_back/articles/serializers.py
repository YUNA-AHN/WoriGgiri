from rest_framework import serializers
from .models import Article, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        # read_only_fields = ('user', 'article')
        read_only_fields = ('article',)


class ArticleSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)

    class Meta:
        model = Article
        # fields = ("id", "title","created_at", "user", "like_users")
        # read_only_fields  = ('like_users',)
        read_only_fields  = ('like_users','user')

        fields = "__all__"
