// Positions of colors in dropdown select element
const RED_POS = 0;
const GREEN_POS = 1;
const BLUE_POS = 2;
const YELLOW_POS = 3;
const ORANGE_POS = 4;
const PURPLE_POS = 5;

/**
* Returns a hex code for each course color option.
* @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
* @return {String} The hex code associated with each color according to the
* color scheme of this web app.
*/
export function getColorCode(color) {
    switch (color) {
        case 'red':
            return '#fe7b7b';
        case 'green':
            return '#75d073';
        case 'blue':
            return '#74a3ff';
        case 'yellow':
            return '#ffe977';
        case 'orange':
            return '#fbb143';
        case 'purple':
            return '#c17ed9';
        default:
            console.log(`ERROR: ${color} is not a valid color`);
    }
}

/**
 * Returns the position of each color in the dropdown select menu.
 * @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
 * @return {Number} The position of the color in the dropdown select menu
 */
export function getColorPos(color) {
    switch (color) {
      case 'red':
        return RED_POS;
      case 'green':
        return GREEN_POS;
      case 'blue':
        return BLUE_POS;
      case 'yellow':
        return YELLOW_POS;
      case 'orange':
        return ORANGE_POS;
      case 'purple':
        return PURPLE_POS;
      default:
        console.log(`ERROR: ${color} does not have a position`);
    }
}

/**
 * Given a course form, returns all input values in the form as an array
 * @param {HTML} form that needs to be parsed
 * @return {Array} an array with structure [course, color, linkPairs], where
 * linkPairs is an array of size two, with the first element being the link name
 * and the second element being the hyperlink. Each link pair is stored as a
 * subarray.
 */
export function parseForm(form) {
    let i = 0;
    const inputElements = form.querySelectorAll('input, select');
    const course = inputElements[i++].value;
    const color = inputElements[i++].value;
  
    // parse links and add to double array
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
 * @param {HTML} form form to be validated
 *
 * @return {String} an error message if form input is invalid,
 * @return {null} otherwise
 */
export function validateForm(course, linkPairs, form, courses) {
  if (course in courses) {
    return ('Error: cannot have two courses with the same name'); 
  }
  // TODO update javadoc with courses
  // TODO this is for updating course name
  // const curForm = document.getElementById(formId);
  // const newFormId = course.replace(/\s/g, '') + '-form';
  // const newForm = document.getElementById(newFormId);

  // if (form == 'new-course-form' && newForm != null) {
  //   return ('Error: cannot have two courses with the same name');
  // }

  // if (form != 'new-course-form' && newForm != null && curForm != newForm) {
  //   return ('Error: cannot have two courses with the same name');
  // }

  // if (course == '') {
  //   return ('Error: course name cannot be empty');
  // }

  // // Check of link is present but has no link name
  // for (let i = 0; i < linkPairs.length; i++) {
  //   if (linkPairs[i][0] == '' && linkPairs[i][1] != '') {
  //     return ('Error: link name cannot be empty');
  //   }
  // }

  return (null);
}

/**
 * Given a course form, clears all fields
 * @param {HTML} form that needs to be parsed
 */
export function clearForm(form) {
    // TODO should it be formRef.current that's passed in?
    let i = 0;
    const inputElements = form.querySelectorAll('input, select');
    const colorOptions = form.querySelectorAll('option');

    // Clear course value
    inputElements[i++].value = '';

    // TODO change color to unused color
    // const color = inputElements[i++].value;
    i++;
    const pos = getColorPos('red');
    colorOptions[pos].selected = 'selected';
  
    // parse links
    while (inputElements[i] != null) {
      inputElements[i++].value = '';
    }
}

