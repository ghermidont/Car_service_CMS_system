import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
    userReducerData: userReducer,
    searchReducerData: searchReducer
});

export default rootReducer;
