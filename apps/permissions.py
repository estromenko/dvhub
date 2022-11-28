"""Модуль, содержащий права. """

from rest_framework import permissions


class IsAuthorOrReadOnly(permissions.BasePermission):
    """Право на редактирование сущностей только для автора. """

    def has_object_permission(self, request, view, obj):
        return request.method in permissions.SAFE_METHODS or obj.owner == request.user


class IsPublic(permissions.BasePermission):
    """Право на просмотр только публичных сущностей и приватных для автора. """

    def has_object_permission(self, request, view, obj):
        return obj.public or obj.owner == request.user


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
