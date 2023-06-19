import { render, screen, fireEvent } from '@testing-library/react'
import App from './App';
import { Messages, TestConstants, Color } from "../Constants.js";

/*
 * I'm probably going to computer science hell for writing my tests like this
 */
afterEach(() => {
    localStorage.clear();
});

test("Page loads succesfully - no localStorage data", () => {
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_NO_LOCAL_STORAGE)
})

test("Page loads succesfully - course in localStorage", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE);
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE);
})

test("Add course", () => {
    render(<App/>);

    // Assert modal is not shown
    let createCourseBtn = screen.queryByRole('button', { name: Messages.CREATE_COURSE });
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: Messages.ADD_COURSE });
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInput = screen.getByPlaceholderText(Messages.COURSE);
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

    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer.outerHTML).toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE)
})