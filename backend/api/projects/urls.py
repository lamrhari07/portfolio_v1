from django.urls import path
from api.projects.views import ProjectListView, ProjectCreateView, ProjectUpdateDestroyView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project_list'),
    path('create', ProjectCreateView.as_view(), name='project_create'),
    path('detail/<slug:name>', ProjectUpdateDestroyView.as_view(), name='project_detail'),
]