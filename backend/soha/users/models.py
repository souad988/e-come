from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    username = models.CharField(max_length=250, unique=True)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    _custom_image = models.ImageField(
        upload_to='lettre_img', blank=True, null=True)

    def __str__(self):
        return self.username

    @property
    def custom_image(self):
        return self._custum_image

    @custom_image.setter
    def custom_image(self, value):
        self._custum_image = value
