const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let interval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function switchBackgroundColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

function startButton() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  switchBackgroundColor();
  interval = setInterval(switchBackgroundColor, 1000);
}

function stopButton() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(interval);
}

startBtn.addEventListener('click', startButton );
stopBtn.addEventListener('click', stopButton);
