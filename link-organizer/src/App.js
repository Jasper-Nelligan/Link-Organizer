import { useState, useRef } from "react";
import Modal from './Modal';
import Course from "./Course";
import getColorCode from "./HelperFunctions";

/**
 * Creates a new course frame and associated modal and inserts into document
 * @param {courseGridRef} courseGridRef reference to grid to place course in
 * @param {String} course What the user input in the 'course' field
 * @param {String} color Color that the user chose
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 */
function addCourse(courseGridRef, course, color, linkPairs) {
    console.log("Function was called");
    console.log("courseGridRef was: ", courseGridRef)
    console.log("Course was: ", course);
    console.log("Color was: ", color);
    console.log("LinkPairs was: ", linkPairs);

    let htmlcode = Course(course, color, linkPairs);
    console.log("htmlcode was: ", htmlcode);

    courseGridRef.current.appendChild(htmlcode);
}

function App() {
    const [showModal, setShowModal] = useState(false);
    const courseGridRef = useRef(null);

    return (
        <>
            <h1 className="center">Course Link Organizer</h1>
            <h3 className="center">All your class links - One page</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal"
                    onClick={() => setShowModal(true)}>
                    Add course
                </button>
            </div>

            <Modal onClose={() => setShowModal(false)}
                show={showModal}
                addCourse={addCourse}
                courseGridRef={courseGridRef}/>

            <div id="course-grid" ref={courseGridRef}>
            </div>

            <p id="footer">
                Questions, issues, or suggestions? Open an issue on
                <a href="https://github.com/Jasper-Nelligan/Link-Organizer"
                    target="_blank"> github </a>
                or email me at jnelligan@protonmail.com</p>
        </>
    )
}

export default App;