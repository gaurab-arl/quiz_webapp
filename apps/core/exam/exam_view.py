import random
from datetime import datetime, timezone

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone as dj_timezone
from django.contrib import messages

from apps.core.models import (
    Student, Question, Exam, ExamQuestion, Attempt, AttemptAnswer
)


# ── Helpers ────────────────────────────────────────────────

CATEGORY_LABELS = {
    'physics':   'Physics',
    'chemistry': 'Chemistry',
    'iq':        'IQ',
    'computer':  'Computer Science',
    'english':   'English',
    'history':   'History',
}

def _get_student_or_redirect(request):
    try:
        return request.user.student
    except Student.DoesNotExist:
        return None


# ── Start a practice exam ──────────────────────────────────

@login_required
def exam_start(request):
    if request.user.role != 'student':
        return redirect('admin_dashboard')

    if request.method != 'POST':
        return redirect('dashboard')

    student = _get_student_or_redirect(request)
    if not student:
        messages.error(request, 'Student profile not found.')
        return redirect('dashboard')

    test_type  = request.POST.get('test_type', 'single')    # 'single' | 'mixed'
    category   = request.POST.get('category', '')           # e.g. 'physics'
    try:
        count = int(request.POST.get('count', 10))
    except ValueError:
        count = 10
    count = min(max(count, 5), 50)

    # Fetch questions
    if test_type == 'mixed' or not category:
        qs = list(Question.objects.all())
    else:
        qs = list(Question.objects.filter(category=category))

    if not qs:
        messages.error(request, 'No questions available for this selection. Ask your admin to add some!')
        return redirect('dashboard')

    # Sample up to `count` questions
    selected = random.sample(qs, min(count, len(qs)))

    # Create a practice Exam record
    cat_label = CATEGORY_LABELS.get(category, 'Mixed') if test_type == 'single' else 'Mixed'
    exam = Exam.objects.create(
        title=f'Practice — {cat_label}',
        category=category if test_type == 'single' else 'iq',  # fallback for mixed
        exam_type='practice',
        question_count=len(selected),
        time_limit=len(selected) * 2,   # 2 min per question
        marks_per_question=1,
    )

    # Link questions via ExamQuestion
    for idx, q in enumerate(selected):
        ExamQuestion.objects.create(exam=exam, question=q, order=idx + 1)

    # Create Attempt
    attempt = Attempt.objects.create(student=student, exam=exam)

    return redirect('exam_take', attempt_id=attempt.pk)


# ── Take the exam ──────────────────────────────────────────

@login_required
def exam_take(request, attempt_id):
    if request.user.role != 'student':
        return redirect('admin_dashboard')

    student = _get_student_or_redirect(request)
    attempt = get_object_or_404(Attempt, pk=attempt_id, student=student)

    # Don't allow re-taking a submitted exam
    if attempt.submitted_at:
        return redirect('exam_results', attempt_id=attempt.pk)

    exam_questions = ExamQuestion.objects.filter(exam=attempt.exam).select_related('question')
    questions = [eq.question for eq in exam_questions]

    context = {
        'attempt': attempt,
        'exam': attempt.exam,
        'questions': questions,
        'time_limit_seconds': attempt.exam.time_limit * 60,
        'total': len(questions),
    }
    return render(request, 'pages/exam.html', context)


# ── Submit the exam ────────────────────────────────────────

@login_required
def exam_submit(request, attempt_id):
    if request.method != 'POST':
        return redirect('dashboard')

    student = _get_student_or_redirect(request)
    attempt = get_object_or_404(Attempt, pk=attempt_id, student=student)

    if attempt.submitted_at:
        return redirect('exam_results', attempt_id=attempt.pk)

    exam_questions = ExamQuestion.objects.filter(exam=attempt.exam).select_related('question')

    right_count  = 0
    wrong_count  = 0
    total_marks  = 0

    for eq in exam_questions:
        q = eq.question
        selected = request.POST.get(f'q_{q.pk}', '').upper()
        is_correct = selected == q.right_answer.upper()

        AttemptAnswer.objects.create(
            attempt=attempt,
            question=q,
            selected_answer=selected,
            is_correct=is_correct,
        )

        if is_correct:
            right_count += 1
            total_marks += attempt.exam.marks_per_question
        elif selected:
            wrong_count += 1

    total_possible = attempt.exam.question_count * attempt.exam.marks_per_question
    percentage = round((total_marks / total_possible * 100), 1) if total_possible else 0

    attempt.submitted_at   = dj_timezone.now()
    attempt.right_count    = right_count
    attempt.wrong_count    = wrong_count
    attempt.total_marks    = total_marks
    attempt.percentage     = percentage
    attempt.save()

    return redirect('exam_results', attempt_id=attempt.pk)


# ── Results ────────────────────────────────────────────────

@login_required
def exam_results(request, attempt_id):
    student = _get_student_or_redirect(request)
    attempt = get_object_or_404(Attempt, pk=attempt_id, student=student)

    answers = attempt.answers.select_related('question').order_by('id')

    context = {
        'attempt': attempt,
        'exam': attempt.exam,
        'answers': answers,
        'total': attempt.exam.question_count,
    }
    return render(request, 'pages/results.html', context)
