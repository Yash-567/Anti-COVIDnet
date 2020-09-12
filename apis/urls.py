from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("activateDetector", views.activateDetector, name="activateDetector"),
    path("getViolationPercentage", views.getViolationPercentage, name="getViolationPercentage"),
    path("activateMask", views.activateMask, name="activateMask")
]