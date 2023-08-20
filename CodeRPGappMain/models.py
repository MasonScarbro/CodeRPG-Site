from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    rpg_class = models.CharField(max_length=100, default='Warrior')
    level = models.IntegerField(default=1)
    markComplete_1 = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user)    
    
