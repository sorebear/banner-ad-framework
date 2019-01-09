module.exports = function() {
  if (document.getElementsByClassName('testLink1').length) {
    const links = document.getElementsByClassName('testLink1');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        Enabler.exit('Test Link - Ecosia', 'https://www.ecosia.org/');
      });
    }
  }
  if (document.getElementsByClassName('testLink2').length) {
    const links = document.getElementsByClassName('testLink2');
    for (let i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        Enabler.exit('Test Link 2 - Google', 'http://google.com');
      });
    }
  }
};