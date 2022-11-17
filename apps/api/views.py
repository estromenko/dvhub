"""Модуль, содержащий вьюхи приложения api. """

from django.contrib.auth import get_user_model
from django.db.models.functions import Extract
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.api.models import Repository, PullRequest, Issue
from apps.api.permissions import IsAuthorOrReadOnly, IsPublic
from apps.api.serializers import (
    RepositorySerializer,
    UserSerializer,
    PullRequestSerializer,
    IssueSerializer,
)

User = get_user_model()


class RepositoryViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """ViewSet для управления репозиториями. """

    permission_classes = [IsAuthorOrReadOnly, IsPublic]
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer
    filterset_fields = ['name', 'owner__username']


class CurrentUserAPIView(generics.RetrieveAPIView):
    """Вьюха для получения информации о текущем пользователе. """

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserPullRequestsAPIView(generics.ListAPIView):
    """Вьюха для получения pull request'ов пользователя. """

    permission_classes = [IsAuthenticated]
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestSerializer

    def filter_queryset(self, queryset):
        lookup_period = self.request.GET.get('period')  # type: ignore
        lookup_value = self.request.GET.get('value')  # type: ignore

        queryset = self.get_queryset()
        if lookup_period and lookup_value:
            queryset = queryset.annotate(
                period=Extract('created_at', lookup_period),
            ).filter(period=lookup_value)

        return queryset.filter(owner_id=self.kwargs['pk'])


class UserRepositoriesAPIView(generics.ListAPIView):
    """Вьюха для получения репозиториев пользователя. """

    permission_classes = [IsAuthenticated]
    queryset = Repository.objects.all()
    serializer_class = RepositorySerializer

    def filter_queryset(self, request, *args, **kwargs):
        return self.queryset.filter(owner_id=self.kwargs['pk'])


class PullRequestViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """ViewSet для управления pull request'ами. """

    permission_classes = [IsAuthorOrReadOnly]
    queryset = PullRequest.objects.all()
    serializer_class = PullRequestSerializer
    filterset_fields = ['name', 'repository__name']


class IssueViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """ViewSet для управления issue'сами. """

    permission_classes = [IsAuthorOrReadOnly]
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    filterset_fields = ['name', 'repository__name']


class UserIssuesAPIView(generics.ListAPIView):
    """Вьюха для получения issue пользователя. """

    permission_classes = [IsAuthenticated]
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    def filter_queryset(self, request, *args, **kwargs):
        return self.queryset.filter(owner_id=self.kwargs['pk'])
