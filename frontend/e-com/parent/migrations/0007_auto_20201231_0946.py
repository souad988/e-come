# Generated by Django 3.1.4 on 2020-12-31 08:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('parent', '0006_auto_20201230_1742'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kid',
            name='kid_id',
        ),
        migrations.RemoveField(
            model_name='parent',
            name='parent_id',
        ),
        migrations.AddField(
            model_name='kid',
            name='id',
            field=models.AutoField(auto_created=True, default="",
                                   primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parent',
            name='id',
            field=models.AutoField(auto_created=True, default="",
                                   primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]