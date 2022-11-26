"""Модуль содержит конфигурацию URL'ов проекта dvhub. """

from django.conf.urls import url

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include([
        path('auth/', include('apps.authentication.urls')),
        path('repositories/', include('apps.repositories.urls')),
        path('', include('apps.api.urls')),
    ])),
    path('_admin/', admin.site.urls),
    url(r'^(?!api).*', include('apps.main.urls')),
]
