# Generated by Django 4.2.2 on 2023-08-08 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('CodeRPGappMain', '0002_remove_profile_bio'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='rpg_class',
            field=models.CharField(default='Warrior', max_length=100),
        ),
    ]