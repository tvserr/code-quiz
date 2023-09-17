var startButton = document.querySelector(".startButton");
var timerElement = document.querySelector(".timer-count");

var isWin = false;
var timer;
var timerCount;

startButton.addEventListener("click", function () {
   
});

function startGame() {
   isWin = false;
   timerCount = 75;
   startButton.disabled = true;
   renderQuestion()
   startTimer()
};

function startTimer() {
   timer = setInterval(function () {
      timerCount--;
      timerElement.textContent = timerCount;
   });
};

function renderQuestion() {
   var questions = [
      {
         title: "Which of the following is an example of a string?",
         choices: ["a. 54", "b. fifty four", "c. "54"", "d. fifty-four"],
         answer: "c. "54"",
      },
      {
         title: "Which of the following is an example of a boolean?",
         choices: ["a. "this"", "b. false", "c. 75", "d. seventy-five"],
         answer: "b. false",
      },
      {
         title: "In Javascript, this executes a block of code over and over again. What is this called?",
         choices: ["a. variable loop", "b. function loop", "c. string loop", "d. for loop"],
         answer: "d. for loop",
      },
      {
         title: "In Javascript, what is this container that stores data?",
         choices: ["a. variable", "b. function", "c. string", "d. event"],
         answer: "a. variable",
      },
   ]
};

