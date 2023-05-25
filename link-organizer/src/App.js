import { useState, useRef } from "react";
import Modal from './Modal';
import Course from './Course';

function App() {
    const [showModal, setShowModal] = useState(false);
    const [courses, setCourses] = useState([]);
    const courseGridRef = useRef(null);

    const updateCourses = (course, color, linkPairs) => {
        setCourses(courses.concat([
            {"course": course,"color": color,"linkPairs": linkPairs}
        ]))
    }

    console.log("Courses was: ", courses);

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
                    courses.map((course) => (
                        <Course course = {course.course} color={course.color} linkPairs={course.linkPairs} />
                    ))
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