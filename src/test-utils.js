// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import reducer from "./redux/reducer";

import ContextApiCounterProvider from "./context-api/ContextApiCounterProvider";

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

function contextRender(ui, { initialState }) {
  const wrapper = ({ children }) => (
    <ContextApiCounterProvider initialState={initialState}>
      {children}
    </ContextApiCounterProvider>
  );

  return rtlRender(ui, { wrapper });
}

// re-export everything
export * from "@testing-library/react";
export { userEvent };
export { reduxRender, contextRender };
