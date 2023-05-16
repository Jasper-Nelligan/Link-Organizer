import React from 'react';
import Modal from './Modal';

class App extends React.Component {
    state = {
        show: false
      };

    showModal = e => {
        this.setState({
            show: true
        });
    };

    closeModal = e => {
        this.setState({
            show: false
        })
    }

    render () {
        return (
            <>
            <h1 className="center">Course Link Organizer</h1>
            <h3 className="center">All your class links - One page</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal" onClick={e => {
                    this.showModal();
                    }}>Add course</button>
            </div>

            <Modal onClose={this.closeModal} show={this.state.show}/>

            <p id="footer">
                Questions, issues, or suggestions? Open an issue on 
                <a href="https://github.com/Jasper-Nelligan/Link-Organizer" target="_blank"> github </a>
                or email me at jnelligan@protonmail.com</p>
            </>
        )
    }
}

export default App;