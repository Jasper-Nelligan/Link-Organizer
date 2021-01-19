"use strict"

// # of initial input lines for links
const FORM_LINKS = 4;

// positions of colors in dropdown select element
const RED_POS = 0;
const GREEN_POS = 1;
const BLUE_POS = 2;
const YELLOW_POS = 3;
const ORANGE_POS = 4;
const PURPLE_POS = 5;

// Stores private variables that can be altered by calling the public functions
var stateModule = (function (){
    // Private variable to store # of link input fields
    // This is used to create a unique ID for each link input
    let _linkCount = 1;
    
    function incLinkCount(num){
        _linkCount++;
    }

    function setLinkCount(num){
        _linkCount = num;
    }

    function getLinkCount(){
        return _linkCount;
    }

    return{
        inc_counter: incLinkCount,
        get_counter: getLinkCount
    };
})();

// Closes popup when user clicks outside of it
window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
}

/**
 * Sets the onclick events for buttons initially loaded on the page.
 */
function setButtons() {
    let btns = document.getElementsByTagName("button");
    var i = 0;

    // new course button
    btns[i++].addEventListener("click",
        function () {
            let modal = btns[0].getAttribute("data-modal");
            document.getElementById(modal)
                .style.display = "block";
        }
    );
    
    // link remove buttons
    let j = 0;
    for (i; i < FORM_LINKS+1; i++){
        btns[i].addEventListener("click", 
        function(){
            removeLink("link" + j++);
        });
    }

    // add new link button
    btns[i++].addEventListener("click",
        function () {
            addLink();
        }
    );

    // form delete button
    btns[i++].addEventListener("click", 
        function(){
            deleteForm();
        }
    );

    // form submit button
    btns[i++].addEventListener("click", 
        function(){
            submitForm("initial-form");
        }
    );

    // link modals to loaded edit buttons
    setEditBtns();
}

/* Functionality for popup edit form */
function setEditBtns(){
    let modalBtns = [...document.querySelectorAll(".edit-btn")];
    modalBtns.forEach(function (btn) {
        btn.onclick = function () {
            let modal = btn.getAttribute('data-modal');
            document.getElementById(modal)
                .style.display = "block";
        }
    });
    let closeBtns = [...document.querySelectorAll(".close")];
    closeBtns.forEach(function (btn) {
        btn.onclick = function () {
            let modal = btn.closest('.modal');
            modal.style.display = "none";
        }
    });
}

// TODO
function addLink(){
    console.log("In add new link function");
}

// TODO
function removeLink(id){
    console.log("In remove link function");
    let link = document.getElementById(id);
    link.remove();
}

// TODO
function deleteForm(){
    console.log("In delete form function");
}

/**
 * Handles form input when user clicks "Save Changes" 
 * @param {String} formId 
 */
function submitForm(formId){
    let form = document.getElementById(formId);
    let i = 0;

    let inputElements = form.querySelectorAll("input, select");
    let course = inputElements[i++].value;
    let color = inputElements[i++].value;

    // parse links
    let linkPairs = new Array();
    while(inputElements[i] != null){
        let pair = [inputElements[i++].value, inputElements[i++].value];
        console.log(pair);
        linkPairs.push(pair);
    }

    // Delete previous error msg if there is one
    let prevErrMsg = form.getElementsByClassName("errorMsg");
    if (prevErrMsg.length != 0) {
        prevErrMsg[0].remove();
    }

    // If error in input, place error message above "Save Changes" button
    let errorMsg = validateForm(course, linkPairs);
    if (errorMsg != null){
        let div = form.getElementsByClassName("add-new-link");
        div[0].insertAdjacentHTML("beforeend", `
            <p<span class="errorMsg" style="position: relative; bottom: 0.5625em; left: 4.3em;">${errorMsg}</span>
        `);
        return;
    }

    if (formId == "initial-form"){
        newCourse(course, color, linkPairs);
    }
    
    // TODO Save to file

    let modal = form .closest('.modal');
    modal.style.display = "none";
}

/**
 * Validates form input
 * @param {String} course The course name that the user input
 * @param {Array[[String, String]]} linkPairs a link pair is an array of size two, 
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 *                                            
 * @returns {String} an error message if form input is invalid,
 * @returns {null} otherwise
 */
function validateForm(course, linkPairs){
    console.log("Course is: ", course);

    if (course == ""){
        return("Error: course name cannot be empty");
    }

    console.log(linkPairs.length);
    // Error if link is present but no link name
    for(var i = 0; i < linkPairs.length; i++){
        if (linkPairs[i][0] == "" && linkPairs[i][1] != ""){
            return("Error: link name cannot be empty");
        }
    }

    return(null);
}

/**
 * Creates a new course frame and associated modal and inserts into document
 * @param {String} course What the user input in the 'course' field
 * @param {String} colorCode Hexcode for the color of the new modal
 * @param {Array[[String, String]]} linkPairs a link pair is an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 */
function newCourse(course, color, linkPairs){
    let grid = document.getElementById("grid-container");
    let modals = document.getElementById("modals");

    // remove whitespace
    let courseId = course.replace(/\s/g, '');
    let colorCode = getColorCode(color);

    // Insert new frame and modal
    grid.appendChild(newFrame(course, colorCode, linkPairs, courseId));
    modals.appendChild(newModal(course, colorCode, linkPairs, courseId));

    setEditBtns();
    
    // TODO set new popup buttons like the remove button and delete button

    // TODO set new color of frame 
}

