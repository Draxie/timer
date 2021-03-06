/*-------------- Toggle settings --------------*/

let settings = document.querySelector(".settings-section");

function ToggleSettings() {
  settings.classList.toggle("closed");
}

/*-------------- Custom Time --------------*/

let appliedTimes = [25, 5, 15];
let customTimes = document.querySelectorAll("#custom-time");

customTimes.forEach((time) =>
  time.addEventListener("input", () => {
    if (time.value > 60) time.value = 60;
    if (time.value < 1) time.value = 1;
  })
);

function IncreseValue(index) {
  if (customTimes[index].value < 60) customTimes[index].value++;
}

function DecreseValue(index) {
  if (customTimes[index].value > 1) customTimes[index].value--;
}

/*-------------- Custom Font --------------*/

let appliedFont = "Kumbh Sans";
let fonts = document.querySelectorAll("#font");

fonts.forEach((font) =>
  font.addEventListener("click", () => {
    for (i = 0; i < fonts.length; i++) {
      if (font === fonts[i]) {
        fonts[i].classList.add("choosen-font");
        switch (i) {
          case 0:
            appliedFont = "Kumbh Sans";
            break;
          case 1:
            appliedFont = "Roboto Slab";
            break;
          case 2:
            appliedFont = "Space Mono";
            break;
        }
      } else {
        fonts[i].classList.remove("choosen-font");
      }
    }
  })
);

/*-------------- Custom Color --------------*/

let appliedColor = "#F87070";
let colors = document.querySelectorAll("#color");

colors.forEach((color) =>
  color.addEventListener("click", () => {
    for (i = 0; i < colors.length; i++) {
      if (color === colors[i]) {
        colors[i].classList.add("choosen-color");
        switch (i) {
          case 0:
            appliedColor = "#F87070";
            break;
          case 1:
            appliedColor = "#70F3F8";
            break;
          case 2:
            appliedColor = "#D881F8";
            break;
        }
      } else {
        colors[i].classList.remove("choosen-color");
      }
    }
  })
);

/*-------------- Apply Values --------------*/

function ApplyValues() {
  for (i = 0; i < customTimes.length; i++) {
    appliedTimes[i] = customTimes[i].value;
  }
  document.documentElement.style.setProperty("--selected-font", appliedFont);
  document.documentElement.style.setProperty("--selected-color", appliedColor);
  ToggleSettings();
  Reset();
}

/*-------------- Select Break --------------*/

let selectedBreakIndex = 0;
let isReseted = false;
let breaks = document.querySelectorAll(".break");

breaks.forEach((breakBtn) =>
  breakBtn.addEventListener("click", () => {
    for (i = 0; i < breaks.length; i++) {
      if (breakBtn === breaks[i]) {
        breaks[i].classList.add("selected");
        selectedBreakIndex = i;
        Reset();
      } else {
        breaks[i].classList.remove("selected");
      }
    }
  })
);

/*------------------- Timer ------------------*/

let progressCircle = document.querySelector(".progress");
let radius = progressCircle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;
let timePassed = breaks[selectedBreakIndex].value * 60;
let start = document.getElementById("start");
let timeDisplay = document.querySelector(".timeDisplay");
let minutesPassed = 0;
let secondsPassed = 0;
let timerState = "finished";

start.addEventListener("click", function () {
  switch (timerState) {
    case "finished":
      StartTimer();
      timerState = "running";
      start.innerHTML = "PAUSE";
      break;
    case "running":
      timerState = "paused";
      start.innerHTML = "RESUME";
      break;
    case "paused":
      timerState = "running";
      start.innerHTML = "PAUSE";
      break;
  }
});

progressCircle.style.strokeDasharray = circumference;

setProgress(100);

function setProgress(percent) {
  progressCircle.style.strokeDashoffset =
    circumference - (percent / 100) * circumference;
}

function StartTimer() {
  var myTimer = setInterval(function () {
    if (timerState === "running") {
      timePassed += 0.1;
      setProgress((timePassed * 100) / (appliedTimes[selectedBreakIndex] * 60));
      UpdateDisplay();
    }

    if (timePassed >= appliedTimes[selectedBreakIndex] * 60) {
      clearInterval();
      timerState = "finished";
      start.innerHTML = "START";
      timePassed = 0;
      UpdateDisplay();
    }
  }, 100);
}

function ClearAllIntervals() {
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);
  for (var i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
}

function Reset() {
  timerState = "finished";
  start.innerHTML = "START";
  timePassed = 0;
  UpdateDisplay();
  setProgress(100);
  isReseted = true;
  ClearAllIntervals();
}

function UpdateDisplay() {
  if (parseInt(timePassed / 60) < 10)
    minutesPassed = "0" + parseInt(timePassed / 60);
  else minutesPassed = parseInt(timePassed / 60);
  if (parseInt(timePassed % 60) < 10)
    secondsPassed = "0" + parseInt(timePassed % 60);
  else secondsPassed = parseInt(timePassed % 60);
  timeDisplay.innerHTML = minutesPassed + ":" + secondsPassed;
}
