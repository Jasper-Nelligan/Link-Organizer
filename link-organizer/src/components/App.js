import { useState, useEffect } from "react";
import Modal from './Modal';
import Course from './Course';
import './App.css';
import { Constants, Messages, Color } from "../Constants";
import { validateForm, getLeastUsedColor } from "../HelperFunctions";

function App() {
    const [colorCount, setColorCount] = useState({
        [Color.RED]: 0,
        [Color.GREEN]: 0,
        [Color.BLUE]: 0,
        [Color.YELLOW]: 0,
        [Color.ORANGE]: 0,
        [Color.PURPLE]: 0,
    })
    const [showModal, setShowModal] = useState(null);
    const [courses, setCourses] = useState({});
    const [modals, setModals] =
        useState({
            [Constants.EMPTY_COURSE_NAME]:
                [getLeastUsedColor(colorCount), Constants.EMPTY_LINK_PAIRS]
        })

    // Update color of main modal
    useEffect(() => {
        const updatedModals = { ...modals, [Constants.EMPTY_COURSE_NAME]:
                [getLeastUsedColor(colorCount), Constants.EMPTY_LINK_PAIRS] };
        setModals(updatedModals);
    }, [colorCount])

    // Retrieve the courses data from localStorage. Runs only once per session
    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem('courses'));

        for (const course in storedCourses) {
            const courseColor = storedCourses[course][0];
            setColorCount((prevColorCount) => {
                const updatedColorCount = { ...prevColorCount };
                updatedColorCount[courseColor] = updatedColorCount[courseColor] + 1;
                return updatedColorCount;
            });
        }

        if (storedCourses) {
            setCourses(storedCourses);
            setModals(Object.assign(modals, storedCourses));
        } else {
            console.log("Error: course data from localStorage could not be fetched")
        }
    }, []);

    const addOrUpdateCourse = (initCourseName, initColor, course, color, linkPairs) => {
        setColorCount((prevColorCount) => {
            const updatedColorCount = { ...prevColorCount };
            updatedColorCount[color] = updatedColorCount[color] + 1;
            return updatedColorCount;
        });

        let updatedCourses;
        let updatedModals;
        if (initCourseName === Constants.EMPTY_COURSE_NAME) {
            updatedCourses = { ...courses, [course]: [color, linkPairs] };
            updatedModals = { ...modals, [course]: [color, linkPairs] };
        } else {
            const { [initCourseName]: unused1, ...tempUpdatedCourses } = courses;
            const { [initCourseName]: unused2, ...tempUpdatedModals } = modals;
            updatedCourses = { ...tempUpdatedCourses, [course]: [color, linkPairs] };
            updatedModals = { ...tempUpdatedModals, [course]: [color, linkPairs] };
            setColorCount((prevColorCount) => {
                const updatedColorCount = { ...prevColorCount };
                updatedColorCount[initColor] = updatedColorCount[initColor] - 1;
                return updatedColorCount;
            });
        }
        console.log(colorCount)
        setCourses(updatedCourses);
        setModals(updatedModals);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
    }

    const deleteCourse = (course, color) => {
        setColorCount((prevColorCount) => {
            const updatedColorCount = { ...prevColorCount };
            updatedColorCount[color] = updatedColorCount[color] - 1;
            return updatedColorCount;
        });

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
                onAddOrUpdateCourse={(initCourseName, initColor, course, color, linkPairs) =>
                    addOrUpdateCourse(initCourseName, initColor, course, color, linkPairs)}
                showCourse={showModal}
                onDeleteCourse={(course, color) =>
                    deleteCourse(course, color)}
                onValidateForm={(formCourse, course, formLinkPairs) =>
                    validateForm(formCourse, course, formLinkPairs, courses)}
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
        <div className="app-container">
            <h1 className="center">{Messages.PAGE_TITLE}</h1>
            <h3 className="center">{Messages.PAGE_TITLE_PHRASE}</h3>
            <div className="btn-container">
                <button id="add-course-btn" data-modal="new-course-modal"
                    onClick={() => setShowModal(Constants.EMPTY_COURSE_NAME)}>
                    {Messages.ADD_COURSE}
                </button>
            </div>

            {renderModals()}
            <div id="course-grid">{renderCourses()}</div>

            <p id="footer">
                {Messages.FOOTER_QUESTIONS}
                <a href={Messages.FOOTER_GITHUB_LINK}
                    target="_blank"> {Messages.FOOTER_GITHUB} </a>
            </p>
        </div>
    )
}

export default App;