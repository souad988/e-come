from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # custom_image = serializers.ImageField(
    #   max_length=None, use_url=True, blank=True, null=True)

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims

        return token
    

class CustomUserSerializer(serializers.ModelSerializer):
   
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    first_name = serializers.CharField(
        max_length=150, allow_blank=True, allow_null=True, required=False)
    last_name = serializers.CharField(
        max_length=150, allow_blank=True, allow_null=True, required=False)
    password = serializers.CharField(min_length=5, write_only=True)
    custom_image = serializers.ImageField(
        max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'first_name',
                  'last_name', 'password', 'custom_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        print("from serializer.create:", instance.email, instance.password)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance
