import { Color, ColorHex, Messages, Constants } from "./Constants";
import React from "react";

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
  const inputElements = form.querySelectorAll("input, select");
  const course = inputElements[i++].value;
  const color = inputElements[i++].value;

  // parse links and add to double array
  const linkPairs = [];
  while (inputElements[i] != null) {
    const pair = [inputElements[i++].value, inputElements[i++].value];
    linkPairs.push(pair);
  }

  return [course, color, linkPairs];
}

/**
 * Validates form input
 * @param {String} courseName The course name that the user input
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 * @param {Object} courses object of courses, with each key being a course name
 *
 * @return {String} an error message if form input is invalid,
 * @return {null} otherwise
 */
// TODO rename couse variable everywhere to courseName
export function validateForm(courseName, initCourseName, linkPairs, courses) {
  if (courseName === Constants.EMPTY_COURSE_NAME) {
    return Messages.ERROR_COURSE_NAME_EMPTY;
  }

  if (
    initCourseName !== courseName &&
    courses.some((course) => course[0] === courseName)
  ) {
    return Messages.ERROR_TWO_COURSES_SAME_NAME;
  }

  // Check of link is present but has no link name
  for (let i = 0; i < linkPairs.length; i++) {
    if (linkPairs[i][0] === "" && linkPairs[i][1] !== "") {
      return Messages.ERROR_LINK_NAME_EMPTY;
    }
  }

  return null;
}

/**
 *
 * @param {Array} elements an array for the br elements to be pushed to
 * @param {Int} numBrTags number of br tags to add to elements
 */
export function addBrTags(elements, numBrTags) {
  for (let i = 0; i < numBrTags; i++) {
    elements.push(React.createElement("br"));
  }
}

/**
 * Given a course form, clears all input fields
 * @param {HTML} form form that needs to be cleared
 */
export function clearForm(form) {
  let i = 0;
  const inputElements = form.querySelectorAll("input");

  // Clear course value
  inputElements[i++].value = "";

  // Clear links
  while (inputElements[i] != null) {
    inputElements[i++].value = "";
  }
}

/**
 * Given a course form, resets all input fields to given courseName and linkPairs
 * @param {HTML} form form that needs to be reset
 * @param {String} courseName
 * @param {Array} linkPairs
 */
export function resetForm(form, courseName, linkPairs) {
  let i = 0;
  const inputElements = form.querySelectorAll("input");

  // reset course value
  inputElements[i++].value = courseName;

  // reset links
  for (let linkPair in linkPairs) {
    // Prevents going out of bounds
    if (inputElements[i] === undefined) {
      continue;
    }
    inputElements[i++].value = linkPairs[linkPair][0];
    inputElements[i++].value = linkPairs[linkPair][1];
  }
}

/**
 * Parses the coloCount object and returns the color that has the lowest count
 * @param {Object} colorCount
 * @returns least used color
 */
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
}

/**
 * Creates link data for modal link pairs
 * @param {Array} linkPairs
 * @returns link data for modal
 */
export function createLinkData(linkPairs) {
  const initialLinkData = [];
  let firstLink = true;
  let id = 0;
  for (id; id < linkPairs.length; id++) {
    initialLinkData.push([id, firstLink, linkPairs[id][0], linkPairs[id][1]]);
    if (firstLink) {
      firstLink = false;
    }
  }
  return initialLinkData;
}
