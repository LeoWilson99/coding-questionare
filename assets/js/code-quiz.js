//Elements and variables
const welcome = document.querySelector("#welcome");
const startQuizBtn = document.querySelector("#startQuiz");
const quiz = document.querySelector("#quiz");
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const inputScore = document.querySelector("#inputScore");
const initials = document.querySelector("#initials");
const submitNameBtn = document.querySelector("#submitName");
const userScore = document.querySelector("#score");
const highScoresEl = document.querySelector("#highScores");
const scores = document.querySelector("#scores");
const goBackBtn = document.querySelector("#goBack");
const clearScoresBtn = document.querySelector("#clearScores");
const viewHScoresBtn = document.querySelector("#viewHScores");
const timer = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 75;
var secondsElapsed = 0;

//Timer Stuff
function startTimer() {
    timer.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timer.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(interval);
}

//Clears question and shows next question, otherwise shows last question
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        score += (timeGiven - secondsElapsed);
        userScore.textContent = score;
        hide(quiz);
        show(inputScore);
        timer.textContent = 0;
    }
}


//self explanitory rly
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
    }
    else {
    }
}
function reset() {
    currentQ = 0;
    secondsElapsed = 0;
    score = 0;
    timer.textContent = 0;
}

//shows all the questions usin a loop
function renderQuestion() {
    question.textContent = questions[currentQ].title;
    for (i = 0; i < answers.children.length; i++) {
        answers.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

function show(element) {
    element.style.display = "block";
}
function hide(element) {
    element.style.display = "none";
}

function renderHighScores() {
    scores.innerHTML = "";
    show(highScores);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem);
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        document.getElementById("div").style.color = "black";
    }
}
viewHScoresBtn.addEventListener("click", function () {
    hide(welcome);
    hide(quiz);
    hide(inputScore);
    renderHighScores();
    stopTimer();
    reset();
});
startQuizBtn.addEventListener("click", function () {
    hide(welcome);
    startTimer();
    renderQuestion();
    show(quiz);
});


answers.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});


submitNameBtn.addEventListener("click", function () {
    let initValue = initials.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initials.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScore);
        reset();
        renderHighScores();
    }
});

goBackBtn.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcome);
});

clearScoresBtn.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});



