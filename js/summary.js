const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();

setURL("https://joerg-schmalgemeier.developerakademie.net/join/smallest_backend_ever/");


/**
 * This function takes the data from the backend and render the nav- and sidebar
 * 
 */
async function init() {
  await getDataFromBackend();
  await includeHTML();
  getDate();
  sidebarLinkActive();
}


/**
 * This function takes the data from backend
 * 
 */
async function getDataFromBackend() {
  await downloadFromServer();
  let tasks = (await JSON.parse(backend.getItem("tasks"))) || [];
  let greetUser = (await JSON.parse(backend.getItem("greet_user"))) || [];
  allTasksCount(tasks);
  greetCurrentUser(greetUser);
}


/**
 * This function greets the current user with the name
 * 
 * @param {json} greetUser - Json with data of the current user 
 */
function greetCurrentUser(greetUser) {
  let greet = document.getElementById("user-name");
  greet.innerHTML = "";
  if (greetUser["name"]) {
    greet.innerHTML = greetUser["name"];
  } else {
    greet.innerHTML = "Guest";
  }
  getTime();
}


/**
 * Check the timo of the day and show different greetings
 * 
 */
function getTime() {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let wishingContainer = document.getElementById("wishes");
  if (hours > 0 && hours < 12 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Morning,";
  } else if (hours >= 12 && hours < 17 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Afternoon,";
  } else if (hours >= 17 && hours < 20 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Evening,";
  } else if (hours >= 20 && hours < 24 && minutes < 60) {
    wishingContainer.innerHTML = "";
    wishingContainer.innerHTML = "Good Night,";
  }
}


/**
 * This function counts the tasks in board
 * 
 * @param {json} tasks - JSON of the tasks 
 */
function allTasksCount(tasks) {
  let allTasksTotal = document.getElementById("board-tasks-total");
  allTasksTotal.innerHTML = "";
  allTasksTotal.innerHTML = tasks.length;
  // All Different Categories
  allDifferentTasksCount(tasks);
}


/**
 * Counts the different types of tasks 
 * 
 * @param {json} tasks - JSON of the tasks 
 */
function allDifferentTasksCount(tasks) {
  showTasksByCategory(tasks, "progress-tasks-total", "In Progress");
  showTasksByCategory(
    tasks,
    "awaiting-feedback-tasks-total",
    "Awaiting Feedback"
  );
  showTasksByCategory(tasks, "to-do-tasks-total", "To do");
  showTasksByCategory(tasks, "done-tasks-total", "Done");
  showUrgentTask(tasks);
}


/**
 * Show the category names of the tasks with the amount
 * 
 * @param {json} tasks - JSON of the tasks 
 * @param {number} id - The number of tasks of the category 
 * @param {string} categoryName - Name of the category 
 */
function showTasksByCategory(tasks, id, categoryName) {
  let tasksTotal = document.getElementById(id);
  tasksTotal.innerHTML = "";
  let taskCount = tasks.filter(
    (eachTask) => eachTask["category"] === categoryName
  );
  tasksTotal.innerHTML = taskCount.length;
}


/**
 * Show the urgent tasks with the amount
 * 
 * @param {json} tasks - JSON of the tasks 
 */
function showUrgentTask(tasks) {
  let urgentTask = document.getElementById("urgent-tasks-total");
  let taskCount = tasks.filter((eachTask) => eachTask["prio"] === "Urgent");
  urgentTask.innerHTML = taskCount.length;
}


/**
 * Render header and sidebar
 * 
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    let file = element.getAttribute("w3-include-html"); // "includes nav-sidebar.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


/**
 * Show todays date
 * 
 */
function getDate() {
  let todayDate = document.getElementById("date");
  let monthNum = date.getMonth();
  let year = date.getFullYear();
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  todayDate.innerHTML = "";
  todayDate.innerHTML = `${monthNames[monthNum]} ${day}, ${year}`;
}


if (window.innerWidth <= 1200) {
  showGreeting();
  setTimeout(hideGreeting, 1475);
}


/**
 * This function shows the greeting text with the name of the current user
 * 
 */
function showGreeting() {
  if (window.innerWidth <= 1200) {
    document
      .querySelector(".main-section")
      .classList.add("main-section-for-greeting");
    document
      .querySelector(".todo-section")
      .classList.add("d-none");
    document
      .querySelector(".summary-wrapper")
      .classList.add("d-none");
    document
      .querySelector(".greeting-wrapper")
      .classList.add("greeting-wrapper-for-greeting");
    document.getElementById("nav-sidebar-wrapper").classList.add("d-none");
  }
}


/**
 * This function hides the greeting text with the name of the current user
 * 
 */
function hideGreeting() {
  document.querySelector(".greeting-wrapper").classList.remove("d-none");
  document.querySelector(".greeting-wrapper").classList.add("d-none");
  document
    .querySelector(".main-section")
    .classList.remove("main-section-for-greeting");
  document
    .querySelector(".todo-section")
    .classList.remove("d-none");
  document
    .querySelector(".summary-wrapper")
    .classList.remove("d-none");
  // document.querySelector(".greeting-wrapper").classList.add("hide-greeting");
  document.getElementById("nav-sidebar-wrapper").classList.remove("d-none");
}