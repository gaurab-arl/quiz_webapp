from django.urls import path
from apps.core.auth_view.login import login, logout
from apps.core.auth_view.sign import signup
from apps.core.dashboard.admin_dashboard import admin_dashboard
from apps.core.dashboard.dashboard import dashboard
from apps.core.home_view.home import home
from apps.core.exam.exam_view import exam_start, exam_take, exam_submit, exam_results

urlpatterns = [
    # Public
    path('', home, name='home'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('signup/', signup, name='signup'),

    # Student
    path('dashboard/', dashboard, name='dashboard'),
    path('exam/start/', exam_start, name='exam_start'),
    path('exam/<int:attempt_id>/', exam_take, name='exam_take'),
    path('exam/<int:attempt_id>/submit/', exam_submit, name='exam_submit'),
    path('exam/<int:attempt_id>/results/', exam_results, name='exam_results'),

    # Admin
    path('admin_dashboard/', admin_dashboard, name='admin_dashboard'),
]
