import { render, screen} from "@testing-library/react";

describe('test', () => {
    it('find by name -> aria-label', () => {
        render(
            <a
                className="close-button"
                aria-label="Close"
            > &times; </a>
        )

       const exitButton = screen.getByLabelText("Close");

       expect(exitButton).toBeInTheDocument();
   })

    it('find by name -> anchor content', () => {
        render(
            <a
                className="close-button"
                aria-label="Close"
            > &times; </a>
        )

        const exitButton = screen.getByRole("link", {name: /&times;/i});

        expect(exitButton).toBeInTheDocument();
    })
});