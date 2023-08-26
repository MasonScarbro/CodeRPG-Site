{% block content %}
{% load static %}
{% csrf_token %}
{% if user.is_authenticated %} <!--If the user is logged in or in other words ''authenticated''-->
<link 
rel="stylesheet"
type="text/css"
href="{% static 'CodeRPGappMain/css/bootstrap.css' %}"
/>
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

<footer class="text-center text-white fixed-bottom" style="background-color: #21081a;">
    <!-- Grid container -->
    <div class="container p-4"></div>
    <!-- Grid container -->
  
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2023 Copyright:
      <a class="text-white" href="https://github.com/MasonScarbro/CodeRPG-Site">Mason Scarbro</a>
      || Build: 0.0.1, 8/8/2023
    </div>
    <!-- Copyright -->
  </footer>

{% endif %}
{% endblock %}