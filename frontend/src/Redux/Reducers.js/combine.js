import { combineReducers } from "redux";
import { changeColor } from "./reducer";

const rootReducer=combineReducers({
    changeColor:changeColor,
})

export default rootReducer