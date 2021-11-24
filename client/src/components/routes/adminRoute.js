import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loadingToRedirect";
import { mongoDBGetCurrentAdminFunction } from "../../functions/callsToAuthRoutes";

const AdminRoute = ({ children, ...rest }) => {
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));
    const [isAdmin, setIsAdmin] = useState(false);

    // When the users state changes it checks if the user is an administrator.
    useEffect(() => {
        if (reduxStoreUser && reduxStoreUser.token) {
            mongoDBGetCurrentAdminFunction(reduxStoreUser.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setIsAdmin(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setIsAdmin(false);
                });
        }
    }, [reduxStoreUser]);

    return isAdmin ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
