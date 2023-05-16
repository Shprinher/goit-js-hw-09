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
  let currentDelay = parseInt(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += parseInt(step.value);
  }
});
