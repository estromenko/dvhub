"""Модуль, содержащий сериализаторы приложения api. """

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.api import models
from apps.repositories.models import Repository

User = get_user_model()


class PullRequestSerializer(serializers.ModelSerializer):
    """Сериализатор модели pull request'а. """

    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='owner',
        default=serializers.CurrentUserDefault(),
        write_only=True,
    )

    repository_id = serializers.PrimaryKeyRelatedField(
        queryset=Repository.objects.all(),
        source='repository',
        write_only=True,
    )

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.PullRequest
        fields = [
            'id', 'name', 'repository',
            'branch_from', 'branch_to',
            'owner', 'status', 'created_at',
            'comments',
            'owner_id', 'repository_id',
        ]
        depth = 2


class IssueSerializer(serializers.ModelSerializer):
    """Сериализатор модели Issue. """

    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='owner',
        default=serializers.CurrentUserDefault(),
        write_only=True,
    )

    repository_id = serializers.PrimaryKeyRelatedField(
        queryset=Repository.objects.all(),
        source='repository',
        write_only=True,
    )

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.Issue
        fields = [
            'id', 'name', 'repository',
            'owner', 'status', 'created_at',
            'comments',
            'owner_id', 'repository_id',
        ]
        depth = 2


class PullRequestCommentSerializer(serializers.ModelSerializer):
    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.PullRequestComment
        fields = serializers.ALL_FIELDS

class IssueCommentSerializer(serializers.ModelSerializer):
    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.IssueComment
        fields = serializers.ALL_FIELDS



class SSHKeySerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.SSHKey
        fields = serializers.ALL_FIELDS
