import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const index = combineReducers({
    reduxStoreUser: userReducer,
    reduxStoreUserSearchData: searchReducer
});

export default index;
