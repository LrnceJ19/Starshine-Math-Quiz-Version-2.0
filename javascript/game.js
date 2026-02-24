import * as accnt from "./account.js";

// display
const displayNum1 = document.getElementById("num1");
const displayNum2 = document.getElementById("num2");
const displaySign = document.getElementById("sign");
const diffText = document.getElementById("difficultyText");

// variables
let difficulty = 0;
let num1 = 0;
let num2 = 0;
let sign = 0;
let answer = 0;
let score = 0;

let arithmetic = "";

let correct = 0;
let wrong = 0;
let numOfQuestions = 1;
let time = 0;

let running = false;


export function getDifficulty(){
  return difficulty;
}
export function easyMode(){
  difficulty = 1;
}
export function mediumMode(){
  difficulty = 2;
}
export function hardMode(){
  difficulty = 3;
}

// choices
const choice1 = document.getElementById("cText1");
const choice2 = document.getElementById("cText2");
const choice3 = document.getElementById("cText3");
const choice4 = document.getElementById("cText4");

const choices = [choice1, choice2, choice3, choice4];
let stateNum = [-99999, -99999, -99999, -99999];

function displayChoice(){
  stateNum = [-99999, -99999, -99999, -99999];
  let n = Math.floor(Math.random() * 4);
  n = Math.floor(Math.random() * 4);
  choices[n].textContent = String(answer);
  stateNum[n] = Number(answer);
  getChoices();
  console.log(stateNum);
}

function getRandomNum(){
  let arith = Math.floor(Math.random() * 2);
  let num = (Math.random() * 10) + 1;
  if(sign != 4){
    num = Math.floor(num);
  }
  
  if(arith == 0){
    num = Number(answer) + num;
  }
  else if(arith == 1){
    num = Number(answer) - num;
  }
  
  if(sign == 4){
    return Number(num.toFixed(2));
  }
  return num;
}

function getChoices(){
  for(let i = 0; i < stateNum.length;){
    let x = getRandomNum();
    let existing = false;
    
    for(let j of stateNum){
      if(j == x){
        existing = true;
      }
    }
    
    if(!existing && stateNum[i] != answer){
      choices[i].textContent = String(x);
      stateNum[i] = x;
      i++;
    }
    else if(stateNum[i] == answer){
      i++;
    }
  }
}

function getNum1(){
  switch(difficulty){
    case 1:
      num1 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      break;
    
    case 2:
      num1 = Math.floor(Math.random() * (99 - 11 + 1)) + 11;
      break;
      
    case 3:
      num1 = Math.floor(Math.random() * (999 - 101 + 1)) + 101;
      break;
  }
}

function getNum2() {
  switch (difficulty) {
    case 1:
      num2 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
      break;
      
    case 2:
    case 3:
        num2 = Math.floor(Math.random() * (99 - 11 + 1)) + 11;
      break;
  }
}

function getSign(){
  sign = Math.floor(Math.random() * 4) + 1;
  switch(sign){
    case 1:
      arithmetic = "+";
      answer = (num1 + num2);
      break;
      
    case 2:
      arithmetic = "-";
      answer = (num1 - num2);
      break;
  
    case 3:
      arithmetic = "×";
      answer = (num1 * num2);
      break;
  
    case 4:
      arithmetic = "÷";
      answer = (num1 / num2).toFixed(2);
      break;
  }
}

function lockChoices(){
  removeData();
  
  for(let i = 0; i < choices.length; ++i){
    if(choices[i].textContent == String(answer)){
      choices[i].classList.add("correctAns");
    }
  }
  
  if(c1.querySelector(".correctAns")){
    c1.classList.add("corrector");
  }
  else{
    c1.classList.add("incorrector");
  }
  
  if (c2.querySelector(".correctAns")) {
    c2.classList.add("corrector");
  }
  else {
    c2.classList.add("incorrector");
  }
  
  if (c3.querySelector(".correctAns")) {
    c3.classList.add("corrector");
  }
  else {
    c3.classList.add("incorrector");
  }
  
  if (c4.querySelector(".correctAns")) {
    c4.classList.add("corrector");
  }
  else {
    c4.classList.add("incorrector");
  }
}

