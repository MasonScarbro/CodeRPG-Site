{% extends 'base.html' %}
{% load static %}
{% csrf_token %}
{% if user.is_authenticated %} <!--If the user is logged in or in other words ''authenticated''-->
{%  block content %}
<div class="container">
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="card" style="width: 20rem; margin-top: 20px;" >
        <img src="{% static 'CodeRPGappMain/images/Code-RPG.png' %}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">The Basics RPG!</h5>
          <p class="card-text">The First Game Built for the site! A text adventure game built around some basics of CS (Its okay if you dont know the fibonacci sequence and other silly stuff!)</p>
          <a href="{% url 'game' %}" class="btn btn-primary">To The Game!</a>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
      <div class="card" style="width: 20rem; margin-top: 20px;" >
        <img src="{% static 'CodeRPGappMain/images/Code-RPG.png' %}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">EXAMPLE GAME</h5>
          <p class="card-text">Coming Soon! (hopefully)</p>
          <a href="#" class="btn btn-primary">To The Game!</a>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-lg-4">
      <div class="card" style="width: 20rem; margin-top: 20px;" >
        <img src="{% static 'CodeRPGappMain/images/Code-RPG.png' %}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">EXAMPLE GAME</h5>
          <p class="card-text">Coming Soon! (hopefully)</p>
          <a href="#" class="btn btn-primary">To The Game!</a>
        </div>
      </div>
    </div>

  </div>
</div>
{% endblock %}
{% endif %}

