let AllQuestion = []
let currentQuesIndex = 0
let score = 0
let timer;
let timeLeft = 180;

function quizstart() {

    let StBtn = document.getElementById('QStart');
    StBtn.className = 'hide'

    let Quescontainer = document.getElementById('container')
    Quescontainer.className = 'block'

   startTimer();
   Questions()
}

// ----------------------------------- START TIMER FUNCTION --------------------------

function startTimer() {
    let timeDisplay = document.getElementById('time');
    timeDisplay.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function Questions() {

    fetch('https://the-trivia-api.com/v2/questions')
        .then(res => res.json())
        .then(res => {
            console.log(res);

            AllQuestion = res

            displayQues(AllQuestion[currentQuesIndex])
        })
        .catch(error => console.error('Error fetching questions:', error));
}


function displayQues(data) {

    let ques = document.getElementById('qustion')
    ques.innerHTML = data.question.text 

    let category = document.getElementById('category')
    category.innerHTML = `Category:- ${data.category}`

    let difficulty = document.getElementById('difficuly')
    difficulty.innerHTML = `Difficulty:- ${data.difficulty}`
    

    let correctAnswer = data.correctAnswer;
    let incorrectAnswers = data.incorrectAnswers;

    // Combine correct and incorrect answers and shuffle them
    let allAnswers = [...incorrectAnswers, correctAnswer];
    allAnswers = shuffle(allAnswers)

    let optionsCon = document.getElementById('option')
    optionsCon.innerHTML = '';

    allAnswers.forEach(answer => {
        let option = document.createElement('div');
        option.className = 'option-style';             // Apply the CSS class
        option.innerHTML = `<input type="radio" name="quizaOption" value="${answer}" onclick="enableNextBtn()"> ${answer}`;
        
        optionsCon.appendChild(option)
      
    })

    document.getElementById('nextBtn').disabled = true;  // Disable the Next button initially

}


// --------------------------------------------- DISABLED FUNCTION ------------
function enableNextBtn() {
    console.log(' call the enabled');

    document.getElementById('nextBtn') .disabled = false;
}


// ------------------------------------ SHUFFLE    OPTION    code --------------------
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
    }

    return array;
}


function next() {
    console.log('call the next function')

     // Check the selected answer
     let selectedAnswer = document.querySelector('input[name="quizaOption"]:checked');
     if (selectedAnswer) {
         let correctAnswer = AllQuestion[currentQuesIndex].correctAnswer;
         if (selectedAnswer.value === correctAnswer) {
             score++;
         }
     }

    currentQuesIndex ++; // increment to the next Qest

    if (currentQuesIndex < AllQuestion.length){ // if curent chota ho allQus.length sy to
        displayQues(AllQuestion[currentQuesIndex]);  // disp funct allQust par curentQusIndex ko bole or uper curentQusIndex ++ increment krdega

    } else {
        endQuiz();  

    }
}


function endQuiz() {
    clearInterval(timer); // Stop the timer

let quesiContainer = document.getElementById('container')

if (quesiContainer) {
    quesiContainer.className = 'hide';
}

let Rsult = document.getElementById('Result')
Rsult.className = 'block'

// Calculate and display the final score as a percentage
let percentage = (score / AllQuestion.length) * 100;
document.getElementById('finalScore').innerText = `${percentage.toFixed(2)}%`;

}











