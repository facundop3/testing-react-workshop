# userEvent

`userEvent` provides more advanced simulation of browser interactions.
 What does it mean? userEvent will fire events in a closer way a real user would. 
 📚: https://testing-library.com/docs/ecosystem-user-event/


## Simulate click 🔥🖱

To simulate a click event, we'll need to call `userEvent.click` with a screen getter of the element we'd like to click.
Ex: Let's say we need to test a counter with increment and decrement buttons...

 ```js
    import { render, screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import App from "../App";

    test("Test App counter", () =>{
        // Fist: we render the component
        render(<App />);
        // Second, we query our elements using `screen` getters
        const counter = screen.getByText(/counter/i);
        const increment = screen.getByRole("button", { name: /increment/i });
        const decrement = screen.getByRole("button", { name: /decrement/i });
        // We fire the click  🔥🖱 
        userEvent.click(increment);
        // Finally, we verify the results on the UI/
        expect(counter).toHaveTextContent("Counter: 1");
        // Same for decrement button
        userEvent.click(decrement);
        expect(counter).toHaveTextContent("Counter: 0");
    })
  ```
 
 ## Jest Mocking functions
  We'll need an intro into this topic before jumping into simulating keyboard typing, so:
