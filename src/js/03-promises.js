import Notiflix from "notiflix"

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();
  const firstDelay = document.querySelector('input[name="delay"]');
  const delayStep = document.querySelector('input[name="step"]');
  const amount = document.querySelector('input[name="amount"]');
  const delayValue = parseInt(firstDelay.value);
  const stepValue = parseInt(delayStep.value);
  const amountValue = parseInt(amount.value);

  let stateDelay = delayValue;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, stateDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    stateDelay += stepValue;
  }
});

var formElement = document.querySelector('.form');

formElement.style.display = 'flex';
formElement.style.flexDirection = 'column';
formElement.style.gap = '10px';

var inputElements = document.querySelectorAll('.form input');

inputElements.forEach(function(input) {
  input.style.padding = '5px';
  input.style.borderRadius = '10px';
});

var buttonElement = document.querySelectorAll('.form button');

buttonElement.forEach(function (button) {
  button.style.display = 'flex';
  button.style.justifyContent = 'center';
  button.style.textAlign = 'center';
  button.style.alignItems = 'center';
  button.style.width = '155px';
  button.style.height = '35px';
  button.style.marginTop = '15px';
  button.style.fontSize = '16px'
})


