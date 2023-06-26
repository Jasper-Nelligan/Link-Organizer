export const Color = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    YELLOW: 'yellow',
    ORANGE: 'orange',
    PURPLE: 'purple',
}

export const ColorHex = {
    RED: '#fe7b7b',
    GREEN: '#75d073',
    BLUE: '#74a3ff',
    YELLOW: '#ffe977',
    ORANGE: '#fbb143',
    PURPLE: '#c17ed9',
}

export const Messages = {
    PAGE_TITLE: 'Course Link Organizer',
    PAGE_TITLE_PHRASE: 'All your class links - One page',
    ADD_COURSE: 'Add Course',
    CREATE_COURSE: 'Create Course',
    FOOTER_QUESTIONS: 'Questions, issues, or suggestions? Open an issue or start a discussion on',
    FOOTER_GITHUB: 'Github',
    FOOTER_GITHUB_LINK: 'https://github.com/Jasper-Nelligan/Link-Organizer/issues',
    SELECT_COLOR: 'Color : ',
    ADD_LINK: 'Add link',
    REMOVE_LINK: 'Remove',
    SAVE_CHANGES: 'Save changes',
    COURSE: 'Course',
    // TODO: "URL" or "http://" better for placeholder?
    URL: 'URL',
    LINK_NAME: 'Link Name',
    ERROR_COURSE_NAME_EMPTY: 'Error: course name cannot be empty',
    ERROR_TWO_COURSES_SAME_NAME: 'Error: cannot have two courses with the same name',
    ERROR_LINK_NAME_EMPTY: 'Error: link name cannot be empty',
    EDIT: "Edit"
}

export const FormConstants = {
    EMPTY_LINK_PAIRS: [
        [0, true, '', ''],
        [1, false, '', ''],
        [2, false, '', ''],
        [3, false, '', '']
    ]
}

export const ModalConstants = {
    EMPTY_COURSE_NAME: '',
    DEFAULT_COLOR: Color.RED,
    EMPTY_LINK_PAIRS: [['',''], ['',''], ['',''], ['','']]
}

