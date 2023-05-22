import { useState, useRef } from "react";
import "./Modal.css";
import LinkField from "./LinkField"
import { parseForm, addCourse, clearForm } from "./HelperFunctions"

/**
 * Parses form data and creates new course
 * @param {Function} onClose a function to close the modal
 * @param {Form} form reference to the form with all the course info
 * @param {Grid} courseGridRef reference to grid to place course in
 */
function onAddCourseClicked(onClose, formRef, courseGridRef) {
   const [course, color, linkPairs] = parseForm(formRef);
   addCourse(courseGridRef, course, color, linkPairs);
   onClose();
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
                        onClick={() => clearForm(formRef)}>&times;</a>

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
                                onAddCourseClicked(props.onClose, formRef, props.courseGridRef)}>
                            Create course
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal;