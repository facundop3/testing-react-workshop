import { createStore } from "redux";
import countReducer from "./reducer";

export const store = createStore(countReducer);
