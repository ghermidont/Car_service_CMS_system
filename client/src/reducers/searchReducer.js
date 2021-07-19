// TODO Use this for the search logic.
// TODO Backend for search is in the product.js file on the server.

export const searchReducer = (action, state = { text: "" }) => {

  if (action&&action.type==="SEARCH_QUERY") {

    return { ...state, ...action.payload };

  } else {  

      return state;
      
  }

};
