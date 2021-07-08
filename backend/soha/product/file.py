import os
import re
from .models import Color
print("url:::",os.path.join(os.getcwd(),'backend/soha/product/color.txt'))

liste=[]
with open(os.path.join(os.getcwd(),'back/file/color.txt')) as file:
     data=file.readlines()
     for row in data:
        
        liste.append(re.findall('[A-Z][^A-Z]*',row))
        for item in liste:
            Color.objects.get_or_create(color_name=item)
     print(liste)  

   