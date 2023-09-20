var quizContainer = document.querySelector(".quiz-container");
var choicesContainer = document.querySelector(".choices-container");
var scoresContainer = document.querySelector(".scores-container");
var welcomeMessage = document.querySelector(".welcome-message");

var startBtn = document.getElementById("start-quiz");
var timerDisplay = document.getElementById("timer-display");
var questionTitle = document.getElementById("question-title");
var userScore = document.getElementById("user-score");
var answerResult = document.getElementById("answer-result");

var choiceBtn1 = document.querySelector(".choice-btn1");
var choiceBtn2 = document.querySelector(".choice-btn2");
var choiceBtn3 = document.querySelector(".choice-btn3");
var choiceBtn4 = document.querySelector(".choice-btn4");

var currentQuestion = 0;
var score = 0;
var timerCount = 75;
var timerInterval;

var questions = [
   {
   title: "Which of the following encloses a string?",
   choices: ["a. parentheses", "b. commas", "c. quotes", "d. curly brackets"],
   answer: "c. quotes",
   },
   {
   title: "Which of the following is a boolean?",
   choices: ["a. this", "b. false", "c. 75", "d. seventy-five"],
   answer: "b. false",
   },
   {
   title: "Arrays in JavaScript can be used to store ______.",
   choices: ["a. booleans", "b. other arrays", "c. numbers and strings", "d. all of the above"],
   answer: "d. all of the above",
   },
   {
   title: "This executes a block of code over and over again. What is this called?",
   choices: ["a. variable loop", "b. for loop", "c. string loop", "d. function loop"],
   answer: "b. for loop",
   },
   {
   title: "What is this container that stores data?",
   choices: ["a. variable", "b. function", "c. string", "d. event"],
   answer: "a. variable",
   },
   {
   title: "A very useful tool used during development and debugging for printing content to the debugger is:",
   choices: ["a. Javascript", "b. terminal/bash", "c. console.log", "d. addEventListener"],
   answer: "c. console.log",
   },
];

welcomeMessage.style.display = "block";
quizContainer.style.display = "none";

function startQuiz() {
   currentQuestion = 0;
   score = 0;
   timerCount = 75;
   welcomeMessage.style.display = "none";
   quizContainer.style.display = "block";
   displayQuestion(currentQuestion);
   startTimer();
}

function startTimer() {
   timerInterval = setInterval(function () {
      timerCount--;
      timerDisplay.textContent = "Time: " + timerCount;

      if (timerCount <= 0 || currentQuestion >= questions.length) {
         clearInterval(timerInterval);
         endQuiz();
      } 
   }, 1000)
}

function displayQuestion(currentQuestion) {
   questionTitle.textContent = questions[currentQuestion].title;
   choiceBtn1.textContent = questions[currentQuestion].choices[0];
   choiceBtn2.textContent = questions[currentQuestion].choices[1];
   choiceBtn3.textContent = questions[currentQuestion].choices[2];
   choiceBtn4.textContent = questions[currentQuestion].choices[3];
}

choiceBtn1.addEventListener("click", checkAnswer);
choiceBtn2.addEventListener("click", checkAnswer);
choiceBtn3.addEventListener("click", checkAnswer);
choiceBtn4.addEventListener("click", checkAnswer);

// if (questionIndex < questions.length) {
   //    var currentQuestionObj = questions[questionIndex];
   //    questionTitle.textContent = currentQuestionObj.title;

   //    choicesContainer.innerHTML = "";

   //    for (var i = 0; i < currentQuestionObj.choices.length; i++) {
   //       var choiceBtn = document.createElement("button");
   //       choiceBtn.textContent = currentQuestionObj.choices[i];
   //       choiceBtn.addEventListener("click", checkAnswer);
   //       choicesContainer.appendChild(choiceBtn);
   //    }
   // } else {
   //    endQuiz();

answerResult.style.display = "none";

function checkAnswer(event) {
   event.preventDefault();

   answerResult.style.display = "block";
   setTimeout(function () {
      answerResult.style.display = "none";
   }, 1000);

   var userChoice = event.target.textContent;

   if (userChoice == questions[currentQuestion].answer) {
      score += 5;
      answerResult.textContent = "Correct!";
   } else {
      timerCount -= 15;
      answerResult.textContent = "Wrong!";
   }

   currentQuestion++;

   if (currentQuestion < questions.length) {
      displayQuestion(currentQuestion);
   } else {
      endQuiz();
   }
}

function getScore() {
   var storedScore = localStorage.getItem("scoreCount");
   if (storedScore === null) {
      score = 0;
   } else {
      score = storedScore;
   }
}

function showScore() {
   score = 0;

   questions.forEach(function (question) {
      if (currentQuestion.choices.indexOf(question.answer) !== -1) {
         score += 5;
      }
   })
}

function endQuiz() {
   quizContainer.style.display = "none";
   scoresContainer.style.display = "block";
   scoresContainer.innerHTML = "Your final score is " + score + ".";

   timerDisplay.style.display = "none";
}

startBtn.addEventListener("click", startQuiz);