let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let button = document.querySelector(".button")

let currentTimer = pomodoro
let myInterval = null

// show the default timer
function showDefaultTimer() {
    pomodoro.style.display = "block"
    short.style.display = "none"
    long.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => (
        timer.style.display = "none"
    ))
}

session.addEventListener("click", () => {
    hideAll()

    pomodoro.style.display = "block"

    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoro
})

shortBreak.addEventListener("click", () => {
    hideAll()

    short.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = short
})

longBreak.addEventListener("click", () => {
    hideAll()

    long.style.display = "block"

    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = long
})

function startTimer(timerDisplay) {
    if(myInterval) {
        clearInterval(myInterval);
    }

    timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0];

    let duration = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + duration;

    myInterval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if(timeRemaining <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";

            const alarm = new Audio("/Users/joaosilvino/Downloads/jeremayjimenez-thailand-eas-alarm-2006-266492.mp3");
            alarm.play();
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            timerDisplay.textContent = formattedTime;
        }
    }, 1000)
}

startBtn.addEventListener("click", () => {
    startTimer(currentTimer)
})

stopBtn.addEventListener("click", () => {
    if(currentTimer) {
        clearInterval(myInterval)
    }
})