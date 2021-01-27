'use strict';

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
const stateModule = ( function() {
  // Private variable to store # of link input fields
  // This is used to create a unique ID for each link input
  let _linkCount = FORM_LINKS;

  function incLinkCount() {
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
    getLinkCount: getLinkCount,
  };
})();

/**
 * Initializes page by setting button events, loading course data, and loading
 * image of schedule.
 */
function initPage() {
  setBtns();

  const courses = JSON.parse(localStorage.getItem('courses'));
  // if user has no other courses created
  if (courses == null || courses.length == 0) {
    // create welcome message
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.innerHTML = `
      Welcome to Link Organizer! Try adding your course links below, or 
      upload your class schedule with the "Upload image of schedule" button.
    `;
    const newCourseBtn = document.getElementById('new-course-btn');
    newCourseBtn.insertAdjacentElement('beforebegin', p);
  }
  else {
    loadCourses();
  }

  // Load in img data from localStorage and display it
  const imgData = localStorage.getItem('image');
  if (imgData != null) {
    const img = document.getElementById('schedule-image');
    img.src = imgData;
    img.style.opacity = '1';
    // Shift bottom text to be right after image
    const pageEnd = document.getElementById('page-end');
    pageEnd.style.height = '5vh';

    // Create "Remove image" button
    const btn = document.createElement('button');
    btn.className = 'remove-image-btn';
    btn.innerHTML = "Remove image";
    img.insertAdjacentElement('afterend', btn);
    btn.addEventListener('click',
        function() {
          img.src = '';
          img.style.opacity = '0';
          pageEnd.style.height = '50vh';
          localStorage.removeItem('image');
          btn.remove();
        }
    );
  }
}

/**
 * Re-creates course frames and modals from localStorage
 */
function loadCourses() {
  const courses = JSON.parse(localStorage.getItem('courses'));
  courses.forEach(function(courseData) {
    const courseName = courseData[0];
    const color = courseData[1];
    const linkPairs = courseData[2];
    newCourse(courseName, color, linkPairs);
  });
}

/**
 * Displays user-uploaded image and saves it's string representation
 * into localStorage.
 */
function newImage() {
  const imgDisplay = document.getElementById('schedule-image');
  const imgPath = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  if (imgPath.size > 3000000) {
    const p = document.createElement('p');
    p.className = 'img-error-msg';
    p.innerHTML = 'Error: image file size must be less than 3MB';
    imgDisplay.insertAdjacentElement('beforebegin', p);
    return;
  }

  reader.addEventListener('load',
      function() {
      // convert image file to base64 string
        const imgBase64 = reader.result;
        try {
          localStorage.setItem('image', imgBase64);
          imgDisplay.src = imgBase64;
          imgDisplay.style.opacity = '1';

          // Create "Remove image" button
          const btn = document.createElement('button');
          btn.className = 'remove-image-btn';
          btn.innerHTML = "Remove image";
          imgDisplay.insertAdjacentElement('afterend', btn);
          btn.addEventListener('click',
            function() {
              imgDisplay.src = '';
              imgDisplay.style.opacity = '0';
              pageEnd.style.height = '50vh';
              localStorage.removeItem('image');
              btn.remove();
            }
          );

          // Shift bottom text to be right after image
          const pageEnd = document.getElementById('page-end');
          pageEnd.style.height = '5vh';
        }
        catch (DOMException) {
          /*
           * Check if adding new image exceeds browser's local storage.
           * This is HIGHLY unlikely to be triggered, since local storage
           * is around 5MB, meaning that there would have to be 3MB of
           * course link data.
           */
          const p = document.createElement('p');
          p.className = 'img-error-msg';
          p.innerHTML = `
                Error: Application has run out storage space. Try
                deleting unneeded course links or choose a smaller image
                file.
            `;
          const infoPopup = document.getElementById('image-popup');
          infoPopup.insertAdjacentElement('afterend', p);
        }
      }, false);

  if (imgPath) {
    reader.readAsDataURL(imgPath);
  }
}

/**
 * Sets onclick events for buttons initially loaded on page.
 */
function setBtns() {
  // new course button
  const addCourseBtn = document.getElementById('new-course-btn');
  addCourseBtn.addEventListener('click',
      function() {
        const modal = addCourseBtn.getAttribute('data-modal');
        document.getElementById(modal)
            .style.display = 'block';
      },
  );

  // close Modal button
  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click',
      function() {
        const modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
      });

  // link remove buttons
  let i = 1;
  const removeBtns = document.getElementsByClassName('remove-link-btn');
  for (let j = 0; j < removeBtns.length; j++) {
    const linkId = 'link' + i++;
    removeBtns[j].addEventListener('click',
        function() {
          removeLink(linkId);
        },
    );
  }

  // add new link button
  const newLinkBtn = document.querySelector('.add-new-link');
  newLinkBtn.addEventListener('click',
      function() {
        addLink('new-course-form');
      },
  );

  // form submit button
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.addEventListener('click',
      function() {
        submitForm('new-course-form');
      },
  );
}

