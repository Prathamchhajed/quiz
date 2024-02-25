const questions = [
    {
        question: "Who won the ICC Men's ODI world cup 2023?",
        answers: [
            { text: "India", correct: false},
            {text: "Australia", correct: true},
            {text: "New zealand", correct: false},
            {text: "England", correct: false},
        ]
    },
    {
        question: "Who won the first ever Cricket World Cup in 1975?",
        answers: [
            {text: "India", correct: false},
            {text: "Australia", correct: true},
            {text: "New zealand", correct: false},
            {text: "England", correct: false},
        ]
    },
    {
        question: "Who is the only batsman to record 400 runs in an international test  match?",
        answers:[
            {text: "Steve Smith", correct: false},
            {text: "WG Grace", correct: false},
            {text: "Don Bradman", correct: false},
            {text: "Brian Lara", correct: true},
        ]
    },
    {
        question: "Who scored the first century in the history of the Cricket World Cup?",
        answers: [
            { text: "Vivian Richards", correct: false},
            { text: "CLive Lloyd", correct: false},
            { text: "Sunil Gavaskar", correct: false},
            { text: "Dennis Amiss", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score  = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
 
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    }); 

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display ="block";


}
function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
   
