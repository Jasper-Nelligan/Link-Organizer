import "./LinkField.css";
import { Messages } from "../Constants.js";
import PropTypes from "prop-types";


function LinkField({ isFirstLink, linkName, linkURL, removeLink, linkId }) {
    if (isFirstLink) {
        return (
            <div className="form-links">
                <input className="link-name" type="text"
                    placeholder={Messages.TITLE} defaultValue={linkName}/>
                <input className="link-input" type="text" name="link"
                    placeholder={Messages.LINK} defaultValue={linkURL}/>
            </div>
        )
    }
    else return (
        <div className="form-links">
            <input className="link-name" type="text" 
                placeholder={Messages.TITLE} defaultValue={linkName}/>
            <input className="link-input" type="text" name="link"
                placeholder={Messages.LINK} defaultValue={linkURL}/>
            <button onClick={() => removeLink(linkId)}
                type="button" className="remove-link-btn">
                {Messages.REMOVE_LINK}
            </button>
        </div>
    )
}

LinkField.propType = {
    isFirstLink: PropTypes.bool,
    linkName: PropTypes.string,
    linkURL: PropTypes.string,
    removeLink: PropTypes.func,
    linkId: PropTypes.number,
}

export default LinkField;