/**
 * Adds a new link input line to a form
 * @param {String} formId id of form to add new link input
 */
function addLink(formId) {
  const form = document.getElementById(formId);
  const newLink = document.createElement('div');
  newLink.className = 'form-links';
  newLink.id = 'link' + stateModule.getLinkCount();
  newLink.innerHTML = `
    <input class="link-name" type="text" name="link-name" placeholder="Link name">
    <input class="link-input" type="text" name="link" placeholder="Link">
  `;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'remove-link-btn';
  removeBtn.innerHTML = 'Remove';

  // set remove button action
  const linkId = 'link' + stateModule.getLinkCount();
  stateModule.incLinkCount();
  removeBtn.addEventListener('click',
      function() {
        removeLink(linkId);
      },
  );
  newLink.appendChild(removeBtn);

  const links = form.querySelectorAll('.form-links');
  links[links.length - 1].insertAdjacentElement('afterend', newLink);
}

/**
 * Removes a link input pair
 * @param {String} id The id of the div containing the link inputs
 */
function removeLink(id) {
  const link = document.getElementById(id);
  link.remove();
}

/**
 * Removes a courses frame and modal
 * @param {String} modalId
 * @param {String} frameId
 */
function deleteCourse(modalId, frameId) {
  const modal = document.getElementById(modalId);
  modal.remove();
  const frame = document.getElementById(frameId);
  frame.remove();

  saveCourseData();
}

/**
 * Handles form input when user clicks "Save Changes".
 * @param {String} formId Id of form the submit button was attached to.
 */
function submitForm(formId) {
  const form = document.getElementById(formId);
  const values = parseForm(form);
  const course = values[0];
  const color = values[1];
  const linkPairs = values[2];

  // Delete previous error msg if there is one
  const prevErrMsg = form.querySelector('.form-error-msg');
  if (prevErrMsg != null) {
    prevErrMsg.remove();
  }

  // If error in input, place error message above "Save Changes" button
  const errorMsg = validateForm(course, linkPairs, formId);
  if (errorMsg != null) {
    const newLinkBtn = form.querySelector('.add-new-link');
    const p = document.createElement('p');
    p.className = 'form-error-msg';
    p.innerHTML = errorMsg;
    newLinkBtn.insertAdjacentElement('afterend', p);
    return;
  }

  if (formId == 'new-course-form') {
    newCourse(course, color, linkPairs);
    // clear form text data
    form.querySelectorAll('input').forEach(
        function(input) {
          input.value = '';
        },
    );
  }
  else {
    editCourse(course, color, linkPairs, formId);
  }

  try {
    saveCourseData();
  }
  catch (DOMException) {
  /*
   * Check if adding new course data exceeds browser's local storage.
   * This is HIGHLY unlikely to be triggered, since for a 5MB local
   * storage there would have to be over 3MB of course link data.
   */
    const newLinkBtn = form.querySelector('.add-new-link');
    const p = document.createElement('p');
    p.className = 'form-error-msg';
    p.innerHTML = `
            Error: Application has run out storage space. Try deleting
            unneeded course links or choose a smaller image file so
            more data can be saved.
        `;
    newLinkBtn.insertAdjacentElement('afterend', p);
    return;
  }

  const modal = form.closest('.modal');
  modal.style.display = 'none';
}

/**
 * Given a form, returns all input values in the form
 * @param {form} form reference to the form that needs to be parsed
 * @return {Array} an array with structure [course, color, linkPairs], where
 * is an array of size two, with the first element being the link name and the
 * second element being the actual link. Each link pair is stored as a subarray.
 */
function parseForm(form) {
  let i = 0;
  const inputElements = form.querySelectorAll('input, select');
  const course = inputElements[i++].value;
  const color = inputElements[i++].value;

  // parse links
  const linkPairs = [];
  while (inputElements[i] != null) {
    const pair = [inputElements[i++].value, inputElements[i++].value];
    linkPairs.push(pair);
  }

  return ([course, color, linkPairs]);
}

/**
 * Validates form input
 * @param {String} course The course name that the user input
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 * @param {String} formId Id of form to be validated
 *
 * @return {String} an error message if form input is invalid,
 * @return {null} otherwise
 */
