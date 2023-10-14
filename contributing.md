## Documentation

This is an example of how to comunicate with the server when making a game for the site:

views.py:
```py
def update_MarkComplete_Game(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        markComplete_1 = True; #level context from the profile
        profile.markComplete_1 = markComplete_1
        profile.add_skill('The Basics')
        profile.save()
        response_data = {'markComplete_1': markComplete_1}
        return JsonResponse(response_data)
```

how one might communicate with the server to make sure a user cant click a mark complete button again
```js
markComplete.setAttribute('disabled', 'disabled'); // makes disabled as soon as clicked
$.ajax({
            type: 'POST',
            url: 'update_MarkComplete_Game',
            headers: {'X-CSRFToken': csrftoken},
            data: {'markComplete_1': markComplete_1},
            success: function(response) {
                if (markComplete_1.response) {
                    // console.log(markComplete_1) - TESTING
                    markComplete.setAttribute('disabled', 'disabled');
                }
                console.log(response)
            },
            error: function(error) {
                console.log(error)
                // Handle errors here
            }
        
        });
```

and how one might change the level

game.js:
```js
$.ajax({
        type: 'POST',
        url: 'update-level',
        headers: {'X-CSRFToken': csrftoken},
        data: {'level': level},
        success: function(response) {
            console.log(response)
        },
        error: function(error) {
            console.log(error)
            // Handle errors here
        }
    
    });

```
views.py:
```py
def update_level(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        level = profile.level + 1 #level context from the profile
        profile.level = level
        profile.save()

        response_data = {'level': level}
        return JsonResponse(response_data)
```

## UNDERSTANDING USER AUTHENTICATION

You might notice the templates has its own little folder called registration. Thats a special template folder to Django which as we know is a Batteries included framework
This is the registration page
register.html:
```html
<div class="container d-flex-center">
    <div class="card">
        <div class="card-body">
            <h1 class="card-title">Register</h1>
            <br/><br/>
            <div class="form-group">
                <form method="POST">
                    {% csrf_token %}
                    {{ form.as_p }}
                    <button class="btn btn-primary">Register</button>
                </form>    
            </div>
        </div>
    </div>
</div>
```
You might notice that looking at the page there isnt alot of html for the layout of the form thats the best part! This is because Django is just cool like that so it notices that its in the registration and makes it a form that will automatically create fields for you that get sent to the backend (sort of... next code block will explain a little bit more)

views.py:

```py
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth.views import PasswordChangeView
from django.urls import reverse_lazy
from .forms import SignUpForm, EditProfileForm, PasswordChangingForm

class UserRegisterView(generic.CreateView):
    form_class = SignUpForm #Imported from forms
    template_name = 'registration/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        response = super().form_valid(form)
    
    # Create a profile and link it to the user
        profile = Profile.objects.create(user=self.object)
    
    # Save the RPG class to the profile
        rpg_class = form.cleaned_data.get('rpg_class')
        profile.rpg_class = rpg_class
        profile.save()
        return response

class UserEditView(generic.UpdateView):
    form_class = EditProfileForm #Imported From Forms 
    template_name = 'registration/edit_profile.html'
    success_url = reverse_lazy('home')


    def get_object(self):
        return self.request.user
    
    def form_valid(self, form):
        response = super().form_valid(form)
        
        # Update RPG class in the associated Profile
        rpg_class = form.cleaned_data.get('rpg_class')
        self.object.profile.rpg_class = rpg_class
        self.object.profile.save()
        return response
    

class PasswordsChangeView(PasswordChangeView):
    form_class = PasswordChangingForm
    success_url = reverse_lazy('home')
```

All of theses inhereit from Djangos built in forms so when you have that special template that is connected in the urls.py like so 
urls.py (app): 
```py
path('register/', UserRegisterView.as_view(), name='register'),
path('edit_profile/', UserEditView.as_view(), name='edit_profile'),
```

urls.py (proj): 
```py
path('CodeRPGappMain/', include('django.contrib.auth.urls')),#notice the contrib.auth
path('CodeRPGappMain/', include('CodeRPGappMain.urls')),
```

Django is going to build the form for you! now of course you may have noticed a few things. Whats this rpg class, that is where my user auth differs from the built in auth but not to worry its not that complex 

in my models.py:
```py
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
```

and my admin.py:

```py
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
```
So whats going on here? well User is built in right so you cant actually just start adding things to it or at least you cant edit the register page to include neww parts of the profile data. To be clear you CAN add new things like level to the built in User model however you CANT have things like RPG-Class or something else thats important to have on teh register page. So what do you do you make a class called Profile that "extends" (this is a little bit complex from here and im not sure I can explain it best) teh built in User model and now you can add fields to it and then in the admin.py you are "rewriting" the admin page in order to include those pars of the model on your admin page. This also allows you to have those parts of the model included and retained when registerering.

Note: that OneToOneField is what I mean by "extends"!


