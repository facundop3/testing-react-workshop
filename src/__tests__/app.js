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
