import "./Course.css";

function Course(props) {
    return (
        <div class="frame" id="Course-frame" style={{background : 'rgb(254, 123, 123)'}}>
            <p class="course-title">Course</p>
            <div class="links">
                <a href="Link0" target="_blank">Link0</a>
                <br></br>
                <br></br>
                <a href="Link1" target="_blank">Link1</a>
                <br></br>
                <br></br>
                <a href="Link2" target="_blank">Link2</a>
                <br></br>
                <br></br>
                <a href="Link3" target="_blank">Link3</a>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <button type="button" class="edit-btn" id="edit-Course" data-modal="Course-modal">Edit</button>
        </div> 
    )
}

export default Course;