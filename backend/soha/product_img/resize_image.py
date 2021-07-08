#!/usr/bin/env python3
from PIL import Image
import os


for file in os.listdir(os.path.join(os.getcwd(),"backend/soha/product_img/assets/img/")):
    print(file)
    if ".jpg" in file:
        im=Image.open(os.path.join(os.getcwd(),"backend/soha/product_img/assets/img/{}".format(file)))
        
        im= im.resize((im.size[0]*2,im.size[1]),Image.ANTIALIAS)

        im = im.convert('RGB')
        print(im.mode)
        im.save(os.path.join(os.getcwd(),"backend/soha/product_img/assets/img/")+file.split(".")[0]+".png")
