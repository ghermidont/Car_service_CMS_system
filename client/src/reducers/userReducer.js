//the initial state will be null in our case and after the action it will be assigned the payload.
export const userReducer = ( state=null, action ) => {
    switch ( action.type ) {
    case "LOGGED_IN_USER":
        // the payload is the user information we pass in.
        return action.payload;
    case "LOGOUT":     
        return action.payload;
    default:
        return state;
    }
};                                                                           
