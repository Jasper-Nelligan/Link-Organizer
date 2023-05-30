import "./LinkField.css";

function LinkField(props) {
    // TODO refactor this using React.createElement()
    if (props.isFirstLink) {
        return (
            <div className="form-links">
                <input className="link-name" type="text"
                    placeholder="Title" defaultValue={props.linkName}/>
                <input className="link-input" type="text" name="link"
                    placeholder="Link" defaultValue={props.linkURL}/>
            </div>
        )
    }
    else return (
        <div className="form-links">
            <input className="link-name" type="text" 
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