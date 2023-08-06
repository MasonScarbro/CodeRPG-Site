from django.shortcuts import render, get_object_or_404
from django.views import generic 
from django.views.generic import DetailView
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordChangeForm
from django.contrib.auth.views import PasswordChangeView
from django.urls import reverse_lazy
from .forms import SignUpForm, EditProfileForm, PasswordChangingForm
from .models import Profile
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User


# Create your views here.
""" 
NOT WORKING!

class ShowProfilePageView(LoginRequiredMixin, DetailView):
    model = Profile
    template_name = 'registration/user_profile.html'

    def get_context_data(self, *args, **kwargs):
        users = Profile.objects.all()
        context = super(ShowProfilePageView, self).get_context_data(*args, **kwargs)

        page_user = get_object_or_404(Profile, id=self.kwargs['pk'])

        context["page_user"] = page_user
        return context

 """

class UserRegisterView(generic.CreateView):
    form_class = SignUpForm #Imported from forms
    template_name = 'registration/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        response = super().form_valid(form)
        Profile.objects.create(user=self.object)
        return response

class UserEditView(generic.UpdateView):
    form_class = EditProfileForm #Imported From Forms 
    template_name = 'registration/edit_profile.html'
    success_url = reverse_lazy('home')

    """ def form_valid(self, form):
        response = super().form_valid(form)
        profile = self.request.user.profile
        profile.rpg_class = form.cleaned_data.get('rpg_class')
        profile.save()
        return response """

    def get_object(self):
        return self.request.user
    

class PasswordsChangeView(PasswordChangeView):
    form_class = PasswordChangingForm
    success_url = reverse_lazy('home')


class ShowProfilePageView(generic.DetailView):
    model = Profile
    template_name = 'registration/user_profile.html'
    context_object_name = 'page_user'

    def get_object(self, queryset=None):
        return get_object_or_404(Profile, user=self.request.user)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = User.objects.get(pk=self.request.user.id)
        context['username'] = user.username
        context['first_name'] = user.first_name
        context['last_name'] = user.last_name
        return context

def home(request):
    return render(request, 'home/home.html')