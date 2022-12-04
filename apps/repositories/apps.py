from django.apps import AppConfig


class RepositoriesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.repositories'

    def ready(self) -> None:
        import apps.repositories.receivers  # pylint: disable=unused-import
