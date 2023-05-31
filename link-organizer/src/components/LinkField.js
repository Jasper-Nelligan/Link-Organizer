import "./LinkField.css";

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
            <button onClick={() => removeLink(props.linkId)}
                type="button" className="remove-link-btn">
                Remove
            </button>
        </div>
    )
}

export default LinkField;