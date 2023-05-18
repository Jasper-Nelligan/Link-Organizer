import Course from "./Course";

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
            console.log(`${color} is not a valid color`);
    }
}

/**
 * Creates a new course frame and associated modal and inserts into course grid
 * @param {courseGridRef} courseGridRef reference to grid to place course in
 * @param {String} course What the user input in the 'course' field
 * @param {String} color Color that the user chose
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 */
export function addCourse(courseGridRef, course, color, linkPairs) {
    courseGridRef.current.appendChild(Course(course, color, linkPairs));
}

/**
 * Given a course form, returns all input values in the form as an array
 * @param {form} form reference to the form that needs to be parsed
 * @return {Array} an array with structure [course, color, linkPairs], where
 * linkPairs is an array of size two, with the first element being the link name
 * and the second element being the hyperlink. Each link pair is stored as a
 * subarray.
 */
export function parseForm(formRef) {
    let i = 0;
    const inputElements = formRef.current.querySelectorAll('input, select');
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