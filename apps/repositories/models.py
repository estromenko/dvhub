"""Модуль, содержащий модели приложения repositories. """

from django.contrib.auth import get_user_model
from django.db import models
from apps.repositories.services import RepositoryService
from apps.repositories.utils import tree_to_list

User = get_user_model()


class Repository(models.Model):
    """Модель репозитория. """

    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=True)
    description = models.TextField()

    objects = models.Manager()

    @property
    def branches(self):
        repo = RepositoryService.get_repository(self.owner.username, self.name)
        return [branch.name for branch in repo.branches]

    @property
    def files(self):
        repo = RepositoryService.get_repository(self.owner.username, self.name)
        return tree_to_list(repo.tree())

    def __str__(self):
        return f'{self.owner.username}/{self.name}'

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        unique_together = ('name', 'owner')
        verbose_name_plural = 'Repositories'
