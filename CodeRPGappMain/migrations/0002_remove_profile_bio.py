# Generated by Django 4.2.2 on 2023-08-06 21:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('CodeRPGappMain', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='bio',
        ),
    ]