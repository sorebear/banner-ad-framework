{% set banner = "<%fileName%>" %}
{% set width = <%width%> %} 
{% set height = <%height%> %}
{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout-static.html" %}

{% block stylesheets %}
   {% if orientationStyle %}<link rel="stylesheet" href="{{ orientationStyle }}">{% endif %}
   {% if pageStyle %}<link rel="stylesheet" href="{{ pageStyle }}">{% endif %}
{% endblock %}

{% block bodyClass %}{% endblock %}

{% block content %}

  {% include './main-content.html' %}
  <!--enter page specific content here-->

{% endblock %}
