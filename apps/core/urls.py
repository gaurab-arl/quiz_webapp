
from django.urls import path
from apps.core.auth_view.login import login
from apps.core.auth_view.sign import signup
from apps.core.dashboard.admin_dashboard import admin_dashboard
from apps.core.dashboard.dashboard import dashboard
from apps.core.home_view.home import home

urlpatterns = [
    path('', home, name='home'),
    path('login/', login, name='login'),
    path('signup/', signup, name='signup'),
    path('dashboard/', dashboard, name='dashboard'),
    path('admin_dashboard/', admin_dashboard, name='admin_dashboard'),
]

