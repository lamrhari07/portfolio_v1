from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from api.models import Projects, ProfileUser, UserProject
from api.projects.serializers import ProjectSerializer
from django.core.paginator import Paginator
from django.core.exceptions import PermissionDenied
from rest_framework.decorators import action, permission_classes


class ProjectListView(generics.ListAPIView):
    """
        Endpoint For List All Projects.
    """
    serializer_class = ProjectSerializer
    permission_classes = (AllowAny, )
    
    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Projects.objects.all().filter(user__id=self.request.user.pk)
        return Projects.objects.all()


class ProjectUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
        Endpoint For Retrieve, Update, and Delete Projects.
    """
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    lookup_field = 'name'

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Projects.objects.filter(name=self.kwargs['name'])
        user = ProfileUser.objects.get(id=self.request.user.pk)
        return Projects.objects.filter(user=user).select_related('user')

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), name=self.kwargs['name'])
        return obj



class ProjectCreateView(generics.CreateAPIView):
    """
        Endpoint For Create Projects.
    """
    serializer_class = ProjectSerializer
    permission_classes = (IsAuthenticated, )

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        respond = serializer.create(request)
        return Response(respond.data, status=status.HTTP_201_CREATED)