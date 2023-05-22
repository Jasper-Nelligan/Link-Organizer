/**
 * 
 * @param {Int} props.linkCount total number of links used in Application. Used for ID
 * @param {Bool} props.isFirstLink true if first link on the form
 * @returns Link name field and link url field
 */
function LinkField(props) {
    let linkID = "link" + props.linkCount;
    if (props.isFirstLink) {
        return (
            <div className="form-links" id={linkID}>
                <input className="link-name" type="text" name="link-name" placeholder="Title" />
                <input className="link-input" type="text" name="link" placeholder="Link" />
            </div>
        )
    }
    else return (
        <div className="form-links" id={linkID}>
            <input className="link-name" type="text" name="link-name" placeholder="Title" />
            <input className="link-input" type="text" name="link" placeholder="Link" />
            <button type="button" className="remove-link-btn">Remove</button>
        </div>
    )
}

export default LinkField;