"""Модуль, содержащий модели приложения api. """

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Repository(models.Model):
    """Модель репозитория. """

    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    public = models.BooleanField(default=True)
    description = models.TextField()

    objects = models.Manager()

    def __str__(self):
        return f'{self.owner.username}/{self.name}'

    class Meta:  # pylint: disable=missing-class-docstring, too-few-public-methods
        unique_together = ('name', 'owner')
        verbose_name_plural = 'Repositories'


class Branch(models.Model):
    """Модель ветки. """

    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, related_name='branches')
    name = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.repository.owner.username}/{self.repository.name}@{self.name}'


class Issue(models.Model):
    """Модель issue. """

    name = models.CharField(max_length=512)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class IssueComment(models.Model):
    """Модель комментария к issue. """

    STATUSES = (
        ('open', 'Open'),
        ('merged', 'Merged'),
        ('closed', 'Closed'),
    )

    text = models.TextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    status = models.CharField(max_length=64, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.issue.name}: {self.owner.name}'


class PullRequest(models.Model):
    """Модель pull request'а. """

    STATUSES = (
        ('open', 'Open'),
        ('merged', 'Merged'),
        ('closed', 'Closed'),
    )

    name = models.CharField(max_length=255)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    branch_from = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='pulls_from')
    branch_to = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='pulls_to')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=64, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.repository.owner.username}/{self.repository.name}: {self.name}'


class PullRequestComment(models.Model):
    """Модель комментария к issue. """

    text = models.TextField()
    pull_request = models.ForeignKey(PullRequest, on_delete=models.CASCADE, related_name='comments')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (
            f'{self.pull_request.repository.owner.username}/'
            f'{self.pull_request.repository.name}: '
            f'{self.text}'
        )
