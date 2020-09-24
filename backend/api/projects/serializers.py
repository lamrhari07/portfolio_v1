from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from api.models import Projects, ProfileUser
from django.conf import settings



class ProjectSerializer(serializers.Serializer):
    '''
        Serializer for Projects.
    '''
    user = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True, label='Project Name')
    language = serializers.ChoiceField(required=True, label='Language', choices=Projects.LANGUAGE)
    description = serializers.CharField(required=False, label='Description')
    git_url = serializers.CharField(required=True, label='github repository')
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def validate_name(self, name):
        if not name:
             raise exceptions.ValidationError(_('Must include the Name of your project.'))
        if Projects.objects.filter(name__exact=name):
             raise exceptions.ValidationError(_('Unique Project Name is required.'))
            
    def validate_language(self, language):
        if not language:
             raise exceptions.ValidationError(_('Must include the programming language of your project.'))
            
    def validate_git_url(self, git_url):
        if not git_url:
             raise exceptions.ValidationError(_('Must include the repository link.'))
        if Projects.objects.filter(git_url__exact=git_url):
             raise exceptions.ValidationError(_('Unique Repository URL is required.'))

    def create(self, validated_data):
        name = validated_data.data.get('name', None)
        language = validated_data.data.get('language', None)
        git_url = validated_data.data.get('git_url', None)
        project = Projects.objects.create(
            user_id=validated_data.user.pk,
            name=name,
            language=language,
            git_url=git_url
        )
        return validated_data
