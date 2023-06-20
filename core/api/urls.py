from django.urls import path

from . import views

urlpatterns = [
    path('register/', view=views.register_view),
    path('user/', view=views.user_view),
    path('login/', view=views.login_view),
    path('get_user/ ', view=views.user_view)
]