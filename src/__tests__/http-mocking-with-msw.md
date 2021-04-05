## HTTP mocking with MSW
Sometimes we need to test how our components integrate with external APIS. 
Luckily we have MSW a full set of API mocking tools that intersects requests on the network level. 
We'll be covering just a few of them, specifically `rest` and `setupServer`.
Tou can have a look on MSW 📚: https://mswjs.io/


```js
    import {
        render,
        screen,
        waitForElementToBeRemoved,
    } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { rest } from "msw";
    import { setupServer } from "msw/node";
    import App from "../App";

    // here we go with the serverSetup
    const server = setupServer();
    const rickAndMortyApi = `https://rickandmortyapi.com/api/character/1`;

    // The following functions calls are Jest utilities you can 💯 on its names to know what they do.
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

    // describe allows us to group a set of test
    describe("Mocking HTTP calls with MSW", () => {
                                          // ⬇️ Don't miss this      
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
                    // ⚠️ this is really expressJs like syntax BUT return is required (yup I had a good time debugging this)
                    return res(ctx.json(mockResponse));
                })
            );
            render(<App />);
            userEvent.click(screen.getByRole("button", { name: /get rick/i }));
            // waitForElementToBeRemoved well it does what it says 🤣
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
                    // It's pretty same as before but setting an error status code
                    // Delay here is completely optional, just to show that you can execute as many ctx methods as needed
                    return res(ctx.delay(1000), ctx.status(500), ctx.json({ message }));
                })
            );
            render(<App />);
            userEvent.click(screen.getByRole("button", { name: /get rick/i }));
            // waitForElementToBeRemoved second parameter is an object with options 📚: https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved
            await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
            timeout: 2000,
            });
            expect(screen.getByRole("alert")).toHaveTextContent(message);
        });
});

```

# [⬅️ Back](dealing-with-providers.md) 

## That's it for now, leave me your feedback on the [issue section](https://github.com/facundop3/testing-react-workshop/issues), aaaaand, If you enjoyed it hit the ⭐️ (🙏🥺)
