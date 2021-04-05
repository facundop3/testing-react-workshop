import React from "react";
import useCounter from "./useCounter";

const ContextApiCounter = () => {
  const [count, setCount] = useCounter();
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <>
      <div>Counter: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  );
};

export default ContextApiCounter;