let timer;
function startTimer(){
    clearInterval(timer);
    timer = setInterval(() => {
      runTimer();
      if(time == 0){
        running = false;
        clearInterval(timer);
        showCorrect();
        continueGame();
        wrong++;
        numOfQuestions++;
      }
    }, 1100
  );
}

export function gameStarting(){
  if(numOfQuestions <= 10){
    getNum1();
    getNum2();
    getSign();
    
    timeBar.style.animation = "none";
    timeBar.offsetWidth;
  
    numOfQstns.textContent = numOfQuestions;
    numOfCorrect.textContent = correct;
    numOfWrong.textContent = wrong;
    displayNum1.textContent = num1;
    displayNum2.textContent = num2;
    displaySign.textContent = arithmetic;
    
    document.getElementById("scoreCount").textContent = score;
  
    displayChoice();
    lockChoices();
  
    running = true;
    setTimer();
    startTimer();
  
    const correctClick = document.querySelector(".corrector");
    correctClick.onclick = () => {
      correct++;
      numOfQuestions++;
      setScore();
      continueGame();
    }
  
    const incorrectClick = document.querySelectorAll(".incorrector");
    incorrectClick.forEach(el => {
        el.onclick = () => {
            el.style.background = "var(--gr)";
            el.classList.add("staying");
            wrong++;
            numOfQuestions++;
            continueGame();
        }
      }
    );
  }
  else{
    checked.textContent = correct;
    wronged.textContent = wrong;
    acc.textContent = ((correct / (numOfQuestions - 1)) * 100).toFixed(2) + "%";
    
    running = false;
    clearInterval(timer);
    
    document.getElementById("sText").textContent = score;
    
    gameInterface.style.animation = "fadeOut 0.5s ease forwards";
    gameInterface.style.display = "none";
    dashboardInterface.style.display = "flex";
    dashboardInterface.style.animation = "fadeIn 3s ease forwards";
  }
}
  
/* buttons */
const c1 = document.getElementById("choice1");
const c2 = document.getElementById("choice2");
const c3 = document.getElementById("choice3");
const c4 = document.getElementById("choice4");

function showCorrect(){
  document.querySelectorAll(".corrector").forEach(el => {
      el.style.background = "var(--gg)";
      el.style.animation = "lift 0.25s linear forwards";
    }
  );
  
  document.querySelectorAll(".incorrector").forEach(el => {
      el.style.background = "var(--gr)";
    }
  );
}

/* display */
const numOfQstns = document.getElementById("qCount");
const numOfCorrect = document.getElementById("checkCount");
const numOfWrong = document.getElementById("wrongCount");
const accuracyPercentage = document.getElementById("accuracyPercent");

const timerCount = document.getElementById("timerCount");

function continueGame(){
  running = false;
  clearInterval(timer);
  
  let a = ((correct / (numOfQuestions - 1)) * 100);
  
  if(Number.isNaN(a)){
    accuracyPercentage.textContent = "0%";
    console.log("nan");
  }
  else{
    accuracyPercentage.textContent = ((correct / (numOfQuestions - 1)) * 100).toFixed(2) + "%";
  }
  
  
  document.querySelectorAll(".corrector").forEach(el => {
      el.style.background = "var(--gg)";
      el.style.animation = "lift 0.25s linear forwards";
    }
  );
  
  document.querySelectorAll(".incorrector").forEach(el => {
      el.style.animation = "fadeOut 1s ease forwards";
    }
  );
  
  document.querySelectorAll(".staying").forEach(el => {
      el.style.display = "flex";
      el.style.animation = "none";
    }
  );
  
  infoBox.style.pointerEvents = "none";
  questionBox.style.pointerEvents = "none";
  timerBox.style.pointerEvents = "none";
  choicesBox.style.pointerEvents = "none";
  
  setTimeout(newQuestion, 1000);
}

/* renew */
const infoBox = document.getElementById("infoBox");
const questionBox = document.getElementById("questionContainer");
const timerBox = document.getElementById("timerContainer");
const choicesBox = document.getElementById("choicesContainer");
const questionTxt = document.getElementById("questionCount");

