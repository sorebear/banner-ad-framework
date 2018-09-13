{% macro link(link, class) %}<span onclick="window.open(window.{{ link }})" class="{{ class }} click-tag">{% endmacro %}

{% macro closeLink() %}</span>{% endmacro %}

{% macro enabler() %}
<script>
  <%clickTags%>
</script>
{% endmacro %}