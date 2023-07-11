import { Color, ColorHex, Messages } from "./Constants";
import React from 'react';

/**
* Returns a hex code for each course color option.
* @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
* @return {String} The hex code associated with each color according to the
* color scheme of this web app.
*/
export function getColorHex(color) {
    switch (color) {
        case Color.RED:
            return ColorHex.RED;
        case Color.GREEN:
            return ColorHex.GREEN;
        case Color.BLUE:
            return ColorHex.BLUE;
        case Color.YELLOW:
            return ColorHex.YELLOW;
        case Color.ORANGE:
            return ColorHex.ORANGE;
        case Color.PURPLE:
            return ColorHex.PURPLE;
        default:
            console.log(`ERROR: ${color} is not a valid color`);
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
 * @param {Object} courses object of courses, with each key being a course name
 *
 * @return {String} an error message if form input is invalid,
 * @return {null} otherwise
 */
export function validateForm(course, initCourseName, linkPairs, courses) {
  if (course === '') {
    return Messages.ERROR_COURSE_NAME_EMPTY; 
  }

  if (initCourseName !== course && course in courses) {
    return Messages.ERROR_TWO_COURSES_SAME_NAME; 
  }

  // Check of link is present but has no link name
  for (let i = 0; i < linkPairs.length; i++) {
    if (linkPairs[i][0] === '' && linkPairs[i][1] !== '') {
      return Messages.ERROR_LINK_NAME_EMPTY;
    }
  }

  return (null);
}

/**
 * 
 * @param {Array} elements an array for the br elements to be pushed to
 * @param {Int} numBrTags number of br tags to add to elements 
 */
export function addBrTags(elements, numBrTags) {
  for (let i = 0; i < numBrTags; i++) {
      elements.push(React.createElement('br'));
  }
}

/**
 * Given a course form, clears all input field
 * @param {HTML} form form that needs to be cleared
 */
export function clearForm(form) {
  let i = 0;
  const inputElements = form.querySelectorAll('input');

  // Clear course value
  inputElements[i++].value = '';

  // Clear links
  while (inputElements[i] != null) {
    inputElements[i++].value = '';
  }
}

export function getLeastUsedColor(colorCount) {
  let leastUsedColor = null;
  let leastCount = Infinity;

  for (const [color, count] of Object.entries(colorCount)) {
    if (count < leastCount) {
      leastUsedColor = color;
      leastCount = count;
    }
  }

  return leastUsedColor;
};