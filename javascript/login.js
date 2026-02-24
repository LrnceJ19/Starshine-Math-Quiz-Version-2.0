import * as accnt from "./account.js";

const showPass1 = document.getElementById("showPass1");
const hidePass1 = document.getElementById("hidePass1");
const showPass2 = document.getElementById("showPass2");
const hidePass2 = document.getElementById("hidePass2");
const showPass3 = document.getElementById("showPass3");
const hidePass3 = document.getElementById("hidePass3");
const signinBtn = document.getElementById("signinBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const homeMenu = document.getElementById("homeMenu");
const loginMenu = document.getElementById("loginMenu");
const homeNav = document.getElementById("homeNav");

const passDisplay1 = document.getElementById("password");
const passDisplay2 = document.getElementById("newPassword");
const passDisplay3 = document.getElementById("nPassword");

let aNum = 0;

function showPassword1(){
  showPass1.style.opacity = "0";
  showPass1.style.pointerEvents = "none";
  hidePass1.style.opacity = "1";
  hidePass1.style.pointerEvents = "auto";
  
  passDisplay1.type = "text";
}

function hidePassword1(){
  hidePass1.style.opacity = "0";
  hidePass1.style.pointerEvents = "none";
  showPass1.style.opacity = "1";
  showPass1.style.pointerEvents = "auto";
  
  passDisplay1.type = "password";
}

function showPassword2(){
  showPass2.style.opacity = "0";
  showPass2.style.pointerEvents = "none";
  hidePass2.style.opacity = "1";
  hidePass2.style.pointerEvents = "auto";
  
  passDisplay2.type = "text";
}

function hidePassword2(){
  hidePass2.style.opacity = "0";
  hidePass2.style.pointerEvents = "none";
  showPass2.style.opacity = "1";
  showPass2.style.pointerEvents = "auto";
  
  passDisplay2.type = "password";
}

function showPassword3(){
  showPass3.style.opacity = "0";
  showPass3.style.pointerEvents = "none";
  hidePass3.style.opacity = "1";
  hidePass3.style.pointerEvents = "auto";
  
  passDisplay3.type = "text";
}

function hidePassword3(){
  hidePass3.style.opacity = "0";
  hidePass3.style.pointerEvents = "none";
  showPass3.style.opacity = "1";
  showPass3.style.pointerEvents = "auto";
  
  passDisplay3.type = "password";
}

showPass1.onclick = showPassword1;
hidePass1.onclick = hidePassword1;
showPass2.onclick = showPassword2;
hidePass2.onclick = hidePassword2;
showPass3.onclick = showPassword3;
hidePass3.onclick = hidePassword3;

const loginMsgTxt = document.getElementById("msgBox1");
const msgTxt1 = document.getElementById("msgTxt1");

// sign in
function checkPass(){
  if(password.value == accnt.password[accnt.idNum]){
    document.getElementById("userText").textContent = accnt.username[aNum];
    document.getElementById("uTxt").textContent = accnt.username[aNum];
    document.getElementById("uName").textContent = accnt.username[aNum];
    
    loginMenu.style.animation = "fadeOut 1s ease";
    homeMenu.style.animation = "fadeIn 3s ease";
    loginMenu.style.display = "none";
    homeMenu.style.display = "flex";
    homeNav.style.display = "flex";
    
    loginMsgTxt.style.display = "none";
  }
  else{
    loginMsgTxt.style.display = "flex";
    msgTxt1.textContent = "You have entered a wrong password. Please try again";
  }
}

function signIn(){
  let existing = false;
  accnt.resetIdNum();
  
  for(let user of accnt.username){
    if (username.value == user){
      existing = true;
      break;
    }
    accnt.idNumIncrement();
    aNum++;
  }
  
  if (existing) {
  checkPass();
  }
  else if(username.value.trim() == ""){
    loginMsgTxt.style.display = "flex";
    msgTxt1.textContent = "Please enter username and password";
  }
  else{
    loginMsgTxt.style.display = "flex";
    msgTxt1.textContent = "Username does not exist. Please register account";
  }
}

signinBtn.onclick = () => {
  signIn();
}

// register action
const registerBtn = document.getElementById("registerBtn");
const forgotPassBtn = document.getElementById("forgotPass");
const cancelBtn1 = document.getElementById("cancelBtn1");
const cancelBtn2 = document.getElementById("cancelBtn2");

const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");
const forgotPassPanel = document.getElementById("forgotPassPanel");

function displayLoginPanel1(){
  signupPanel.style.animation = "fadeOut 0.5s ease";
  loginPanel.style.animation = "fadeIn 1s ease";
}

function displayLoginPanel2() {
  forgotPassPanel.style.animation = "fadeOut 0.5s ease";
  loginPanel.style.animation = "fadeIn 1s ease";
}

function displaySignupPanel(){
  loginPanel.style.animation = "fadeOut 0.5s ease";
  signupPanel.style.animation = "fadeIn 1s ease";
}

function displayForgotPassPanel() {
  loginPanel.style.animation = "fadeOut 0.5s ease";
  forgotPassPanel.style.animation = "fadeIn 1s ease";
}

registerBtn.onclick = () => {
  displaySignupPanel();
  loginPanel.style.display = "none";
  signupPanel.style.display = "flex";
}

forgotPassBtn.onclick = () => {
  displayForgotPassPanel();
  loginPanel.style.display = "none";
  forgotPassPanel.style.display = "flex";
  
  password.value = "";
}

cancelBtn1.onclick = () => {
  displayLoginPanel1();
  signupPanel.style.display = "none";
  loginPanel.style.display = "flex";
}

cancelBtn2.onclick = () => {
  displayLoginPanel2();
  forgotPassPanel.style.display = "none";
  loginPanel.style.display = "flex";
}

/* register account */
document.getElementById("submitBtn").onclick = () => {
  accnt.registerAccnt();
}

export function reset(){
  aNum = 0;
  accnt.resetIdNum();
}

const msgBox3 = document.getElementById("msgBox3");
const msgTxt3 = document.getElementById("msgTxt3");

const conBtn = document.getElementById("confirmBtn");

const uc = document.getElementById("fUsername");
const pc1 = document.getElementById("nPassword");
const pc2 = document.getElementById("cPasssord");

function checkIfValid(){
  let valid = false;
  
  if(pc1 == pc2){
    return true;
  }
  return false;
}

conBtn.onclick = () => {
  let user = uc.value;
  let exist = accnt.check(user);
  
  if(!exist){
    msgBox3.style.display = "flex";
    msgTxt3.textContent = "Username does not exist";
  }
  else if(pc1.value == ""){
    msgBox3.style.display = "flex";
    msgTxt3.textContent = "Enter new password";
  }
  else{
    if(pc1.value != pc2.value){
      msgBox3.style.display = "flex";
      msgTxt3.textContent = "Passwords don't match";
    }
    else{
      accnt.changePass(uc.value, pc1.value);
      msgBox3.style.display = "flex";
      msgTxt3.textContent = "Password change successfully! Returning to login page...";
      
      setTimeout(() => {
        uc.value = "";
        pc1.value = "";
        pc2.value = "";
        
        displayLoginPanel2();
        forgotPassPanel.style.display = "none";
        loginPanel.style.display = "flex";
        }, 1000
      );
    }
  }
}