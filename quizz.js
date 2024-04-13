
const question = [
{
   question: "Parmi ces sports, lequel est mon préféré ?",
    answers :[
        { text:"Basketball", correct: true},
        { text:"Football", correct: false},
        { text:"Tennis", correct: false},
        { text:"Natation", correct: false},
    ]
 
},
{
    question: "Quel est mon jour préféré de la semaine ?",
    answers :[
        { text:"Dimanche", correct: false},
        { text:"Mecredi", correct: false},
        { text:"Samedi", correct: false},
        { text:"Lundi", correct: true},
    ]

},
{
    question: "Quelle ressource ai-je utilisé pour continuer à approfondir et à me développer ?",
    answers :[
        { text:"Youtube", correct: false},
        { text:"CS50x", correct: true},
        { text:"Les livres", correct: false},
        { text:"Wikipedia", correct: false},
    ]

},
{
    question: "Combien ai-je d'expériences professionnelles différentes ?",
    answers :[
        { text:"3", correct: true},
        { text:"1", correct: false},
        { text:"5", correct: false},
        { text:"0", correct: false},
    ]

},
{
    question: "Quel est mon plat préféré ?",
    answers :[
        { text:"Pizza", correct: false},
        { text:"Sushi", correct: false},
        { text:"Lasagnes", correct: true},
        { text:"Steak frites", correct: false},
    ]

},
{
    question: "Quelle était la première question ?",
    answers :[
        { text:"Parmi ces sports, lequel est mon préféré ?", correct: true},
        { text:"Quel est mon jour préféré de la semaine ?", correct: false},
        { text:"Quel est mon plat préféré ?", correct: false},
        { text:"Combien ai-je d'expériences professionnelles différentes ?", correct: false},
    ]

}
];



const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const NextBtn = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0; //reset
    score = 0;
    NextBtn.innerHTML = "Next";
    showQuestion();
}
 
function showQuestion(){

    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        
        const button = document.createElement("button");
        button.innerHTML = answers.text;
         button.classList.add("btn1");
         answerButton.appendChild(button);

        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}



 function resetState(){

    NextBtn.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
     }
 }

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
        
    }

    Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        NextBtn.style.display = "block";
        

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${question.length}!`;
    NextBtn.innerHTML = "Play Again";
    NextBtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else
    {
        showScore();
    }
}

NextBtn.addEventListener("click", () =>{
if(currentQuestionIndex < question.length){
    handleNextButton();
}
else
{
    startQuiz();
}
});

startQuiz();

