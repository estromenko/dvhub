from django.conf import settings
from django.db import transaction
from django.views.static import serve
from rest_framework import views, viewsets, generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from apps.permissions import IsAuthorOrReadOnly, IsPublic
from apps.repositories.models import Repository

from apps.repositories.serializers import RepositorySerializer
from apps.repositories.services import RepositoryService


class BaseRepositoryAPIView(views.APIView):
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer


class RepositoryViewSet(BaseRepositoryAPIView, viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """ViewSet для управления репозиториями. """

    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly, IsPublic]
    filterset_fields = ['name', 'owner__username']

    def perform_create(self, serializer):
        with transaction.atomic():
            super().perform_create(serializer)
            RepositoryService.initialize_repository(
                self.request.user,
                serializer.validated_data['name'],
            )


class RepositoryAPIView(BaseRepositoryAPIView, generics.RetrieveUpdateDestroyAPIView):
    def get_object(self):
        return get_object_or_404(
            self.get_queryset(),
            owner__username=self.kwargs['username'],
            name=self.kwargs['name'],
        )


class UserRepositoriesAPIView(BaseRepositoryAPIView, generics.ListCreateAPIView):
    def filter_queryset(self, queryset):
        filtered_queryset = super().filter_queryset(queryset)
        return filtered_queryset.filter(owner__username=self.kwargs['username'])


class RepositoryFilesAPIView(BaseRepositoryAPIView):
    @staticmethod
    def get(request, username, name, path):
        repository_path = settings.REPOSITORIES_DIR / username / name
        return serve(request, path, document_root=repository_path, show_indexes=True)
