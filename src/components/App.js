import { useState, useEffect } from "react";
import Modal from "./Modal";
import Course from "./Course";
import "./App.css";
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
  });
  const [showModal, setShowModal] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modals, setModals] = useState([
    [
      Constants.EMPTY_COURSE_NAME,
      getLeastUsedColor(colorCount),
      Constants.EMPTY_LINK_PAIRS,
    ],
  ]);

  // Update color of main modal to least used color
  useEffect(() => {
    let updatedModals = modals;
    let courseIndex = updatedModals.findIndex(
      (el) => el[0] === Constants.EMPTY_COURSE_NAME
    );
    updatedModals.splice(courseIndex, 1, [
      Constants.EMPTY_COURSE_NAME,
      getLeastUsedColor(colorCount),
      Constants.EMPTY_LINK_PAIRS,
    ]);
    setModals(updatedModals);
  }, [colorCount]); // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve the courses data from localStorage
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));

    if (storedCourses) {
      for (const course in storedCourses) {
        const courseColor = storedCourses[course][1];
        setColorCount((prevColorCount) => {
          const updatedColorCount = { ...prevColorCount };
          updatedColorCount[courseColor] = updatedColorCount[courseColor] + 1;
          return updatedColorCount;
        });
      }

      let modalArr = [
        [
          Constants.EMPTY_COURSE_NAME,
          getLeastUsedColor(colorCount),
          Constants.EMPTY_LINK_PAIRS,
        ],
      ];
      let coursesArr = Object.keys(storedCourses).map((course) => [
        storedCourses[course][0],
        storedCourses[course][1],
        storedCourses[course][2],
      ]);

      setCourses(coursesArr);
      setModals(modalArr.concat(coursesArr));
    } else {
      console.log("Error: course data from localStorage could not be fetched");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addOrUpdateCourse = (
    initCourseName,
    initColor,
    newCourse,
    newColor,
    newLinkPairs
  ) => {
    setColorCount((prevColorCount) => {
      const updatedColorCount = { ...prevColorCount };
      updatedColorCount[newColor] = updatedColorCount[newColor] + 1;
      return updatedColorCount;
    });

    let updatedCourses = courses;
    let updatedModals = modals;
    if (initCourseName === Constants.EMPTY_COURSE_NAME) {
      updatedCourses.push([newCourse, newColor, newLinkPairs]);
      updatedModals.push([newCourse, newColor, newLinkPairs]);
    } else {
      setColorCount((prevColorCount) => {
        const updatedColorCount = { ...prevColorCount };
        updatedColorCount[initColor] = updatedColorCount[initColor] - 1;
        return updatedColorCount;
      });
      let courseIndex = updatedCourses.findIndex(
        (el) => el[0] === initCourseName
      );
      updatedCourses.splice(courseIndex, 1, [
        newCourse,
        newColor,
        newLinkPairs,
      ]);
      updatedModals.splice(courseIndex + 1, 1, [
        newCourse,
        newColor,
        newLinkPairs,
      ]);
    }

    setCourses(updatedCourses);
    setModals(updatedModals);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const deleteCourse = (courseName, color) => {
    setColorCount((prevColorCount) => {
      const updatedColorCount = { ...prevColorCount };
      updatedColorCount[color] = updatedColorCount[color] - 1;
      return updatedColorCount;
    });

    let updatedModals = modals;
    let updatedCourses = courses;
    updatedModals.splice(
      updatedModals.findIndex((el) => el[0] === courseName),
      1
    );
    updatedCourses.splice(
      updatedCourses.findIndex((el) => el[0] === courseName, 1)
    );

    setCourses(updatedCourses);
    setModals(updatedModals);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const renderModals = () => {
    return modals.map(([courseName, color, linkPairs]) => (
      <Modal
        key={courseName}
        courseName={courseName}
        initColor={color}
        linkPairs={linkPairs}
        onClose={() => setShowModal(null)}
        onAddOrUpdateCourse={(
          initCourseName,
          initColor,
          courseName,
          color,
          linkPairs
        ) =>
          addOrUpdateCourse(
            initCourseName,
            initColor,
            courseName,
            color,
            linkPairs
          )
        }
        showCourse={showModal}
        onDeleteCourse={(courseName, color) => deleteCourse(courseName, color)}
        onValidateForm={(formCourse, courseName, formLinkPairs) =>
          validateForm(formCourse, courseName, formLinkPairs, courses)
        }
      />
    ));
  };

  const renderCourses = () => {
    return courses.map(([courseName, color, linkPairs]) => (
      <Course
        key={courseName}
        courseName={courseName}
        color={color}
        linkPairs={linkPairs}
        onEdit={() => setShowModal(courseName)}
      />
    ));
  };

  return (
    <div className="app-container">
      <h1 className="center">{Messages.PAGE_TITLE}</h1>
      <h3 className="center">{Messages.PAGE_TITLE_PHRASE}</h3>
      <div className="btn-container">
        <button
          id="add-course-btn"
          data-modal="new-course-modal"
          onClick={() => setShowModal(Constants.EMPTY_COURSE_NAME)}
        >
          {Messages.ADD_COURSE}
        </button>
      </div>

      {renderModals()}
      <div id="course-grid">{renderCourses()}</div>
      <p id="footer">
        {Messages.FOOTER_QUESTIONS}
        {" "}
        <a href={Messages.FOOTER_GITHUB_LINK} target="_blank" rel="noreferrer">
          {Messages.FOOTER_GITHUB}
        </a>
      </p>
    </div>
  );
}

export default App;
