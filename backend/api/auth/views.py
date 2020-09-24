from django.shortcuts import render
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import login, logout
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
from api.models import Projects, ProfileUser
from api.auth.serializers import (
    JWTSerializer,
    UserRegistrationSerializer,
    LoginSerializer,
    UserProfileSerializer,
    UserProjectsSerializer
)
from api.utils import sensitive_post_parameters_m, jwt_encode, get_data_response



class AllUserProjectsView(generics.ListAPIView):
    
    queryset = ProfileUser.objects.all()
    serializer_class = UserProjectsSerializer
    permission_classes = (AllowAny,)


class UserProjectsView(generics.RetrieveAPIView):
    """
        Public Retrieve ProfileModel fields
        Accepts GET method.
        Default accepted fields: userame as a lookup field to retrieve.
        Returns ProfileModel fields.
    """
    queryset = ProfileUser.objects.all()
    serializer_class = UserProjectsSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'username'


class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    """
        Reads and updates and destroys ProfileModel fields
        Accepts GET, PUT, DELET methods.
        Default accepted fields: avatar, username, gender, age, phone, and others...
        Returns ProfileModel fields.
    """
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # parser_classes = [JSONParser, MultiPartParser]

    def get_object(self):
        obj = get_object_or_404(ProfileUser, pk=self.request.user.pk)
        return obj
    
class UserRegistrationView(generics.CreateAPIView):
    '''
        Endpoint For User Registration.
    '''
    serializer_class = UserRegistrationSerializer
    JWT_serializer_class = JWTSerializer
    permission_classes = (AllowAny, )
    
    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(UserRegistrationView, self).dispatch(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(request)
        token = jwt_encode(user)
        return Response(
            get_data_response(self.JWT_serializer_class, token, status.HTTP_200_OK),
            status=status.HTTP_201_CREATED
        )

class UserLoginViews(generics.GenericAPIView):
    '''
        Endpoint For User Login.
    '''
    serializer_class = LoginSerializer
    JWT_serializer_class = JWTSerializer
    permission_classes = (AllowAny,)

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super(UserLoginViews, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token = jwt_encode(user)
            # Django Login function
            login(request, user)
            return Response(
                get_data_response(self.JWT_serializer_class, token, status.HTTP_200_OK), 
                status=status.HTTP_201_CREATED
            )


class LogoutView(APIView):
    '''
        Endpoint For User Logout.
    '''
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        from rest_framework_jwt.settings import api_settings as jwt_settings

        logout(request)

        response = Response({"detail": "Successfully logged out."},
                            status=status.HTTP_200_OK)
    
        if jwt_settings.JWT_AUTH_COOKIE:
                response.delete_cookie(jwt_settings.JWT_AUTH_COOKIE)
        
        return response



        