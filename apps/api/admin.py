"""Модуль содержащий конфигурацию админ панели приложения api. """

from django.contrib import admin
from apps.api import models


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


@admin.register(models.SSHKey)
class SSHKeyAdmin(admin.ModelAdmin):
    """Админка ssh-ключей. """
