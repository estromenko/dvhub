"""Модуль, содержащий сериализаторы приложения api. """

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.api import models
from apps.repositories.models import Repository

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор модели пользователя. """

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = User
        exclude = ['first_name', 'last_name', 'password']


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

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.PullRequest
        fields = [
            'id', 'name', 'repository',
            'owner', 'status', 'created_at',
            'comments',
        ]
        depth = 2
