window.addEventListener('load', () => {
  const body = document.getElementsByTagName('body')[0];
  const isiContainerWrapper = document.getElementById('isi-container-wrapper');
  const buttonContainer = document.createElement('div');
  const button = document.createElement('button');
  const description = document.createElement('p');

  buttonContainer.classList.add('expand-isi-button-container');
  button.classList.add('expand-isi-button');
  description.classList.add('expand-isi-button-description');

  const style = document.createTextNode(`
  .expand-isi-button-container {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
    width: 165px;
  }

  button.expand-isi-button {
    background-color: #ffffff;
    text-align: center;
    width: 100%;
    padding: 10px 20px;
    border: 2px solid #333333;
    transition: all .1s;
    color: #333333;
    outline: none;
  }

  button.expand-isi-button:hover {
    background-color: #333333;
    color: #ffffff;
  }

  .expand-isi-button-description {
    color: dimgrey;
    font-size: 12px;
    text-align: center;
    margin: 5px 0;
    font-style: italic;
  }
  `);

  const styleTag = document.createElement('style');
  styleTag.appendChild(style);
  document.getElementsByTagName('head')[0].appendChild(styleTag);

  function expandIsi() {
    button.removeEventListener('click', expandIsi);
    button.innerText = 'COLLAPSE ISI';
    const offsetTop = isiContainerWrapper.getBoundingClientRect().top;
    isiContainerWrapper.style.height = `calc(100vh - ${offsetTop}px)`;
    button.addEventListener('click', collapseIsi);
  }

  function collapseIsi() {
    button.removeEventListener('click', collapseIsi);
    button.innerText = 'EXPAND ISI';
    isiContainerWrapper.style.removeProperty('height');
    button.addEventListener('click', expandIsi);
  }

  button.innerText = 'EXPAND ISI';
  description.innerText = 'This button is for development testing purposes only. It will not be included when the project is "Built".';
  button.addEventListener('click', expandIsi);
  buttonContainer.appendChild(button);
  buttonContainer.appendChild(description);
  body.appendChild(buttonContainer);
});