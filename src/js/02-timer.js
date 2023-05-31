import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const data = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let timerInterval;
let targetDate;

flatpickr(data, {
  enableTime: true,
  time_24hr: false,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startBtn.disabled = false;
      targetDate = selectedDate;
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const currentTime = new Date();
  const timeDifference = targetDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    Notiflix.Notify.success('Countdown finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

//ESTILOS A LA PAGINA

const ulElements = document.querySelectorAll('ul');
const aElements = document.querySelectorAll('a');

ulElements.forEach((ulElement) => {
  ulElement.style.listStyle = 'none';
  ulElement.style.textDecoration = 'none';
  ulElement.style.fontSize = '24px';
  ulElement.style.fontWeight = 'bold';
  ulElement.style.color = '#212121';
});

aElements.forEach((aElement) => {
  aElement.style.listStyle = 'none';
  aElement.style.textDecoration = 'none';
  aElement.style.fontSize = '24px';
  aElement.style.fontWeight = 'bold';
  aElement.style.color = '#212121';

  aElement.addEventListener('mouseover', () => {
    aElement.style.color = 'coral';
    aElement.style.fontSize = '26px';
  });

  aElement.addEventListener('mouseout', () => {
    aElement.style.color = '#212121';
    aElement.style.fontSize = '24px';
  });
});

const buttonElements = document.querySelectorAll('button');

buttonElements.forEach((buttonElement) => {
  buttonElement.style.borderRadius = '15px';
  buttonElement.style.cursor = 'pointer';

  buttonElement.addEventListener('mouseover', () => {
    buttonElement.style.backgroundColor = 'coral';
  });

  buttonElement.addEventListener('mouseout', () => {
    buttonElement.style.backgroundColor = '';
  });

  buttonElement.addEventListener('mousedown', () => {
    buttonElement.style.backgroundColor = 'aquamarine';
  });

  buttonElement.addEventListener('mouseup', () => {
    buttonElement.style.backgroundColor = '';
  });
});

const timerElement = document.querySelector('.timer');

timerElement.style.display = 'flex';
timerElement.style.flexDirection = 'row';
timerElement.style.marginTop = '25px';
timerElement.style.gap = '15px';
timerElement.style.alignItems = 'center';
timerElement.style.textAlign = 'center';
timerElement.style.fontSize = '24px';

const fieldElements = document.querySelectorAll('.field');

fieldElements.forEach((fieldElement) => {
  fieldElement.style.display = 'flex';
  fieldElement.style.flexDirection = 'column';
});
