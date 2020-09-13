from django.urls import path
from . import views

urlpatterns = [
    path("activateThermal", views.activateThermal, name="activateThermal")
]