from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from apps.core.models import Student, Attempt, Question


@login_required
def dashboard(request):
    if request.user.role != 'student':
        return redirect('admin_dashboard')

    try:
        student = request.user.student
    except Student.DoesNotExist:
        student = None

    attempts = Attempt.objects.filter(student=student).order_by('-started_at') if student else Attempt.objects.none()
    total_attempts = attempts.count()
    avg_score = 0
    if total_attempts:
        avg_score = round(sum(a.percentage for a in attempts) / total_attempts, 1)

    recent_attempts = attempts[:5]

    # Categories that have questions available
    categories = Question.objects.values_list('category', flat=True).distinct()

    # Initials for avatar
    name = request.user.get_full_name() or request.user.username
    initials = ''.join(p[0].upper() for p in name.split()[:2])

    context = {
        'student': student,
        'total_attempts': total_attempts,
        'avg_score': avg_score,
        'recent_attempts': recent_attempts,
        'categories': list(categories),
        'initials': initials,
        'display_name': request.user.first_name or request.user.username,
    }
    return render(request, 'pages/dashboard.html', context)
