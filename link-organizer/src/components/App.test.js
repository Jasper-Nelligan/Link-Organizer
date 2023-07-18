import { render, screen, fireEvent } from '@testing-library/react'
import App from './App';
import { Messages, TestConstants, Color, Constants } from "../Constants.js";

afterEach(() => {
    localStorage.clear();
});

test("Page loads successfully - no localStorage data", () => {
    render(<App/>);

    assertStaticElementsExist();
    expect(screen.queryAllByTestId("course")).toHaveLength(0);
})

test("Page loads successfully - course in localStorage", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    assertStaticElementsExist();
    assertCourseOneExists();
})

test("Add course", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    
    // Assert Main Modal is cleared and suggested color has changed
    fireEvent.click(addCourseBtn)

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.RED } });
    let options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[0].selected).toBeTruthy();

    let linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(4);
    fireEvent.change(linkNameInputs[0], {target: {value: TestConstants.LINK_NAME_1}})

    let linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE_COURSE_ONE);

    assertCourseOneExists();
    fireEvent.click(addCourseBtn)

    courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();

    // Modal color should be green now
    options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[1].selected).toBeTruthy();

    linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(8);
    expect(linkNameInputs[0].value).toBe('');
    expect(linkNameInputs[1].value).toBe('');
    expect(linkNameInputs[2].value).toBe('');
    expect(linkNameInputs[3].value).toBe('');

    linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(8);
    expect(linkURLInputs[0].value).toBe('');
    expect(linkURLInputs[1].value).toBe('');
    expect(linkURLInputs[2].value).toBe('');
    expect(linkURLInputs[3].value).toBe('');
})

test("Delete course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    // Assert suggested color is different from Course 1 color
    let addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)
    let options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();

    // Close modal
    let closeBtn = screen.getAllByLabelText("Close")[0];
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    const editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);

    let delCourseBtn = screen.getByRole('button', { name: Messages.DELETE_COURSE });
    expect(delCourseBtn).toBeInTheDocument();
    fireEvent.click(delCourseBtn);

    delCourseBtn = screen.queryByRole('button', { name: Messages.DELETE_COURSE });
    expect(delCourseBtn).not.toBeInTheDocument();

    const course1 = screen.queryByText(TestConstants.COURSE_NAME_1);
    expect(course1).not.toBeInTheDocument();

    // Assert suggested color has gone back to default
    fireEvent.click(addCourseBtn)
    options = screen.getAllByRole('option');
    expect(options[0].selected).toBeTruthy();
})

test("Edit course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    // Assert suggested color is different from Course 1 color
    let addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn);
    let options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();

    let editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput => courseInput.value == TestConstants.COURSE_NAME_1)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_2}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.GREEN } });
    expect(options[1].selected).toBeTruthy();

    // Input second link
    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    fireEvent.change(linkNameInputs[5], {target: {value: TestConstants.LINK_NAME_2}})
    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    fireEvent.change(linkURLInputs[5], {target: {value: TestConstants.LINK_2}})

    let saveChangesBtn = screen.queryByRole('button', { name: Messages.SAVE_CHANGES });
    expect(saveChangesBtn).toBeInTheDocument();
    fireEvent.click(saveChangesBtn);

    assertCourseTwoExists();
    
    // Assert suggested color has gone back to default
    fireEvent.click(addCourseBtn)
    options = screen.getAllByRole('option');
    expect(options[0].selected).toBeTruthy();

    // Clicking edit again should bring up modal for new course name
    editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);
    let delCourseBtn = screen.getByRole('button', { name: Messages.DELETE_COURSE });
    expect(delCourseBtn).toBeInTheDocument();

    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE_TWO_LINKS);
})

test("Add empty course", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    let errorMsg = screen.queryByText(Messages.ERROR_COURSE_NAME_EMPTY);
    expect(errorMsg).toBeInTheDocument();

    // Assert modal is still showing
    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
})

test("Add duplicate course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput =>
        courseInput.value === Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    let errorMsg = screen.queryByText(Messages.ERROR_TWO_COURSES_SAME_NAME);
    expect(errorMsg).toBeInTheDocument();

    // Assert modal is still showing
    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
})

test("Add course empty link name", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    let errorMsg = screen.queryByText(Messages.ERROR_LINK_NAME_EMPTY);
    expect(errorMsg).toBeInTheDocument();

    // Assert modal is still showing
    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
})

test("Add link", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    let linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(4);
    let linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);

    let addLinkBtn = screen.queryByRole('button', { name: Messages.ADD_LINK });
    expect(addLinkBtn).toBeInTheDocument();
    fireEvent.click(addLinkBtn);

    linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(5);
    linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(5);
})

test("Remove link", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    let linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(4);
    let linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);

    let addLinkBtns = screen.queryAllByRole('button', { name: Messages.REMOVE_LINK });
    expect(addLinkBtns[0]).toBeInTheDocument();
    fireEvent.click(addLinkBtns[0]);

    linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(3);
    linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(3);
})

test("Correct color is suggested - after red course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();
})

test("Default color is suggested after all colors used", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_ALL_COLORS);
    render(<App/>);

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const options = screen.getAllByRole('option');
    expect(options[0].selected).toBeTruthy();
})

