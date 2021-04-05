import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

import ContextApiCounter from "./context-api/ContextApiCounter";
import ContextApiCounterProvider from "./context-api/ContextApiCounterProvider";

export const Form = ({ handleSubmit }) => {
  const submitHandler = (ev) => {
    ev.preventDefault();
    handleSubmit({ user, password });
  };
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={submitHandler}>
      <label>
        User
        <input
          name="user"
          value={user}
          onChange={({ target: { value } }) => setUser(value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </label>
      <button>Send</button>
    </form>
  );
};

function App() {
  const [{ name, species, status }, setRick] = useState({});
  const [isRickLoading, setIsRickLoading] = useState(false);
  const [error, setError] = useState(null);
  const getRick = () => {
    setIsRickLoading(true);
    setError(null);
    axios
      .get(`https://rickandmortyapi.com/api/character/1`)
      .then(({ data }) => {
        setRick(data);
      })
      .catch((err) => {
        const data = err?.response?.data;
        setError(data);
      })
      .finally(() => {
        setIsRickLoading(false);
      });
  };
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ContextApiCounterProvider>
          <ContextApiCounter />
        </ContextApiCounterProvider>
        <button onClick={getRick}>Get Rick</button>
        <Form handleSubmit={handleSubmit} />
        {isRickLoading ? (
          <p>loading</p>
        ) : (
          <div>
            {error ? (
              <p role="alert">{error.message}</p>
            ) : (
              <>
                <p>name: {name}</p>
                <p>status: {status}</p>
                <p>species: {species}</p>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
