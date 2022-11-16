"""Модуль содержит конфигурацию URL'ов приложения api. """

from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.api import views

router = DefaultRouter()
router.register('repositories', views.RepositoryViewSet, basename='repository')
router.register('pulls', views.PullRequestViewSet, basename='pulls')
router.register('issues', views.IssueViewSet, basename='issues')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/current/', views.CurrentUserAPIView.as_view()),
    path('user/<int:pk>/pulls/', views.UserPullRequestsAPIView.as_view()),
    path('user/<int:pk>/repositories/', views.UserRepositoriesAPIView.as_view()),
    path('user/<int:pk>/repositories/', views.UserIssuesAPIView.as_view()),
    *router.urls,
]
