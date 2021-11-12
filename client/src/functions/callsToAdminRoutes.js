/** Functions that trigger the calls to admin related backend routes. */
import axios from "axios";

export const getUsersListFunction = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/admin/users`, { headers: { authToken } });
};

export const toggleUserAccessFunction = async (userId, decision, authToken) => {
    await axios.put( `${process.env.REACT_APP_API}/admin/user/access/:slug`,  { userId, decision },{ headers: { authToken:  authToken }});
};

// The function is used in AdminDashUserList.js file.
export const deleteUserFunction = async (slug, authToken) => {
    await axios.delete( `${process.env.REACT_APP_API}/admin/user/delete/:slug`, { headers: {authToken}});
};

// The function is used in AdminDashUserList.js file.
export const getSingleUserFunction = async (slug, authToken) => {
    await axios.get( `${process.env.REACT_APP_API}/admin/user/${slug}`,{ headers: { authToken:  authToken }});
};

//! Check the type of the POST verb?
export const getUsersListForPaginationFunction = async (sort, order, page, authToken) => {
    await axios.post( `${process.env.REACT_APP_API}/admin/users/pagination`,  { sort, order, page },{ headers: { authToken:  authToken }});
};

export const getUsersCountFunction = async () => {
    await axios.get(`${process.env.REACT_APP_API}admin/users/total`);
};

//! Check the type of POST verb?
export const fetchUserByFilterFunction = async (arg) => {
    await axios.post( `${process.env.REACT_APP_API}admin/search/filters`, arg);
};