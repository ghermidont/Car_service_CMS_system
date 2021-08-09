import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CMSLoadingToRedirect from "./CMSLoadingToRedirect";

//The component syntax is from the react-router-dom documentation. 
const CMSUserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
// IF user token we return the component passed to the route ELSE redirect to login.
  return user && user.token ? <Route {...rest} /> : <CMSLoadingToRedirect />;
};

export default CMSUserRoute;