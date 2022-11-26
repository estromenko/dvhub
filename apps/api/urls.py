"""Модуль содержит конфигурацию URL'ов приложения api. """

from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from apps.api import views

router = DefaultRouter()
router.register('pulls', views.PullRequestViewSet, basename='pulls')
router.register('issues', views.IssueViewSet, basename='issues')

urlpatterns = [
    path('user/<int:pk>/pulls/', views.UserPullRequestsAPIView.as_view()),
    *router.urls,
]
