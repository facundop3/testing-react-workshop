import { render, screen } from "@testing-library/react";
import App from "../App";

describe("UI Based assertions with React Testing Library (here is what we came for ⚛️)", () => {
  test("render and screen (👨‍🎨 & 🖥 )", () => {
    // First: we render our component 👨‍🎨:
    render(<App />);
    // Then we can start playing around with screen
    // screen.debug(); // Check the terminal to see the ReactNode of the component
    /* with those two lines we are ready to start validating our UI,
         So let's get started:
         As we can see on the terminal, we have a simple counter with am `increment` and `decrement` buttons,
         let's query the counter and the buttons using screen:
      */
    const counter = screen.getByText(/counter/i); // screen.getByText expects a string or Regex to get the element (`i` at the end is for case no sensitive comparison)
    // Here goes our first UI assert, let's make sure the counter starts at `0`
    // .toHaveTextContent along with many other useful assertions comes from `jest-dom`
    // Have a look on all jest-dom assertions on it's 📚: https://github.com/testing-library/jest-dom#table-of-contents
    expect(counter).toHaveTextContent("Counter: 0");
  });
});
