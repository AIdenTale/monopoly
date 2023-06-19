from django.urls import path

from . import views

urlpatterns = [
    path("", view=views.index),
    path('search/', view=views.search_view)
]