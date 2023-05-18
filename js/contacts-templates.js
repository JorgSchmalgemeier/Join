function contactListHTML(contact, i) {
    return /*html*/`
        <div class="contacts" id="contactss${i}">
        <img src="img/Vector 10.png" class="contacts-div-line">
            <div class="letterbox" id="letterbox${i}" onclick="openContactData(${i}); openOverlayContact(${i})">
                <div class="latterbox-contact-div" id="letterbox-contact-div${i}">
                        ${contact['first-name'].charAt(0)}
                        ${contact['last-name'].charAt(0)}
                </div>
                <div class="openContact">
                    <span class="contactlist-name">
                        ${contact['first-name']}
                        ${contact['last-name']}
                    </span>
                    <a class="contactlist-email">
                        ${contact['email']}
                    </a>
                </div>
            </div>
        </div>
    `;
}


function listTemplate(index) {
    return `
       <div id="${alphabetics[index]}" class="letter-box-width" style="display: none">
       <h2 class="contactHeadline">${alphabetics[index]}</h2>
       <div id="${alphabetics[index]}-Contianer" class="container"></div>
       </div>
       `;
}


function contactDataHTML(contactdata, i) {
    return /*html*/`
        <div class="contactdata"> 
            <div class="contact-box1">
            <div class="contact-first-last-name-div" id="contact-first-last-name-div${i}">
                    ${contactdata['first-name'].charAt(0)}
                    ${contactdata['last-name'].charAt(0)}
            </div>

                <div class="contact-full-name">
                <span class="contact-data-name">
                    ${contactdata['first-name']}
                    ${contactdata['last-name']}
                </span>
                <div class="add-task-div" onclick="addTask('To do')">
                        <!--<a href="add-task.html" class="add-task">-->
                        <span class="text-plus">+</span>
                    Add Task</a>
                </div>
                        </div>
                        </div>

                <div class="contact-box2">
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        </div>

                    <div class="contact-box3">
                        <div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contactdata['email']}" class="contact-data-email">${contactdata['email']}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contactdata['phone']}" class="contact-data-phone">${contactdata['phone']}</a>
                    </div> 
                        </div>
                        <div class="edit-contact-button">
                            <div class="edit-div" onclick="openEditContact(${i})">
                                <img class="edit-contact-img" src="img/Group 8.png">
                                <span class="edit-name">Edit Contact</span>
                            </div>
                            <div class="delete-div" onclick="deleteContact(${i})">
                                <img src="img/delete-64.png" class="contact-information-img" id="deletecontact">
                                <span>Delete Contact</span>
                            </div>
                        </div>  
                    </div>
                </div>    
        </div>
    `;
}


function contactDataOverlayHTML(contacoverlaytdata, i) {
    return /*html*/`
    <div class="overlay-background-color">
    <img src="img/Vector1.png" class="overlay-back" onclick="closedOverlay(${i})">
    <div class="contacts-div-box-name">
                <h3 class="contacts-name">Contacts</h3>
                <img class="contacts-name-img" src="img/vector5.png">
                <h4 class="better-with">Better with a team</h4>
                <img class="contact-name-img" src="img/vector5.png">
            </div>
        <div class="overlay-contactdata"> 
            <div class="contact-first-last-name-div" id="contact-overlay-first-last-name-div${i}">
                    ${contacoverlaytdata['first-name'].charAt(0)}
                    ${contacoverlaytdata['last-name'].charAt(0)}
            </div>
                <span class="contact-data-name">
                    ${contacoverlaytdata['first-name']}
                    ${contacoverlaytdata['last-name']}
                </span>
                <div class="add-task-div">
                    <a href="../board/add-task.html"  class="add-task">
                    <img class="add-task-img" src="img/Group 11.png">
                    Add Task</a>
                </div>
                    <div class="contact-information-edit">
                        <span class="contact-information">Contact Information</span>
                        <div class="edit-contact-button" onclick="openEditContact(${i})">
                        <img class="edit-contact-img" src="img/Group 8.png">
                        <div class="edit-img-white">
                        <div class="edit-contact-img-white">
                            <img src="img/Group8.png">
                        </div>
                        </div>
                        <span class="edit-name">Edit Contact</span>
                        </div>
                        <img src="img/delete-64.png" class="contact-information-img" id="deletecontact" onclick="deleteContact(${i})">
                    </div>
                    <div class="email-div">
                        <span class="email">Email</span>
                        <a href="mailto:${contacoverlaytdata['email']}" class="contact-data-email">${contacoverlaytdata['email']}</a>
                    </div>
                    <div class="phone-div">
                        <span class="phone">Phone</span>  
                        <a href="tel:${contacoverlaytdata['phone']}" class="contact-data-phone">${contacoverlaytdata['phone']}</a>
                    </div> 
        </div>
    </div>
    `;
}


