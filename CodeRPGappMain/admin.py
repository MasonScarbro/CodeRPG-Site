from django.contrib import admin
from .models import Profile
from django.contrib.auth import get_user_model
# Register your models here.


User = get_user_model()

admin.site.unregister(User)


@admin.register(User)
class ArticleAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if obj._state.adding:
            Profile.objects.create(user=obj)