module.exports = function() {
  if (document.getElementsByClassName('testLink').length) {
    const links = document.getElementsByClassName('testLink');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        Enabler.exit('Test Link');
      });
    }
  }
}