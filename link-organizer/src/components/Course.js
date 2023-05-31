import "./Course.css";
import React from 'react';
import { getColorHex, addBrTags } from "../HelperFunctions";

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
    elements.push(editBtn);

    const colorCode = getColorHex(props.color);
    const courseFrame = React.createElement(
        'div',
        { className:'frame', id: frameId, style: { backgroundColor: colorCode}},
        elements
    );

    return courseFrame;
}

export default Course;