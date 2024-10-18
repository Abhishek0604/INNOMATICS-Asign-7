const startButton = document.getElementById('start-btn');
const quizArea = document.getElementById('quiz-area');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');
const restartButton = document.getElementById('restart-btn');

let questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Leo Tolstoy", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "H2", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizArea.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    startButton.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
    updateProgressBar();
}

function selectAnswer(answer) {
    clearInterval(timer); // Stop timer when answer is selected
    if (answer.correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        timeLeft = 30; // Reset timer for next question
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    quizArea.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreDisplay.innerText = score;
    updateHighScore(score);
}

function startTimer() {
    timeLeftElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(questions[currentQuestionIndex]);
                timeLeft = 30; // Reset timer for next question
                startTimer();
            } else {
                showResult();
            }
        }
        updateProgressBar();
    }, 1000);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateHighScore(currentScore) {
    const highScore = localStorage.getItem('highScore') || 0;
    if (currentScore > highScore) {
        localStorage.setItem('highScore', currentScore);
        highScoreDisplay.innerText = currentScore;
    } else {
        highScoreDisplay.innerText = highScore;
    }
}

function restartQuiz() {
    score = 0;
    timeLeft = 30;
    highScoreDisplay.innerText = localStorage.getItem('highScore') || 0;
    startButton.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

window.onload = function() {
    highScoreDisplay.innerText = localStorage.getItem('highScore') || 0;
};
