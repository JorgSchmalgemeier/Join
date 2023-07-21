let loadedContacts = [];
let users = [];

setURL("https://join.joerg-schmalgemeier.com/smallest_backend_ever/");

/**
 * This function moves the start-logo from the center to the left corner
 * 
 */
function moveLogo() {
  let logo = document.getElementById("start-pic");
  backgroundOpacity();
  logo.classList.remove("logo-big");
  logo.classList.add("logo-small");
  showLogin();
  setTimeout(removeStartbackground, 100);
}


/**
 * Undisplay the startbackground by adding class
 * 
 */
function removeStartbackground() {
  document.getElementById("start-background").classList.add("d-none");
}


/**
 * This function changes background-opacity by class-change
 * 
 */
function backgroundOpacity() {
  let bg = document.getElementById("start-background");
  bg.classList.remove("start");
  bg.classList.add("stop");
}


/**
 * Wait some time before moving logo and getting login-box
 * 
 */
async function getLogin() {
  setTimeout(moveLogo, 500);
  getUsers();
}


/**
 * Function for showing the login-box and sign-in
 * 
 */
function showLogin() {
  document.getElementById("login-container").classList.remove("d-none");
  document.getElementById("newuser-container").classList.remove("d-none");
}


/**
 * Get the current user from the backend
 * 
 */
async function getCurrentUserFromBackend() {
  let usersFromBackend = (await JSON.parse(backend.getItem("users"))) || [];
  let logEmail = document.getElementById("mail-login");
  let logpassword = document.getElementById("password-login");
  let current_user = usersFromBackend.find((u) => u.email == logEmail.value);
  checkUser(current_user, logpassword, usersFromBackend);
}


/**
 * This function checks if the user is already registrated or not
 * 
 * @param {json} current_user - The current user
 * @param {string} logpassword - Password of current user
 * @param {json} users - JSON users
 */
async function checkUser(current_user, logpassword, users) {
  if (current_user) {
    let foundUser = users.find((u) => u.password == logpassword.value);
    if (foundUser) {
      await backend.setItem("greet_user", JSON.stringify(current_user));
      setCurrentUserToLocal(foundUser);
      window.location.href = "summary.html";
    } else {
      tryOneMore(users, current_user);
    }
  } else {
    openInfoTrys();
  }
}


/**
 * Get the json users from backend
 * 
 */
async function getUsers() {
  await downloadFromServer();
  let newUser = JSON.parse(backend.getItem("users")) || [];
}


/**
 * Function to reset values of login fields 
 * 
 */
function resetLogin() {
  document.getElementById("email-login").value = "";
  document.getElementById("password-login").value = "";
}


/**
 * Function to storage current user local
 * 
 */
function setCurrentUserToLocal(currentUser) {
  let currentUserAsText = JSON.stringify(currentUser);
  localStorage.setItem("guest_user", currentUserAsText);
}


/**
 * Function to login a guest user
 */
async function guestLogin() {
  let guest_user = {
    name: "Guest",
    email: "guest@guest.de",
    color: "grey",
  };
  await backend.deleteItem("greet_user");
  setCurrentUserToLocal(guest_user);
  getDemoSummary();
  await backend.setItem("greet_user", JSON.stringify(guest_user));
}


/**
 * Function to get the summary as guest
 * 
 */
function getDemoSummary() {
  window.location.href = "summary.html";
}


/**
 * Function to set a new user to local store
 * @param {string} newUser - Name of user, who wants to registrate
 */
function setJustRegistratedToSessStore(newUser) {
  sessionStorage.setItem("just_reg_email", newUser["email"]);
  sessionStorage.setItem("just_reg_pw", newUser["password"]);
}


/**
 * Remove user data
 * 
 */
function removeJustRegistrated() {
  sessionStorage.removeItem("just_reg_email");
  sessionStorage.removeItem("just_reg_pw");
}


/** 
 * This function checks if the used email adress is already saved in backend or not
 * 
 * @returns - Current insert email adress
 */
function getJustRegistratedEmail() {
  let email = sessionStorage.getItem("just_reg_email");
  return email;
}


