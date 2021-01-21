"use strict"

// # of initial input lines for links
const FORM_LINKS = 4;

// Positions of colors in dropdown select element
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
    let _linkCount = FORM_LINKS;
    
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
        incLinkCount: incLinkCount,
        setLinkCount: setLinkCount,
        getLinkCount: getLinkCount
    };
})();

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
    var j = 1;
    for (i; i < FORM_LINKS; i++){
        let linkId = "link" + j++;
        btns[i].addEventListener("click", 
            function(){
                removeLink(linkId);
            }
        );
    }

    // add new link button
    btns[i++].addEventListener("click",
        function () {
            addLink("new-course-form");
        }
    );

    // form submit button
    btns[i++].addEventListener("click", 
        function(){
            submitForm("new-course-form","");
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

/**
 * Adds a new link input line to a form
 * @param {String} formId id of form to add new link input
 */
function addLink(formId){
    let form = document.getElementById(formId);
    let newLink = document.createElement("div");
    newLink.className = "form-links"
    newLink.id = "link" + stateModule.getLinkCount();
    newLink.innerHTML = `
        <input class="link-name" type="text" name="link-name" placeholder="Link name">
        <input class="link-input" type="text" name="link" placeholder="Link">
    `;

    let removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "Remove";

    // set remove button action
    let linkId = "link" + stateModule.getLinkCount();
    stateModule.incLinkCount();
    removeBtn.addEventListener("click",
        function () {
            removeLink(linkId);
        }
    );
    newLink.appendChild(removeBtn);

    let links = form.querySelectorAll(".form-links");
    // TODO fix here
    links[links.length - 1].insertAdjacentElement("afterend", newLink);
}

/**
 * Removes a link input pair
 * @param {String} id The id of the div containing the link inputs
 */
function removeLink(id){
    let link = document.getElementById(id);
    link.remove();
}

/**
 * 
 */
function deleteCourse(modalId, frameId){
    console.log("In delete form function");
    console.log("MOdal id was: ", modalId);
    console.log("frameID was: ", frameId);
    let modal = document.getElementById(modalId);
    modal.remove();
    let frame = document.getElementById(frameId);
    frame.remove();
}

/**
 * Handles form input when user clicks "Save Changes" 
 * @param {String} formId
 * @param {String} frameId
 */
function submitForm(formId, frameId){
    console.log("Passed Id was: ", formId);
    let form = document.getElementById(formId);
    let i = 0;

    let inputElements = form.querySelectorAll("input, select");
    let course = inputElements[i++].value;
    let color = inputElements[i++].value;

    // parse links
    let linkPairs = new Array();
    while(inputElements[i] != null){
        let pair = [inputElements[i].value, inputElements[i+1].value];
        linkPairs.push(pair);
        // clear form links so form is empty when opened again
        if (inputElements[i] != ""){
            inputElements[i].value = "";
        }
        if (inputElements[i+1] != ""){
            inputElements[i+1].value = "";
        }

        i += 2;
    }

    // Delete previous error msg if there is one
    let prevErrMsg = form.querySelector(".error-msg");
    if (prevErrMsg != null) {
        prevErrMsg.remove();
    }

    // If error in input, place error message above "Save Changes" button
    let errorMsg = validateForm(course, linkPairs, formId);
    if (errorMsg != null){
        let newLinkBtn = form.querySelector(".add-new-link");
        let p = document.createElement("p");
        p.className = "error-msg";
        p.innerHTML = errorMsg;
        newLinkBtn.insertAdjacentElement("afterend", p);
        return;
    }

    if (formId == "new-course-form"){
        newCourse(course, color, linkPairs);
    }
    else{
        editCourse(course, color, linkPairs, formId, frameId);
    }

    // clear form data
    // color.value = "";
    form.querySelector("input").value = "";


    
    // TODO Save to file


    let modal = form.closest('.modal');
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
function validateForm(course, linkPairs, formId){

    if (course == ""){
        return("Error: course name cannot be empty");
    }

    // remove whitespace
    let courseId = course.replace(/\s/g, '');
    if (document.getElementById(courseId) != null && formId == "new-course-form"){
        return("Error: cannot have two courses with the same name");
    }

    // Error if link is present but no link name
    for(var i = 0; i < linkPairs.length; i++){
        if (linkPairs[i][0] == "" && linkPairs[i][1] != ""){
            return("Error: link name cannot be empty");
        }
    }

    return(null);
}

function editCourse(course, color, linkPairs, formId, frameId){
    
    // remove whitespace
    let courseId = course.replace(/\s/g, '');
    console.log("Form Id was: ", formId);

    let form = document.getElementById(formId);
    let thisModal = form.closest(".modal");
    thisModal.insertAdjacentElement("beforebegin", newModal(course, color, linkPairs, courseId));
    thisModal.remove();
    
    let thisFrame = document.getElementById(frameId);
    thisFrame.insertAdjacentElement("beforebegin", newFrame(course, color, linkPairs, courseId));
    thisFrame.remove()

    // Insert new frame and modal
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

    // Insert new frame and modal
    grid.appendChild(newFrame(course, color, linkPairs, courseId));
    modals.appendChild(newModal(course, color, linkPairs, courseId));

    setEditBtns();
    
    // TODO more shit
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
function newFrame(course, color, linkPairs, courseId){
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

    let editBtn = frame.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
        let modal = editBtn.getAttribute('data-modal');
        document.getElementById(modal)
            .style.display = "block";
    });


    frame.style.backgroundColor = getColorCode(color);
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
function newModal(course, color, linkPairs, courseId){
    // Create new modal with saved values loaded into input boxes
    let newModal = document.createElement("div");
    newModal.className = "modal";
    let modalId = `${courseId}-modal`
    newModal.id = modalId;

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    let courseEdit = document.createElement("div");
    courseEdit.className = "course-edit-form";
    let form = document.createElement("div");
    let formId = `${courseId}-form`;
    form.className = "form";
    form.id = formId;

    let closeBtn = document.createElement("a");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", 
        function () {
            let modal = closeBtn.closest('.modal');
            modal.style.display = "none";
    });
    form.appendChild(closeBtn);

    let fragment = createFragment(`
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
        let newLink = document.createElement("div");
        newLink.className = "form-links";
        let linkId = "link" + stateModule.getLinkCount();
        newLink.id = linkId;
        stateModule.incLinkCount();
        newLink.innerHTML = `
            <input class="link-name" type="text" name="link-name" placeholder="Link name" value="${linkPairs[i][0]}">
            <input class="link-input" type="text" name="link" placeholder="Link" value="${linkPairs[i][1]}">
        `;

        // First link does not have remove button
        if (i != 0){
            let removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.className = "remove-btn";
            removeBtn.innerHTML = "Remove";

            // set remove button action
            stateModule.incLinkCount();
            removeBtn.addEventListener("click",
                function () {
                    removeLink(linkId);
                }
            );
            newLink.appendChild(removeBtn);
        }

        links.appendChild(newLink);
    }
    form.appendChild(links);

    // add buttons at bottom

    let newLinkBtn = document.createElement("button");
    newLinkBtn.className = "add-new-link";
    newLinkBtn.innerHTML = "Add new link";
    newLinkBtn.addEventListener("click",
        function () {
            addLink(formId);
        }
    );
    form.appendChild(newLinkBtn);

    let formBottom = document.createElement("div");
    formBottom.className = "form-bottom";
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "Delete Course";
    // TODO courseID is the same as frameID
    deleteBtn.addEventListener("click",
        function() {
            deleteCourse(modalId, courseId);
        }
    );
    formBottom.appendChild(deleteBtn);

    console.log("Form id before was: ", formId);
    let submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.innerHTML = "Save Changes";
    submitBtn.addEventListener("click",
        function () {
            submitForm(formId, courseId);
        }
    );
    formBottom.appendChild(submitBtn);
    form.appendChild(formBottom);

    form.style.background = getColorCode(color);

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