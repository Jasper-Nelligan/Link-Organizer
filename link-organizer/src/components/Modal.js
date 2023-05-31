import { useState, useRef } from "react";
import "./Modal.css";
import LinkField from "./LinkField";
import { parseForm, validateForm, getColorHex, clearForm} from "../HelperFunctions";
import { Messages, FormConstants, Color } from "../Constants.js";

// TODO rename to main form/modal
// TODO add prop types documentation to all classes
function Modal({ linkPairs, initColor, showCourse, course, courses, onClose, onAddOrUpdateCourse}) {
    let initialLinkId = 0;
    console.log(linkPairs)
    const initialLinkData = [
        [initialLinkId++, true, linkPairs[0][0], linkPairs[0][1]],
        [initialLinkId++, false, linkPairs[1][0], linkPairs[1][1]],
        [initialLinkId++, false, linkPairs[2][0], linkPairs[2][1]],
        [initialLinkId++, false, linkPairs[3][0], linkPairs[3][1]]
    ]
    
    const [errorMsg, updateErrorMsg] = useState(null);
    const [linkData, setLinkData] = useState(initialLinkData);
    const [linkId, setLinkId] = useState(initialLinkId);
    const [color, setColor] = useState(initColor);
    const formRef = useRef(null);
    
    const onColorChanged = (color) => {
        setColor(color);
    }

    const addLink = (isFirstLink, linkName, linkURL) => {
        setLinkData(linkData.concat([[linkId, isFirstLink, linkName, linkURL]]));
        setLinkId(linkId + 1);
    }

    const removeLink = (id) => {
        const newLinkData = linkData.filter(item => item[0] !== id);
        setLinkData(newLinkData)
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

    const onAddOrUpdateCourseClicked = () => {
        const [course, color, linkPairs] = parseForm(formRef.current);
        const errorMsg = validateForm(course, course, linkPairs, courses);
        updateErrorMsg(errorMsg);
        if (errorMsg == null) {
            onAddOrUpdateCourse(course, color, linkPairs);
            onCloseBtnClicked(formRef.current, course, setColor, setLinkData); 
        }
    }

    const onCloseBtnClicked = () => {
        if (course == '') {
            setColor(Color.RED)
            clearForm(formRef.current);
            setLinkData(FormConstants.EMPTY_LINK_PAIRS)
        }
        onClose();
    }

    const modalDisplay = showCourse == course ? 'block' : 'none';
    const errorMsgDisplay = errorMsg == null ? 'inline' : 'none';
    const saveCourseMsg = course == '' ? Messages.CREATE_COURSE : Messages.SAVE_CHANGES;

    return (
        <div className="modal" id="modal" style={{ display: modalDisplay }}>
            <div className="modal-content">
                <div className="form" ref={formRef} style={{ background: getColorHex(color) }}>
                    <input className="course-input" type="text" name="course"
                        placeholder="Course" defaultValue={course}/>

                    <a className="close-button"
                        onClick={() =>
                            onCloseBtnClicked(onClose, formRef.current, course, setColor, setLinkData)}
                        >&times;</a>

                    <label htmlFor="colors">{Messages.SELECT_COLOR}</label>
                    <select id="color-selector"
                            name="colors"
                            value={color}
                            onChange={(e) => onColorChanged(e.target.value)}>
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
                            addLink(false, '', '')}>
                        {Messages.ADD_LINK}
                    </button>

                    <p className="form-error-msg" display={errorMsgDisplay}>{errorMsg}</p>  

                    <div className="form-bottom">
                        <button type="submit" className="submit-btn"
                            id="submit-course"
                            onClick={() =>
                                onAddOrUpdateCourseClicked(
                                    onClose,
                                    onAddOrUpdateCourse,
                                    formRef.current,
                                    courses,
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

export default Modal;