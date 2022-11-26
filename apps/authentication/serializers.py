from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор модели пользователя. """

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        model = User
        exclude = ['first_name', 'last_name', 'password']
