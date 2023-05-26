import { useState, useRef } from "react";
import "./Modal.css";
import LinkField from "./LinkField";
import { parseForm, clearForm, validateForm } from "./HelperFunctions";

/**
 * Parses form data and creates a new course
 * @param {Function} onClose a function to close the modal
 * @param {Function} onAddOrUpdateCourse a function to add or update a course
 * @param {HTML} form with all the course info
 * @param {Grid} courses all course data
 * @param {Function} updateErrorMsg a function for updating errorMsg state when validating form
 */
function onAddOrUpdateCourseClicked(onClose, onAddOrUpdateCourse, form,
        courses, updateErrorMsg) {
    const [course, color, linkPairs] = parseForm(form);
    const errorMsg = validateForm(course, linkPairs, form, courses);
    updateErrorMsg(errorMsg);
    if (errorMsg == null) {
        onAddOrUpdateCourse(course, color, linkPairs);
        onCloseBtnClicked(onClose, form); 
    }
}

/**
 * Clears the form and closes the modal
 * @param {Function} onClose a function to close the modal
 * @param {HTML} form with all the course info
 */
function onCloseBtnClicked(onClose, form) {
    clearForm(form);
    onClose();
}

/**
 * Creates a Modal with passed in values for the course form 
 * @param {Bool} props.show true if modal should be shown immediately
 * @param {Function} props.onClose a function for closing the modal
 * @param {Function} props.onAddOrUpdateCourse a function for adding or updating a course
 * @returns 
 */
function Modal(props) {
    const [errorMsg, updateErrorMsg] = useState(null);
    // TODO add initial four links here
    const [linkPairs, updateLinkPairs] = useState(
        [[true, 'linkName','linkURL'], [false, 'linkName','linkURL'],
        [false, 'linkName','linkURL'], [false, 'linkName','linkURL']]);
    const formRef = useRef(null);

    const modalDisplay = props.show ? 'block' : 'none';
    const errorMsgDisplay = errorMsg == null ? 'inline' : 'none';

    return (
        <div className="modal" id="modal" style={{ display: modalDisplay }}>
            <div className="modal-content">
                <div className="form" ref={formRef}>
                    <input className="course-input" type="text" name="course"
                        placeholder="Course" />

                    <a className="close-button"
                        onClick={() =>
                        onCloseBtnClicked(props.onClose, formRef.current)}
                        >&times;</a>

                    <label htmlFor="colors">Color : </label>
                    <select id="color-selector" name="colors">
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                    </select>

                    {
                        linkPairs.map((linkPair) =>
                            <LinkField isFirstLink={linkPair[0]} 
                                linkName={linkPair[1]} linkURL={linkPair[2]}/>
                        )
                    }

                    <button className="add-new-link">
                        Add link
                    </button>

                    <p className="form-error-msg" display={errorMsgDisplay}>{errorMsg}</p>  

                    <div className="form-bottom">
                        <button type="submit" className="submit-btn"
                            id="submit-course"
                            onClick={() =>
                                onAddOrUpdateCourseClicked(
                                    props.onClose,
                                    props.onAddOrUpdateCourse,
                                    formRef.current,
                                    props.courses,
                                    updateErrorMsg)}>
                            Create course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;