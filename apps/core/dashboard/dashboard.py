from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    # Only students should be here
    if request.user.role != 'student':
        return redirect('admin_dashboard')
    return render(request, 'pages/dashboard.html')
