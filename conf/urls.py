"""Модуль содержит конфигурацию URL'ов проекта dvhub. """

from django.conf.urls import url

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('apps.api.urls')),
    path('_admin/', admin.site.urls),
    url(r'^.*', include('apps.main.urls')),
]
