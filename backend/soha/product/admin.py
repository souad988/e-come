from django.contrib import admin
from .models import Category, Color, Product,Image
# Register your models here.
admin.site.register(Product)

admin.site.register(Image)
admin.site.register(Color)
admin.site.register(Category)