test("Main modal is cleared after closing - added link", () => {
    render(<App/>);
    
    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[0].selected).toBeTruthy();

    const addLinkBtn = screen.getByRole('button', { name: Messages.ADD_LINK });
    expect(addLinkBtn).toBeInTheDocument();
    fireEvent.click(addLinkBtn);

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(5);
    fireEvent.change(linkNameInputs[0], {target: {value: TestConstants.LINK_NAME_1}})

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(5);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    // Close modal
    let closeBtn = screen.getByLabelText("Close");
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    assertMainModalIsEmpty();
})

test("Main modal is cleared after closing - deleted link", () => {
    render(<App/>);
    
    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn);

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[0].selected).toBeTruthy();

    const delLinkBtn = screen.getAllByRole('button', { name: Messages.REMOVE_LINK })[0];
    expect(delLinkBtn).toBeInTheDocument();
    fireEvent.click(delLinkBtn);

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(3);
    fireEvent.change(linkNameInputs[0], {target: {value: TestConstants.LINK_NAME_1}})

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(3);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    // Close modal
    let closeBtn = screen.getAllByLabelText("Close")[0];
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    assertMainModalIsEmpty();
})

test("Course modal is cleared after closing - added link", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    const editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput => courseInput.value == TestConstants.COURSE_NAME_1)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_2}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.GREEN } });
    const options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();

    const delLinkBtn = screen.getAllByRole('button', { name: Messages.REMOVE_LINK })[0];
    expect(delLinkBtn).toBeInTheDocument();
    fireEvent.click(delLinkBtn);

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(7);
    fireEvent.change(linkNameInputs[5], {target: {value: TestConstants.LINK_NAME_2}})
    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(7);
    fireEvent.change(linkURLInputs[5], {target: {value: TestConstants.LINK_2}})

    // Close modal
    let closeBtn = screen.getAllByLabelText("Close")[1];
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    assertCourseOneModalIsUnchanged();
})

test("Course modal is cleared after closing - deleted link", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_COURSE_ONE);
    render(<App/>);

    const editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput => courseInput.value == TestConstants.COURSE_NAME_1)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_2}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.GREEN } });
    const options = screen.getAllByRole('option');
    expect(options[1].selected).toBeTruthy();

    const addLinkBtn = screen.getByRole('button', { name: Messages.ADD_LINK });
    expect(addLinkBtn).toBeInTheDocument();
    fireEvent.click(addLinkBtn);

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(9);
    fireEvent.change(linkNameInputs[5], {target: {value: TestConstants.LINK_NAME_2}})
    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(9);
    fireEvent.change(linkURLInputs[5], {target: {value: TestConstants.LINK_2}})

    // Close modal
    let closeBtn = screen.getAllByLabelText("Close")[1];
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);

    assertCourseOneModalIsUnchanged();
})

function assertStaticElementsExist() {
    expect(screen.getByText(Messages.PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(Messages.PAGE_TITLE_PHRASE)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: Messages.ADD_COURSE })).toBeInTheDocument();
    expect(screen.getByText(Messages.FOOTER_QUESTIONS)).toBeInTheDocument();
    expect(screen.getByText(Messages.FOOTER_GITHUB)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: Messages.FOOTER_GITHUB }))
        .toHaveAttribute('href', Messages.FOOTER_GITHUB_LINK)
}

function assertCourseOneExists() {
    const courses = screen.queryAllByTestId("course");
    expect(courses).toHaveLength(1);
    expect(courses[0]).toHaveStyle(`background: rgb(${TestConstants.RED})`);
    expect(screen.getByText("Course 1")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: TestConstants.LINK_NAME_1 }))
        .toHaveAttribute('href', TestConstants.LINK_1)
}

function assertCourseTwoExists() {
    const courses = screen.queryAllByTestId("course");
    expect(courses).toHaveLength(1);
    expect(courses[0]).toHaveStyle(`background: rgb(${TestConstants.GREEN})`);
    expect(screen.getByText("Course 2")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: TestConstants.LINK_NAME_2 }))
        .toHaveAttribute('href', TestConstants.LINK_2)
}

function assertMainModalIsEmpty() {
    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput =>
        courseInput.value == Constants.EMPTY_COURSE_NAME)[0];
    expect(courseInput).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[0].selected).toBeTruthy();

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(4);
    expect(linkNameInputs[0].value).toBe('');
    expect(linkNameInputs[1].value).toBe('');
    expect(linkNameInputs[2].value).toBe('');
    expect(linkNameInputs[3].value).toBe('');

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);
    expect(linkURLInputs[0].value).toBe('');
    expect(linkURLInputs[1].value).toBe('');
    expect(linkURLInputs[2].value).toBe('');
    expect(linkURLInputs[3].value).toBe('');
}

function assertCourseOneModalIsUnchanged() {
    const editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn);

    let courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    let courseInput = courseInputs.filter(courseInput => courseInput.value == TestConstants.COURSE_NAME_1)[0];
    expect(courseInput).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options[0].selected).toBeTruthy();

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(8);
    expect(linkNameInputs[4].value).toBe(TestConstants.LINK_NAME_1);
    expect(linkNameInputs[5].value).toBe('');
    expect(linkNameInputs[6].value).toBe('');
    expect(linkNameInputs[7].value).toBe('');

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(8);
    expect(linkURLInputs[4].value).toBe(TestConstants.LINK_1);
    expect(linkURLInputs[5].value).toBe('');
    expect(linkURLInputs[6].value).toBe('');
    expect(linkURLInputs[7].value).toBe('');
}