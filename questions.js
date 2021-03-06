//Variables to use in the functions
let countdownEl = document.getElementById("countdown");
let startQuizEl = document.getElementById("start-quiz");
let scoreSubmit = document.getElementById("submit-btn");
let sendMessage = ""
let highScores = "";
let secondsLeft = 60;
let scoreEntry = 0
var userName = "";
var userScore = "";
var userAnswers = "";
var currentQuestion = 0

//Array for questions, choices, and correct answer
let Questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


//Function to display Questions
function displayQuestion(question) {
    //Variables to use for displaying questions and choices
    const questionText = question.title;
    const possibleChoices = question.choices;
    //Hiding the questions before start quiz button is pressed
    document.getElementById("game").classList.remove('hide')
    //
    document.getElementById("question").textContent = questionText
    //
    document.getElementById("answers").innerHTML = ""
    for (let i = 0; i < possibleChoices.length; i++) {
        //created button for choices
        let div = document.createElement('button')
        //
        div.textContent = possibleChoices[i]
        //
        div.addEventListener("click", function () {

            const userChoice = this.textContent

            const realAnswer = Questions[currentQuestion].answer

            checkAnswer(userChoice, realAnswer)

        })

        document.getElementById("answers").appendChild(div)

    }
}


function checkAnswer(userChoice, realAnswer) {
    if (userChoice === realAnswer) {
        alert("correct")
        scoreEntry += 5
    }
    else {
        secondsLeft -= 10;
    }
    if (currentQuestion !== (Questions.length - 1)) {
        currentQuestion++
        displayQuestion(Questions[currentQuestion])
    }
    else {
        console.log("game over")
        secondsLeft = 0;
        quizOver();
    }
}

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + "seconds left"

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            quizOver()
        }

    }, 1000);
}

function quizOver() {
    let quizOver = document.getElementById("endgame");
    quizOver.textContent = "Thank you for taking the quiz, please submit your initials.";
    countdownEl.innerHTML = "";
    startQuizEl.innerHTML = "";
    document.getElementById("question").textContent = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("score-entry").classList.remove("hide");
    renderScore();
    
    

    

}

function renderScore() {
    const highScores= document.getElementById("highScore")
    let allScores = [];
    if (localStorage.getItem("scores")) {
        allScores = JSON.parse(localStorage.getItem('scores'));
    }
    if (allScores.length >0 ){
        const li = document.createElement("li")
        li.textContent=`${allScores[0].name} - ${allScores[0].score}`

        highScores.appendChild(li);
    }
    for (var i = 0; i < allScores.length; i++) {
    }
}
scoreSubmit.addEventListener("click", function () {
    let allScores = [];
    if (localStorage.getItem("scores")) {
        allScores = JSON.parse(localStorage.getItem('scores'));
    }
    allScores.push({
        name: document.getElementById('initials').value,
        score: scoreEntry
    });
    localStorage.setItem("scores", JSON.stringify(allScores));
})

startQuizEl.addEventListener("click", function () {

    setTime();

    displayQuestion(Questions[currentQuestion])


})




