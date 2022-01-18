/** Functions that trigger the calls to the authentication related backend routes. */
import axios from "axios";

export const mongoDBCreateUserFunction = async ( authToken, user ) => {
    console.log("mongoDBCreateUserFunction() worked");
    return await axios
        .post(
            `${process.env.REACT_APP_API}/auth/user/create`, 
            user, 
            { 
                headers: { authToken },
            }
        );
};

export const mongoDBGetCurrentUserFunction = async ( authToken, email ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/auth/user/current`, 
            {
                headers: { authToken },
                params: { email: email }
            }
        );
};

export const mongoDBGetCurrentAdminFunction = async (authToken, email) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/auth/admin/current`,
            {
                headers: { authToken },
                params: {email: email},
            }
        );
};
