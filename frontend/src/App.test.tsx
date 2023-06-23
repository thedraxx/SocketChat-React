import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
    test("should renderize the component App", () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Enter your message.../i);
        expect(inputElement).toBeDefined();
    })

    test("should send a message", () => {
        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Enter your message.../i);
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(inputElement, { target: { value: 'Hola, mundo!' } });
        fireEvent.click(submitButton);

        const messageElement = screen.getByText('Hola, mundo!');
        expect(messageElement).toBeDefined();
    })
})
