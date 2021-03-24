import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { Form } from "../App";

describe("userEvent", () => {
  test("Simulate click with `userEvent` 🔥🖱", () => {
    render(<App />);
    const counter = screen.getByText(/counter/i);
    // `screen.getByRole` takes string with the role of the element we are querying,
    // and an object with a `name` key, name can be expressed as a string or a Regex
    // 📝 You can check an element's role from the accessibility tab on your browser
    const increment = screen.getByRole("button", { name: /increment/i });
    const decrement = screen.getByRole("button", { name: /decrement/i });
    expect(counter).toHaveTextContent("Counter: 0");
    // `userEvent` provides more advanced simulation of browser interactions
    // 📚: https://testing-library.com/docs/ecosystem-user-event/
    // Let's use `userEvent.click` to fire some clicks and check the counter 🔥🖱
    userEvent.click(increment);
    // screen.debug();
    expect(counter).toHaveTextContent("Counter: 1");
    userEvent.click(decrement);
    expect(counter).toHaveTextContent("Counter: 0");
  });

  test("Simulate keyboard typing with `userEvent`🎹", () => {
    const randomUser = {
      user: "fpetre@vairix.com",
      password: ":party-parrot:",
    };

    let submittedUser;
    const handleSubmit = jest.fn();
    // mockImplementation allows us to define the implementation of a jest function
    handleSubmit.mockImplementation((user) => {
      // here we save the user data to `submittedUser`
      submittedUser = user;
    });
    render(<Form handleSubmit={handleSubmit} />);
    const userInput = screen.getByLabelText(/user/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const sendBtn = screen.getByRole("button", { name: /send/i });
    // // Now we'll use `userEvent.type` to fill the above inputs
    userEvent.type(userInput, randomUser.user);
    userEvent.type(passwordInput, randomUser.password);
    userEvent.click(sendBtn);
    expect(submittedUser).toEqual(randomUser);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
