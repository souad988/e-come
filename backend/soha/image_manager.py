from PIL import Image
import PIL
import os
from pathlib import Path

print(PIL.__version__)
for file in os.listdir(os.path.join(os.getcwd(), "backend/soha/product_img/")):
    print(file)
    
    img_path = Path(os.path.join(
        os.getcwd(), "backend/soha/product_img/{}".format(file)))
    if(not img_path.is_dir() and ((".jpg"  in file) or (".jpeg" in file) or  (".png" in file) )):
        print(img_path.exists())
        im = Image.open(img_path)
        im = im.resize((1000, 1500))

        im = im.convert('RGB')
        print(im)
        im.save(os.path.join(os.getcwd(),
                            "backend/soha/new_product_img/")+file.split(".")[0]+".png")

    else:    
        print("is directory:",img_path)