import { useState, useRef } from "react";
import Modal from './Modal';

function App() {
    const [showModal, setShowModal] = useState(false);
    const courseGridRef = useRef(null);

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

            <Modal onClose={() => setShowModal(false)}
                show={showModal}
                courseGrid={courseGridRef.current}/>

            <div id="course-grid" ref={courseGridRef}>
            </div>

            <p id="footer">
                Questions, issues, or suggestions? Open an issue on
                <a href="https://github.com/Jasper-Nelligan/Link-Organizer"
                    target="_blank"> github </a>
                or email me at jnelligan@protonmail.com</p>
        </>
    )
}

export default App;