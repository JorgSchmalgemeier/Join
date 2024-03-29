setURL(
  "https://join.joerg-schmalgemeier.com/smallest_backend_ever/"
);


/**
 * Functions for opening popups
 * 
 */
function openPopup() {
  let popup = document.getElementById("popup-user");
  popup.classList.remove("d-none");
  setTimeout(locateToLogin, 2000);
}


/**
 * Open the popup mail
 * 
 */
async function openPopupMail() {
  let currentmail = document.getElementById("mail-registration").value;
  console.log(currentmail);
  let users = (await JSON.parse(backend.getItem("users"))) || [];
  current_user = users.find((u) => u.email == currentmail);
  await backend.setItem("user_found", JSON.stringify(current_user));

  if (current_user) {
    let popup = document.getElementById("popup-mail");
    popup.classList.remove("d-none");
    setTimeout(changeClass, 100);
    setTimeout(() => (window.location.href = "./new_password.html"), 800);
  } else {
    console.log("User not found");
  }
}


/**
 * Get the current user from backend
 * 
 */
async function getCurrentUserFromStorage() {
  let currentUserAsText = localStorage.getItem("current_user");
  if (!currentUserAsText) {
    window.location.href = "login.html";
  } else {
    current_user = JSON.parse(currentUserAsText);
  }
}


/**
 * Function to render site for resetting password
 * 
 */
function newPassword() {
  let password_content = document.getElementById("login-container");
  password_content.innerHTML = "";
  password_content.innerHTML = generateResetPassword();
  document.getElementById("popup-mail").classList.add("d-none");
}


/**
 * Change css class of popup
 * 
 */
function changeClass() {
  let popup_p = document.getElementById("popup-mail-p");
  popup_p.classList.remove("bottom");
  popup_p.classList.add("center");
  setTimeout(newPassword, 3000);
}