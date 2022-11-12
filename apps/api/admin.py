"""Модуль содержащий конфигурацию админ панели приложения api. """

from django.contrib import admin
from apps.api import models


@admin.register(models.Repository)
class RepositoryAdmin(admin.ModelAdmin):
    """Админка репозиториев. """


@admin.register(models.Branch)
class BranchAdmin(admin.ModelAdmin):
    """Админка веток. """


@admin.register(models.PullRequest)
class PullRequestAdmin(admin.ModelAdmin):
    """Админка pull request'ов. """


@admin.register(models.PullRequestComment)
class PullRequestCommentAdmin(admin.ModelAdmin):
    """Админка комментариев к pull request'у. """


@admin.register(models.Issue)
class IssueAdmin(admin.ModelAdmin):
    """Админка issues. """


@admin.register(models.IssueComment)
class IssueCommentAdmin(admin.ModelAdmin):
    """Админка комментариев к issue. """
