// need to gather HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var endGameDiv = document.getElementById("endgame");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("start-button");
var startQuizDiv = document.getElementById("start-screen");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInput = document.getElementById("name");
var highscoreDisplay = document.getElementById("highscore-name");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreScore = document.getElementById("highscore-Score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");

// quiz questions
var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hot Mail",
    choiceC: "How to make lasagna",
    correctAnswer: "a"
},
{
    question: "How many tags are in a regular element?",
    choiceA: "2",
    choiceB: "1",
    choiceC: "3",
    correctAnswer: "a"
},
{
    question: "<br /> What type of tag is this?",
    choiceA: "An opening tag",
    choiceB: "A broken one",
    choiceC: "Break tag",
    correctAnswer: "c"
},
{
    question: "What should values always be enclosed in?",
    choiceA: "Commas",
    choiceB: "Quotation marks",
    choiceC: "Parenthesis",
    correctAnswer: "b"
},
{
    question: "There are __ levels of heading in HTML",
    choiceA: "Three",
    choiceB: "Two",
    choiceC: "Six",
    correctAnswer: "c"
},
    // Need to add 5 more questions, starting on rest of code until complete

];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeRemaining = 60;
var timerInterval;
var score = 0;
var correct;
// create a function that cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {

    endGameDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;

}
// create function that starts the quiz
function startQuiz() {
    endGameDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();
    timerInterval = setInterval(function () {
        timeRemaining--;
        quizTimer.textContent = "Time Remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}
// create function that shows score
function showScore() {
    console.log("test", endGameDiv)
    quizBody.style.display = "none"
    endGameDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInput.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!"
}
// create event listener that stores highscores with username
submitScoreBtn.addEventListener("click", function highscore() {

    if (highscoreInputName.value === "") {
        alert("Needs valid Name")
        return false;

    } else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInput.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };
        endgameDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", Json.stringify(savedHJighscores));
        generateHighscores();
    }
})
// create function that clears the list for high scores and generates a new high score list
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}
// create function dispays high scores
function showHighscore() {
    startQuizDiv.style.display = "none"
    endgameDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}
// create function that clears all high scores
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}
// create function that replays quiz
function replayQuiz() {
    highscoreContainer.style.display = "none";
    endgameDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}
// create function that checks the response to reach answer
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("You got it!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("You did not get it.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}
// create function that starts quiz
startQuizButton.addEventListener("click", startQuiz);