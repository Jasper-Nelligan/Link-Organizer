import "./LinkField.css";
import { Messages } from "../Constants.js";

function LinkField({ isFirstLink, linkName, linkURL, removeLink, linkId }) {
    if (isFirstLink) {
        return (
            <div className="form-links">
                <input className="link-name" type="text"
                    placeholder="Title" defaultValue={linkName}/>
                <input className="link-input" type="text" name="link"
                    placeholder="Link" defaultValue={linkURL}/>
            </div>
        )
    }
    else return (
        <div className="form-links">
            <input className="link-name" type="text" 
                placeholder="Title" defaultValue={linkName}/>
            <input className="link-input" type="text" name="link"
                placeholder="Link" defaultValue={linkURL}/>
            <button onClick={() => removeLink(linkId)}
                type="button" className="remove-link-btn">
                {Messages.REMOVE_LINK}
            </button>
        </div>
    )
}

export default LinkField;