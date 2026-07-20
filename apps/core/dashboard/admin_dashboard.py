from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from apps.core.models import Admin, Student, Exam, Attempt, Question


@login_required
def admin_dashboard(request):
    if request.user.role != 'admin':
        return redirect('dashboard')

    try:
        admin_profile = request.user.admin
    except Admin.DoesNotExist:
        admin_profile = None

    total_students = Student.objects.count()
    total_exams = Exam.objects.count()
    total_questions = Question.objects.count()
    total_attempts = Attempt.objects.count()

    # Avg score across all attempts
    all_attempts = Attempt.objects.filter(submitted_at__isnull=False)
    avg_score = 0
    if all_attempts.exists():
        avg_score = round(sum(a.percentage for a in all_attempts) / all_attempts.count(), 1)

    # Initials for avatar
    name = request.user.get_full_name() or request.user.username
    initials = ''.join(p[0].upper() for p in name.split()[:2])

    context = {
        'admin_profile': admin_profile,
        'total_students': total_students,
        'total_exams': total_exams,
        'total_questions': total_questions,
        'total_attempts': total_attempts,
        'avg_score': avg_score,
        'initials': initials,
        'display_name': request.user.first_name or request.user.username,
        'full_name': request.user.get_full_name() or request.user.username,
    }
    return render(request, 'pages/admin_dashboard.html', context)
