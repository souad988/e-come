from rest_framework import serializers
from parent.models import Kid, Parent


class KidSerializer(serializers.ModelSerializer):

    #small_image = serializers.ImageField( max_length=None, use_url=True)
    #capital_image = serializers.URLField(source='get_absolute_url')
    #sound = serializers.URLField(source='get_absolute_url')

    class Meta:
        model = Kid
        fields = ['parent_id', 'first_name',
                  'last_name', 'kid_image', 'email']


class ParentSerializer(serializers.ModelSerializer):
    kids = serializers.StringRelatedField(many=True)

    class Meta:
        model = Parent
        fields = ['first_name',
                  'last_name', 'parent_image', 'email', 'kids']
