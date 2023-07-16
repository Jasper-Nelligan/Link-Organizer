import PropTypes from "prop-types";
import React from 'react';
import { getColorHex, addBrTags } from "../HelperFunctions";
import { Messages } from "../Constants";
import "./Course.css";

function Course({course, color, linkPairs, onEdit}) {
    // remove whitespace in course and use for id
    const frameId = `${course}-frame`;

    let elements = [];

    const title = React.createElement(
        'p',
        { className:'course-title' },
        course
    );
    elements.push(title);

    let firstLink = true;
    let links = [];
    for (let i = 0; i < linkPairs.length; i++) {
        if (firstLink) {
            firstLink = false;
        }
        else {
            addBrTags(links, 2);
        }

        const link = React.createElement(
            'a',
            { href: linkPairs[i][1], target: '_blank'},
            linkPairs[i][0]);
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
        { type: "button", className: "edit-btn", id: "edit-" + course,
        "data-modal": course + "-modal", onClick: () => {onEdit()}},
        Messages.EDIT
    )
    elements.push(editBtn);

    const colorCode = getColorHex(color);
    const courseFrame = React.createElement(
        'div',
        { className:'frame', id: frameId, "data-testid":"course", style: { backgroundColor: colorCode}},
        elements
    );

    return courseFrame;
}

Course.propTypes = {
    course: PropTypes.string,
    color: PropTypes.string,
    linkPairs: PropTypes.arrayOf(PropTypes.array),
    onEdit: PropTypes.func
}

export default Course;