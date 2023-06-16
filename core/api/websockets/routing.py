from django.urls import re_path, path

from api.websockets.consumers import SearchGamesConsumer, GameConsumer, ChatConsumer


websockets_urlpatterns = [
    path(r"ws/search/", SearchGamesConsumer.as_asgi()),
    path(r"ws/game/<int:id>/", GameConsumer.as_asgi()),
    path(r"ws/game/<int:id>/chat/", ChatConsumer.as_asgi())
]