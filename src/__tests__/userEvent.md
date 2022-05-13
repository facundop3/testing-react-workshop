# userEvent

`userEvent` provides more advanced simulation of browser interactions.
What does it mean? userEvent will fire events in a closer way a real user would.
`userEvent` functions are now (version ^14.2.0) async functions
📚: https://testing-library.com/docs/ecosystem-user-event/

## Simulate click 🔥🖱

To simulate a click event, we'll need to call `userEvent.click` with a screen getter of the element we'd like to click.
`userEvent` functions are now (version ^14.2.0) async functions, so we need to await to the action to be performed
Ex: Let's say we need to test a counter with increment and decrement buttons...

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Test App counter", async () => {
  // Fist: we render the component
  render(<App />);
  // Second, we query our elements using `screen` getters
  const counter = screen.getByText(/counter/i);
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  // We fire the click  🔥🖱
  await userEvent.click(increment);
  // Finally, we verify the results on the UI/
  expect(counter).toHaveTextContent("Counter: 1");
  // Same for decrement button
  await userEvent.click(decrement);
  expect(counter).toHaveTextContent("Counter: 0");
});
```

## Jest Mocking functions

We'll need an intro into this topic before jumping into simulating keyboard typing.
Basically is a function with that allows us to expect a bunch of different things like
the parameters the function was called width and the times the function was called.
📚: Reed more on the [Jest docs](https://jestjs.io/docs/mock-functions)
The syntax to declare a jest mock function is:

```js
const mockFunction = jest.fn();
```

We'll be using it in the next topic

## Simulate Typing ⌨️

To simulate a user typing, we'll need to call `userEvent.type` with a screen getter of the element we'd like to write in and, as it's second parameter, the text we need to type.
`userEvent` functions are now (version ^14.2.0) async functions.
Ex: Let's say we have a login form, and we need to validate that the `handleSubmit` function is being called with the user data we just typed.

```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../App";

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
```

# [⬅️ Back](ui-based-assertions.md) - [Next ➡️](dealing-with-providers.md)
