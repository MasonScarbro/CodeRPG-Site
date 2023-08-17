
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from .views import UserRegisterView, UserEditView, home, PasswordsChangeView, ShowProfilePageView, game, update_level

urlpatterns = [
    path('', home, name='home'),
    path('game', game, name='game'),
    path('update-level', update_level, name='update-level'),
    path('register/', UserRegisterView.as_view(), name='register'),
    path('edit_profile/', UserEditView.as_view(), name='edit_profile'),
    path('profile/', ShowProfilePageView.as_view(), name='show_profile'), 
    path('password/', PasswordsChangeView.as_view(template_name='registration/change-password.html')), #NOT WORKING CURRENTLY
    #path('<int:pk>/profile/', ShowProfilePageView.as_view(), name='show_profile_page'), DONT UNCOMMENT NOT WORKING


]

