from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.repositories import views

router = DefaultRouter()
router.register('', views.RepositoryViewSet)

urlpatterns = [
    path('<str:username>/<str:name>/', views.RepositoryAPIView.as_view()),
    path('<str:username>/', views.UserRepositoriesAPIView.as_view()),
    *router.urls,
    url(r'^(?P<username>.+)/(?P<name>.+)/(?P<path>.*)', views.RepositoryFilesAPIView.as_view()),
]
