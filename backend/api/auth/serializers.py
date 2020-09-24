from rest_framework import serializers, exceptions, pagination
from django.contrib.auth import authenticate
from django.utils.translation import ugettext_lazy as _
from api.models import Projects, ProfileUser
from django.conf import settings
from django.core.paginator import Paginator
from api.projects.serializers import ProjectSerializer


class JWTSerializer(serializers.Serializer):
    '''
        Serializer for JWT authentication.
    '''
    token = serializers.CharField()
    message = serializers.CharField()


class UserRegistrationSerializer(serializers.Serializer):
    '''
        Serializer for User Registration.
    '''
    username = serializers.CharField(required=True, label='Username')
    email = serializers.EmailField(required=True, label='Email Address')
    birth_date = serializers.DateField(required=False, label='Birth day')
    password = serializers.CharField(
        write_only=True, required=True, label='Password', style={'input_type': 'password'})
    password_2 = serializers.CharField(
        write_only=True, required=True, label='Confirm Password', style={'input_type': 'password'})

    def validate_username(self, username):
        if ProfileUser.objects.filter(username=username).exists():
            raise serializers.ValidationError(_('Username already exists.'))
        return username

    def validate_email(self, email):
        if ProfileUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                _('A user is already registered with this e-mail address.')
            )
        return email
    
    def validate_birth_date(self, birth_date):
        from datetime import date
        today = date.today()
        year = int(birth_date.strftime('%Y'))
        month = int(birth_date.strftime('%m'))
        day = int(birth_date.strftime('%d'))
        age = today.year - year - ((today.month, today.day) < (month, day))
        if age < 18:
            raise serializers.ValidationError(
                _('You are under the age of 18.'))
        return birth_date

    def validate_password(self, password):
        if len(password) < getattr(settings, 'PASSWORD_MIN_LENGTH', 8):
            raise serializers.ValidationError(
                _('Password should be atleast %s characters long.' %
                  getattr(settings, 'PASSWORD_MIN_LENGTH', 8))
            )
        return password

    def validate_password_2(self, password_2):
        data = self.get_initial()
        password = data.get('password')
        if password != password_2:
            raise serializers.ValidationError(_('Passwords does not match.'))
        return password_2

    def get_user_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', None),
            'email': self.validated_data.get('email', None),
            'birth_date': self.validated_data.get('birth_date', None),
            'password': self.validated_data.get('password', None)
        }

    def save(self, request):
        cleaned_data = self.get_user_cleaned_data()
        user = ProfileUser.objects.create_user_profile(user=cleaned_data)
        return user


class LoginSerializer(serializers.Serializer):
    '''
        Serializer for User Login.
    '''
    user = None
    username = serializers.CharField(required=True, label='Username')
    password = serializers.CharField(
        write_only=True, required=True, label='Password', style={'input_type': 'password'})

    def _validate_username(self, username, password):
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                msg = _(
                    'The Username or Password are not valid.'
                )
                raise exceptions.ValidationError(msg)
        return user

    def validate(self, validated_data):
        username = validated_data.get('username', None)
        password = validated_data.get('password', None)

        if username and password:
            user = self._validate_username(username, password)
            validated_data['user'] = user
            return validated_data
        else:
            msg = _('Must include "username" and "password".')
            raise exceptions.ValidationError(msg)


class UserProfileSerializer(serializers.Serializer):
    '''
        Serializer for User Profile.
    '''
    first_name = serializers.CharField(required=False, label='First name')
    last_name = serializers.CharField(required=False, label='Last name')
    username = serializers.CharField(required=False, label='Username')
    email = serializers.EmailField(required=False, label='Email Address')
    birth_date = serializers.DateField(required=False, label='Birth day')
    gender = serializers.ChoiceField(required=False, choices=ProfileUser.GENDER)
    avatar = serializers.ImageField(required=False, label='Avatar')
    description = serializers.CharField(required=False, label='Description')
    introduction = serializers.CharField(required=False, label='Introduction')
    phone = serializers.IntegerField(required=False)
    date_joined = serializers.DateTimeField(read_only=True)

    # def validate(self, attrs):
    #     UserRegistrationSerializer.validate_birth_date(self, attrs['birth_date'])
    #     return super().validate(attrs)

    def update(self, instance, validated_data):

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.introduction = validated_data.get('introduction', instance.introduction)
        instance.description = validated_data.get('description', instance.description)
        instance.phone = validated_data.get('phone', instance.phone)

        instance.save()

        return instance


class UserProjectsSerializer(UserProfileSerializer):
    '''
        Serializer for Users and owned Projrcts.
    ''' 
    projects = ProjectSerializer(read_only=True, many=True)
