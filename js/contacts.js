let contacts = [];
let deleteContacts = [];
let alphabetics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let categoryId;
let categoryColor;
let chosenPrio;
let prioIcon;
let prioIconWhite;
let currentChosenCategory;
let chosenContact = false;
let chosenPriority = false;
let newCategory = false;
let isTaskOpen = false;

let dateToday = new Date();
let year = dateToday.getFullYear();
let month = dateToday.getMonth() + 1;
let day = dateToday.getDate();


/**
 * This function take the data from backend and render the contact site
 * 
 */
async function initContacts() {
    await downloadFromServer();
    await getTasks();
    await loadContacts();
    await includeHTML()
    renderContacts();
    sidebarLinkActive();
}


/**
 * This function is used to create a new contact
 * 
 */
async function createContact() {
    await createNewContact();
    renderContacts();
}


/**
 * Get jsons from backend to generate and edit tasks
 * 
 */
function getTasks() {
    chosenContacts = JSON.parse(backend.getItem('chosenContacts')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    subtasks = JSON.parse(backend.getItem('subtasks')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    subtasks = JSON.parse(backend.getItem('subtasks')) || [];
    contact = JSON.parse(backend.getItem('contact')) || [];
}


/**
 * This function takes the data from the input fields, save in the backend and create the contact in frontend
 * 
 */
async function createNewContact() {
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    pushNewContact(firstName, lastName, email, phone);
    await saveUsers();
    await openPopup();
    deleteValue(firstName, lastName, email, phone);
    document.getElementById('overlay-grey').classList.remove('display-flex');
    document.getElementById('overlay-grey').innerHTML = '';
}


/**
 * This function pushs the new contact into the json contacts
 * 
 * @param {value} firstName - Input field first-name
 * @param {value} lastName - Input field last-name
 * @param {value} email - Input field email
 * @param {value} phone - Input field phone
 */
function pushNewContact(firstName, lastName, email, phone) {
    contacts.push({
        "first-name": firstName.value,
        "last-name": lastName.value,
        "email": email.value,
        "phone": phone.value,
        "color": getRandomColor(),
        "id": new Date().getTime()
    });
}


/**
 * This function deletes the contacts
 * 
 */
async function deleteContact(i) {
    const contact = contacts[i];
    document.getElementById('contact-data').innerHTML = '';
    document.getElementById('overlay-contact').innerHTML = '';

    deleteContacts.push(contact);

    contacts.splice(i, 1);

    renderContacts()
    saveUsers();
}


/**
 * This function renders the contacts
 * 
 */
function renderContacts() {
    let content = document.getElementById('contacts');
    content.innerHTML = '';
    for (let index = 0; index < alphabetics.length; index++) {
        content.innerHTML += listTemplate(index);
    }
    for (let i = 0; i < contacts.length; i++) {
        let alphabet = contacts[i]['first-name'].charAt(0).toUpperCase();
        let alphabetContainer = document.getElementById(`${alphabet}-Contianer`);
        let contactContainer = document.getElementById(`${alphabet}`);
        contactRegister(alphabet, i, alphabetContainer, contactContainer);
    }
}


/**
 * This function shows the contacts in an alphabetic register
 * 
 */
function contactRegister(alphabet, i, alphabetContainer, contactContainer) {
    alphabetContainer.innerHTML += contactListHTML(contacts[i], i);
    contactContainer.style.display = "flex";
    document.getElementById(`letterbox-contact-div${i}`).style.backgroundColor = contacts[i]["color"];
}


/**
 * This function sorts alphabetically
 * 
 */
function sortAlphabetic() {
    contacts.sort((a, b) => {
        let fa = a['first-name'].toLowerCase(),
            fb = b['first-name'].toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}


/**
 * This function opens the contact data of the chosen contact
 * 
 */
function openContactData(i) {
    const contactdata = contacts[i];
    document.getElementById('contact-data').innerHTML = contactDataHTML(contactdata, i);
    document.getElementById(`contact-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];

    if (window.innerWidth < 750) {
        document.getElementById('contacts-div-box').classList.add('display-flex');
        document.getElementById('contacts').classList.add('d-none');
        document.body.classList.add('bg-grey');
    }
}


/**
 * This function close the contact data of the chosen contact
 * 
 */
function closeContactData() {
    document.getElementById('contacts-div-box').classList.remove('display-flex');
    document.getElementById('contacts').classList.remove('d-none');
    document.body.classList.remove('bg-grey');
}


/**
 * This function opens the overlay contacts
 * 
 */
function openOverlayContact(i) {
    const contacoverlaytdata = contacts[i];
    document.getElementById('overlay-contact').innerHTML = contactDataOverlayHTML(contacoverlaytdata, i);
    document.getElementById(`contact-overlay-first-last-name-div${i}`).style.backgroundColor = contacts[i]["color"];
}


/**
 * This function opens the contact editor
 * 
 */
function openEditContact(i) {
    const editcontactdata = contacts[i];
    document.getElementById('overlay-grey').innerHTML += editContactDataHTML(editcontactdata, i);
    document.getElementById(`edit-name-token${i}`).style.backgroundColor = contacts[i]["color"];
    document.getElementById('overlay-grey').classList.add('display-flex');
}


/**
 * This function is for editing contacts
 * 
 */
function editSave(i) {
    let firstName = document.getElementById(`edit-first-name${i}`);
    let lastName = document.getElementById(`edit-last-name${i}`)
    let email = document.getElementById(`edit-email${i}`);
    let phone = document.getElementById(`edit-phone${i}`);

    contacts[i]['first-name'] = firstName.value;
    contacts[i]['last-name'] = lastName.value;
    contacts[i]['email'] = email.value;
    contacts[i]['phone'] = phone.value;

    closeEdit();
    renderContacts();
    saveUsers();
    openContactData(i);
    openOverlayContact(i);
    document.getElementById('overlay-grey').innerHTML = '';
}


/**
 * This function closes the editor
 * 
 */
function closeEdit() {
    document.getElementById('overlay-grey').classList.remove('display-flex');
    document.getElementById('overlay-grey').innerHTML = '';
}


/**
 * This function closes the overlay
 * 
 */
function closedOverlay() {
    document.getElementById('overlay-grey').classList.remove('display-flex');
}


/**
 * This function empties the input fields
 * 
 */
function deleteValue(firstName, lastName, email, phone) {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
}


/**
 * This function create the nav- and sidebar
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * This function generates the colors
 * 
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/**
 * This function save contacts to the backend
 * 
 */
async function saveUsers() {
    backend.setItem('contact', JSON.stringify(contacts));
}


/**
 * This function load contacts from the backend
 *
 */
async function loadContacts() {
    contacts = JSON.parse(backend.getItem('contact')) || [];
}


/**
 * This function opens the window to create a new contact
 * 
 */
function openNewContact() {
    document.getElementById('overlay-grey').classList.add('display-flex');
    document.getElementById('overlay-grey').innerHTML += createNewContactWindow();
}


/**
 * This function close every window
 * 
 */
function closeOverlay() {
    document.getElementById('overlay-grey').classList.remove('display-flex');
    document.getElementById('overlay-grey').innerHTML = '';
}


/**
 * This function show the user that a new contact is successfully created with a short message for 1,5 seconds
 * 
 */
async function openPopup() {
    let popup = document.getElementById("popup-contact");
    popup.classList.remove("d-none");
    setTimeout(locateToContact, 1500);
}


/**
 * Close the message after 1,5 seconds
 * 
 */
function locateToContact() {
    let popup = document.getElementById("popup-contact");
    popup.classList.add("d-none");
    setTimeout(1000);
}


/**
 * Generate the current month in the correct format
 * 
 */
function generateMonth() {
    let monthLength = month.toString().length;

    if (month < 10 && monthLength < 2) {
        month = '0' + month;
    }
}


/**
 * Generate the current day in the correct format
 * 
 */
function generateDay() {
    let dayLength = day.toString().length;

    if (day < 10 && dayLength < 2) {
        day = '0' + day;
    }
}