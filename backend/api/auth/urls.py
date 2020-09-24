from django.urls import path
from api.auth.views import (
    UserRegistrationView,
    UserLoginViews,
    UserProfileView,
    UserProjectsView,
    AllUserProjectsView,
    LogoutView
)

urlpatterns = [
    path('user', AllUserProjectsView.as_view(), name='all_project_user'),
    path('user/<slug:username>', UserProjectsView.as_view(), name='project_user'),
    path('profile', UserProfileView.as_view(), name='user_profile'),
    path('login', UserLoginViews.as_view(), name='user_login'),
    path('register', UserRegistrationView.as_view(), name='user_registration'),
    path('logout', LogoutView.as_view(), name='user_logout'),
]