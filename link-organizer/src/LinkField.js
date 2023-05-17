import React from "react";

export default class LinkField extends React.Component {
    render() {
        console.log("Props is: ", this.props);
        if (this.props.isFirstLink) {
            console.log("isFirstLink")
            return(
                <div className="form-links" id="link1">
                    <input className="link-name" type="text" name="link-name" placeholder="Title"/>
                    <input className="link-input" type="text" name="link" placeholder="Link"/>
                </div>
            )
        }
        else return(
                <div className="form-links" id="link1">
                    <input className="link-name" type="text" name="link-name" placeholder="Title"/>
                    <input className="link-input" type="text" name="link" placeholder="Link"/>
                    <button type="button" className="remove-link-btn">Remove</button>
                </div>
            )
    }
}