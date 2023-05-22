/**
 * 
 * @param {Int} props.linkCount total number of links used in Application. Used for ID
 * @param {Bool} props.isFirstLink true if first link on the form
 * @param {String} props.linkName string with the links name. Can be empty
 * @param {String} props.linkURL string with the links URL. Can be empty
 * @returns Link name field and link url field
 */
function LinkField(props) {
    let linkID = "link" + props.linkCount;
    if (props.isFirstLink) {
        return (
            <div className="form-links" id={linkID}>
                <input className="link-name" type="text" name="link-name" 
                    placeholder="Title" value={props.linkName}/>
                <input className="link-input" type="text" name="link"
                    placeholder="Link" value={props.linkURL}/>
            </div>
        )
    }
    else return (
        <div className="form-links" id={linkID}>
            <input className="link-name" type="text" name="link-name" 
                placeholder="Title" value={props.linkName}/>
            <input className="link-input" type="text" name="link"
                placeholder="Link" value={props.linkURL}/>
            <button type="button" className="remove-link-btn">Remove</button>
        </div>
    )
}

export default LinkField;