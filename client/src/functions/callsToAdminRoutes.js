/** Functions that trigger the calls to admin related backend routes. */
import axios from "axios";

export const getUsersListFunction = async (authToken) => {
    return await axios.get(`${process.env.REACT_APP_API}/admin/users`, { headers: { authToken } });
};

export const toggleUserAccessFunction = async (userId, decision, authToken) => {
    return await axios.put( `${process.env.REACT_APP_API}/admin/user/access/:slug`,  { userId, decision },{ headers: { authToken:  authToken }});
};

// The function is used in AdminDashUserList.js file.
export const deleteUserFunction = async (slug, authToken) => {
    return await axios.delete( `${process.env.REACT_APP_API}/admin/user/delete/:slug`, { headers: {authToken}});
};

// The function is used in AdminDashUserList.js file.
export const getSingleUserFunction = async (slug, authToken) => {
    return await axios.get( `${process.env.REACT_APP_API}/admin/user/${slug}`,{ headers: { authToken:  authToken }});
};

export const getUsersListForPaginationFunction = async (sort, order, page, authToken) => {
    return await axios.post( `${process.env.REACT_APP_API}/admin/users/pagination`,  { sort, order, page },{ headers: { authToken:  authToken }});
};

export const getUsersCountFunction = async () => {
    return await axios.get(`${process.env.REACT_APP_API}admin/users/total`);
};

export const fetchUserByFilterFunction = async (arg) => {
    return await axios.post( `${process.env.REACT_APP_API}admin/search/filters`, arg);
};