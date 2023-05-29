import { useState, useRef } from "react";
import Modal from './Modal';
import Course from './Course';

function App() {
    const defaultCourseName = '';
    const defaultColor = 'red';
    const defaultLinkValues = [['',''], ['',''], ['',''], ['','']];
    const [showModal, setShowModal] = useState(null);
    const [courses, setCourses] = useState({});
    const [modals, setModals] = useState({[defaultCourseName]: [defaultColor, defaultLinkValues]})

    const addOrUpdateCourse = (course, color, linkPairs) => {
        setCourses({...courses, [course]: [color, linkPairs]});
        addOrUpdateModal(course, color, linkPairs);
    }

    // TODO possibly remove this method and set directly in addOrUpdateCourse
    const addOrUpdateModal = (course, color, linkPairs) => {
        setModals({...modals, [course]: [color, linkPairs]});
    }

    return (
        <>
            <h1 className="center">Course Link Organizer</h1>
            <h3 className="center">All your class links - One page</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal"
                    onClick={() => setShowModal(defaultCourseName)}>
                    Add course
                </button>
            </div>

            {
                Object.entries(modals).map(modal => 
                    <Modal
                        course={modal[0]}
                        color={modal[1][0]}
                        linkPairs={modal[1][1]}
                        onClose={() => setShowModal(null)}
                        onAddOrUpdateCourse={(course, color, linkPairs) =>
                            addOrUpdateCourse(course, color, linkPairs)}
                        show={showModal}
                        courses={courses}
                        />
                )
            }

            <div id="course-grid">
                {
                    Object.entries(courses).map(course => 
                        <Course
                        course={course[0]}
                        color={course[1][0]}
                        linkPairs={course[1][1]}
                        onEdit={() => setShowModal(course[0])}/>
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