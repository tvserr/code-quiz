var startButton = document.querySelector(".startButton");
var timerElement = document.querySelector(".timer-count");

var timerStarts;
var timerCount;

startButton.addEventListener("click", function () {
   
});

function startTimer() {
   timerStarts = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
   });
};