export const TestConstants = {
    COURSE_NAME_1: "Course 1",
    COURSE_NAME_2: "Course 2",
    LINK_NAME_1: "Link Name 1",
    LINK_NAME_2: "Link Name 2",
    LINK_1: "Link 1",
    LINK_2: "Link 2",
    LOCAL_STORAGE_1: '{"Course 1":["green",[["Link Name 1","Link 1"],["",""],["",""],["",""]]]}',
    LOCAL_STORAGE_2: '{"Course 2":["blue",[["Link Name 1","Link 1"],["Link Name 2","Link 2"],["",""],["",""]]]}',
    LOAD_PAGE_NO_LOCAL_STORAGE_HTML: '<div class="app-container" data-testid="app-container"><h1 class="center">Course Link Organizer</h1><h3 class="center">All your class links - One page</h3><div class="btn-container"><button id="add-course-btn" data-modal="new-course-modal">Add Course</button></div><div class="modal" id="modal" style="display: none;"><div class="modal-content"><div class="form" style="background: rgb(254, 123, 123);"><input class="course-input" type="text" name="course" placeholder="Course" value=""><a class="close-button">×</a><label for="colors">Color : </label><select id="color-selector" name="colors"><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option><option value="purple">Purple</option></select><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><button class="add-new-link">Add link</button><p class="form-error-msg" style="display: none;"></p><div class="form-bottom"><button class="delete-course-btn" style="display: none;">Delete Course</button><button class="submit-course-btn full-width">Create Course</button></div></div></div></div><div id="course-grid"></div><p id="footer">Questions, issues, or suggestions? Open an issue on<a href="https://github.com/Jasper-Nelligan/Link-Organizer/issues" target="_blank"> github </a>or email me at jnelligan@protonmail.com</p></div>',
    LOAD_PAGE_WITH_LOCAL_STORAGE_HTML: '<div class="app-container" data-testid="app-container"><h1 class="center">Course Link Organizer</h1><h3 class="center">All your class links - One page</h3><div class="btn-container"><button id="add-course-btn" data-modal="new-course-modal">Add Course</button></div><div class="modal" id="modal" style="display: none;"><div class="modal-content"><div class="form" style="background: rgb(254, 123, 123);"><input class="course-input" type="text" name="course" placeholder="Course" value=""><a class="close-button">×</a><label for="colors">Color : </label><select id="color-selector" name="colors"><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option><option value="purple">Purple</option></select><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><button class="add-new-link">Add link</button><p class="form-error-msg" style="display: none;"></p><div class="form-bottom"><button class="delete-course-btn" style="display: none;">Delete Course</button><button class="submit-course-btn full-width">Create Course</button></div></div></div></div><div class="modal" id="modal" style="display: none;"><div class="modal-content"><div class="form" style="background: rgb(117, 208, 115);"><input class="course-input" type="text" name="course" placeholder="Course" value="Course 1"><a class="close-button">×</a><label for="colors">Color : </label><select id="color-selector" name="colors"><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option><option value="purple">Purple</option></select><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value="Link Name 1"><input class="link-input" type="text" name="link" placeholder="URL" value="Link 1"></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><button class="add-new-link">Add link</button><p class="form-error-msg" style="display: none;"></p><div class="form-bottom"><button class="delete-course-btn" style="display: inline;">Delete Course</button><button class="submit-course-btn ">Save changes</button></div></div></div></div><div id="course-grid"><div class="frame" id="Course1-frame" style="background-color: rgb(117, 208, 115);"><p class="course-title">Course 1</p><div class="links"><a href="Link 1" target="_blank">Link Name 1</a><br><br><a href="" target="_blank"></a><br><br><a href="" target="_blank"></a><br><br><a href="" target="_blank"></a><br><br><br></div><button type="button" class="edit-btn" id="edit-Course1" data-modal="Course1-modal">Edit</button></div></div><p id="footer">Questions, issues, or suggestions? Open an issue on<a href="https://github.com/Jasper-Nelligan/Link-Organizer/issues" target="_blank"> github </a>or email me at jnelligan@protonmail.com</p></div>',
    EDIT_COURSE_HTML: '<div class="app-container" data-testid="app-container"><h1 class="center">Course Link Organizer</h1><h3 class="center">All your class links - One page</h3><div class="btn-container"><button id="add-course-btn" data-modal="new-course-modal">Add Course</button></div><div class="modal" id="modal" style="display: none;"><div class="modal-content"><div class="form" style="background: rgb(254, 123, 123);"><input class="course-input" type="text" name="course" placeholder="Course" value=""><a class="close-button">×</a><label for="colors">Color : </label><select id="color-selector" name="colors"><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option><option value="purple">Purple</option></select><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><button class="add-new-link">Add link</button><p class="form-error-msg" style="display: none;"></p><div class="form-bottom"><button class="delete-course-btn" style="display: none;">Delete Course</button><button class="submit-course-btn full-width">Create Course</button></div></div></div></div><div class="modal" id="modal" style="display: none;"><div class="modal-content"><div class="form" style="background: rgb(116, 163, 255);"><input class="course-input" type="text" name="course" placeholder="Course" value="Course 2"><a class="close-button">×</a><label for="colors">Color : </label><select id="color-selector" name="colors"><option value="red">Red</option><option value="green">Green</option><option value="blue">Blue</option><option value="yellow">Yellow</option><option value="orange">Orange</option><option value="purple">Purple</option></select><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value="Link Name 1"><input class="link-input" type="text" name="link" placeholder="URL" value="Link 1"></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value="Link Name 2"><input class="link-input" type="text" name="link" placeholder="URL" value="Link 2"><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><div class="form-links"><input class="link-name" type="text" placeholder="Link Name" value=""><input class="link-input" type="text" name="link" placeholder="URL" value=""><button type="button" class="remove-link-btn">Remove</button></div><button class="add-new-link">Add link</button><p class="form-error-msg" style="display: none;"></p><div class="form-bottom"><button class="delete-course-btn" style="display: inline;">Delete Course</button><button class="submit-course-btn ">Save changes</button></div></div></div></div><div id="course-grid"><div class="frame" id="Course2-frame" style="background-color: rgb(116, 163, 255);"><p class="course-title">Course 2</p><div class="links"><a href="Link 1" target="_blank">Link Name 1</a><br><br><a href="Link 2" target="_blank">Link Name 2</a><br><br><a href="" target="_blank"></a><br><br><a href="" target="_blank"></a><br><br><br></div><button type="button" class="edit-btn" id="edit-Course2" data-modal="Course2-modal">Edit</button></div></div><p id="footer">Questions, issues, or suggestions? Open an issue on<a href="https://github.com/Jasper-Nelligan/Link-Organizer/issues" target="_blank"> github </a>or email me at jnelligan@protonmail.com</p></div>'
}
