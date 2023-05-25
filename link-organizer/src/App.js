import { useState, useRef } from "react";
import Modal from './Modal';
import Course from './Course';

function App() {
    const [showModal, setShowModal] = useState(false);
    // An object for storing course data. Each entry is an array of size two,
    // with the course name as it's key. The first element in each array is the
    // course color, and the second entry is the link pairs 
    const [courses, setCourses] = useState({});
    const courseGridRef = useRef(null);

    const updateCourses = (course, color, linkPairs) => {
        setCourses({...courses, [course]: [color, linkPairs]});
    }

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
                onAddCourse={(course, color, linkPairs) =>
                    updateCourses(course, color, linkPairs)}
                show={showModal}
                courseGrid={courseGridRef.current}/>

            <div id="course-grid" ref={courseGridRef}>
                {
                    Object.entries(courses).map(course => 
                        <Course course = {course[0]} color={course[1][0]} linkPairs={course[1][1]} />
                    )
                }
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