from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.authentication.serializers import UserSerializer


class CurrentUserAPIView(generics.RetrieveAPIView):
    """Вьюха для получения информации о текущем пользователе. """

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
