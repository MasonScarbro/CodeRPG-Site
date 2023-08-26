from django.http import JsonResponse
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
from django.contrib.auth.decorators import login_required


# Create your views here.
#Request handler

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

        profile = self.get_object()
        context['level'] = profile.level
        return context

def home(request):
    return render(request, 'home/home.html')

def gamesHome(request):
    return render(request, 'games/gamesHome.php')

def game(request):
    profile = Profile.objects.get(user=request.user) #profile object
    level = profile.level #level context from the profile
    markComplete_1 = profile.markComplete_1
    return render(request, 'games/game.html', {'level': level, 'markComplete_1' : markComplete_1})

'''
#FOR THE MARK COMPLETE MODELS
mark_complete_model_by_name = {
    model.__class__.__name__: model
    for model in [
        Foo,
        Bar,
    ]
}
def mark_complete(request, model_name, pk):
    mark_complete_model_by_name[model_name].objects.filter(pk=pk, user=request.user).update(complete=True)
    return HttpResponse('ok')
'''
def update_MarkComplete_Game(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        markComplete_1 = True; #level context from the profile
        profile.markComplete_1 = markComplete_1
        profile.save()

        response_data = {'markComplete_1': markComplete_1}
        return JsonResponse(response_data)

#handles the level updating for ajax calls
@login_required
def update_level(request):
    if request.method == 'POST':
        profile = Profile.objects.get(user=request.user) #profile object
        level = profile.level + 1 #level context from the profile
        profile.level = level
        profile.save()

        response_data = {'level': level}
        return JsonResponse(response_data)
    

       
