import { render, screen } from '@testing-library/react'
import App from './App';
import { TestConstants } from "../Constants.js";
import { escapeRegExp } from '../TestHelperFunctions';

https://testing-library.com/docs/queries/about
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