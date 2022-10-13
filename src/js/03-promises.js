import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let position = 1;
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;

  const delay = formElements.delay.value;
  const step = formElements.step.value;
  const amount = formElements.amount.value;

  amountFunctionMaking(delay, amount, step);
}


function amountFunctionMaking(delay, amount, step) {
  position = 1;
  firstDelayFunction(position, delay);
  stepIntervalFunction(delay, amount, step);

  
}

function firstDelayFunction(position, delay) {
  const timeId = setTimeout(() => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position} in ${delay}ms`
        );
      });
  }, delay);
  clearTimeout(timeId);
}

function stepIntervalFunction(delay, amount, step) {
  delay = Number(delay);
  const timeId = setInterval(() => {
    if (amount === 0) {
      clearInterval(timeId);
      return;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position} in ${delay}ms`
        );
      });
    position += 1;
    amount -= 1;
    delay += Number(step);
  }, step);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  }
  return Promise.reject({ position, delay });
}
