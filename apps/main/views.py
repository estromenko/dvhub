"""Модуль, содержащий вьюхи приложения main. """

from django.views.generic import TemplateView


class IndexView(TemplateView):
    """Главная вьюха, в которой загружается бандл приложения. """

    template_name = 'main/index.html'
