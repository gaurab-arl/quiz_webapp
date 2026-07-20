from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib import messages
from apps.core.models import User, Student, Admin


def signup(request):
    if request.method == 'POST':
        role            = request.POST.get('role', 'student')          # 'student' | 'institution'
        full_name       = request.POST.get('full_name', '').strip()
        email           = request.POST.get('email', '').strip()
        phone           = request.POST.get('phone', '').strip()
        password        = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password', '')
        contact_person  = request.POST.get('contact_person', '').strip()
        institution_type = request.POST.get('institution_type', '').strip()
        grade_level     = request.POST.get('grade_level', '').strip()

        # ── Validation ───────────────────────────────────────
        errors = {}

        if not full_name:
            errors['full_name'] = 'Name is required.'

        if not email:
            errors['email'] = 'Email is required.'
        elif User.objects.filter(email=email).exists():
            errors['email'] = 'An account with this email already exists.'

        if len(password) < 8:
            errors['password'] = 'Password must be at least 8 characters.'
        elif password != confirm_password:
            errors['confirm_password'] = 'Passwords do not match.'

        if errors:
            return render(request, 'pages/sign.html', {'errors': errors, 'old': request.POST})

        # ── Create user ──────────────────────────────────────
        # Derive a username from the email (unique)
        base_username = email.split('@')[0]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # Map form role to model role
        user_role = 'admin' if role == 'institution' else 'student'

        # Split full_name into first/last
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name  = name_parts[1] if len(name_parts) > 1 else ''

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            role=user_role,
        )

        # ── Create profile ───────────────────────────────────
        if user_role == 'student':
            Student.objects.create(user=user, student_class=grade_level)
        else:
            Admin.objects.create(
                user=user,
                institution_name=full_name,
                contact_person=contact_person,
                institution_type=institution_type,
            )

        auth_login(request, user)
        return redirect('dashboard' if user_role == 'student' else 'admin_dashboard')

    return render(request, 'pages/sign.html')
