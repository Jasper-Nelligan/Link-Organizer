import { useState, useRef } from "react";
import "./Modal.css";
import LinkField from "./LinkField.js"


/**
 * Handles click event for the add course button
 * @param {addCourse} addCourse a function to create a new course given
 *      the course info
 * @param {form} form reference to the form with all the course info
 * @param {courseGridRef} courseGridRef reference to grid to place course in
 */
function onAddCourseClicked(addCourse, formRef, courseGridRef) {
   const [course, color, linkPairs] = parseForm(formRef);
   addCourse(courseGridRef, course, color, linkPairs);
}

/**
 * Given a form, returns all input values in the form
 * @param {form} form reference to the form that needs to be parsed
 * @return {Array} an array with structure [course, color, linkPairs], where
 * linkPairs is an array of size two, with the first element being the link name
 * and the second element being the hyperlink. Each link pair is stored as a
 * subarray.
 */
function parseForm(formRef) {
    let i = 0;
    /* Apparently using querySelectorAll is bad practice, but for right now I
    can't figure out a better way to do this. Could also use destructuring here
    instead of accessing the array directly*/
    const inputElements = formRef.current.querySelectorAll('input, select');
    const course = inputElements[i++].value;
    const color = inputElements[i++].value;
  
    // parse links
    const linkPairs = [];
    while (inputElements[i] != null) {
      const pair = [inputElements[i++].value, inputElements[i++].value];
      linkPairs.push(pair);
    }

    return ([course, color, linkPairs]);
}

function Modal(props) {
    const [linkCount, updateLinkCount] = useState(0);
    const formRef = useRef(null);

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal" id="modal">
            <div className="modal-content">
                <div className="form" ref={formRef}>
                    <input className="course-input" type="text" name="course"
                        placeholder="Course" />

                    <a className="close-button"
                        onClick={() => props.onClose()}>&times;</a>

                    <label htmlFor="colors">Color : </label>
                    <select id="color-selector" name="colors">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                    </select>

                    <LinkField isFirstLink={true} />
                    <LinkField isFirstLink={false} />
                    <LinkField isFirstLink={false} />
                    <LinkField isFirstLink={false} />

                    <button className="add-new-link"
                        onClick={() => updateLinkCount(linkCount + 1)}>
                        Add link
                    </button>

                    <div className="form-bottom">
                        <button type="submit" className="submit-btn"
                            id="submit-course"
                            onClick={() =>
                                onAddCourseClicked(props.addCourse, formRef, props.courseGridRef)}>
                            Create course
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal;