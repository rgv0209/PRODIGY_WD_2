let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");
  let formattedHH = hh.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.<span class="ms">${formattedMS}</span>`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = timeToString(elapsedTime);
  }, 10);
  
  startPauseBtn.textContent = "Pause";
  startPauseBtn.className = "btn start running";
  lapBtn.disabled = false;
  isRunning = true;
}

function pause() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = "Start";
  startPauseBtn.className = "btn start";
  isRunning = false;
}

// Button actions mapping
startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    start();
  } else {
    pause();
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  display.innerHTML = "00:00:00.<span class=\"ms\">00</span>";
  elapsedTime = 0;
  lapCount = 0;
  lapsList.innerHTML = "";
  startPauseBtn.textContent = "Start";
  startPauseBtn.className = "btn start";
  lapBtn.disabled = true;
  isRunning = false;
});

lapBtn.addEventListener('click', () => {
  lapCount++;
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount}</span> <span>${timeToString(elapsedTime)}</span>`;
  lapsList.prepend(li); // Puts the newest lap at the top
});
