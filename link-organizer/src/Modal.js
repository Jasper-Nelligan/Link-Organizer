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
 */
function onAddOrUpdateCourseClicked(onClose, onAddOrUpdateCourse, form, courses) {
    const [course, color, linkPairs] = parseForm(form);
    const errorMsg = validateForm(course, linkPairs, form, courses);
    if (errorMsg != null) {
        console.log(errorMsg);
    } else {
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
    const [linkCount, updateLinkCount] = useState(0);
    const formRef = useRef(null);
    
    const modalDisplay = props.show ? 'block' : 'none';

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

                    {/* TODO change linkCount*/}
                    <LinkField isFirstLink={true} linkCount={0}
                        linkName={"testName"} linkURL={"testURL"}/>
                    <LinkField isFirstLink={false} linkCount={0} 
                        linkName={"testName"} linkURL={"testURL"}/>
                    <LinkField isFirstLink={false} linkCount={0} 
                        linkName={"testName"} linkURL={"testURL"}/>
                    <LinkField isFirstLink={false} linkCount={0} 
                        linkName={"testName"} linkURL={"testURL"}/>

                    <button className="add-new-link"
                        onClick={() => updateLinkCount(linkCount + 1)}>
                        Add link
                    </button>

                    <div className="form-bottom">
                        <button type="submit" className="submit-btn"
                            id="submit-course"
                            onClick={() =>
                                onAddOrUpdateCourseClicked(
                                    props.onClose,
                                    props.onAddOrUpdateCourse,
                                    formRef.current,
                                    props.courses)}>
                            Create course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;