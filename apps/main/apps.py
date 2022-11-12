"""Модуль содержит конфигурацию приложения main. """

from django.apps import AppConfig


class MainConfig(AppConfig):
    """Класс конфигурации приложения main. """

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.main'
    verbose_name = 'Основной'
