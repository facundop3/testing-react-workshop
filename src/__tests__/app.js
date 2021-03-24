import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App, { Form } from "../App";

const server = setupServer();
const rickAndMortyApi = `https://rickandmortyapi.com/api/character/1`;

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  /*
    When mocking http request, 
    it's important to clear previous handlers when you jump to next test
    to prevent conflicts with handlers
  */
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

// Jest 📚: https://jestjs.io/docs/getting-started
describe("Jest elevator pitch 🃏", () => {
  test("Basic assertions with Jest", () => {
    // let's say we have a `getMax`function and an expected output for a given array of numbers
    const maxNumber = 99;
    const numbers = [-1, 20, -1, 10, maxNumber, 7, 15];
    const getMax = (numbers) => Math.max(...numbers);
    // we can `expect` the return value to be `maxNumber` with the following sentence
    expect(getMax(numbers)).toBe(maxNumber);
  });
  test("Playing with some Jest matchers", () => {
    // Jest provide us with a bunch of matchers, we should pick the one that works better for us
    // Jest matchers 📚: https://jestjs.io/docs/using-matchers
    // .toBe identity check
    expect(1).toBe(1);
    const a = {};
    const b = {};
    // notice the `not` since those objects are not the same one
    expect(a).not.toBe(b);
    // toEqual equality check
    expect(a).toEqual(b);
    a["one"] = 1;
    expect(a).not.toEqual(b);
    b["one"] = 1;
    expect(a).toEqual(b);
    /*
      And we can keep going with the wide list of different Jest matchers available here 📚: https://jestjs.io/docs/using-matchers
      but today we'll be focusing on `testing-library/react`, so let's jump into that
    */
  });
});

/*
 ######## Testing Tips for our automated tests:
  - Try to keep the automated testing as close as possible to the way the user will interact with our components

*/

describe("UI Based assertions with React Testing Library (here is what we came for ⚛️)", () => {
  test("render and screen (👨‍🎨 & 🖥 )", () => {
    /* `render` and `screen` will be our best friends in terms of validating our components UI
        `render` is kinda self explanatory right ?
          - I guess so ..., it ... renders the component you pass as an argument
            ⚠️ it's important that you render your component before start using `screen` methods
        but what does `screen` do? well, screen object exposes a bunch of UI query methods
        the fist one I'd like to remark is:
        - `screen.debug()`: 
            This method will print the ReactNode in the console
    */
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

describe("Mocking HTTP calls with MSW", () => {
  test("Mock successful request 🚀", async () => {
    const mockResponse = {
      name: "Facundo",
      species: "human",
      status: "low-battery",
    };
    // `server.use` along with `rest` gives us the chance to mock the implementation of an api
    // we just need to pass our rest handlers and we can mock the endpoint implementation
    server.use(
      rest.get(rickAndMortyApi, (req, res, ctx) => {
        // ctx provide us with some useful methods
        // 📚: https://mswjs.io/docs/api/context
        // return is required
        return res(ctx.json(mockResponse));
      })
    );
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: /get rick/i }));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    expect(screen.getByText(/name/i)).toHaveTextContent(mockResponse.name);
    expect(screen.getByText(/status/i)).toHaveTextContent(mockResponse.status);
    expect(screen.getByText(/species/i)).toHaveTextContent(
      mockResponse.species
    );
  });

  test(`Mock request failure 🧨💥`, async () => {
    const message = `R.I.P 🪦`;
    server.use(
      rest.get(rickAndMortyApi, (req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(500), ctx.json({ message }));
      })
    );
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: /get rick/i }));
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
      timeout: 2000,
    });
    expect(screen.getByRole("alert")).toHaveTextContent(message);
  });
});
