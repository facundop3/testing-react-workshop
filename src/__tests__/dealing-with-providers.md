# Dealing with Providers

 Sometimes our component needs a wrapper that provides its context down in the React Node of components.
 In this section we'll be showing how simple it could be to add some tests to our provider-dependent components.

 The first thing we need to do is creating a render function that provides the component with the context it needs.

# Creating a reduxRender

We need to create a render function, capable to provide our component with the context it needs.
We'll be following Redux Docs 📚: https://redux.js.org/recipes/writing-tests#connected-components to get this.

`render` function, allows us to provide an options object as it's second parameter, we are using `wrapper` option to add our provider.

```js 
    render(ui, { wrapper, ...renderOptions })
```

 Let's create a `test-utils.js` file and a `reduxRender` function that will take the component.


```js
// test-utils.js
import React from "react";
                   // ↙️ we renamed render as rtlRender 
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import reducer from "./redux/reducer";

function reduxRender(
  ui,
  // Options comes as second parameter
  { 
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  // we create our wrapper function with the provider we need for our component
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
   // and we return the original `render` function with our wrapper and its options
  return rtlRender(ui, { wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
export { userEvent };
export { reduxRender };
```

# Good news, Same applies for React.Context API

So, can we replicate what we did before to get a `contextRender` function?
Absolutely

```js
// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import reducer from "./redux/reducer";
```
```diff
++ import ContextApiCounterProvider from "./context-api/ContextApiCounterProvider";
```
```js
function reduxRender(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return rtlRender(ui, { wrapper, ...renderOptions });
}
```
```diff
+ function contextRender(ui, { initialState }) {
+   const wrapper = ({ children }) => (
+     <ContextApiCounterProvider initialState={initialState}>
+       {children}
+     </ContextApiCounterProvider>
+   );
+ 
+   return rtlRender(ui, { wrapper });
+ }
```
```js
// re-export everything
export * from "@testing-library/react";
export { userEvent };
```
```diff
+ export { reduxRender, contextRender };
```


# Let's play with our brand new renders 🎨

Just to show that the test are actually the same, no matter if it's the `Redux` one or the `contextApi`, 
we create our `validateCounter` function.
We just need to call the respective render for each component, and call `validateCounter` with its initial value ✨

```js
import React from "react";
import { reduxRender, contextRender, screen, userEvent } from "../test-utils";
import ReduxCounter from "../redux/Redux-counter";
import ContextApiCounter from "../context-api/ContextApiCounter";

const validateCounter = (initialCount) => {
  const counter = screen.getByText(/counter/i);
  const increment = screen.getByRole("button", { name: /increment/i });
  const decrement = screen.getByRole("button", { name: /decrement/i });
  expect(counter).toHaveTextContent(`Counter: ${initialCount}`);
  userEvent.click(increment);
  expect(counter).toHaveTextContent(`Counter: ${initialCount + 1}`);
  userEvent.click(decrement);
  expect(counter).toHaveTextContent(`Counter: ${initialCount}`);
};

describe("Dealing with providers", () => {
  test("Testing our ReduxCounter", () => {
    const initialState = 5;
    reduxRender(<ReduxCounter />, { initialState });
    validateCounter(initialState);
  });

  test("Testing our ContextApiCounter", () => {
    const initialState = 10;
    contextRender(<ContextApiCounter />, { initialState });
    validateCounter(initialState);
  });
});

```

  # [⬅️ Back](userEvent.md)  - [Next ➡️](http-mocking-with-msw.md)