function editContactDataHTML(editcontactdata, i) {
    return /*html*/ `
    <div onclick="event.stopPropagation()" class="edit-box" id="edit-box">
    <img src="img/x-mark2.png" class="close-x" onclick="closeEdit()">
    <img src="img/Group11.png" class="closed-x" onclick="closeEdit()">
        <div class="edit-box-left">
        <img src="img/Capa.png" class="join-img">
            <h2 class="edit-contact-name">Edit contact</h2>
        <img class="overlay-line" src="img/vector5.png">
        </div>
    <div class="edit-box-right">
        <div class="edit-name-token" id="edit-name-token${i}">
                ${editcontactdata['first-name'].charAt(0)}
                ${editcontactdata['last-name'].charAt(0)}
        </div>

        <form class="form-edit-box" onsubmit="editSave(${i})">
        <div class="edit-input-field" id="edit-input-field">
            <div class="edit-input-div">
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" maxlength="20" class="overlay-input" placeholder="First-name"
                            id="edit-first-name${i}" value="${editcontactdata['first-name']}">
                        <img src="img/Vector-name.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" maxlength="20" class="overlay-input" placeholder="Last-name"
                            id="edit-last-name${i}" value="${editcontactdata['last-name']}">
                        <img src="img/Vector-name.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="email" class="overlay-input" placeholder="Email"
                            id="edit-email${i}" value="${editcontactdata['email']}">
                        <img src="img/Vector-email.png" class="overlay-input-name-img">
                </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" minlength="7" class="overlay-input" placeholder="Phone"
                            id="edit-phone${i}" value="${editcontactdata['phone']}">
                        <img src="img/Vector-phone.png" class="overlay-input-name-img">
                </div>
                </div>
            </div>
            <button class="edit-save" id="edit-save">
                <h3 class="edit-save-button">Save</h3>
            </button>
        </div>
        </form>

    </div>
</div>  
`;
}


function createNewContactWindow() {
    return /*html*/ `
    <div onclick="event.stopPropagation()" id="new-contact" class="overlay-new-contact">
    <div class="new-contact-overlay-left">
        <img src="img/Capa.png" class="join-img">
        <h2 class="add-contact-overlay">Add contact</h2>
        <h4 class="new-contact-overlay-text">Tasks are better with a team!</h4>
        <img class="overlay-line" src="img/vector5.png">
    </div>
    <div class="new-contact-right-box">
        <div class="new-contact-overlay">
            <img src="img/x-mark2.png" class="close-x" onclick="closeOverlay()">
            <img src="img/Group11.png" class="closed-x" onclick="closeOverlay()">
            <div>
                <img class="new-contact-overlay-img" src="img/Frame 79.png">
            </div>
        </div>

        <form class="form-new-contact" onsubmit="createContact(); return false;">
            <div class="new-contact-overlay-input">
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" maxlength="20" class="overlay-input" placeholder="First-name"
                            id="first-name">
                        <img src="img/Vector-name.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" maxlength="20" class="overlay-input" placeholder="Last-name"
                            id="last-name">
                        <img src="img/Vector-name.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="email" class="overlay-input" placeholder="Email"
                            id="email">
                        <img src="img/Vector-email.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-input-div">
                    <div class="input-overlay-div">
                        <input required type="text" minlength="7" class="overlay-input" placeholder="Phone" 
                            id="phone">
                        <img src="img/Vector-phone.png" class="overlay-input-name-img">
                    </div>
                </div>
                <div class="overlay-contact-button">
                    <div>
                        <button class="overlay-button-cancel-div" onclick="closeOverlay()">
                            <p class="overlay-button-cancel">Cancel</p>
                            <p>X</p>
                        </button>
                    </div>
                    <div class="overlay-button-create-contact-box">
                        <button class="overlay-button-create-contact-div"
                            id="overlay-button-create-contact-div">
                            <h3 class="overlay-button-create-contact">Create <a class="a-contact">contact</a></h3>
                            <img src="img/vector-ok.png">
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
    `;
}