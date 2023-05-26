import { useRef } from "react";
/**
 * 
 * @param {Int} props.linkCount total number of links used in Application. Used for ID
 * @param {Bool} props.isFirstLink true if first link on the form
 * @param {String} props.linkName string with the links name. Can be empty
 * @param {String} props.linkURL string with the links URL. Can be empty
 * @returns Link name field and link url field
 */
function LinkField(props) {
    // TODO refactor this using React.createElement()
    if (props.isFirstLink) {
        return (
            <div className="form-links">
                <input className="link-name" type="text" name="link-name" 
                    placeholder="Title" defaultValue={props.linkName}/>
                <input className="link-input" type="text" name="link"
                    placeholder="Link" defaultValue={props.linkURL}/>
            </div>
        )
    }
    else return (
        <div className="form-links">
            <input className="link-name" type="text" name="link-name" 
                placeholder="Title" defaultValue={props.linkName}/>
            <input className="link-input" type="text" name="link"
                placeholder="Link" defaultValue={props.linkURL}/>
            <button onClick={() => props.removeLink(props.linkId)}
                type="button" className="remove-link-btn">
                Remove
            </button>
        </div>
    )
}

export default LinkField;