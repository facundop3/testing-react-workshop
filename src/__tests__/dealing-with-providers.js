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
