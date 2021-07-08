from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Product
from .serializer import ProductSerializer
# Create your views here.
def products(request):
    data=Product.objects.all()
    print(data)
    #serialized_products=[ProductSerializer(pr).data for pr in data ]
    #
    serialized_data=[ProductSerializer(pr,context={'request': request}).data for pr in data ]
    json_data={}
    i=0
    print("<<<<<<<<<<<<<<<fi from the view>>>>>>>>>>>>><<")
    for item in serialized_data:
        json_data[i]=item
        i+=1
    '''
    print("json_data:::",json_data)
    print("serialized:::",serialized_data)
    return Response(json_data,status=status.HTTP_201_CREATED)'''
    return JsonResponse(serialized_data,safe=False)
def product_img(request):
    print("request url>>>>>>>!!!!!::::",request.data)