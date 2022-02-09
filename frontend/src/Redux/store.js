import { createStore } from "redux";
import rootReducer from "./Reducers.js/combine";

const store =createStore(rootReducer);

export default store;
