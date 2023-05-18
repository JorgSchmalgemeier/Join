let loadedCurrent_user = [];

setURL(
  "https://joerg-schmalgemeier.developerakademie.net/join/smallest_backend_ever/"
);

/**
 * Show the option to get a new password
 * 
 */
function newPassword() {
  let password_content = document.getElementById("login-container");
  password_content.innerHTML = "";
  password_content.innerHTML = generateResetPassword();
  document.getElementById("popup-mail").classList.add("d-none");
}


/**
 * Function for setting the new password
 */
async function set_new_password() {
  let password1 = document.getElementById("reseted-password").value;
  let password2 = document.getElementById("reseted-password2").value;
  let foundUser = (await JSON.parse(backend.getItem("user_found"))) || [];
  let user = (await JSON.parse(backend.getItem("users"))) || [];
  if (password1 == password2) {
    for (let i = 0; i < user.length; i++) {
      if (user[i]["username"] == foundUser["username"]) {
        user[i]["password"] = password1;
      }
      saveUser(user, foundUser);
    }
    window.location.href = "./login.html";
  } else {
    showWarnPW();
    setTimeout(clearWarn, 1000);
  }
}


/**
 * Save the current user
 * 
 * @param {json} user - Current user
 * @param {json} foundUser - Founded user
 */
async function saveUser(user, foundUser) {
  await backend.setItem("users", JSON.stringify(user));
  await backend.deleteItem("user_found");
}


/**
 * Show message
 * 
 */
function showWarnPW() {
  document.getElementById("confirm-info").classList.remove("d-none");
}


/**
 * Close message
 * 
 */
function clearWarn() {
  document.getElementById("confirm-info").classList.add("d-none");
  cleanLogin("reseted-password", "reseted-password2");
}


/**
 * Cleand the log in fields after three trys
 * 
 * @param {json} id1 - First try to log in
 * @param {json} id2 - Second try to log in
 * @param {json} id3 - Third try to log in
 */
function cleanLogin(id1, id2, id3 = "") {
  document.getElementById(id1).value = "";
  document.getElementById(id2).value = "";
  if (id3) {
    document.getElementById(id3).value = "";
  }
}