"use strict";

//Variables
var questions = [];
var correctAnswer = "";
var answerText = "";
var clickAnswer = "";
var qImage = "";
var qCorrect = 0;
var qIncorrect = 0;
var qUnanswered = 0;
var i = 0;
var j = 0;
var countdownTimer = 0;
var currentQuestion = 0;

$(document).ready(function () {

    //initialize variables
    var questions = [];

    questions[0] = {
        questions: "How many NBA Championships does Kobe Bryant Have?",
        options: ["5", "1", "0", "4"],
        aAnswer: 0,
        
    };

    questions[1] = {
        questions: "What jersey number did Ray Lewis wear his collegiate and NFL career?",
        options: ["40", "58", "52", "45"],
        aAnswer: 2,
        image: "",
    };

    questions[2] = {
        questions: "What high school did Lebron James attend?",
        options: ["Lower Merion", "Charlotte Catholic", "IMG Academy", "Saint Vincent Saint Mary's"],
        aAnswer: 3,
        
    };

    questions[3] = {
        questions: "Which NFL team is best known for it's nickname The Steel Curtain?",
        options: ["Steelers", "Cowboys", "Eagles", "Raiders"],
        aAnswer: 0,
        
    };

    questions[4] = {
        questions: "What baseball team did David Ortiz better known as Big Papi play for?",
        options: ["White Sox", "Yankees", "Red Sox", "Rockies"],
        aAnswer: 2,
        
    };


    function gameReset() {

    }

    // 30 second timer function. Displays remaining seconds (j) at #timer. Keeps track of unanswered question count
    // (those without a click within 30 seconds).
    function startTimer() {
        console.log("startTimer");
        $("#timer").html(" ");
        j = 30;
        countdownTimer = setInterval(function () {
            $("#timer").html(j + " seconds remaining");
            j = j - 1;
            if (j < 0) {
                clearInterval(countdownTimer);
                $("#trivia-question").html("Your time is up!! The answer was: " + answerText + ".");
                qUnanswered++;
                i++;
                showAnswer();
            }
        }, 1000);
    }

    // function to move to next question & reset timer
    function nextQuestion() {
        resetQuestion();
        startTimer();
    }

    // replace the html with the questions and possible answers. Populate variables with correct answer id, text & image.
    function resetQuestion() {

        //*** If we're out of questions, show results
        if (i === questions.length) {

            //*** The "return" keeps the rest of the resetQuestion function from running
            return showResults();

        }

        //*** Set correctAnswer and answerText from questions
        correctAnswer = questions[i].aAnswer;
        answerText = questions[i].options[correctAnswer];

       

        $("#trivia-question").html(questions[i].questions);
        $("#answer0").html(questions[i].options[0]);
        $("#answer1").html(questions[i].options[1]);
        $("#answer2").html(questions[i].options[2]);
        $("#answer3").html(questions[i].options[3]);

        // jquery to update HTML questions & answers

    }

    // hide the question div, update image and show image div. Wait 5 seconds then move to next question (nextQuestion()).
    // If last question, call results function (showResults()).
    function showAnswer() {

    

        //*** Wait 3 seconds (3000 milliseconds) before moving to the next question
        setTimeout(function () {
            resetQuestion();
            startTimer();
        }, 3000);

    }

    // listen for click on "list-group". Check if answer is correct and update #triviaQuestion. Call showAnswer() to display image.
    $(".list-group-item").on("click", function () {
        console.log('click event triggered');
        clearInterval(countdownTimer);

        //*** The list-group-items don't have a "value" attribute
        //*** I added "data-value" in the HTML. Need to parseInt to compare
        clickAnswer = parseInt($(this).attr("data-value"));

        if (clickAnswer === correctAnswer) { 
            $("#trivia-question").html("Correct Answer")
            qCorrect++;
        } else {
            $("#trivia-question").html("Sorry, that's incorrect. The answer was: " + answerText + ".")
            qIncorrect++;
        }

        i++;
        showAnswer();

    })

    // Function to show game results. Update results div with stats and show() them. Hide() other irrelevant divs. Change text on start button and show().
    function showResults() {

        // at the end of the game, display total correct and incorrect

        //*** Hide the questions and answers
        $("#answersDisplay").hide();
        $("#trivia-question").hide();

        $("#results").html("<span>RIGHT: " + qCorrect + ", WRONG: " + qIncorrect + "</span>");
        $("#results").show();

    }

    // button to start game
    $("#startBtn").on("click", function () {
        gameReset();
    });

    nextQuestion();

});