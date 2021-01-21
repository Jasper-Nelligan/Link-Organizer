"use strict"

// TODO indent 2 space blocks

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
var stateModule = ( function () {
    // Private variable to store # of link input fields
    // This is used to create a unique ID for each link input
    let _linkCount = FORM_LINKS;
    
    function incLinkCount(num) {
        _linkCount++;
    }

    function setLinkCount(num) {
        _linkCount = num;
    }

    function getLinkCount() {
        return _linkCount;
    }

    return {
        incLinkCount: incLinkCount,
        setLinkCount: setLinkCount,
        getLinkCount: getLinkCount
    };
})();

/**
 * Initializes page by loading in course data and setting button events
 */
function initPage() {
    loadCourses();
    setBtns();
}

/**
 * Reads in course data from localStorage and re-creates course frames and modals
 */
function loadCourses() {

    let courses = JSON.parse(localStorage.getItem('courses'));
    courses.forEach(function(courseData) {
        let courseName = courseData[0];
        let color = courseData[1];
        let linkPairs = courseData[2];
        newCourse(courseName, color, linkPairs);
    })
}

/**
 * Sets onclick events for buttons initially loaded on page.
 */
function setBtns() {
    // new course button
    let addCourseBtn = document.getElementById("new-course-btn");
    addCourseBtn.addEventListener("click",
        function () {
            let modal = addCourseBtn.getAttribute("data-modal");
            document.getElementById(modal)
                .style.display = "block";
        }
    );

    // link remove buttons
    let i = 1;
    let removeBtns = document.getElementsByClassName("remove-btn");
    for (let j = 0; j < removeBtns.length; j++){
        let linkId = "link" + i++;
        removeBtns[j].addEventListener("click",
            function () {
                removeLink(linkId);
            }
        );
    }

    // add new link button
    let newLinkBtn = document.querySelector(".add-new-link");
    newLinkBtn.addEventListener("click",
        function () {
            addLink("new-course-form");
        }
    );

    // form submit button
    let submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click",
        function () {
            submitForm("new-course-form");
        }
    );
}

/**
 * Adds a new link input line to a form
 * @param {String} formId id of form to add new link input
 */
function addLink(formId) {
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
    links[links.length - 1].insertAdjacentElement("afterend", newLink);
}

/**
 * Removes a link input pair
 * @param {String} id The id of the div containing the link inputs
 */
function removeLink(id) {
    let link = document.getElementById(id);
    link.remove();
}

/**
 * Removes a course's frame and modal 
 * @param {String} modalId 
 * @param {String} frameId 
 */
function deleteCourse(modalId, frameId) {
    let modal = document.getElementById(modalId);
    modal.remove();
    console.log(frameId);
    let frame = document.getElementById(frameId);
    frame.remove();

    saveCourseData();
}

/**
 * Handles form input when user clicks "Save Changes".
 * @param {String} formId Id of form the submit button was attached to.
 */
function submitForm(formId) {
    let form = document.getElementById(formId);
    let values = parseForm(form);
    let course = values[0];
    let color = values[1];
    let linkPairs = values[2];
    
    // Delete previous error msg if there is one
    let prevErrMsg = form.querySelector(".error-msg");
    if (prevErrMsg != null) {
        prevErrMsg.remove();
    }
    
    // If error in input, place error message above "Save Changes" button
    let errorMsg = validateForm(course, linkPairs, formId);
    if (errorMsg != null) {
        let newLinkBtn = form.querySelector(".add-new-link");
        let p = document.createElement("p");
        p.className = "error-msg";
        p.innerHTML = errorMsg;
        newLinkBtn.insertAdjacentElement("afterend", p);
        return;
    }
    
    if (formId == "new-course-form") {
        newCourse(course, color, linkPairs);
        // clear form text data
        form.querySelectorAll("input").forEach(
            function (input) {
                input.value = "";
            }
        )
    }
    else{
        editCourse(course, color, linkPairs, formId);
    }

    saveCourseData();
    
    let modal = form.closest('.modal');
    modal.style.display = "none";
}

/**
 * Given a form, returns all input values in the form
 * @param {form} formId 
 * @returns {Array} an array with structure [course, color, linkPairs], where
 * is an array of size two, with the first element being the link name and the
 * second element being the actual link. Each link pair is stored as a subarray.
 */
function parseForm(form){
    let i = 0;
    let inputElements = form.querySelectorAll("input, select");
    let course = inputElements[i++].value;
    let color = inputElements[i++].value;

    // parse links
    let linkPairs = new Array();
    while (inputElements[i] != null) {
        let pair = [inputElements[i++].value, inputElements[i++].value];
        linkPairs.push(pair);
    }

    return ([course, color, linkPairs]);
}

/**
 * Validates form input
 * @param {String} course The course name that the user input
 * @param {Array[[String, String]]} linkPairs a link pair that's an array of size two, 
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * @param {String} formId Id of form to be validated
 *                                            
 * @returns {String} an error message if form input is invalid,
 * @returns {null} otherwise
 */
function validateForm(course, linkPairs, formId) {
    let curForm = document.getElementById(formId);
    let newFormId = course.replace(/\s/g, '') + "-form";
    let newForm = document.getElementById(newFormId);
    
    if (formId == "new-course-form" && newForm != null){
        return("Error: cannot have two courses with the same name");
    }

    if (formId != "new-course-form" && newForm != null && curForm != newForm){
        return ("Error: cannot have two courses with the same name");
    }

    if (course == "") {
        return("Error: course name cannot be empty");
    }

    // Check of link is present but has no link name
    for(var i = 0; i < linkPairs.length; i++) {
        if (linkPairs[i][0] == "" && linkPairs[i][1] != "") {
            return("Error: link name cannot be empty");
        }
    }

    return(null);
}

