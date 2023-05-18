import "./Course.css";

/*
* Returns a hex code for each course color option.
* @param {String} color 'red', 'green', 'blue', 'yellow', 'orange', or 'purple'
* @return {String} The hex code associated with each color according to the
* color scheme of this web app.
*/
function getColorCode(color) {
 switch (color) {
   case 'red':
     return '#fe7b7b';
   case 'green':
     return '#75d073';
   case 'blue':
     return '#74a3ff';
   case 'yellow':
     return '#ffe977';
   case 'orange':
     return '#fbb143';
   case 'purple':
     return '#c17ed9';
   default:
     console.log(`${color} is not a valid color`);
 }
}

function Course(props) {
    return (
        <div class="frame" id="Course-frame" style={{ background: getColorCode(props.color) }}>
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