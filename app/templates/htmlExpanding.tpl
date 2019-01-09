{% set width = <%width%> %} 
{% set height = <%height%> %}
{% block expandingPixelOffsets %}
  <script>function pixelOffsets() { Enabler.setExpandingPixelOffsets(<%leftOffset%>, <%topOffset%>, <%expandedWidth%>, <%expandedHeight%>); }</script>
{% endblock %}

{% set banner = "<%fileName%>" %}
{% block bannerClass %}{% endblock %}

{% from "./links.html" import link, closeLink, enabler %}

{% extends "layout-expanding.html" %}


{% block mainContentCollapsed %}

  {% include './main-content-collapsed.html' %}
  <!--enter page specific content here-->

{% endblock %}

{% block isiCollapsed %}
  {% include './isi.html' %}
{% endblock %}

{% block mainContentExpanded %}

  {% include './main-content-expanded.html' %}
  <!--enter page specific content here-->

{% endblock %}


{% block isiExpanded %}
  {% include './isi.html' %}
{% endblock %}