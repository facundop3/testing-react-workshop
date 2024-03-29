import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { Form } from "../App";

describe("userEvent", () => {
  test("Simulate click with `userEvent` 🔥🖱", async () => {
    render(<App />);
    const counter = screen.getByText(/counter/i);
    // `screen.getByRole` takes string with the role of the element we are querying,
    // and an object with a `name` key, name can be expressed as a string or a Regex
    // 📝 You can check an element's role from the accessibility tab on your browser
    const increment = screen.getByRole("button", { name: /increment/i });
    const decrement = screen.getByRole("button", { name: /decrement/i });
    expect(counter).toHaveTextContent("Counter: 0");
    // Let's use `userEvent.click` to fire some clicks and check the counter 🔥🖱
    await userEvent.click(increment);
    // screen.debug();
    expect(counter).toHaveTextContent("Counter: 1");
    await userEvent.click(decrement);
    expect(counter).toHaveTextContent("Counter: 0");
  });

  test("Simulate keyboard typing with `userEvent`🎹", async () => {
    const randomUser = {
      user: "fpetre@vairix.com",
      password: ":party-parrot:",
    };
    const handleSubmit = jest.fn();
    render(<Form handleSubmit={handleSubmit} />);
    const userInput = screen.getByLabelText(/user/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const sendBtn = screen.getByRole("button", { name: /send/i });
    // // Now we'll use `userEvent.type` to fill the above inputs
    await userEvent.type(userInput, randomUser.user);
    await userEvent.type(passwordInput, randomUser.password);
    await userEvent.click(sendBtn);
    expect(handleSubmit).toHaveBeenCalledWith(randomUser);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
