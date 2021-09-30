import { combineReducers } from "redux";
import { UserReducer } from "./CMSuserReducer";
import { searchReducer } from "./SearchReducer";

const RootReducer = combineReducers({
  user: UserReducer,
  search: searchReducer
});

export default RootReducer;