/**
 * Edits course info by creating a new frame and modal and places
 * them into the DOM. The original frame and modal is deleted. Form must be
 * validated before calling this function.
 * @param {String} course The new course name
 * @param {String} color The new color chosen
 * @param {Array[[String, String]]} linkPairs a link pair that's an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * @param {String} formId id of the form that the submit button was attached to
 */
function editCourse(course, color, linkPairs, formId) {
    // remove whitespace from course to be used in Id's
    let courseId = course.replace(/\s/g, '');
    let newFormId = `${courseId}-form`;
    let newFrameId = `${courseId}-frame`;

    // if user has changed the course name, delete existing course frame and modal and create new course
    if (document.getElementById(newFormId) == null){
        let oldForm = document.getElementById(formId);
        let oldModal = oldForm.closest(".modal");
        oldModal.insertAdjacentElement("beforebegin", newModal(course, color, linkPairs, courseId));
        oldModal.remove();

        let oldFrame = formId.replace("-form", "-frame");
        oldFrame = document.getElementById(oldFrame);
        oldFrame.insertAdjacentElement("beforebegin", newFrame(course, color, linkPairs, courseId));
        oldFrame.remove();
    }
    // else 
    else {
        let curForm = document.getElementById(newFormId);
        let curModal = curForm.closest(".modal");
        curModal.insertAdjacentElement("beforebegin", newModal(course, color, linkPairs, courseId));
        curModal.remove();

        let thisFrame = document.getElementById(newFrameId);
        thisFrame.insertAdjacentElement("beforebegin", newFrame(course, color, linkPairs, courseId));
        thisFrame.remove()
    }
}

/**
 * Creates a new course frame and associated modal and inserts into document
 * @param {String} course What the user input in the 'course' field
 * @param {String} color Color that the user chose
 * @param {Array[[String, String]]} linkPairs a link pair that's an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 */
function newCourse(course, color, linkPairs) {
    let grid = document.getElementById("grid-container");
    let modals = document.getElementById("modals");

    // Insert new frame and modal. Modal must be created first
    // so the edit button can be set in newFrame() function
    modals.appendChild(newModal(course, color, linkPairs));
    grid.appendChild(newFrame(course, color, linkPairs));
}

/**
 * Creates a new course frame to be inserted into grid. Each frame contains
 * the links that the user created.
 * @param {String} course What the user input in the 'course' field
 * @param {String} colorCode Hexcode for the color of the new modal
 * @param {Array[[String, String]]} linkPairs a link pair that's an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * 
 * @returns {div} a div with class="frame" and id=courseId that contains
 * all HTML for a new course frame.
 */
function newFrame(course, color, linkPairs) {
    // remove whitespace in course and use it for Id's
    let courseId = course.replace(/\s/g, '');
    let frameId = `${courseId}-frame`;

    let frame = document.createElement("div");
    frame.className = "frame";
    frame.id = frameId;

    let title = document.createElement("p");
    title.className = "course-title";
    title.innerHTML = `${course}`;
    frame.appendChild(title);

    let links = document.createElement("div");
    links.className = "links";

    let firstLink = true;
    for (let i = 0; i < linkPairs.length; i++) {
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
 * @param {Array[[String, String]]} linkPairs a link pair that's an array of size two,
 * with the first element being the link name and the second element being the
 * actual link. Each link pair is stored as a subarray.
 * 
 * @returns {Div} a div element with class="modal" and id=`$courseId-modal`
 * containing all HTML for the new modal.
 */
function newModal(course, color, linkPairs) {
    // remove whitespace in course and use it for Id's
    let courseId = course.replace(/\s/g, '');
    let modalId = `${courseId}-modal`;
    let formId = `${courseId}-form`;
    let frameId = `${courseId}-frame`;


    // Create new modal with saved values loaded into input boxes
    let newModal = document.createElement("div");
    newModal.className = "modal";
    newModal.id = modalId;

    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    let form = document.createElement("div");
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
    for (let i = 0; i < linkPairs.length; i++) {
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
        if (i != 0) {
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
    deleteBtn.addEventListener("click",
        function() {
            deleteCourse(modalId, frameId);
        }
    );
    formBottom.appendChild(deleteBtn);

    let submitBtn = document.createElement("button");
    submitBtn.className = "submit-btn";
    submitBtn.innerHTML = "Save Changes";
    submitBtn.addEventListener("click",
        function () {
            submitForm(formId, frameId);
        }
    );
    formBottom.appendChild(submitBtn);
    form.appendChild(formBottom);

    form.style.background = getColorCode(color);

    modalContent.appendChild(form);
    newModal.appendChild(modalContent);
    return (newModal);
}

/**
 * Traverse through DOM and save all data to localStorage
 */
function saveCourseData() {
    let courses = new Array();

    let forms = document.getElementsByClassName("form");
    for (let i = 1; i < forms.length; i++){
        let values = parseForm(forms[i]);
        courses.push(values);
    }

    localStorage.courses = JSON.stringify(courses);
}

/**
 * Returns a hex code for each course color option.
 * @param {String} color Either 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {String}      The hex code associated with each color according to the color scheme
 *                       of this web app.
 */
function getColorCode(color) {
    switch(color) {
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
function getColorPos(color) {
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
 * Creates a new fragment with the passed in string as its inner HTML.
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