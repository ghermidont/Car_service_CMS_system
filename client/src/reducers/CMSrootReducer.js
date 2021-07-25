import { combineReducers } from "redux";
import { CMSuserReducer } from "./CMSuserReducer";
import { searchReducer } from "./SearchReducer";

const CMSrootReducer = combineReducers({
  user: CMSuserReducer,
  search: searchReducer
});

export default CMSrootReducer;
