let all_tasks=[];
let current_img;
let users=[];
let current_task=[];
let current_user=[];


function init (){
includeHTML();
sidebarLinkActive();
}


/**
 * Include the header and navbar
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