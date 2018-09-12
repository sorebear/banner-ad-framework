{% set width = <%width%> %} 
{% set height = <%height%> %}

{% set banner = "<%fileName%>" %}
{% block bannerClass %}{% endblock %}

{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout-standard.html" %}

{% block content %}

  {% include './main-content.html' %}
  <!--enter page specific content here-->

{% endblock %}

{% block isi %}
  {% include './isi.html' %}
{% endblock %}