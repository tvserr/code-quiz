var quizContainer = document.querySelector(".quiz-container");
var questionContainer = document.querySelector(".question-container");
var choicesContainer = document.querySelector(".choices-container");
var scoresContainer = document.querySelector(".scores-container");

var startBtn = document.getElementById("start-quiz");
var timerDisplay = document.getElementById("timer-display");
var optionBtn1 = document.getElementById("option1");
var optionBtn2 = document.getElementById("option2");
var optionBtn3 = document.getElementById("option3");
var optionBtn4 = document.getElementById("option4");
var userScore = document.getElementById("user-score");
var questionTitle = document.getElementById("question-title");

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
   title: "In Javascript, this executes a block of code over and over again. What is this called?",
   choices: ["a. variable loop", "b. function loop", "c. string loop", "d. for loop"],
   answer: "d. for loop",
   },
   {
   title: "In Javascript, what is this container that stores data?",
   choices: ["a. variable", "b. function", "c. string", "d. event"],
   answer: "a. variable",
   },
];

// optionBtn1.addEventListener("click");
// optionBtn2.addEventListener("click");
// optionBtn3.addEventListener("click");
// optionBtn4.addEventListener("click");

function startQuiz() {
   currentQuestion = 0;
   score = 0;
   timerCount = 75;
   startTimer();
   displayQuestion(currentQuestion);

}

function startTimer() {
   timerInterval = setInterval(function () {
      timerCount--;
      timerDisplay.textContent = "Time: " + timerCount;

      if (timerCount <= 0) {
         endQuiz();
      }
   }, 1000)
}

function displayQuestion(questionIndex) {
   if (questionIndex < questions.length) {
   var currentQuestionObj = questions[questionIndex];
   questionTitle.textContent = currentQuestionObj.title;

   choicesContainer.innerHTML = "";

   for (var i = 0; i < currentQuestionObj.choices.length; i++) {
      var choiceBtn = document.createElement("button");
      choiceBtn.textContent = currentQuestionObj.choices[i];
      choiceBtn.addEventListener("click", checkAnswer);
      choicesContainer.appendChild(choiceBtn);
   }
   } else {
   endQuiz();
   }
}

function checkAnswer(event) {
   var userChoice = event.target.textContent;
   var currentQuestionObj = questions[currentQuestion];

   if (userChoice != currentQuestionObj.answer) {
   timerCount -= 15;
   userScore.textContent = "Your final score is " + score + ".";
   }

   currentQuestion++;
   displayQuestion(currentQuestion);
}

function showScore() {
   var correctAnswers = 0;

   questions.forEach(function (currentQuestion, currentQuestionIndex) {
      if (currentQuestion.choices.indexOf(currentQuestion.answer) !== -1) {
         correctAnswers++;
      }
   })

   scoresContainer.innerHTML = "Your final score is " + correctAnswers + ".";
}

function endQuiz() {}

startBtn.addEventListener('click', startQuiz);

startQuiz();
