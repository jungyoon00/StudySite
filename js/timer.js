const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

const startview = document.querySelector("#startview");
const endview = document.querySelector("#endview");

const stopwatch_form = document.querySelector(".stopwatch_form");
const stopwatch = document.querySelector("#stopwatch");

let timeid;
let time = 0;
let hour, min, sec;

function printTime() {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

function stopClock() {
    if (timeid != null) {
        clearTimeout(timeid);
    }
}

function startClock() {
    printTime();
    stopClock();
    timeid = setTimeout(startClock, 1000);
}

function resetClock() {
    stopClock();
    stopwatch.classList.remove("stopwatch_end");
    stopwatch.classList.add("stopwatch_style");
    stopwatch.innerText = "00:00:00";
    time = 0;
    startview.innerText = "";
    endview.innerText = "";
}

function getTimeFormatString() {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - (hour * 60 * 60)) /60));
    sec = time % 60;

    return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

function startTimer() {
    const date = new Date();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const now = `${hours}:${minutes}:${seconds}`;

    if (startBtn.value == "active") {
        stopwatch.classList.remove("stopwatch_start");
        stopwatch.classList.add("stopwatch_end");
        startBtn.value = "unactive";
        startBtn.innerText = "START";
        changeEndTime(now);
        saveTimer("endview", now);
        saveActive("unactive");
        stopClock();
        console.log("go unactive");
    } else {
        resetClock();
        stopwatch_form.classList.remove("hidden");
        stopwatch.classList.remove("stopwatch_style");
        stopwatch.classList.add("stopwatch_start");
        startview.innerText = "";
        endview.innerText = "";

        startBtn.value = "active";
        startBtn.innerText = "STOP";
        changeStartTime(now);
        saveTimer("startview", now);
        saveActive("active");
        startClock();
        console.log("go active");
    }
    console.log(now);
}

function saveActive(value) {
    localStorage.setItem("active", value)
}
function saveTimer(key, value) {
    localStorage.setItem(String(key), value);
}
function changeStartTime(time) {
    startview.innerText = time;
}
function changeEndTime(time) {
    endview.innerText = time;
}
let start = localStorage.getItem("startview");
let end = localStorage.getItem("endview");
let active = localStorage.getItem("active");

if (active === "active") {
    startBtn.value = "active";
    startBtn.innerText = "STOP";
} else if (active == "unactive") {
    startBtn.value = "unactive";
    startBtn.innerText = "START";
}
if (start === undefined) {
    start = "";
}
if (end === undefined) {
    end = "";
}

console.log(start, end);
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetClock);
startview.innerText = start;
endview.innerText = end;