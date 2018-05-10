{% set width = <%width%> %} 
{% set height = <%height%> %}

{% set banner = "<%fileName%>" %}
{% block bannerClass %}{% endblock %}

{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout-static.html" %}

{% block content %}

  {% include './main-content-static.html' %}
  <!--enter page specific content here-->

{% endblock %}
