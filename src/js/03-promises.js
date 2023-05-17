// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
import Notiflix from 'notiflix';
const form = document.querySelector(".form");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { delay, step, amount } = event.target.elements;
  const initialDelay = parseInt(delay.value);
  const stepValue = parseInt(step.value);

  if (initialDelay < 0 || stepValue < 0) {
    Notiflix.Notify.failure("Delay and step values cannot be negative.");
    return;
  }

  let currentDelay = initialDelay;
  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        if (delay < 0) {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} due to negative delay`);
        } else {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      });
    currentDelay += parseInt(step.value);
    currentDelay += stepValue;
  }
});
