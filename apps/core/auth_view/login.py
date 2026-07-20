from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout as auth_logout


def login(request):
    if request.user.is_authenticated:
        return redirect('dashboard' if request.user.role == 'student' else 'admin_dashboard')

    if request.method == 'POST':
        email    = request.POST.get('user_email', '').strip()
        password = request.POST.get('user_password', '')

        if not email or not password:
            return render(request, 'pages/login.html', {
                'error': 'Please fill in both fields.',
                'old_email': email,
            })

        # Django's authenticate uses username; look up by email first
        from apps.core.models import User
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            return render(request, 'pages/login.html', {
                'error': 'No account found with that email.',
                'old_email': email,
            })

        user = authenticate(request, username=username, password=password)

        if user is None:
            return render(request, 'pages/login.html', {
                'error': 'Incorrect password.',
                'old_email': email,
            })

        auth_login(request, user)
        # Redirect to the page they were trying to visit, or by role
        next_url = request.GET.get('next')
        if next_url:
            return redirect(next_url)
        return redirect('dashboard' if user.role == 'student' else 'admin_dashboard')

    return render(request, 'pages/login.html')


def logout(request):
    auth_logout(request)
    return redirect('login')
