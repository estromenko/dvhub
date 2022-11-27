from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication.serializers import (
    UserSerializer,
    RegistrationSerializer,
)

User = get_user_model()


class CurrentUserAPIView(generics.RetrieveAPIView):
    """Вьюха для получения информации о текущем пользователе. """

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterUserAPIView(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        user = User.objects.create_user(
            email=data['email'],
            username=data['username'],
            password=data['password'],
        )

        refresh = RefreshToken.for_user(user)

        response = {'refresh': str(refresh), 'access': str(refresh.access_token)}
        return Response(response, status=status.HTTP_201_CREATED)
