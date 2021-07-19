import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";

/**
 * Redux comments.
 * The "Provider" ensures that all components have access to the store
 * "rootReducer" is used to change the states
 *  The reducers are stored in the "src/reducers" folder
 */
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
//This is the link to the general reduces file (index.js) from the reducers folder. The actual link is ./reducers/index.js. but since it the file name is index.js we can skip the specification it is done by default. 
import rootReducer from "./reducers"; 

// initiate the Redux store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
   </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
