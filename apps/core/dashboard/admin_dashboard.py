from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def admin_dashboard(request):
    # Only admins should be here
    if request.user.role != 'admin':
        return redirect('dashboard')
    return render(request, 'pages/admin_dashboard.html')
