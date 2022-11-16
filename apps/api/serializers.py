"""Модуль, содержащий сериализаторы приложения api. """

from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.api import models

User = get_user_model()


class RepositorySerializer(serializers.ModelSerializer):
    """Сериализатор модели репозитория. """

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.Repository
        fields = ['id', 'name', 'owner', 'public', 'description', 'branches']
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор модели пользователя. """

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = User
        exclude = ['first_name', 'last_name', 'password']


class PullRequestSerializer(serializers.ModelSerializer):
    """Сериализатор модели pull request'а. """

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.PullRequest
        fields = [
            'id', 'name', 'repository',
            'branch_from', 'branch_to',
            'owner', 'status', 'created_at',
            'comments',
        ]
        depth = 2
