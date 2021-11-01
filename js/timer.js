/*-------------- Toggle settings --------------*/

let settings = document.querySelector('.settings-section');

function ToggleSettings(){
    settings.classList.toggle('closed')
}

/*-------------- Custom Time --------------*/

let customTimes = document.querySelectorAll('#custom-time')

customTimes.forEach((time) =>
  time.addEventListener("input", () => {
   if(time.value> 60) time.value= 60;
   if(time.value< 1) time.value= 1;
  })
);

function IncreseValue(index){
    if(customTimes[index].value<60) customTimes[index].value++;  
}

function DecreseValue(index){
    if(customTimes[index].value>1) customTimes[index].value--;
}


/*-------------- Select Break --------------*/

let selectedBreakIndex = 0;
let breaks = document.querySelectorAll('.break');

breaks.forEach((breakBtn) =>
  breakBtn.addEventListener("click", () => {
    for (i = 0; i < breaks.length; i++) {
      if (breakBtn === breaks[i]) {
        breaks[i].classList.add("selected");
        selectedBreakIndex = i;
      } 
      else {
        breaks[i].classList.remove("selected");
      }
    }
  })
);


/*-------------- Custom Font --------------*/

let fonts = document.querySelectorAll('#font');

fonts.forEach((font) =>
  font.addEventListener("click", () => {
    for (i = 0; i < fonts.length; i++) {
      if (font === fonts[i]) {
        fonts[i].classList.add("choosen-font");
        switch (i) {
            case 0:
                document.documentElement.style.setProperty('--selected-font', 'Kumbh Sans');
                break;
            case 1:
                document.documentElement.style.setProperty('--selected-font', 'Roboto Slab');
                break;
            case 2:
                document.documentElement.style.setProperty('--selected-font', 'Space Mono');
                break;
        }
      } else {
        fonts[i].classList.remove("choosen-font");
      }
    }
  })
);

/*-------------- Custom Color --------------*/

let colors = document.querySelectorAll('#color');

colors.forEach((color) =>
  color.addEventListener("click", () => {
    for (i = 0; i < colors.length; i++) {
      if (color === colors[i]) {
        colors[i].classList.add("choosen-color");
        switch (i) {
            case 0:
                document.documentElement.style.setProperty('--selected-color', '#F87070');
                break;
            case 1:
                document.documentElement.style.setProperty('--selected-color', '#70F3F8');
                break;
            case 2:
                document.documentElement.style.setProperty('--selected-color', '#D881F8');
                break;
        }
      } else {
        colors[i].classList.remove("choosen-color");
      }
    }
  })
);

/*------------------- Timer ------------------*/

let progressCircle = document.querySelector(".progress");
let radius = progressCircle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;
let CountdownFrom = breaks[selectedBreakIndex].value * 60;
let start = document.getElementById('start')
let isStarted = false;
let isPaused = false;
let isResumed = false;

start.addEventListener('click', function(){

    if(!isStarted){
        StartTimer();
        start.innerHTML='PAUSE'
        isStarted=true;
    }
    
});

progressCircle.style.strokeDasharray = circumference;

setProgress(100);

function setProgress(percent) {
    progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
}

function StartTimer(){
    setInterval(function(){ 
        CountdownFrom += 0.1;
        setProgress((CountdownFrom * 100) / (customTimes[selectedBreakIndex].value * 60))
        if(CountdownFrom=== customTimes[selectedBreakIndex].value * 60) clearInterval();
    }, 100);
}
