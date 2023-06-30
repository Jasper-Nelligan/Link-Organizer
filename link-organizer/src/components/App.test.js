import { render, screen, fireEvent } from '@testing-library/react'
import App from './App';
import { Messages, TestConstants, Color } from "../Constants.js";

/*
 * I'm probably going to computer science hell for writing my tests like this
 */
afterEach(() => {
    localStorage.clear();
});

test("Page loads successfully - no localStorage data", () => {
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_NO_LOCAL_STORAGE_HTML)
})

test("Page loads successfully - course in localStorage", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_1);
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE_HTML);
})

test("Add course", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput => courseInput.value == '')[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.GREEN } });
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[1].selected).toBeTruthy();

    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    expect(linkNameInputs).toHaveLength(4);
    fireEvent.change(linkNameInputs[0], {target: {value: TestConstants.LINK_NAME_1}})

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE_1);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer.outerHTML).toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE_HTML)
})

test("Add empty course", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput => courseInput.value == '')[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    let errorMsg = screen.queryByText(Messages.ERROR_COURSE_NAME_EMPTY);
    expect(errorMsg).not.toBeNull;

    // Assert modal is still showing
    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
})

test("Add duplicate course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_1);
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE_HTML);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput => courseInput.value == '')[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    let errorMsg = screen.queryByText(Messages.ERROR_TWO_COURSES_SAME_NAME);
    expect(errorMsg).not.toBeNull;

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
    const courseInput = courseInputs.filter(courseInput => courseInput.value == '')[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_1}})

    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    expect(linkURLInputs).toHaveLength(4);
    fireEvent.change(linkURLInputs[0], {target: {value: TestConstants.LINK_1}})

    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    let errorMsg = screen.queryByText(Messages.ERROR_LINK_NAME_EMPTY);
    expect(errorMsg).not.toBeNull;

    // Assert modal is still showing
    createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE});
    expect(createCourseBtn).toBeInTheDocument();
})

test("Edit course", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE_1);
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE_HTML);

    const editCourseBtn = screen.getByRole('button', { name: Messages.EDIT });
    expect(editCourseBtn).toBeInTheDocument();
    fireEvent.click(editCourseBtn)

    const courseInputs = screen.getAllByPlaceholderText(Messages.COURSE);
    const courseInput = courseInputs.filter(courseInput => courseInput.value == TestConstants.COURSE_NAME_1)[0];
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: TestConstants.COURSE_NAME_2}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: Color.BLUE } });

    // Input second link
    const linkNameInputs = screen.getAllByPlaceholderText(Messages.LINK_NAME);
    fireEvent.change(linkNameInputs[5], {target: {value: TestConstants.LINK_NAME_2}})
    const linkURLInputs = screen.getAllByPlaceholderText(Messages.URL);
    fireEvent.change(linkURLInputs[5], {target: {value: TestConstants.LINK_2}})

    let saveChangesBtn = screen.queryByRole('button', { name: Messages.SAVE_CHANGES });
    expect(saveChangesBtn).toBeInTheDocument();
    fireEvent.click(saveChangesBtn);

    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE_2);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer.outerHTML).toBe(TestConstants.EDIT_COURSE_HTML)
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