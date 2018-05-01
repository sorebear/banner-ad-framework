{% set banner = "<%fileName%>" %}
{% set size = "width: <%width%>px; height:<%height%>px;" %}
{% from "./links.html" import link, closeLink %}

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

{% block isi %}
  {% include './isi.html' %}
{% endblock %}