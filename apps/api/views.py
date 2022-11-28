"""Модуль, содержащий вьюхи приложения api. """

from django.contrib.auth import get_user_model
from django.db.models.functions import Extract
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from apps.api.models import (
    PullRequest,
    Issue,
    PullRequestComment,
    SSHKey,
)
from apps.permissions import IsAuthorOrReadOnly, IsOwner
from apps.api.serializers import (
    PullRequestSerializer,
    IssueSerializer, PullRequestCommentSerializer,
    SSHKeySerializer,
)

User = get_user_model()


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


class PullRequestViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """ViewSet для управления pull request'ами. """

    permission_classes = [IsAuthorOrReadOnly]
    queryset = PullRequest.objects.order_by('-created_at')
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


class PullRequestCommentsAPIView(generics.ListCreateAPIView):
    queryset = PullRequestComment.objects.all()
    serializer_class = PullRequestCommentSerializer

    def get_queryset(self):
        return super().get_queryset().filter(pull_request_id=self.kwargs['pk'])


class SSHKeysViewSet(viewsets.ModelViewSet):
    queryset = SSHKey.objects.all()
    serializer_class = SSHKeySerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        return super().get_queryset().filter(owner_id=self.request.user.id)
