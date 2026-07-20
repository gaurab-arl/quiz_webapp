from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser
from django.db import models


# ---------------------------------------------------------
# USER
# ---------------------------------------------------------
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
    phone = models.CharField(max_length=15, blank=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='core_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='core_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return f"{self.username} ({self.role})"


# ---------------------------------------------------------
# STUDENT
# ---------------------------------------------------------
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    student_class = models.CharField(max_length=50, blank=True)   # e.g. "Grade 11"
    institution = models.CharField(max_length=100, default='KCC')

    def __str__(self):
        return self.user.username


# ---------------------------------------------------------
# ADMIN
# ---------------------------------------------------------
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    institution_name = models.CharField(max_length=100, default='KCC')
    contact_person = models.CharField(max_length=100, blank=True)
    institution_type = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username


# ---------------------------------------------------------
# QUESTION
# ---------------------------------------------------------
class Question(models.Model):
    CATEGORY_CHOICES = (
        ('physics', 'Physics'),
        ('chemistry', 'Chemistry'),
        ('iq', 'IQ'),
        ('computer', 'Computer'),
        ('english', 'English'),
        ('history', 'History'),
    )

    ANSWER_CHOICES = (
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
    )

    question_text = models.TextField()
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)
    option_d = models.CharField(max_length=255)
    right_answer = models.CharField(max_length=1, choices=ANSWER_CHOICES)
    marks = models.PositiveIntegerField(default=1)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.question_text[:50]


# ---------------------------------------------------------
# EXAM
# ---------------------------------------------------------
class Exam(models.Model):
    TYPE_CHOICES = (
        ('practice', 'Practice'),
        ('official', 'Official'),
    )

    title = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=Question.CATEGORY_CHOICES)
    exam_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='practice')
    question_count = models.PositiveIntegerField()          # how many questions in this exam
    time_limit = models.PositiveIntegerField(help_text="Time limit in minutes")
    marks_per_question = models.PositiveIntegerField(default=1)

    # only set for official exams (admin created)
    created_by = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


# ---------------------------------------------------------
# EXAM QUESTION (only used for official exams - fixed question list)
# ---------------------------------------------------------
class ExamQuestion(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.exam.title} - Q{self.order}"


# ---------------------------------------------------------
# ATTEMPT (one row every time a student takes an exam)
# ---------------------------------------------------------
class Attempt(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)

    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)
    time_taken = models.PositiveIntegerField(help_text="Time taken in seconds", null=True, blank=True)

    total_marks = models.PositiveIntegerField(default=0)
    right_count = models.PositiveIntegerField(default=0)
    wrong_count = models.PositiveIntegerField(default=0)
    percentage = models.FloatField(default=0)

    def __str__(self):
        return f"{self.student} - {self.exam}"


# ---------------------------------------------------------
# ATTEMPT ANSWER (record of each answer a student picked - used for review)
# ---------------------------------------------------------
class AttemptAnswer(models.Model):
    attempt = models.ForeignKey(Attempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_answer = models.CharField(max_length=1, choices=Question.ANSWER_CHOICES, blank=True)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.attempt} - {self.question_id}"