import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import LinkField from "./LinkField";
import { parseForm, getColorHex, clearForm} from "../HelperFunctions";
import { Messages, Constants } from "../Constants.js";

function Modal({ linkPairs, initColor, showCourse, course,
        onClose, onAddOrUpdateCourse, onDeleteCourse, onValidateForm}) {
    const initialLinkData = [];
    let firstLink = true;
    let id = 0;
    for (id; id < linkPairs.length; id++) {
        initialLinkData.push([id, firstLink, linkPairs[id][0], linkPairs[id][1]])
        if (firstLink) {
            firstLink = false;
        }
    }

    const [errorMsg, updateErrorMsg] = useState(null);
    const [linkData, setLinkData] = useState(initialLinkData);
    const [linkId, setLinkId] = useState(id);
    const [color, setColor] = useState(null);
    const formRef = useRef(null);
    useEffect(() => {
        setColor(initColor)
    }, [initColor])

    const addLink = (isFirstLink, linkName, linkURL) => {
        setLinkData(linkData.concat([[linkId, isFirstLink, linkName, linkURL]]));
        setLinkId(linkId + 1);
    }

    const removeLink = (id) => {
        const newLinkData = linkData.filter(item => item[0] !== id);
        setLinkData(newLinkData)
    }

    const onAddOrUpdateCourseClicked = () => {
        const [formCourse, formColor, formLinkPairs] = parseForm(formRef.current);
        const newErrorMessage = onValidateForm(formCourse, course, formLinkPairs);
        updateErrorMsg(newErrorMessage);
        if (newErrorMessage == null) {
            onAddOrUpdateCourse(course, formCourse, formColor, formLinkPairs);
            onCloseBtnClicked(formRef.current, formCourse, setColor, setLinkData); 
        }
    }

    const onCloseBtnClicked = () => {
        if (course === Constants.EMPTY_COURSE_NAME) {
            updateErrorMsg(null)
            //setColor(initColor)
            clearForm(formRef.current);
            setLinkData(Constants.DEFAULT_LINK_PAIRS)
        }
        onClose();
    }

    const renderLinks = () => {
        return linkData.map(
            ([linkId, isFirstLink, linkName, linkURL]) =>
                // React needs the key property in order to
                // properly remove a link when re-rendering
                <LinkField
                    key={linkId}
                    linkId={linkId}
                    removeLink={removeLink}
                    isFirstLink={isFirstLink} 
                    linkName={linkName}
                    linkURL={linkURL}/>
        )
    }

    // TODO use EMPTY_COURSE instead of ModalConstants.EMPTY_COURSE_NAME
    const modalDisplay = showCourse === course ? 'block' : 'none';
    const errorMsgDisplay = errorMsg !== null ? 'inline' : 'none';
    const deleteCourseDisplay = course !== Constants.EMPTY_COURSE_NAME ? 'inline' : 'none';
    const saveCourseMsg = course === Constants.EMPTY_COURSE_NAME ? Messages.CREATE_COURSE : Messages.SAVE_CHANGES;

    return (
        <div className="modal" id="modal" style={{ display: modalDisplay }}>
            <div className="modal-content">
                <div className="form" ref={formRef} style={{ background: getColorHex(color) }}>
                    <input className="course-input" type="text" name="course"
                        placeholder={Messages.COURSE} defaultValue={course}/>

                    <a className="close-button" aria-label="Close"
                        onClick={() =>
                            onCloseBtnClicked()}
                        >&times;</a>

                    <label htmlFor="colors">{Messages.SELECT_COLOR}</label>
                    <select id="color-selector"
                            name="colors"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                    </select>

                    {renderLinks()}

                    <button className="add-new-link"
                        onClick={() =>
                            addLink(false, Constants.EMPTY_COURSE_NAME, Constants.EMPTY_COURSE_NAME)}>
                        {Messages.ADD_LINK}
                    </button>

                    <p className="form-error-msg" style={{ display: errorMsgDisplay }}>{errorMsg}</p>

                    <div className="form-bottom">
                        <button className="delete-course-btn"
                            style={{ display: deleteCourseDisplay }}
                            onClick={() =>
                                onDeleteCourse(course, color)}>
                            {Messages.DELETE_COURSE}
                        </button>
                        <button
                            className={`submit-course-btn ${course === Constants.EMPTY_COURSE_NAME ? 'full-width' : Constants.EMPTY_COURSE_NAME}`}
                            onClick={() =>
                                onAddOrUpdateCourseClicked(
                                    onClose,
                                    onAddOrUpdateCourse,
                                    formRef.current,
                                    updateErrorMsg,
                                    course, setColor, setLinkData)}>
                            {saveCourseMsg}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    linkPairs: PropTypes.arrayOf(PropTypes.array),
    initColor: PropTypes.string,
    showCourse: PropTypes.string,
    course: PropTypes.string,
    onClose: PropTypes.func,
    onAddOrUpdateCourse: PropTypes.func,
    onDeleteCourse: PropTypes.func,
    onValidateForm: PropTypes.func
}

export default Modal;