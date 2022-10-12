import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let selectedPointInMs;
let deltaTime;
const calendar = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');
btnStart.classList.add('btnDisabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    selectedPointInMs = Date.parse(selectedDates[0]);
    checkSelectedDate(selectedPointInMs, startTime);
  },
};

flatpickr(calendar, options);

btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  const timeId = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = selectedPointInMs - currentTime;

    const leftTime = convertMs(deltaTime);

    if (deltaTime < 0) {
      clearInterval(timeId);
      return;
    }

    updateTextContent(leftTime);
  }, 1000);
}

function checkSelectedDate(selectedMs, startTime) {
  deltaTime = selectedMs - startTime;
  if (deltaTime <= 0) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  btnStart.removeAttribute('disabled');
  btnStart.classList.replace('btnDisabled', 'btnActive');
}

function updateTextContent({ days, hours, minutes, seconds }) {
  daysField.textContent = addLeadingZero(days);
  hoursField.textContent = addLeadingZero(hours);
  minutesField.textContent = addLeadingZero(minutes);
  secondsField.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
