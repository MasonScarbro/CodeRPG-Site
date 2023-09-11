from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return str(self.user)
    

class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    rpg_class = models.CharField(max_length=100, default='Warrior')
    level = models.IntegerField(default=1)
    #skills List
    skills = models.ManyToManyField(Skill)
    def add_skill(self, skill_name):
        skill, created = Skill.objects.get_or_create(name=skill_name)
        self.skills.add(skill)
    #end skills List
    markComplete_1 = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)    
    
