const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  if (intervalId === null) {
    intervalId = setInterval(changeBodyColor, 1000);
    startBtn.disabled = true;
  }
}

function onStopClick() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
}

function changeBodyColor() {
  const newColor = getRandomHexColor();
  bodyEl.style.backgroundColor = newColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

