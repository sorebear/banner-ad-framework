{% set banner = "<%fileName%>" %}

{% extends "layout.html" %}

{% block stylesheets %}
   <link rel="stylesheet" href="css/main.css">
   {% if orientationStyle %}<link rel="stylesheet" href="{{ orientationStyle }}">{% endif %}
   {% if pageStyle %}<link rel="stylesheet" href="{{ pageStyle }}">{% endif %}
{% endblock %}

{% block bodyClass %}{% endblock %}

{% block content %}

  <!--enter content for 01-728x90 here-->

{% endblock %}

{% block scripts %}
   <script src="js/main.js"></script>
   {% if orientationScript %}<script src="{{ orientationScript }}"></script>{% endif %}
{% endblock %}