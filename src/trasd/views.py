from django.http import StreamingHttpResponse
from django.shortcuts import render
from django.views.decorators.gzip import gzip_page
from trasd.services.scanner import VideoWebcam, generate_video
from .services import *

def home(request):
    """ View function for home page of site. """
    return render(request, 'home.html')

def about(request):
    """View function for about page of site."""
    return render(request, 'about.html')

def contact(request):
    """View function for contact page of site."""
    return render(request, 'contact.html')

INPUT_VIDEO = ""

def scanner(request):
    """ View function for the scanner page of the site. """
    try:
        INPUT_VIDEO.__del__()
    except:
        print("aaa")
    return render(request, 'scanner.html')


@gzip_page
def webcam_on(request):
    try:
        INPUT_VIDEO = VideoWebcam()
        print("e ok")
        return StreamingHttpResponse(generate_video(INPUT_VIDEO), content_type="multipart/x-mixed-replace;boundary=frame")
    except:
        print("aaaaaa")
