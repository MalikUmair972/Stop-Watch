let display = document.getElementById('display');
let start = document.getElementById('startBtn');
let stop = document.getElementById('stoptBtn');
let reset = document.getElementById('resetBtn');

let seconds = 0, minutes = 0, hours = 0;
let timer = null;

if (localStorage.getItem("stopwatch")) {
    let storedTime = JSON.parse(localStorage.getItem("stopwatch"));
    hours = storedTime.hours;
    minutes = storedTime.minutes;
    seconds = storedTime.seconds;
    updateTimeDisplay();
}

function startStopWatch () {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(updateTime, 1000);
}

function stopStopWatch () {
    clearInterval(timer);
}

function resetStopWatch() {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    localStorage.removeItem("stopwatch");
    display.innerText = "00:00:00";
}

function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    updateTimeDisplay();
}
   function updateTimeDisplay() {
    let h = hours < 10 ? "0" + hours:hours;
    let m = minutes <10 ? "0" + minutes:minutes;
    let s = seconds <10 ? "0" + seconds:seconds;
    display.innerText = `${h}:${m}:${s}`
   }

   function saveTime() {
    let time = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
    localStorage.setItem("stopwatch", JSON.stringify(time));
}

startBtn.addEventListener('click', startStopWatch);
stopBtn.addEventListener('click', stopStopWatch);
resetBtn.addEventListener('click', resetStopWatch);

