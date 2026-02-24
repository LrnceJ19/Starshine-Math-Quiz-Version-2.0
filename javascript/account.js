export let idNum = 0;
export let username = ["admin"];
export let password = ["root"];

export function idNumIncrement(){
  idNum++;
}

export function resetIdNum(){
  idNum = 0;
}

export function registerAccnt(){
  let accntExist = false;
  let user = document.getElementById("newUsername").value;
  let pass = document.getElementById("newPassword").value;
  let cpass = document.getElementById("confirmPassword").value;
  
  console.log(user);
  for(let u of username){
    if(user == u){
      accntExist = true
      break;
    }
  }
  
  if(accntExist){
    msgBox.style.display = "flex";
    msgTxt.textContent = "Username already exists.";
  }
  else {
    if(pass.trim() == ""){
      msgBox.style.display = "flex";
      msgTxt.textContent = "Password can't be empty.";
    }
    else if(pass != cpass){
      msgBox.style.display = "flex";
      msgTxt.textContent = "Password and confirm password are not the same.";
    }
    else if (pass == cpass) {
      const login = document.getElementById("loginPanel");
      const signup = document.getElementById("signupPanel");
      
      const u = document.getElementById("newUsername");
      const p1 = document.getElementById("newPassword");
      const p2 = document.getElementById("confirmPassword");
      
      msgBox.style.display = "flex";
      username.push(user);
      password.push(pass);
      msgTxt.textContent = "Account successfully made, returning to login...";
      
      setTimeout(() => {
        signup.style.animation = "fadeOut 0.5s ease";
        login.style.animation = "fadeIn 1s ease";
        signup.style.display = "none";
        login.style.display = "flex";
        
        u.value = "";
        p1.value = "";
        p2.value = "";
        
        msgBox.style.display = "none";
      },
        1000
      );
    }
  }
}

const msgBox = document.getElementById("msgBox2");
const msgTxt = document.getElementById("msgTxt2");


export function check(content){
  let exist = false;
  for(let user of username){
    if(content == user){
      exist = true;
      break;
    }
  }
  
  if(exist){
    return true;
  }
}

export function changePass(user, pass){
  let num = 0;
  for(let u of username){
    if(user == u){
      break;
    }
    num++;
  }
  
  password[num] = pass;
  console.log(password);
}