function newQuestion(){
  infoBox.style.animation = "fadeOut 0.5s ease forwards";
  questionBox.style.animation = "fadeOut 0.5s ease forwards";
  timerBox.style.animation = "fadeOut 0.5s ease forwards";
  choicesBox.style.animation = "fadeOut 0.5s ease forwards";
  questionTxt.style.animation = "fadeOut 0.5s ease forwards";
  
  removeData();
  showNew();
}

function removeData(){
  for(let i = 0; i < choices.length; ++i){
    choices[i].classList.remove("correctAns");
  }
  
  c1.classList.remove("corrector", "incorrector", "staying");
  c2.classList.remove("corrector", "incorrector", "staying");
  c3.classList.remove("corrector", "incorrector", "staying");
  c4.classList.remove("corrector", "incorrector", "staying");
  
}

function showNew(){
  gameStarting();
  resetAnim();
  infoBox.style.animation = "fadeIn 1s ease forwards";
  questionBox.style.animation = "fadeIn 1s ease forwards";
  timerBox.style.animation = "fadeIn 1s ease forwards";
  choicesBox.style.animation = "fadeIn 1s ease forwards";
  questionTxt.style.animation = "fadeIn 1s ease forwards";
}

function resetAnim(){
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach(el => {
    el.offsetHeight;
    el.style.animation = "fadeIn 1s ease forwards";
    el.style.background = "rgba(255, 255, 255, 0.1)";
  });
}

function setTimer(){
  switch(difficulty){
    case 1:
      time = 10;
      timerCount.textContent = time + "s";
      timeBar.style.animation = "emptyBar 11s linear forwards";
      break;
      
    case 2:
      time = 8;
      timerCount.textContent = time + "s";
      timeBar.style.animation = "emptyBar 8.75s linear forwards";
      break;
      
    case 3:
      time = 5;
      timerCount.textContent = time + "s";
      timeBar.style.animation = "emptyBar 5.5s linear forwards";
      break;
  }
}

function runTimer(){
  time--;
  timerCount.textContent = time + "s";
}

export function showDifficulty(){
  switch(difficulty){
    case 1:
      diffText.textContent = "EASY MODE";
      diffText2.textContent = "EASY MODE";
      break;
      
    case 2:
      diffText.textContent = "MEDIUM MODE";
      diffText2.textContent = "MEDIUM MODE";
    break;

    case 3:
      diffText.textContent = "HARD MODE";
      diffText2.textContent = "HARD MODE";
      break;
  }
}

const diffText2 = document.getElementById("diffText");
const checked = document.getElementById("checks");
const wronged = document.getElementById("wrongs");
const acc = document.getElementById("acc");

const dashboardInterface = document.getElementById("dashboardInterface");
const gameInterface = document.getElementById("gameInterface");

const backToMenu = document.getElementById("backToMenuBtn");
const playAgain = document.getElementById("playagainBtn");
const home = document.getElementById("homeNav");

backToMenu.onclick  = () => {
  difficulty = 0;
  correct = 0;
  wrong = 0;
  numOfQuestions = 1;
  score = 0;
  
  removeData();
  
  document.getElementById("diffNavMenuWrapper").style.pointerEvents = "auto";
  
  gameInterface.style.animation = "none";
  gameInterface.style.display = "none";

  dashboardInterface.style.animation = "fadeOut 0.5s ease forwards";
  dashboardInterface.style.display = "none";
  home.style.display = "flex";
  home.style.animation = "fadeIn 3s ease forwards";
}

/*playAgain.onclick = () => {
  dashboardInterface.style.animation = "fadeOut 0.5s ease forwards";
  dashboardInterface.style.display = "none";
  h.play();
}*/


export function setToZero(){
  difficulty = 0;
}

const timeBar = document.getElementById("timeVolume");

function setScore(){
  switch(difficulty){
    case 1:
      score += 100;
      break;
      
    case 2:
      score += 250;
      break;
      
    case 3:
      score += 500;
      break;
  }
}