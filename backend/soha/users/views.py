from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from verify_email.email_handler import send_verification_email
from django.conf import settings
from django.core.mail import send_mail
from .forms import CustomUserCreationForm


class MyObtainTokenPairView(TokenObtainPairView):

    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        user_form = CustomUserCreationForm(data=request.data)
        serializer = CustomUserSerializer(data=request.data)
        print(request.data)
        print(serializer.is_valid())
        print(serializer.errors)

        def email_user(email, subject, message, from_email=settings.DEFAULT_FROM_EMAIL, **kwargs):
            send_mail(subject, message, from_email, [
                      email], fail_silently=False, **kwargs)
        # if user_form.is_valid():
        print(request.data['email'])
        # email_user(request.data['email'], "from kidslearn",
        #           "welcome in kidslearn",)
        #user = serializer.save()
        inactive_user = send_verification_email(request, user_form)
        #print("from view:", inactive_user)
        if inactive_user:
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
