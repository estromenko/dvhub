"""Модуль, содержащий модели приложения api. """

from django.contrib.auth import get_user_model
from django.db import models

from apps.repositories.models import Repository

User = get_user_model()


class Issue(models.Model):
    """Модель issue. """

    STATUSES = (
        ('open', 'Open'),
        ('merged', 'Merged'),
        ('closed', 'Closed'),
    )

    name = models.CharField(max_length=512)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    status = models.CharField(max_length=64, choices=STATUSES)

    def __str__(self):
        return self.name


class IssueComment(models.Model):
    """Модель комментария к issue. """

    text = models.TextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
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
    branch_from = models.CharField(max_length=255)
    branch_to = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=64, choices=STATUSES, default='open')
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


class SSHKey(models.Model):
    """Модель ssh-ключа. """

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, unique=True)
    key = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
