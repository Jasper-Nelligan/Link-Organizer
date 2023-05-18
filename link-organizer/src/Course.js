import "./Course.css";
import { getColorCode } from "./HelperFunctions";

/**
 * Creates a new course frame to be inserted into grid. Each frame contains
 * the links that the user created.
 * @param {String} course What the user input in the "course" field
 * @param {String} color color that the user selected
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 *
 * @return {div} a div with className="frame" and id=courseId that contains
 * all HTML for a new course frame.
 */
function Course(course, color, linkPairs) {
    // remove whitespace in course and use it for it's id
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
        <button type="button" className="edit-btn" id="edit-${courseId}"
        data-modal="${courseId}-modal">Edit</button>
    `);

    // const editBtn = frame.querySelector('.edit-btn');
    // editBtn.addEventListener('click', function () {
    //     const modal = editBtn.getAttribute('data-modal');
    //     document.getElementById(modal)
    //         .style.display = 'block';
    // });

    frame.style.backgroundColor = getColorCode(color);
    return frame;
}

export default Course;