"""Модуль расширяет и перезаписывает settings.py через переменные окружения. """

import os

from dotenv import load_dotenv

from conf.settings import *  # pylint: disable=wildcard-import, unused-wildcard-import

load_dotenv()

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'

ALLOWED_HOSTS: list[str] = os.getenv('ALLOWED_HOSTS', '*').split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': os.getenv('PG_HOST', '127.0.0.1'),
        'PORT': os.getenv('PG_PORT', '5432'),
        'NAME': os.getenv('PG_NAME', 'dvhub'),
        'USER': os.getenv('PG_USER', 'postgres'),
        'PASSWORD': os.getenv('PG_PASSWORD', 'secret'),
    },
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DATETIME_FORMAT': '%Y-%m-%d %H:%M',
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
    ),
}

SIMPLE_JWT = {
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
}
