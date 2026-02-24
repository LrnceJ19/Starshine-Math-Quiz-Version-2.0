import * as game from "./game.js";
import * as l from "./login.js";

// interaction buttons
const playBtn = document.getElementById("playBtn");
const backBtn1 = document.getElementById("backBtn1");

const stardust = document.querySelectorAll(".starCresctAmount");

// all panels
const homeNav = document.getElementById("homeNav");
const diffSelectMenu = document.getElementById("diffNav");

playBtn.onclick = () => {
  homeNav.style.animation = "fadeOut 0.5s ease";
  diffSelectMenu.style.animation = "fadeIn 1s ease";
  homeNav.style.display = "none";
  diffSelectMenu.style.display = "flex";
  
  readyText.style.display = "none";
  setText.style.display = "none";
  solveText.style.display = "none";
  
  resetButton(easyBtn);
  resetButton(mediumBtn);
  resetButton(hardBtn);
}

backBtn1.onclick = () => {
  diffSelectMenu.style.animation = "fadeOut 0.5s ease forwards";
  homeNav.style.animation = "fadeIn 1s ease forwards";
  diffSelectMenu.style.display = "none";
  homeNav.style.display = "flex";
}

// countdown
const countdownPanel = document.getElementById("countdownContainer");
const readyText = document.getElementById("readyText");
const setText = document.getElementById("setText");
const solveText = document.getElementById("solveText");

// difficulty

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");

easyBtn.onclick = () => {
  document.getElementById("diffNavMenuWrapper").style.pointerEvents = "none";
  easyBtn.style.transform = "scale(1.1)";
  easyBtn.style.boxShadow = "0px 0px 0.5rem var(--sw)";
  game.easyMode();
  play();
}

mediumBtn.onclick = () => {
  document.getElementById("diffNavMenuWrapper").style.pointerEvents = "none";
  mediumBtn.style.transform = "scale(1.1)";
  mediumBtn.style.boxShadow = "0px 0px 0.5rem var(--sw)";
  game.mediumMode();
  play();
}

hardBtn.onclick = () => {
  document.getElementById("diffNavMenuWrapper").style.pointerEvents = "none";
  hardBtn.style.transform = "scale(1.1)";
  hardBtn.style.boxShadow = "0px 0px 0.5rem var(--sw)";
  game.hardMode();
  play();
}

// functions
export function play(){
  switch(game.getDifficulty()){
    case 1:
      mediumBtn.style.animation = "fadeOut 1s ease forwards";
      hardBtn.style.animation = "fadeOut 1s ease forwards";
      diffSelectMenu.style.animation = "fadeOut 1s ease forwards";
      diffSelectMenu.style.animationDelay = "1s";
      countdownPanel.style.display = "flex";
      countdownPanel.style.opacity = "0";
      diffSelectMenu.addEventListener("animationend", () => {
        setTimeout(() =>
          {
            countDown();
            diffSelectMenu.style.display = "none";
          }, 
        1000);
      }, {once: true});
      break;
      
      case 2:
        easyBtn.style.animation = "fadeOut 1s ease forwards";
        hardBtn.style.animation = "fadeOut 1s ease forwards";
        diffSelectMenu.style.animation = "fadeOut 1s ease forwards";
        diffSelectMenu.style.animationDelay = "1s";
        countdownPanel.style.display = "flex";
        countdownPanel.style.opacity = "0";
        diffSelectMenu.addEventListener("animationend", () => {
            setTimeout(() =>
              {
                countDown();
                diffSelectMenu.style.display = "none";
              },
              1000);
          }, {once: true});
        break;
        
      case 3:
        easyBtn.style.animation = "fadeOut 1s ease forwards";
        mediumBtn.style.animation = "fadeOut 1s ease forwards";
        diffSelectMenu.style.animation = "fadeOut 1s ease forwards";
        diffSelectMenu.style.animationDelay = "1s";
        diffSelectMenu.style.animation = "none";
        countdownPanel.style.display = "flex";
        countdownPanel.style.opacity = "0";
        diffSelectMenu.addEventListener("animationend", () => {
            setTimeout(() =>
              {
                countDown();
                diffSelectMenu.style.display = "none";
              },
              1000);
          }, {once: true});
        break;
        
      default:
        console.log("Cannot find difficulty");
        break;
  }
}

function countDown(){
  countdownPanel.style.opacity = "1";
  readyText.style.display = "block";
  readyText.style.animation = "shrink 0.5s linear forwards";
  readyText.addEventListener("animationend", () => {
    setTimeout(() =>
    {
      setText.style.display = "block";
      setText.style.animation = "shrink 0.5s linear forwards";
      setText.addEventListener("animationend", () => {
        setTimeout(() =>
            {
              solveText.style.display = "block";
              gameStart();
            },
            100
          );
        }
      );
    },
    100);
  },);
}

function gameStart(){
  setTimeout(() => {
      document.getElementById("accuracyPercent").textContent = "0%";
      countdownPanel.style.display = "none";
      gamePanel.style.display = "flex";
      game.showDifficulty();
      game.gameStarting();
    }, 500
  );
}

const gamePanel = document.getElementById("gameInterface");

const creators = document.getElementById("creatorsBtn");
creators.onclick = () => {
  window.location.href="https://michelletamayo.github.io/CREATOR/";
}

function resetButton(btn) {
  btn.style.transform = "scale(1)";
  btn.style.boxShadow = "none";
  btn.style.animation = "none";
}

const logOut = document.getElementById("logoutBtn");
const passDisplay = document.getElementById("password");

logOut.onclick = () => {
  l.reset();
  
  passDisplay.value = "";
  homeNav.style.animation = "fadeOut 0.5s ease";
  homeNav.style.display = "none";
  homeNav.style.animation = "fadeIn 1s ease";
  document.getElementById("loginMenu").style.display = "flex";
  document.getElementById("loginMenu").style.animation = "fadeIn 1s ease forwards";
}