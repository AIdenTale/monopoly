from django.shortcuts import render
from channels.layers import get_channel_layer
from django.http import JsonResponse
# Create your views here.
import redis
import json

def index(request):
    return render(request, "main/index.html")

def search_view(request):
    return render(request, "main/index.html")