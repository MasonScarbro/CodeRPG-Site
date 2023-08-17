from django.contrib import admin
from .models import Profile
from django.contrib.auth import get_user_model
# Register your models here.


User = get_user_model() #get the Django user model (built in user)

admin.site.unregister(User) #unregister

# re-register the User in the admin by saving the model as a profile models user object
#basically rewrite the Django admin to make the user and Profile model 'merge'
@admin.register(User)
class ArticleAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if obj._state.adding:
            Profile.objects.create(user=obj)