/**
 * Creates a new course frame to be inserted into grid
 * @param {String} course What the user input in the 'course' field
 * @param {String} colorCode Hexcode for the color of the new modal
 * @param {Array[[String, String]]} linkPairs a link pair is an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * @param {*} courseId Course but with all whitespace removed
 * 
 * @returns {div} a div with class="frame" and id=courseId that contains
 * all HTML for a new course frame.
 */
function newFrame(course, colorCode, linkPairs, courseId){
    let frame = document.createElement("div");
    frame.className = "frame";
    frame.id = courseId;

    let title = document.createElement("p");
    title.className = "course-title";
    title.innerHTML = `${course}`;
    frame.appendChild(title);

    let links = document.createElement("div");
    links.className = "links";

    var firstLink = true;
    for (var i = 0; i < linkPairs.length; i++) {
        if (firstLink) {
            firstLink = false;
        }
        else {
            links.insertAdjacentHTML("beforeend", "<br><br>");
        }
        let link = document.createElement("a");
        link.href = linkPairs[i][1];
        link.innerHTML = linkPairs[i][0];
        links.appendChild(link);
    }

    frame.appendChild(links);

    frame.insertAdjacentHTML("beforeend", `
        <button type="button" class="edit-btn" id="edit-${courseId}" data-modal="${courseId}-modal">Edit</button>
    `)

    frame.style.backgroundColor = colorCode;
    return frame;
}

/**
 * Creates a div element containing all HTML for a new modal
 * @param {String} course What the user input in the 'course' field 
 * @param {String} colorCode Hexcode for the color of the new modal
 * @param {Array[[String, String]]} linkPairs a link pair is an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * @param {*} courseId Course but with all whitespace removed
 * 
 * @returns {Div} a div element with class="modal" and id=`$courseId-modal`
 * containing all HTML for the new modal.
 */
function newModal(course, colorCode, linkPairs, courseId){
    // Create new modal with saved values loaded into input boxes
    let newModal = document.createElement("div");
    newModal.className = "modal";
    newModal.id = `${courseId}-modal`;

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    let courseEdit = document.createElement("div");
    courseEdit.className = "course-edit-form";
    let form = document.createElement("div");
    form.className = "form";
    form.id = `${courseId}-form`;

    let fragment = createFragment(`
        <a class="close">&times;</a>
        <input class="course-input" type="text" name="course" placeholder="Course" value="${course}">
        <label for="color-selector">Color:</label>
    `);
    form.appendChild(fragment);

    let colorSelector = document.createElement("select");
    colorSelector.id = "color-selector";
    colorSelector.name = "colors";

    fragment = createFragment(`
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
    `)

    let colorOptions = fragment.querySelectorAll("option");
    let pos = getColorPos(color);
    colorOptions[pos].selected = "selected";
    colorSelector.appendChild(fragment);
    form.appendChild(colorSelector);

    // insert link inputs with loaded values
    let links = document.createDocumentFragment();
    for (var i = 0; i < linkPairs.length; i++) {
        let div = document.createElement("div");
        div.className = "form-links";
        div.id = "link" + stateModule.get_counter();
        stateModule.inc_counter();
        div.innerHTML = `
            <input class="link-name" type="text" name="link-name" placeholder="Link name" value="${linkPairs[i][0]}">
            <input class="link-input" type="text" name="link" placeholder="Link" value="${linkPairs[i][1]}">
            <button type="button" class="remove-btn">Remove</button>
        `
        links.appendChild(div);
    }
    form.appendChild(links);

    fragment = createFragment(`
        <div class="add-new-link">
            <button class="circle-add-btn"></button>
            <p<span style="position: relative; bottom: 0.5625em; left: 0.1875em;">Add new link</span>
        </div>

        <div class="form-bottom">
            <button type="button" class="delete-btn">Delete Course</button>
            <button type="submit" class="submit-btn">Save Changes</button>
        </div>
    `)
    form.appendChild(fragment);

    form.style.background = colorCode;

    courseEdit.appendChild(form);
    modalContent.appendChild(courseEdit);
    newModal.appendChild(modalContent);
    return (newModal);
}

/**
 * Returns a hex code for each course color option.
 * @param {String} color Either 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {String}      The hex code associated with each color according to the color scheme
 *                       of this web app.
 */
function getColorCode(color){
    console.log("color in was: ", color);
    switch(color){
        case "red":
            return "#fe7b7b";
            break;
        case "green":
            return "#75d073";
            break;
        case "blue":
            return "#74a3ff";
            break;
        case "yellow":
            return "#ffe977";
            break;
        case "orange":
            return "#fbb143";
            break;
        case "purple":
            return "#c17ed9";
            break;
        default:
            console.log(`${color} is not a valid color`);
    }
}

/**
 * Returns a hex code for each course color option.
 * @param {String} color Either 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {Number}      The position of the color in the dropdown select menu
 */
function getColorPos(color){
    switch (color) {
        case "red":
            return RED_POS;
            break;
        case "green":
            return GREEN_POS;
            break;
        case "blue":
            return BLUE_POS;
            break;
        case "yellow":
            return YELLOW_POS;
            break;
        case "orange":
            return ORANGE_POS;
            break;
        case "purple":
            return PURPLE_POS;
            break;
        default:
            console.log(`${color} does not have a position`);
    }
}

/**
 * Creates a new fragment with the passed in string as its inner HTML
 * @param {String} htmlStr an HTML string to be made into a fragment
 * @returns {fragment}
 */
function createFragment(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

// TODO
function calcSemester(){}