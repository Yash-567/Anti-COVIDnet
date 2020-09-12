from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("<h1>Anti-COVIDnet</h1>")

def activateDetector(request):
    return HttpResponse("<h1>Activating detector</h1>")