import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input');
const daysInput = document.querySelector('span[data-days]');
const hoursInput = document.querySelector('span[data-hours]');
const minutesInput = document.querySelector('span[data-minutes]');
const secondsInput = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');
const field = document.querySelector('.field');
const allValues = document.querySelectorAll('.value')

timer.style.display = 'flex';
timer.style.columnGap = '20px';
timer.style.fontWeight = '700';
timer.style.marginLeft = '30px';
timer.style.marginTop = '30px';

allValues.forEach((descr) => {
    descr.style.fontSize = "30px"
   
})

let ms = 0;
let timerId = 0;
let currentDay = 0;
let chosenDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = options.defaultDate.getTime();
    chosenDate = selectedDates[0].getTime();
    if (chosenDate < currentDate) {
      return window.alert('"Please choose a date in the future"');
    }
    startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
    inputEl.disabled = true
    
  timerId = setInterval(() => {
    const currentTime = Date.now();
    ms = chosenDate - currentTime;
    convertMs(ms);
    updateCounterFace();
    stopCountdown();
  
  }, 1000);
  
}



function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCounterFace({ days, hours, minutes, seconds } = convertMs(ms)) {
  daysInput.textContent = days;
  hoursInput.textContent = hours;
  minutesInput.textContent = minutes;
  secondsInput.textContent = seconds;

  

  
}

function stopCountdown () {
    if (ms < 1000) {

         return clearInterval(timerId)
      }
}


