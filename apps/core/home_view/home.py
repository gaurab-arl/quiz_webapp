from django.shortcuts import render, redirect


def home(request):
    # If already logged in, send to correct dashboard
    if request.user.is_authenticated:
        if request.user.role == 'student':
            return redirect('dashboard')
        return redirect('admin_dashboard')
    return render(request, 'index.html')
