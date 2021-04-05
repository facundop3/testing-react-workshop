import React from "react";
import { counterContext } from "./CounterContext";

const ContextApiCounterProvider = ({children, initialState= 0}) => {
  const value = React.useState(initialState);
  return (
    <counterContext.Provider value={value}>
      {children}
    </counterContext.Provider>
  );
};

export default ContextApiCounterProvider;
