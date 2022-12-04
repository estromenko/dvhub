from django.db.models.signals import post_delete
from django.dispatch import receiver

from apps.repositories.models import Repository
from apps.repositories.services import RepositoryService


@receiver(post_delete, sender=Repository)
def delete_repository_from_filesystem(instance, *_args, **_kwargs):
    RepositoryService.delete_repository(instance.owner.username, instance.name)
