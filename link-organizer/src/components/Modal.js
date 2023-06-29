import { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import LinkField from "./LinkField";
import { parseForm, validateForm, getColorHex, clearForm} from "../HelperFunctions";
import { Messages, FormConstants, Color } from "../Constants.js";

function Modal({ linkPairs, initColor, showCourse, course,
        courses, onClose, onAddOrUpdateCourse, onDeleteCourse}) {
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
    const [colorCount, setColorCount] = useState({
        [Color.RED]: 0,
        [Color.GREEN]: 0,
        [Color.BLUE]: 0,
        [Color.YELLOW]: 0,
        [Color.ORANGE]: 0,
        [Color.PURPLE]: 0,
    })
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

    const onAddOrUpdateCourseClicked = () => {
        const [formCourse, formColor, formLinkPairs] = parseForm(formRef.current);
        const newErrorMessage = validateForm(formCourse, course, formLinkPairs, courses);
        updateErrorMsg(newErrorMessage);
        setColorCount((prevColorCount) => {
            const updatedColorCount = { ...prevColorCount };
            updatedColorCount[color] = (updatedColorCount[color]) + 1;
            return updatedColorCount;
        });
        console.log(colorCount);
        console.log(getLeastUsedColor())
        if (newErrorMessage == null) {
            onAddOrUpdateCourse(course, formCourse, formColor, formLinkPairs);
            onCloseBtnClicked(formRef.current, formCourse, setColor, setLinkData); 
        }
    }

    const onCloseBtnClicked = () => {
        if (course === '') {
            updateErrorMsg(null)
            setColor(getLeastUsedColor())
            clearForm(formRef.current);
            setLinkData(FormConstants.EMPTY_LINK_PAIRS)
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

    const getLeastUsedColor = () => {
        let leastUsedColor = null;
        let leastCount = Infinity;
      
        for (const [color, count] of Object.entries(colorCount)) {
          if (count < leastCount) {
            leastUsedColor = color;
            leastCount = count;
          }
        }
      
        return leastUsedColor;
    };

    const modalDisplay = showCourse === course ? 'block' : 'none';
    const errorMsgDisplay = errorMsg !== null ? 'inline' : 'none';
    const deleteCourseDisplay = course !== '' ? 'inline' : 'none';
    const saveCourseMsg = course === '' ? Messages.CREATE_COURSE : Messages.SAVE_CHANGES;

    return (
        <div className="modal" id="modal" style={{ display: modalDisplay }}>
            <div className="modal-content">
                <div className="form" ref={formRef} style={{ background: getColorHex(color) }}>
                    <input className="course-input" type="text" name="course"
                        placeholder={Messages.COURSE} defaultValue={course}/>

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

                    <p className="form-error-msg" style={{ display: errorMsgDisplay }}>{errorMsg}</p>

                    <div className="form-bottom">
                        <button className="delete-course-btn"
                            style={{ display: deleteCourseDisplay }}
                            onClick={() =>
                                onDeleteCourse(course)}>
                            Delete Course
                        </button>
                        <button
                            className={`submit-course-btn ${course === '' ? 'full-width' : ''}`}
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

Modal.propTypes = {
    linkPairs: PropTypes.arrayOf(PropTypes.array),
    initColor: PropTypes.string,
    showCourse: PropTypes.string,
    course: PropTypes.string,
    courses: PropTypes.arrayOf(PropTypes.object),
    onClose: PropTypes.func,
    onAddOrUpdateCourse: PropTypes.func,
    onDeleteCourse: PropTypes.func
}

export default Modal;