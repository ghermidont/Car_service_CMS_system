import { combineReducers } from "redux";
import { CMSuserReducer } from "./CMSuserReducer";
import { CMSsearchReducer } from "./CMSsearchReducer";

const CMSrootReducer = combineReducers({
  user: CMSuserReducer,
  search: CMSsearchReducer
});

export default CMSrootReducer;
