import "./Course.css";
import { getColorCode } from "./HelperFunctions";

/**
 * Creates a new course frame to be inserted into grid.
 * @param {String} props.course User input for the "course" field
 * @param {String} props.color color that the user selected
 * @param {Array} props.linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 *
 * @return {div} a div with className="frame" and id=courseId that contains
 * all HTML for a new course frame.
 */
function Course(props) {
    // remove whitespace in course and use it for it's id
    const courseId = props.course.replace(/\s/g, '');
    const frameId = `${courseId}-frame`;

    const courseFrame = document.createElement('div');
    courseFrame.className = 'frame';
    courseFrame.id = frameId;

    const title = document.createElement('p');
    title.className = 'course-title';
    title.innerHTML = `${props.course}`;
    courseFrame.appendChild(title);

    const links = document.createElement('div');
    links.className = 'links';

    let firstLink = true;
    for (let i = 0; i < props.linkPairs.length; i++) {
        if (firstLink) {
            firstLink = false;
        }
        else {
            links.insertAdjacentHTML('beforeend', '<br><br>');
        }
        const link = document.createElement('a');
        link.href = props.linkPairs[i][1];
        link.target = '_blank';
        link.innerHTML = props.linkPairs[i][0];
        links.appendChild(link);
    }
    // Add space between last link and edit button
    links.insertAdjacentHTML('beforeend', '<br><br><br>');

    courseFrame.appendChild(links);

    courseFrame.insertAdjacentHTML('beforeend', `
        <button type="button" class="edit-btn" id="edit-${courseId}"
        data-modal="${courseId}-modal">Edit</button>
    `);

    // const editBtn = frame.querySelector('.edit-btn');
    // editBtn.addEventListener('click', function () {
    //     const modal = editBtn.getAttribute('data-modal');
    //     document.getElementById(modal)
    //         .style.display = 'block';
    // });

    courseFrame.style.backgroundColor = getColorCode(props.color);
    return courseFrame;
}

export default Course;