/**
 * This function checks if the used password is already saved in backend or not
 * 
 * @returns - Current insert password
 */
function getJustRegistratedPW() {
  let pw = sessionStorage.getItem("just_reg_pw");
  return pw;
}


/**
 * Change classname of popup
 * 
 */
function popupPassChange() {
  let popup = document.getElementById("popup-pw");
  popup.classList.remove("d-none");
  setTimeout(changeClass2, 100);
}


/**
 * Change classname of popup
 * 
 */
function changeClass2() {
  let popup_p = document.getElementById("popup-pw-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(locateToLogin, 3000);
}


/**
 * Change classname of popup
 */
function changeClass() {
  let popup_p = document.getElementById("popup-mail-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(newPassword, 3000);
}


/**
 * Navigate to login.html
 * 
 */
function locateToLogin() {
  window.location.href = "login.html";
}


/**
 * Navigate to register.html
 * 
 */
function locateToSignin() {
  window.location.href = "register.html";
}


/**
 * This function checks if the current user is already registrated and is able to log in 
 * 
 * @param {json} users - Registrated users 
 * @param {*} email - Registrated user emai adresses
 * @returns - Registrated user
 */
function loginUser(users, email) {
  let loginUser;
  if (users.length == 0) {
    loginUser = true;
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i]["email"] == email["email"]) {
        loginUser = false;
        return loginUser;
      } else {
        loginUser = true;
      }
    }
  }
  return loginUser;
}


/**
 * Function to count on session Storage
 * 
 * @returns - 0
 */
function getNumberOfTry() {
  let tryNumber = sessionStorage.getItem("trynumber");
  if (tryNumber) {
    return tryNumber;
  } else {
    return 0;
  }
}


/**
 * Function to count trys of login 
 * 
 * @param {json} users - JSON of all users
 * @param {string} email - Current email adress
 */
function tryOneMore(users, email) {
  if (loginUser(users, email)) {
    openInfoTrys();
  } else {
    window.location.href = "./forgot_password.html";
  }
}


/**
 * Functions to give warning about trys
 * 
 */
function openInfoTrys() {
  let popup = document.getElementById("popup-trys");
  popup.classList.remove("d-none");
  setTimeout(locateToSignin, 1000);
}


/**
 * Open popup "try again"
 * 
 */
function openInfoTrysOneMore() {
  let popup = document.getElementById("popup-try-again");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin, 1000);
}


/**
 * Clean the log in input fields after three trys
 * 
 * @param {json} id1 - First login try
 * @param {json} id2 - Second login try
 * @param {json} id3 - Third login try
 */
function cleanLogin(id1, id2, id3 = "") {
  document.getElementById(id1).value = "";
  document.getElementById(id2).value = "";
  if (id3) {
    document.getElementById(id3).value = "";
  }
}


/**
 * Rander the value login
 * 
 */
function renderValueLogin() {
  let name = getRememberName();
  let pw = getRememberPW();
  if (name && isNoValue()) {
    document.getElementById("mail-login").value = name;
    document.getElementById("password-login").value = pw;
  }
}


/**
 * Check if the value of the log in input fields are empty
 * 
 * @returns - Return true if the input fields are empty
 */
function isNoValue() {
  if (
    document.getElementById("mail-login").value == "" ||
    document.getElementById("password-login").value == ""
  ) {
    return true;
  }
}


/**
 * Show a message if the password is wrong
 * 
 */
function passwordWrong() {
  let info = document.getElementById("new-password");
  info.innerHTML = "Passwort falsch";
  info.style.color = "red";
  info.onclick = onclickReaction(false);
  setTimeout(cleanPassword, 1000);
}


/**
 * Clean the log in field for password
 * 
 */
function cleanPassword() {
  document.getElementById("password-login").value = "";
  let info = document.getElementById("new-password");
  info.innerHTML = "Passwort vergessen";
  info.style.color = "rgb(40, 171, 226)";
  info.onclick = onclickReaction(true);
}


/**
 * Check reaction
 * 
 * @param {string} react - Reaction 
 * @returns 
 */
function onclickReaction(react) {
  return react;
}