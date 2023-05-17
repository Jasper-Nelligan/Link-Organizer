import React from "react";
import "./Modal.css";
import LinkField from "./LinkField.js"

export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };   

    render() {
        if (!this.props.show){
            return null;
        }

        return (
            <div className="modal" id="modal">
                <div className="modal-content">
                    <div className="form">
                        <input className="course-input" type="text" name="course" placeholder="Course"/>

                        <a className="close-button" onClick={this.onClose}>&times;</a>

                        <label htmlFor="colors">Color : </label> 
                        <select id="color-selector" name="colors">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="yellow">Yellow</option>
                            <option value="orange">Orange</option>
                            <option value="purple">Purple</option>
                        </select>

                        <LinkField isFirstLink={true}/>
                        <LinkField isFirstLink={false}/>
                        <LinkField isFirstLink={false}/>
                        <LinkField isFirstLink={false}/>

                        <button className="add-new-link">Add link</button>

                        <div className="form-bottom">
                            <button type="submit" className="submit-btn" id="submit-course">Create course</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}