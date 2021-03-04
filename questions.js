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



function displayQuestion(question) {
    const questionText = question.title;
    const possibleChoices = question.choices;

    document.getElementById("question").textContent = questionText

    document.getElementById("answers").innerHTML = ""
    for (let i = 0; i < possibleChoices.length; i++) {

        let div = document.createElement('button')

        div.textContent = possibleChoices[i]

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
    }
    else {
        alert("wrong")
    }
    if (currentQuestion !== (Questions.length - 1)) {
        currentQuestion++
        displayQuestion(Questions[currentQuestion])
    }
    else {
        console.log("game over")
    }
}

function setTime() {
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " You have 60 seconds to complete this quiz";
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage("Game Over");
      }
  
    }, 6000);
  }

let countdownEl = document.getElementById("countdown");
let startQuizEl = document.getElementById("start-quiz")

//startQuizEl.addEventListener(“click”, function () {
    //setTime();
 



  //let count = localStorage.getItem("count");

  
  
  
  

var highScores = "";
var secondsLeft = 100;
var timeLeft = "";
var userName = "";
var userScore = "";
var userAnswers = "";
var currentQuestion = 0

displayQuestion(Questions[currentQuestion])
