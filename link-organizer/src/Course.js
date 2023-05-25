import "./Course.css";
import React from 'react';
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

    let elements = [];

    const title = React.createElement(
        'p',
        { className:'course-title' },
        props.course
    );
    elements.push(title);

    let firstLink = true;
    let links = [];
    for (let i = 0; i < props.linkPairs.length; i++) {
        // TODO convert this to ?
        if (firstLink) {
            firstLink = false;
        }
        else {
            links.push(React.createElement('br'));
            links.push(React.createElement('br'));
        }

        const link = React.createElement(
            'a',
            { href: props.linkPairs[i][1], target: '_blank'},
            props.linkPairs[i][0]);
        links.push(link);
    }
    
    // Add space between last link and edit button
    links.push(React.createElement('br'));
    links.push(React.createElement('br'));
    links.push(React.createElement('br'));

    const linksContainer = React.createElement(
        'div',
        { className: 'links' },
        links
    );
    elements.push(linksContainer);

    const editBtn = React.createElement(
        'button',
        { type: "button", class: "edit-btn", id: "edit-" + courseId, "data-modal": courseId + "-modal" },
        "Edit"
    )
    elements.push(editBtn);

    const colorCode = getColorCode(props.color);
    const courseFrame = React.createElement(
        'div',
        { className:'frame', id: frameId, style: { backgroundColor: colorCode}},
        elements
    );

    // // const editBtn = frame.querySelector('.edit-btn');
    // // editBtn.addEventListener('click', function () {
    // //     const modal = editBtn.getAttribute('data-modal');
    // //     document.getElementById(modal)
    // //         .style.display = 'block';
    // // });

    return courseFrame;
}

export default Course;