import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from './App';
import { TestConstants } from "../Constants.js";

afterEach(() => {
    localStorage.clear();
});

// https://testing-library.com/docs/queries/about
test("Page loads succesfully - no localStorage data", () => {
    render(<App/>);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer.outerHTML).toBe(TestConstants.LOAD_PAGE_NO_LOCAL_STORAGE)
})

test("Page loads succesfully - course in localStorage", () => {
    localStorage.setItem('courses', TestConstants.LOCAL_STORAGE);
    render(<App/>);

    expect(screen.getByTestId('app-container').outerHTML)
        .toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE);
})

// https://testing-library.com/docs/queries/about
test("Add course", () => {
    render(<App/>);

    // Assert modal is not shown
    // TODO should add this to the other tests
    let createCourseBtn = screen.queryByRole('button', { name: "Create Course"});
    expect(createCourseBtn).toBeNull();

    const addCourseBtn = screen.getByRole('button', { name: "Add Course"});
    expect(addCourseBtn).toBeInTheDocument();
    fireEvent.click(addCourseBtn)

    const courseInput = screen.getByPlaceholderText('Course');
    expect(courseInput).toBeInTheDocument();
    fireEvent.change(courseInput, {target: {value: 'Course 1'}})

    fireEvent.change(screen.getByRole('combobox'), { target: { value: "green" } });
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(6);
    expect(options[1].selected).toBeTruthy();

    // TODO change Title to "Link Name" and "Link" to "URL"
    const linkNameInputs = screen.getAllByPlaceholderText('Title');
    expect(linkNameInputs).toHaveLength(4);
    fireEvent.change(linkNameInputs[0], {target: {value: 'Title 1'}})

    const linkURLInputs = screen.getAllByPlaceholderText('Link');
    expect(linkURLInputs).toHaveLength(4);
    fireEvent.change(linkURLInputs[0], {target: {value: 'Link 1'}})

    createCourseBtn = screen.queryByRole('button', { name: "Create Course"});
    expect(createCourseBtn).toBeInTheDocument();
    fireEvent.click(createCourseBtn);

    console.log(localStorage.getItem('courses'));
    expect(localStorage.getItem('courses')).toBe(TestConstants.LOCAL_STORAGE);

    const appContainer = screen.getByTestId('app-container');
    expect(appContainer.outerHTML).toBe(TestConstants.LOAD_PAGE_WITH_LOCAL_STORAGE)
})