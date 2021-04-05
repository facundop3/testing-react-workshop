import React from "react";
import { connect } from "react-redux";

let ReduxCounter = ({ count, increment, decrement }) => (
  <>
    <div>Counter: {count}</div>
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
  </>
);

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" }),
});

ReduxCounter = connect(
  (count) => ({ count }),
  mapDispatchToProps
)(ReduxCounter);

export default ReduxCounter;
