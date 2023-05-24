import { useState, useRef } from "react";
import "./Modal.css";
import LinkField from "./LinkField";
import Course from "./Course";
import { parseForm, clearForm } from "./HelperFunctions";

/**
 * Creates a new course frame and inserts into course grid
 * @param {HTML} courseGrid grid to place course in
 * @param {String} course What the user input in the 'course' field
 * @param {String} color Color that the user chose
 * @param {Array} linkPairs an array of link pairs. Each link pair is a
 * sub-array of size two, with the first element being the link name and
 * the second element the link.
 */
function addCourse(courseGrid, course, color, linkPairs) {
    courseGrid.appendChild(Course(course, color, linkPairs));
    // TODO add Modal here as well
}

/**
 * Parses form data and creates new course
 * @param {Function} onClose a function to close the modal
 * @param {HTML} form with all the course info
 * @param {Grid} courseGrid grid to place course in
 */
function onAddCourseClicked(onClose, form, courseGrid) {
   const [course, color, linkPairs] = parseForm(form);
   addCourse(courseGrid, course, color, linkPairs);
   onCloseBtnClicked(onClose, form);
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
 * @param {Function} onClose a function for closing the modal
 * @param {HTML} courseGrid div for storing courses
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
                                onAddCourseClicked(
                                    props.onClose,
                                    formRef.current, 
                                    props.courseGrid)}>
                            Create course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;