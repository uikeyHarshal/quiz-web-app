const  Questions = [
    {
        question : "what is the background color of this page?",
        answers:[
            {text : "blue",correct :false},
            {text : "black",correct :true},
            {text : "white",correct :false},
            {text : "purple",correct :false},
            
        ]
    },
    {
        question : "what is the value of g ?",
        answers:[
            {text : "9.81",correct :true},
            {text : "7.24",correct :false},
            {text : "100",correct :false},
            {text : "3.142",correct :false},
            
        ]
    },
    {
        question : "what colour is a blueprint?",
        answers:[
            {text : "blue",correct :true},
            {text : "pink",correct :false},
            {text : "white",correct :false},
            {text : "purple",correct :false},
            
        ]
    },
    {
        question : "full form of www is.",
        answers:[
            {text : "world wide web",correct :true},
            {text : "wifi web world",correct :false},
            {text : "World Wrestling Entertainment",correct :false},
            {text : "webdev",correct :false},
            
        ]
    },
    {
        question : "ph of water?",
        answers:[
            {text : "1",correct :false},
            {text : "2",correct :false},
            {text : "4",correct :false},
            {text : "7",correct :true},
            
        ]
    }
];

const questionEle = document.getElementById("question");
const answerBtn = document.getElementById("ansBtn");
const nextBtn = document.getElementById("nextq");


let currentQindex = 0;
let Score = 0;


// sets score 0 before starting quiz
function startQuiz (){
    currentQindex = 0;
    Score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

//displays current questions AND OPTIONS
function showQuestion(){
    resetState()
    let currentQ = Questions[currentQindex];
    let questionNo= currentQindex;
    questionEle.innerHTML =( questionNo+1) + ". "+ currentQ.question;

    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",SelectAnswer);
        
    });
}
function resetState(){
    nextBtn.style.display= "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
    
};

function SelectAnswer (e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        Score++;
    }else{
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionEle.innerHTML = `Quiz Over! your score is ${Score} out of ${Questions.length}`; 
    nextBtn.innerHTML = "Restart Quiz";
    nextBtn.style.display = "block";
}



function handelNextButton(){
    currentQindex++;
    if(currentQindex < Questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if(currentQindex < Questions.length ){
        handelNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();