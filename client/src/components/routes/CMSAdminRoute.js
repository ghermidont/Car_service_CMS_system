import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import CMSLoadingToRedirect from "./CMSLoadingToRedirect";
import { currentAdmin } from "../../functions/callsToAuthRoutes";

const CMSAdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isAdmin, setIsAdmin] = useState(false);

  // When the users state changes it checks if the user is an administrator.
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setIsAdmin(true);
        })
        .catch((err) => {
          console.log("ADMIN ROUTE ERR", err);
          setIsAdmin(false);
        });
    }
  }, [user]);

  return isAdmin ? <Route {...rest} /> : <CMSLoadingToRedirect />;
};

export default CMSAdminRoute;
