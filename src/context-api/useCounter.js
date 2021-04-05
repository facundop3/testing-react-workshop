import React from "react";
import { counterContext } from "./CounterContext";

const useCounter = () => {
  const value = React.useContext(counterContext);
  if (value == null) {
    throw new Error(
      "`useCounter` must be used within `ContextApiCounterProvider`"
    );
  }
  return value;
};

export default useCounter;
