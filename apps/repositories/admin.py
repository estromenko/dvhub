"""Модуль содержащий конфигурацию админ панели приложения repositories. """

from django.contrib import admin
from apps.repositories import models


@admin.register(models.Repository)
class RepositoryAdmin(admin.ModelAdmin):
    """Админка репозиториев. """
