from django.db import models

class Room(models.Model):
    creator = models.CharField(max_length=100)
    room_id = models.CharField(max_length=150)
    players = models.TextField()

class Game(models.Model):
    game_id = models.CharField(max_length=150)
    players = models.TextField()
