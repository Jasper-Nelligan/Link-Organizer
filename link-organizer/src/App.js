import { useState } from "react";
import Modal from './Modal';
import Course from "./Course";

function App() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <h1 className="center">Course Link Organizer</h1>
            <h3 className="center">All your class links - One page</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal"
                    onClick={() => setShowModal(true)}>
                    Add course
                </button>
            </div>

            <Modal onClose={() => setShowModal(false)} show={showModal} />

            <div id="grid-container">
                <Course color = 'red'/>
                <Course color = 'green'/>
                <Course color = 'blue'/>
                <Course color = 'yellow'/>
                <Course color = 'orange'/>
                <Course color = 'purple'/>
            </div>

            <p id="footer">
                Questions, issues, or suggestions? Open an issue on
                <a href="https://github.com/Jasper-Nelligan/Link-Organizer" target="_blank"> github </a>
                or email me at jnelligan@protonmail.com</p>
        </>
    )
}

export default App;