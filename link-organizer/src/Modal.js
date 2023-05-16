import React from "react";
import "./Modal.css"

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
                    <h2>Modal Window</h2>
                    <div class="actions">
                        <button class="toggle-button" onClick={this.onClose}>
                            <a class="close">&times;</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}