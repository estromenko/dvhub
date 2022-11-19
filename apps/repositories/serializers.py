"""Модуль, содержащий сериализаторы приложения repositories. """

from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.repositories import models

User = get_user_model()


class RepositorySerializer(serializers.ModelSerializer):
    """Сериализатор модели репозитория. """

    def __init__(self, instance=None, data=serializers.empty, **kwargs):
        depth = 1 if instance else 0
        setattr(self.Meta, 'depth', depth)

        super().__init__(instance, data, **kwargs)

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = models.Repository
        fields = [
            'id', 'name', 'owner', 'public', 'description',
            'branches', 'files',
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'first_name', 'last_name']
