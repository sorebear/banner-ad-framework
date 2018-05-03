if ($('.<%exit%>').length) {
  $('.<%exit%>').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    Enabler.exit('<%exitFormatted%>');
  });
}