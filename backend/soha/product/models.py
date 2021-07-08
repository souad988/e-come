from django.db import models
from users.models import CustomUser



class ImageAlbum(models.Model):
    def default(self):
        return self.images.filter(default=True).first()
    def thumbnails(self):
        return self.images.filter(width__lt=100, length_lt=100)
class Category(models.Model):
    category_name = models.CharField(max_length=250, unique=True)        
    def __str__(self):
        return self.category_name
class Product(models.Model):
    product_name = models.CharField(max_length=250, unique=True)
    text = models.CharField(max_length=350, blank=True, null=True)
    prix = models.FloatField()
    user= models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category,null=True,on_delete=models.SET_NULL)
    def __str__(self):
        return self.product_name

class Color(models.Model):
    color_name =  models.CharField(max_length=250, unique=True)
    def __str__(self):
        return self.color_name

'''
import os
import re

print("url:::",os.path.join(os.getcwd(),'backend/soha/product/color.txt'))

liste=[]
with open(os.path.join(os.getcwd(),'product/color.txt')) as file:
     data=file.readlines()
     for row in data:
        
        liste=re.findall('[A-Z][^A-Z]*',row)
        for item in liste:
            Color.objects.get_or_create(color_name=item)
     print(liste)  
'''
class Image(models.Model):
    image = models.ImageField(upload_to='product_img')
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE ,null=True)
    color = models.ForeignKey(Color,null=True,on_delete=models.SET_NULL)
    def __str__(self):
        return self.product.product_name
'''
    @property
    def custom_image(self):
        return self._product_image

    @custom_image.setter
    def custom_image(self, value):
        self._custum_image = value

'''