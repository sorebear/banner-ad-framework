if (document.getElementsByClassName('<%exit%>').length) {
  document.querySelectorAll('.<%exit%>').forEach(exitLink => {
    exitLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('<%exitFormatted%>');
    });
  });
}