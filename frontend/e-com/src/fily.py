import os
import re
liste=[]
with open(os.path.join(os.getcwd(),'frontend/e-com/src/BootstrapCarousel.js')) as file:
     data=file.readlines()
     for row in data:
        if not re.match(r'^[0-9]*$',row):
            liste.append(row)    
with open(os.path.join(os.getcwd(),'frontend/e-com/src/BootstrapCarousel1.js'),'w') as file:
    for row in liste:
        file.write(row)                    