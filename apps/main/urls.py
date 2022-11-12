"""Модуль содержит конфигурацию URL'ов приложения main. """

from django.urls import path

from apps.main.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]
