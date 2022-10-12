const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timeId = null;
let isActive = false;
refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', onStopChangeColor);

function onChangeColor() {
  if (isActive) {
    return;
  }

  timeId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  isActive = true;

  refs.btnStart.setAttribute('disabled', 'disabled');
}

function onStopChangeColor() {
  clearInterval(timeId);
  isActive = false;
  refs.btnStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
