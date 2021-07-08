
from django.db.models.query_utils import select_related_descend
from rest_framework import serializers
from .models import Category, Color, Image, Product
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model= Color
        fields = '__all__'
class ImageSerializer(serializers.ModelSerializer):
    _product_image = serializers.SerializerMethodField('get_image_url')
    color=ColorSerializer(required=False)
    class Meta:
        model=Image
        fields=('_product_image','default','color')      
    def get_image_url(self, obj):
        request = self.context.get("request")
        url=request.build_absolute_uri(obj.image)
        liste=url.split('/')
        liste.remove('products')
        liste='/'.join(liste)
        '''print("my liste::::::::::::::::::::",liste)'''
        return url

'''class Photo_Ex(models.Model):
    user = models.ForeignKey(User, blank=True, null=True)    
    photo = models.ImageField(upload_to='photos')
    thumbnail = models.ImageField(upload_to='profile_thumb', blank=True,
                              null=True, editable=False)

    def save(self, *args, **kwargs):
        size = (256,256)
        if not self.id and not self.photo:
            return

        try:
            old_obj = Photo_Ex.objects.get(pk=self.pk)
            old_path = old_obj.photo.path
        except:
            pass

        thumb_update = False
        if self.thumbnail:
            try:
                statinfo1 = os.stat(self.photo.path)
                statinfo2 = os.stat(self.thumbnail.path)
                if statinfo1 > statinfo2:
                    thumb_update = True
            except:
                thumb_update = True

        pw = self.photo.width
        ph = self.photo.height
        nw = size[0]
        nh = size[1]

        if self.photo and not self.thumbnail or thumb_update:
            # only do this if the image needs resizing
            if (pw, ph) != (nw, nh):
                filename = str(self.photo.path)
                image = Image.open(filename)
                pr = float(pw) / float(ph)
                nr = float(nw) / float(nh)

                if image.mode not in ('L', 'RGB'):
                    image = image.convert('RGB')

                if pr > nr:
                    # photo aspect is wider than destination ratio
                    tw = int(round(nh * pr))
                    image = image.resize((tw, nh), Image.ANTIALIAS)
                    l = int(round(( tw - nw ) / 2.0))
                    image = image.crop((l, 0, l + nw, nh))
                elif pr < nr:
                    # photo aspect is taller than destination ratio
                    th = int(round(nw / pr))
                    image = image.resize((nw, th), Image.ANTIALIAS)
                    t = int(round(( th - nh ) / 2.0))
                    image = image.crop((0, t, nw, t + nh))
                else:
                    # photo aspect matches the destination ratio
                    image = image.resize(size, Image.ANTIALIAS)

            image.save(self.get_thumbnail_path())
            (a, b) = os.path.split(self.photo.name)
            self.thumbnail = a + '/thumbs/' + b
            super(Photo_Ex, self).save()
            try:
                os.remove(old_path)
                os.remove(self.get_old_thumbnail_path(old_path))
            except:
                pass

    def get_thumbnail_path(self):
        (head, tail) = os.path.split(self.photo.path)
        if not os.path.isdir(head + '/thumbs'):
            os.mkdir(head + '/thumbs')
        return head + '/thumbs/' + tail

    def get_old_thumbnail_path(self, old_photo_path):
        (head, tail) = os.path.split(old_photo_path)
        return head + '/thumbs/' + tail'''        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields = '__all__'
class ProductSerializer(serializers.ModelSerializer):
    '''
    _product_image = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)
    '''
    category=CategorySerializer()
    product_images=ImageSerializer(source='images',many=True)
    
    class Meta:
        model = Product
        fields = ('product_name', 'text',
                  'prix','user','category','product_images')
        
    

