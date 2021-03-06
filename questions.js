//Variables to use in the functions
let countdownEl = document.getElementById("countdown");
let startQuizEl = document.getElementById("start-quiz");
let scoreSubmit = document.getElementById("submit-btn");
let goBack= document.getElementById("goBack");
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
    //Removing the hidden class to display the questions
    document.getElementById("game").classList.remove('hide')
    //Setting the text of the question
    document.getElementById("question").textContent = questionText
    //Clearing the choices from the previous question
    document.getElementById("answers").innerHTML = ""
    // Looping over possible choices
    for (let i = 0; i < possibleChoices.length; i++) {
        //created button for choices
        let div = document.createElement('button')
        //Setting the text content
        div.textContent = possibleChoices[i]
        // Event listener for the answer choice
        div.addEventListener("click", function () {
            // Variable for users selected answer 
            const userChoice = this.textContent
            // Variable for correct answer
            const realAnswer = Questions[currentQuestion].answer
            //Function for comparing their answer versus real answer
            checkAnswer(userChoice, realAnswer)

        })
        // Styling for buttons
        div.className ="btn btn-primary"
        // Appending answer buttons to page
        document.getElementById("answers").appendChild(div)

    }
}

// function for comparing their answer versus real answer
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
        quizOver();
    }
}
// Function for the timer
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
//Function for quiz over
function quizOver() {
    let quizOver = document.getElementById("endgame");
    quizOver.textContent = "Thank you for taking the quiz, please submit your initials.";
    document.getElementById("question").textContent = "";
    document.getElementById("answers").innerHTML = "";
    //Shows score entry when quiz is done
    document.getElementById("score-entry").classList.remove("hide");
    //Hides the countdownn after quiz is completed
    document.getElementById("controls").classList.add("hide");
    
    
    

    

}
//Function for getting scores and storing in local storage
function renderScore() {
    const highScores= document.getElementById("highScore")
    let allScores = [];
    if (localStorage.getItem("scores")) {
        allScores = JSON.parse(localStorage.getItem('scores'));
        console.log(allScores)
    }
    if (allScores.length >0 ){
        allScores.sort(sortScores);
        console.log(allScores) 
    //For loop to show top ten highscores
        for (var i = 0; i < 10; i++) {
        
        const li = document.createElement("li")
        li.textContent=`${allScores[i].name} - ${allScores[i].score}`
        console.log(li)
        highScores.appendChild(li);  
        
        
    }

    }
}

//Function to sort the scores highest to lowest
function sortScores(a,b){
        
        if ( a.score < b.score ){
          return 1;
        }
        if ( a.score > b.score ){
          return -1;
        }
        return 0;

}

//Refreshes page to go to the start quiz 
goBack.addEventListener("click", function () {
    window.location.reload();
})

//Pushes scores to local storage
scoreSubmit.addEventListener("click", function () {
    document.getElementById("highScoreContainer").classList.remove('hide')
    let allScores = [];
    if (localStorage.getItem("scores")) {
        allScores = JSON.parse(localStorage.getItem('scores'));
    }
    allScores.push({
        name: document.getElementById('initials').value,
        score: scoreEntry
    });
    localStorage.setItem("scores", JSON.stringify(allScores));
    renderScore();
})



//Function to start quiz and hide start quiz after you click
startQuizEl.addEventListener("click", function () {

    startQuizEl.classList.add("hide");
    setTime();

    displayQuestion(Questions[currentQuestion])


})




