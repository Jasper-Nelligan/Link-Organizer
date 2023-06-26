import { useState, useEffect } from "react";
import Modal from './Modal';
import Course from './Course';
import './App.css';
import { Messages, ModalConstants } from "../Constants";

function App() {
    const [showModal, setShowModal] = useState(null);
    const [courses, setCourses] = useState({});
    const [modals, setModals] =
        useState({
            [ModalConstants.EMPTY_COURSE_NAME]:
                [ModalConstants.DEFAULT_COLOR, ModalConstants.EMPTY_LINK_PAIRS]
        })

    // Retrieve the courses data from localStorage. Runs only once per session
    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem('courses'));

        if (storedCourses) {
            setCourses(storedCourses);
            setModals(Object.assign(modals, storedCourses));
        } else {
            console.log("Error: course data from localStorage could not be fetched")
        }
    }, []);

    const addOrUpdateCourse = (initCourseName, course, color, linkPairs) => {
        // TODO refactor this
        let updatedCourses;
        let updatedModals;
        if (initCourseName === '') {
            updatedCourses = { ...courses, [course]: [color, linkPairs] };
            updatedModals = { ...modals, [course]: [color, linkPairs] };
        } else {
            const { [initCourseName]: unused1, ...tempUpdatedCourses } = courses;
            const { [initCourseName]: unused2, ...tempUpdatedModals } = modals;
            updatedCourses = { ...tempUpdatedCourses, [course]: [color, linkPairs] };
            updatedModals = { ...tempUpdatedModals, [course]: [color, linkPairs] };
        }
        setCourses(updatedCourses);
        setModals(updatedModals);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }

    const deleteCourse = (course) => {
        const { [course]: unused1, ...updatedCourses } = courses;
        const { [course]: unused2, ...updatedModals } = modals;
        setCourses(updatedCourses);
        setModals(updatedModals);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }

    const renderModals = () => {
        return Object.entries(modals).map(([course, [color, linkPairs]]) => (
            <Modal
                key={course}
                course={course}
                initColor={color}
                linkPairs={linkPairs}
                onClose={() => setShowModal(null)}
                onAddOrUpdateCourse={(initCourseName, course, color, linkPairs) =>
                    addOrUpdateCourse(initCourseName, course, color, linkPairs)}
                showCourse={showModal}
                courses={courses}
                onDeleteCourse={(course) =>
                    deleteCourse(course)}
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
        <div className="app-container" data-testid="app-container">
            <h1 className="center">{Messages.PAGE_TITLE}</h1>
            <h3 className="center">{Messages.PAGE_TITLE_PHRASE}</h3>
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
        </div>
    )
}

export default App;