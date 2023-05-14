import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("#start-btn");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

let countdownIntervalId;

const updateCountdown = (countdownDate) => {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  if (distance < 0) {
    clearInterval(countdownIntervalId);
    window.alert("Please choose a date in the future");
    startButton.disabled = true;
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  daysElement.textContent = days.toString().padStart(2, "0");
  hoursElement.textContent = hours.toString().padStart(2, "0");
  minutesElement.textContent = minutes.toString().padStart(2, "0");
  secondsElement.textContent = seconds.toString().padStart(2, "0");
};

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      countdownIntervalId = setInterval(() => {
        updateCountdown(selectedDate);
      }, 1000);
    }
  },
});

startButton.addEventListener("click",() => {
    startButton.disabled = true;
    clearInterval(countdownIntervalId);
    const selectedDate = new Date(dateTimePicker.value);
    countdownIntervalId = setInterval(() => {
      updateCountdown(selectedDate);
    });
  });