import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const globalDelay = Number.parseInt(formElements.delay.value);
  const step = Number.parseInt(formElements.step.value);
  const amount = Number.parseInt(formElements.amount.value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = i === 0 ? globalDelay : globalDelay + i * step;
    console.log(delay);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