function validateForm(course, linkPairs, formId) {
  const curForm = document.getElementById(formId);
  const newFormId = course.replace(/\s/g, '') + '-form';
  const newForm = document.getElementById(newFormId);

  if (formId == 'new-course-form' && newForm != null) {
    return ('Error: cannot have two courses with the same name');
  }

  if (formId != 'new-course-form' && newForm != null && curForm != newForm) {
    return ('Error: cannot have two courses with the same name');
  }

  if (course == '') {
    return ('Error: course name cannot be empty');
  }

  // Check of link is present but has no link name
  for (let i = 0; i < linkPairs.length; i++) {
    if (linkPairs[i][0] == '' && linkPairs[i][1] != '') {
      return ('Error: link name cannot be empty');
    }
  }

  return (null);
}

/**
 * Edits course info by creating a new frame and modal and places
 * them into the DOM. The original frame and modal is deleted. Form must be
 * validated before calling this function.
 * @param {String} course The new course name
 * @param {String} color The new color chosen
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 * @param {String} formId id of the form that the submit button was attached to
 */
function editCourse(course, color, linkPairs, formId) {
  // remove whitespace from course to be used in Id's
  const courseId = course.replace(/\s/g, '');
  const newFormId = `${courseId}-form`;
  const newFrameId = `${courseId}-frame`;

  /*
   * If user has changed the course name, delete existing course frame
   * and modal and create new course
   */
  if (document.getElementById(newFormId) == null) {
    const oldForm = document.getElementById(formId);
    const oldModal = oldForm.closest('.modal');
    oldModal.insertAdjacentElement('beforebegin',
        newModal(course, color, linkPairs, courseId));
    oldModal.remove();

    let oldFrame = formId.replace('-form', '-frame');
    oldFrame = document.getElementById(oldFrame);
    oldFrame.insertAdjacentElement('beforebegin',
        newFrame(course, color, linkPairs, courseId));
    oldFrame.remove();
  }
  else {
    const curForm = document.getElementById(newFormId);
    const curModal = curForm.closest('.modal');
    curModal.insertAdjacentElement('beforebegin',
        newModal(course, color, linkPairs, courseId));
    curModal.remove();

    const thisFrame = document.getElementById(newFrameId);
    thisFrame.insertAdjacentElement('beforebegin',
        newFrame(course, color, linkPairs, courseId));
    thisFrame.remove();
  }
}

/**
 * Creates a new course frame and associated modal and inserts into document
 * @param {String} course What the user input in the 'course' field
 * @param {String} color Color that the user chose
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 */
function newCourse(course, color, linkPairs) {
  const grid = document.getElementById('grid-container');
  const modals = document.getElementById('modals');

  // Insert new frame and modal. Modal must be created first
  // so the edit button can be set in newFrame() function
  modals.appendChild(newModal(course, color, linkPairs));
  grid.appendChild(newFrame(course, color, linkPairs));
}

/**
 * Creates a new course frame to be inserted into grid. Each frame contains
 * the links that the user created.
 * @param {String} course What the user input in the "course" field
 * @param {String} color color that the user selected
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 *
 * @return {div} a div with class="frame" and id=courseId that contains
 * all HTML for a new course frame.
 */
function newFrame(course, color, linkPairs) {
  // remove whitespace in course and use it for Id's
  const courseId = course.replace(/\s/g, '');
  const frameId = `${courseId}-frame`;

  const frame = document.createElement('div');
  frame.className = 'frame';
  frame.id = frameId;

  const title = document.createElement('p');
  title.className = 'course-title';
  title.innerHTML = `${course}`;
  frame.appendChild(title);

  const links = document.createElement('div');
  links.className = 'links';

  let firstLink = true;
  for (let i = 0; i < linkPairs.length; i++) {
    if (firstLink) {
      firstLink = false;
    }
    else {
      links.insertAdjacentHTML('beforeend', '<br><br>');
    }
    const link = document.createElement('a');
    link.href = linkPairs[i][1];
    link.target = '_blank';
    link.innerHTML = linkPairs[i][0];
    links.appendChild(link);
  }
  // Add space between last link and edit button
  links.insertAdjacentHTML('beforeend', '<br><br><br>');

  frame.appendChild(links);

  frame.insertAdjacentHTML('beforeend', `
        <button type="button" class="edit-btn" id="edit-${courseId}" data-modal="${courseId}-modal">Edit</button>
    `);

  const editBtn = frame.querySelector('.edit-btn');
  editBtn.addEventListener('click', function() {
    const modal = editBtn.getAttribute('data-modal');
    document.getElementById(modal)
        .style.display = 'block';
  });

  frame.style.backgroundColor = getColorCode(color);
  return frame;
}

/**
 * Creates a div element containing all HTML for a new modal
 * @param {String} course What the user input in the "course" field
 * @param {String} color color that the user selected
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 *
 * @return {Div} a div element with class="modal" and id=`$courseId-modal`
 * containing all HTML for the new modal.
 */
