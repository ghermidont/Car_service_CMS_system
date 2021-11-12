import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loadingToRedirect";

//The component syntax is from the react-router-dom documentation. 
const UserRoute = ({ children, ...rest  }) => {
    const { user } = useSelector((state) => ({ ...state }));
    // IF user token we return the component passed to the route ELSE redirect to login.
    return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;