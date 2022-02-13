from django.shortcuts import render

def home(request):
    """View function for home page of site."""
    return render(request, 'home.html')

def about(request):
    """View function for about page of site."""
    return render(request, 'about.html')

def contact(request):
    """View function for contact page of site."""
    return render(request, 'contact.html')

def scanner(request):
    """View function for scanner page of site."""
    return render(request, 'scanner.html')