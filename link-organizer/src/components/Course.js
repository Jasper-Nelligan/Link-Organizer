import "./Course.css";
import React from 'react';
import { getColorCode } from "../HelperFunctions";

/**
 * 
 * @param {Array} elements an array for the br elements to be pushed to
 * @param {Int} numBrTags number of br tags to add to elements 
 */
function addBrTags(elements, numBrTags) {
    for (let i = 0; i < numBrTags; i++) {
        elements.push(React.createElement('br'));
    }
}

function Course(props) {
    // remove whitespace in course and use it for it's id
    const courseId = props.course.replace(/\s/g, '');
    const frameId = `${courseId}-frame`;

    let elements = [];
    const brTag = React.createElement("br");

    const title = React.createElement(
        'p',
        { className:'course-title' },
        props.course
    );
    elements.push(title);

    let firstLink = true;
    let links = [];
    for (let i = 0; i < props.linkPairs.length; i++) {
        if (firstLink) {
            firstLink = false;
        }
        else {
            addBrTags(links, 2);
        }

        const link = React.createElement(
            'a',
            { href: props.linkPairs[i][1], target: '_blank'},
            props.linkPairs[i][0]);
        links.push(link);
    }
    
    // Add space between last link and edit button
    addBrTags(links, 3);

    const linksContainer = React.createElement(
        'div',
        { className: 'links' },
        links
    );
    elements.push(linksContainer);

    const editBtn = React.createElement(
        'button',
        { type: "button", class: "edit-btn", id: "edit-" + courseId,
        "data-modal": courseId + "-modal", onClick: () => {props.onEdit()}},
        "Edit"
    )

    // // editBtn.addEventListener('click', function () {
    // //     const modal = editBtn.getAttribute('data-modal');
    // //     document.getElementById(modal)
    // //         .style.display = 'block';
    // // });
    elements.push(editBtn);

    const colorCode = getColorCode(props.color);
    const courseFrame = React.createElement(
        'div',
        { className:'frame', id: frameId, style: { backgroundColor: colorCode}},
        elements
    );

    return courseFrame;
}

export default Course;