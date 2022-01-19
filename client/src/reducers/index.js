import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const authPersistConfig = {
    key: "reduxStoreUser",
    storage: storage,
};

const searchPersistConfig = {
    key: "reduxStoreUserSearchData",
    storage: storage,
};

const index = combineReducers( {
    reduxStoreUser: persistReducer( authPersistConfig, userReducer ),
    reduxStoreUserSearchData: persistReducer( searchPersistConfig, searchReducer ),
} );

// const index = combineReducers( {
//     reduxStoreUser: userReducer,
//     reduxStoreUserSearchData: searchReducer
// } );

export default index;
