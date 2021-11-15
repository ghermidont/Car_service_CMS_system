/** Functions that trigger the calls to the authentication related backend routes. */
import axios from "axios";

export const createUser = async (authToken, newUser) => {
    await axios.post(`${process.env.REACT_APP_API}/auth/create-user`, newUser,{ headers: {authToken}});
};

export const getCurrentUser = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/auth/get-current-user`,{},{ headers: { authToken }});
};

export const getCurrentAdmin = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/auth/get-current-admin`,{},{ headers: { authToken }});
};