import { useState } from "react";
import "./Modal.css";
import LinkField from "./LinkField.js"

function Modal(props) {
    const [linkCount, updateLinkCount] = useState(0);

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal" id="modal">
            <div className="modal-content">
                <div className="form">
                    <input className="course-input" type="text" name="course" placeholder="Course" />

                    <a className="close-button" onClick={() => props.onClose()}>&times;</a>

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

                    <button className="add-new-link" onClick={() => updateLinkCount(linkCount + 1)}>
                        Add link
                    </button>

                    <div className="form-bottom">
                        <button type="submit" className="submit-btn" id="submit-course">Create course</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal;