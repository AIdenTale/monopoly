from django.urls import path

from . import views

urlpatterns = [
    path("", view=views.index),
    path('search/', view=views.search_view),
    path('login/', view=views.search_view),
    path('register/', view=views.search_view),
    path('profile/', view=views.search_view),
    path('<int:game_id>', view=views.game_view)
]