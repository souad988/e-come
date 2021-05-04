from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from verify_email.email_handler import send_verification_email
import requests
from django.shortcuts import redirect
from django.conf import settings
from django.core.mail import send_mail
from .forms import CustomUserCreationForm
import json
from .models import CustomUser

def login(request):
    print("dkhelt login")
    print("from login view #########::",request.body)
    response=redirect('http://localhost:3000/login')
    return response
    
class MyObtainTokenPairView(TokenObtainPairView):

    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
    


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        print(request.get_full_path())
       # data = json.loads(request.body.decode('utf-8'))
       # print("this is the road:::::",data)
        user_form = CustomUserCreationForm(data=request.data)
       # print("this is the form:::::",user_form)
        serializer = CustomUserSerializer(data=request.data)
       #print("this is the serializer:::::",serializer)
        #print(serializer.is_valid())
        #print(serializer.errors)
        #print("form errors:::::",user_form.errors)
        def email_user(email, subject, message, from_email=settings.DEFAULT_FROM_EMAIL, **kwargs):
            send_mail(subject, message, from_email, [
                      email], fail_silently=False, **kwargs)
        if user_form.is_valid():
            print(request.data['email'])
            email_user(request.data['email'], "from soha e-commerce","welcome in my website")
        #user = serializer.save()
            inactive_user = send_verification_email(request, user_form)
        #print("from view:", inactive_user)
        #print('response url:::',Response(),Response)
        if inactive_user:
            if serializer.is_valid():
                jsonA = serializer.data
                return Response(jsonA, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
def validateEmailToken(request):
    data = json.loads(request.body.decode('utf-8'))
    token = data['token']
    res = {
        'status': 'success',
        'message': 'Valid',
    }
    #if CustomUser.objects.filter(email_verified_hash=token, email_verified=0).exists():
    #    tokenExists = CustomUser.objects.get(email_verified_hash=token, email_verified=0)
    
    if _verify=token, email_verified=0).exists():
        tokenExists = CustomUser.objects.get(email_verified_hash=token, email_verified=0)

        tokenExists.email_verified = 1
        tokenExists.save()

    else:
        res = {
            'status': 'failed',
            'message': 'Invalid',
        }
    
    return JsonResponse(res) 
'''    