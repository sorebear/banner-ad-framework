{% set banner = "<%fileName%>" %}
{% set size = "width: <%width%>px; height:<%height%>px;" %}

{% extends "layout.html" %}

{% block stylesheets %}
   {% if orientationStyle %}<link rel="stylesheet" href="{{ orientationStyle }}">{% endif %}
   {% if pageStyle %}<link rel="stylesheet" href="{{ pageStyle }}">{% endif %}
{% endblock %}

{% block bodyClass %}{% endblock %}

{% block content %}

  <!--enter content here-->

{% endblock %}

{% block isi %}
  {% include './isi.html' %}
{% endblock %}

{% block scripts %}
   <script src="js/main.js"></script>
   {% if orientationScript %}<script src="{{ orientationScript }}"></script>{% endif %}
{% endblock %}