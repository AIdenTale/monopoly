from django.shortcuts import render
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login

# Create your views here.
def register_view(request):
    if request.body and request.method == "POST":
        data = json.loads(request.body)
        user = User.objects.create_user(**data)
        user = authenticate(request, username=data['username'], password=data['password'])
        print(user)
        if user is not None:
            login(request, user)
            return JsonResponse({
                "status" : "success"
            })
    return JsonResponse({
        "status" : 'bad'
    })

def login_view(request):
    if request.body:
        data = json.loads(request.body)
        user = authenticate(request, username=data['username'], password=data['password'])
        login(request, user)
        return JsonResponse({
            "status" : "success"
        })
        

    response = JsonResponse({
        "status" : "failed"
    })
    return response

def user_view(request):
    print(request.user)

    return JsonResponse({
        'user' : request.user.username
    })
