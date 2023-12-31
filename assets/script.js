var quizContainer = document.querySelector(".quiz-container");
var choicesContainer = document.querySelector(".choices-container");
var scoresContainer = document.querySelector(".scores-container");
var highscoresContainer = document.querySelector(".highscores-container");
var welcomeMessage = document.querySelector(".welcome-message");

var startBtn = document.getElementById("start-quiz");
var timerDisplay = document.getElementById("timer-display");
var questionTitle = document.getElementById("question-title");
var userScore = document.getElementById("user-score");
var answerResult = document.getElementById("answer-result");
var allDone = document.getElementById("alldone");
var enterInitials = document.getElementById("enter-initials");
var submitBtn = document.getElementById("submit-initials");
var allScores = document.getElementById("all-scores");
var backBtn = document.getElementById("back-button");
var clearBtn = document.getElementById("clear-button");
var viewBtn = document.getElementById("view-highscores");

var choiceBtn1 = document.querySelector(".choice-btn1");
var choiceBtn2 = document.querySelector(".choice-btn2");
var choiceBtn3 = document.querySelector(".choice-btn3");
var choiceBtn4 = document.querySelector(".choice-btn4");

var currentQuestion = 0;
var score = 0;
var timerCount = 75;
var timerInterval;


// array of questions
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
   choices: [
      "a. booleans",
      "b. other arrays",
      "c. numbers and strings",
      "d. all of the above",
   ],
   answer: "d. all of the above",
   },
   {
   title:
      "This executes a block of code over and over again. What is this called?",
   choices: [
      "a. variable loop",
      "b. for loop",
      "c. string loop",
      "d. function loop",
   ],
   answer: "b. for loop",
   },
   {
   title: "What is this container that stores data?",
   choices: ["a. variable", "b. function", "c. string", "d. event"],
   answer: "a. variable",
   },
   {
   title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
   choices: [
      "a. Javascript",
      "b. terminal/bash",
      "c. console.log",
      "d. addEventListener",
   ],
   answer: "c. console.log",
   },
];

// to control displays during the quiz
welcomeMessage.style.display = "block";
quizContainer.style.display = "none";
scoresContainer.style.display = "none";
highscoresContainer.style.display = "none";

// what is displayed when start quiz is clicked
function startQuiz() {
   currentQuestion = 0;
   score = 0;
   timerCount = 75;
   welcomeMessage.style.display = "none";
   quizContainer.style.display = "block";
   displayQuestion(currentQuestion);
   startTimer();
}

// starts timer when start quiz is clicked
function startTimer() {
   timerInterval = setInterval(function () {
   timerCount--;
   timerDisplay.textContent = "Time: " + timerCount;

   if (timerCount <= 0 || currentQuestion >= questions.length) {
      clearInterval(timerInterval);
      endQuiz();
   }
   }, 1000);
}

function displayQuestion(currentQuestion) {
   questionTitle.textContent = questions[currentQuestion].title;
   choiceBtn1.textContent = questions[currentQuestion].choices[0];
   choiceBtn2.textContent = questions[currentQuestion].choices[1];
   choiceBtn3.textContent = questions[currentQuestion].choices[2];
   choiceBtn4.textContent = questions[currentQuestion].choices[3];
}

// event listeners for each option in the questions
choiceBtn1.addEventListener("click", checkAnswer);
choiceBtn2.addEventListener("click", checkAnswer);
choiceBtn3.addEventListener("click", checkAnswer);
choiceBtn4.addEventListener("click", checkAnswer);

// checks if your answer is right or wrong
function checkAnswer(event) {
   event.preventDefault();

   answerResult.style.display = "block";
   setTimeout(function () {
   answerResult.style.display = "none";
   }, 1000);

   var userChoice = event.target.textContent;

   // adds 5 points for each correct answer
   if (userChoice == questions[currentQuestion].answer) {
   score += 5;
   answerResult.textContent = "Correct!";
   // subtracts 10 seconds from the timer for each wrong answer
   } else {
   timerCount -= 10;
   answerResult.textContent = "Wrong!";
   }

   currentQuestion++;

   if (currentQuestion < questions.length) {
   displayQuestion(currentQuestion);
   } else {
   endQuiz();
   }
}

// gets scores from local storage and assigns it to stored score
function getScore() {
   var storedScore = localStorage.getItem("scoreCount");
   if (storedScore === null) {
   score = 0;
   } else {
   score = storedScore;
   }
}

// adds scores for correct answers 
function showScore() {
   score = 0;

   questions.forEach(function (question) {
   if (currentQuestion.choices.indexOf(question.answer) !== -1) {
      score += 5;
   }
   });
}

// shows final score at the end of the quiz
function endQuiz() {
   quizContainer.style.display = "none";
   scoresContainer.style.display = "block";
   timerDisplay.style.display = "none";
   highscoresContainer.style.display = "none";
   userScore.innerHTML = "Your final score is " + score + "!";
}

// saves initials entered and final score into local storage
function saveInitials(event) {
   
   var highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];

   var userScore = {
   userInitials: enterInitials.value,
   totalScore: score,
   };

   highscoresList.push(userScore);
   localStorage.setItem("highscores", JSON.stringify(highscoresList));
}

// displays initials and final score from local storage
function showHighscores() {
   scoresContainer.style.display = "none";
   highscoresContainer.style.display = "block";
   allScores.innerHTML = "";

   var highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];

   if (highscoresList) {
      var ul = document.createElement("ul");
      highscoresList.forEach(function (highscore) {
         var li = document.createElement("li");
         li.textContent = highscore.userInitials + " - " + highscore.totalScore;
         ul.appendChild(li);
      });
      allScores.appendChild(ul);
   }
}

// event listeners

submitBtn.addEventListener("click", function () {
   saveInitials();
   showHighscores();
});

backBtn.addEventListener("click", function () {
   welcomeMessage.style.display = "block";
   highscoresContainer.style.display = "none";
})

clearBtn.addEventListener("click", function () {
   localStorage.removeItem("highscores");
   allScores.innerHTML = "";
})

viewBtn.addEventListener("click", function () {
   welcomeMessage.style.display = "none";
   saveInitials();
   showHighscores();
})

startBtn.addEventListener("click", startQuiz);
