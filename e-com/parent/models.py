from django.db import models


class Parent(models.Model):

    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    parent_image = models.ImageField(
        upload_to='lettre_img', blank=True, null=True)
    email = models.EmailField(max_length=254)

    def __str__(self):
        return self.first_name


class Kid(models.Model):

    parent = models.ForeignKey(
        Parent, on_delete=models.SET_NULL, blank=True, null=True)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    kid_image = models.ImageField(
        upload_to='lettre_img', blank=True, null=True)
    email = models.EmailField(max_length=254)

    def __str__(self):
        return self.first_name
