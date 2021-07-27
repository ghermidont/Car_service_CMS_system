import { combineReducers } from "redux";
import { CMSuserReducer } from "./CMSuserReducer";
import { searchReducer } from "./SearchReducer";

const CMSRootReducer = combineReducers({
  user: CMSuserReducer,
  search: searchReducer
});

export default CMSRootReducer;
