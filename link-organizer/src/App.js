import { useState } from "react";
import Modal from './components/Modal';
import Course from './components/Course';
import './App.css';
import { Messages, ModalConstants } from "./Constants";

function App() {
    // TODO I wonder if I could just directly use the hex colors?
    const [showModal, setShowModal] = useState(null);
    const [courses, setCourses] = useState({});
    const [modals, setModals] =
        useState({
            [ModalConstants.EMPTY_COURSE_NAME]:
                [ModalConstants.DEFAULT_COLOR, ModalConstants.EMPTY_LINK_PAIRS]
        })

    const addOrUpdateCourse = (course, color, linkPairs) => {
        setCourses({...courses, [course]: [color, linkPairs]});
        setModals({...modals, [course]: [color, linkPairs]})
    }

    const renderModals = () => {
        return Object.entries(modals).map(([course, [color, linkPairs]]) => (
            <Modal
            key={course}
            course={course}
            initColor={color}
            linkPairs={linkPairs}
            onClose={() => setShowModal(null)}
            onAddOrUpdateCourse={(course, color, linkPairs) =>
                addOrUpdateCourse(course, color, linkPairs)}
            showCourse={showModal}
            courses={courses}
            />
        ));
    }
    
    const renderCourses = () => {
        return Object.entries(courses).map(([course, [color, linkPairs]]) => (
          <Course
            key={course}
            course={course}
            color={color}
            linkPairs={linkPairs}
            onEdit={() => setShowModal(course)}
          />
        ));
    }

    return (
        <>
            <h1 className="center">{Messages.TITLE}</h1>
            <h3 className="center">{Messages.TITLE_PHRASE}</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal"
                    onClick={() => setShowModal(ModalConstants.EMPTY_COURSE_NAME)}>
                    {Messages.ADD_COURSE}
                </button>
            </div>

            {renderModals()}
            <div id="course-grid">{renderCourses()}</div>

            <p id="footer">
                {Messages.FOOTER_QUESTIONS}
                <a href={Messages.FOOTER_GITHUB_LINK}
                    target="_blank"> {Messages.FOOTER_GITHUB} </a>
                {Messages.FOOTER_EMAIL}</p>
        </>
    )
}

export default App;