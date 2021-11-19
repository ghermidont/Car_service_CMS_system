/** Functions that trigger the calls to the authentication related backend routes. */
import axios from "axios";

export const mongoDBCreateUserFunction = async (authToken, user) => {
    await axios.post(`${process.env.REACT_APP_API}/auth/user/create`, {
        headers: {authToken},
        user: user
    });
};

export const mongoDBGetCurrentUserFunction = async (authToken, user) => {
    await axios.get(`${process.env.REACT_APP_API}/auth/user/current`, {
        headers: { authToken },
        params: user
    });
};

export const mongoDBGetCurrentAdminFunction = async (authToken, user) => {
    await axios.get(`${process.env.REACT_APP_API}/auth/admin/current`,{
        headers: { authToken },
        params: user
    });
};