function newModal(course, color, linkPairs) {
  // remove whitespace in course and use it for Id's
  const courseId = course.replace(/\s/g, '');
  const modalId = `${courseId}-modal`;
  const formId = `${courseId}-form`;
  const frameId = `${courseId}-frame`;


  // Create new modal with saved values loaded into input boxes
  const newModal = document.createElement('div');
  newModal.className = 'modal';
  newModal.id = modalId;

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  const form = document.createElement('div');
  form.className = 'form';
  form.id = formId;

  const closeBtn = document.createElement('a');
  closeBtn.className = 'close';
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click',
      function() {
        const modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
      });
  form.appendChild(closeBtn);

  let fragment = createFragment(`
        <input class="course-input" type="text" name="course" placeholder="Course" value="${course}">
        <label for="color-selector">Color:</label>
    `);
  form.appendChild(fragment);

  const colorSelector = document.createElement('select');
  colorSelector.name = 'colors';

  fragment = createFragment(`
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
    `);

  const colorOptions = fragment.querySelectorAll('option');
  const pos = getColorPos(color);
  colorOptions[pos].selected = 'selected';
  colorSelector.appendChild(fragment);
  form.appendChild(colorSelector);

  // insert link inputs with loaded values
  const links = document.createDocumentFragment();
  for (let i = 0; i < linkPairs.length; i++) {
    const newLink = document.createElement('div');
    newLink.className = 'form-links';
    const linkId = 'link' + stateModule.getLinkCount();
    newLink.id = linkId;
    stateModule.incLinkCount();
    newLink.innerHTML = `
            <input class="link-name" type="text" name="link-name" placeholder="Link name" value="${linkPairs[i][0]}">
            <input class="link-input" type="text" name="link" placeholder="Link" value="${linkPairs[i][1]}">
        `;

    // First link does not have remove button
    if (i != 0) {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove-link-btn';
      removeBtn.innerHTML = 'Remove';

      // set remove button action
      stateModule.incLinkCount();
      removeBtn.addEventListener('click',
          function() {
            removeLink(linkId);
          },
      );
      newLink.appendChild(removeBtn);
    }
    links.appendChild(newLink);
  }
  form.appendChild(links);

  // add buttons at bottom
  const newLinkBtn = document.createElement('button');
  newLinkBtn.className = 'add-new-link';
  newLinkBtn.innerHTML = 'Add new link';
  newLinkBtn.addEventListener('click',
      function() {
        addLink(formId);
      },
  );
  form.appendChild(newLinkBtn);

  const formBottom = document.createElement('div');
  formBottom.className = 'form-bottom';
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = 'Delete Course';
  deleteBtn.addEventListener('click',
      function() {
        deleteCourse(modalId, frameId);
      },
  );
  formBottom.appendChild(deleteBtn);

  const submitBtn = document.createElement('button');
  submitBtn.className = 'submit-btn';
  submitBtn.innerHTML = 'Save Changes';
  submitBtn.addEventListener('click',
      function() {
        submitForm(formId, frameId);
      },
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
  const courses = [];

  // i is set to 1 to avoid saving new-course-form
  const forms = document.getElementsByClassName('form');
  for (let i = 1; i < forms.length; i++) {
    const values = parseForm(forms[i]);
    courses.push(values);
  }

  localStorage.courses = JSON.stringify(courses);
}

/**
 * Returns a hex code for each course color option.
 * @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {String} The hex code associated with each color according to the
 * color scheme of this web app.
 */
function getColorCode(color) {
  switch (color) {
    case 'red':
      return '#fe7b7b';
      break;
    case 'green':
      return '#75d073';
      break;
    case 'blue':
      return '#74a3ff';
      break;
    case 'yellow':
      return '#ffe977';
      break;
    case 'orange':
      return '#fbb143';
      break;
    case 'purple':
      return '#c17ed9';
      break;
    default:
      console.log(`${color} is not a valid color`);
  }
}

/**
 * Returns a hex code for each course color option.
 * @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {Number}      The position of the color in the dropdown select menu
 */
function getColorPos(color) {
  switch (color) {
    case 'red':
      return RED_POS;
      break;
    case 'green':
      return GREEN_POS;
      break;
    case 'blue':
      return BLUE_POS;
      break;
    case 'yellow':
      return YELLOW_POS;
      break;
    case 'orange':
      return ORANGE_POS;
      break;
    case 'purple':
      return PURPLE_POS;
      break;
    default:
      console.log(`${color} does not have a position`);
  }
}

/**
 * Creates a new fragment with the passed in string as its inner HTML.
 * @param {String} htmlStr an HTML string to be made into a fragment
 * @return {fragment}
 */
function createFragment(htmlStr) {
  const frag = document.createDocumentFragment();
  const temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}
