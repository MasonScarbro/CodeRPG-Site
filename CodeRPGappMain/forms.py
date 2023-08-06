from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth.models import User
from django import forms

# Covered in the video but basically just for styling and more control over the forms 
class SignUpForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    rpg_class = forms.CharField(max_length=100)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'rpg_class', 'password1', 'password2', 'email') 



class EditProfileForm(UserChangeForm):
    email = forms.EmailField()
    username = forms.CharField(max_length=100,)
    first_name = forms.CharField(max_length=100)    
    last_name = forms.CharField(max_length=100)
    rpg_class = forms.CharField(max_length=100)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'rpg_class', 'password', 'email') 


class PasswordChangingForm(PasswordChangeForm):
    old_password = forms.CharField(max_length=100)    
    new_password1 = forms.CharField(max_length=100)
    new_password2 = forms.CharField(max_length=100)
    class Meta:
        model = User
        fields = ('old_password', 'new_password1', 'new_password2') 