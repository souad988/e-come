# Generated by Django 3.2 on 2021-06-30 20:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0003_auto_20210630_0410'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='album',
        ),
        migrations.RemoveField(
            model_name='product',
            name='_product_image',
        ),
        migrations.AddField(
            model_name='image',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='product', to='product.product'),
        ),
    ]
