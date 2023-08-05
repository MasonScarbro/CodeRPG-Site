from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class SignUpForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    rpg_class = forms.CharField(max_length=100)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'rpg_class', 'password1', 'password2', 'email') 