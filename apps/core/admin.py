from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

# ------------------------------
# INLINE FOR ADMIN PROFILE
# ------------------------------
class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False

class AdminInline(admin.StackedInline):
    model = Admin
    can_delete = False

# ------------------------------
# REGISTER USERS WITH INLINES
# ------------------------------
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (("User Role", {"fields": ("role", "phone")}),)
    add_fieldsets = UserAdmin.add_fieldsets + (("User Role", {"fields": ("role", "phone")}),)
    inlines = [StudentInline, AdminInline]


# ------------------------------
# REGISTER MODELS
# ------------------------------
admin.site.register(Question)
admin.site.register(Exam)
admin.site.register(ExamQuestion)
admin.site.register(Attempt)
admin.site.register(AttemptAnswer)
