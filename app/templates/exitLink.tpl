if (document.getElementsByClassName('<%exit%>').length) {
  const links = document.getElementsByClassName('<%exit%>');
  for (let i = 0; i < links.length; i += 1) {
    links[i].addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      Enabler.exit('<%exitFormatted%>');
    });
  }
}