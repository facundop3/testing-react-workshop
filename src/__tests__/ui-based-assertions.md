# UI based assertions


### [React Testing Library](https://testing-library.com/)

#### Testing Tips for our automated tests:
  - Don't focus on the implementation details of what you're testing. 
  - Try to keep the automated testing as close as possible to the way the user will interact with our components.
  - Think how you would test your app if you were a manual tester.


#### Ok let's go:
   Let's say we need to test the App component renders properly, we can just call `render` method from `@testing-library/react`.
   After rendering our component, we need to validate that the UI is okay by doing some assertions, let's say `<App/>`has a counter and we need to verify that's starting at 0.

   That's when `screen` joins the party, `screen` provide us with a bunch of methods for UI validations, the first one I would like to highlight is :`screen.debug()` It prints a representation of the rendered component on the terminal, so we can start thinking on what do we need to validate. 

  ```js
    import { render, screen } from "@testing-library/react";
    import App from "../App";

    test('Render a component', ()=>{
        render(<App/>)
        screen.debug()
    })
   ```
   `screen.debug()` output:
   ```html 
     <body>
        <div>
          <div
            class="App"
          >
            <header
              class="App-header"
            >
              <img
                alt="logo"
                class="App-logo"
                src="logo.svg"
              />
              <a
                class="App-link"
                href="https://reactjs.org"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn React
              </a>
              <div>
                Counter: 
                0
              </div>
              <button>
                increment
              </button>
              <button>
                decrement
              </button>
              <button>
                Get Rick
              </button>
              <form>
                <label>
                  User
                  <input
                    name="user"
                    value=""
                  />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    value=""
                  />
                </label>
                <button>
                  Send
                </button>
              </form>
              <div>
                <p>
                  name: 
                </p>
                <p>
                  status: 
                </p>
                <p>
                  species: 
                </p>
              </div>
            </header>
          </div>
        </div>
      </body>
   ```

   Ok, we render the component, we check how the component looks on the terminal, and now we are ready to start the validation:
  ```js
      import { render, screen } from "@testing-library/react";
      import App from "../App";

      test('Render a component', ()=>{
          render(<App/>)
          //  screen.debug() ⚠️ `screen.debug()` is for development purposes only so you should remove it when you are done.
          const counter = screen.getByText(/counter/i); // it expects a string or Regex to get the element.
          /*
           Here we go with our first UI assert, let's make sure the counter starts at `0`
           .toHaveTextContent along with many other useful assertions comes from `jest-dom`
           Have a look on all jest-dom assertions on it's 📚: https://github.com/testing-library/jest-dom#table-of-contents
          */
         expect(counter).toHaveTextContent("Counter: 0");
      })
  ```
# [⬅️ Back](jest-elevator-pitch.md) - [Next ➡️](userEvent.md)
