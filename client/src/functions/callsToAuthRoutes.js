/** Functions that trigger the calls to the authentication related backend routes. */
import axios from "axios";

export const createUser = async (authToken, newUser) => {
    await axios.post(`${process.env.REACT_APP_API}/create-user`, newUser,{ headers: {authToken}});
};

export const updateUser = async (authToken, newUser) => {
    await axios.put(`${process.env.REACT_APP_API}/update-user`, newUser,{ headers: {authToken}});
};

export const currentUser = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/current-user`,{},{ headers: { authToken }});
};

export const currentAdmin = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/current-admin`,{},{ headers: { authToken }});
};