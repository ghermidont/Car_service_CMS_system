/** Functions that trigger the calls to admin related backend routes. */
import axios from "axios";

// export const mongoDBGetUsersListFunction = async (authToken) => {
//     return await axios.get(`${process.env.REACT_APP_API}/admin/users`, { headers: { authToken } });
// };

export const mongoDBToggleUserAccessFunction = async ( slug, decision, authToken ) => {
    return await axios.put( `${process.env.REACT_APP_API}/admin/user/access/${slug}`,  { decision },{ headers: { authToken:  authToken }});
};

// The function is used in AdminDashUserList.js file.
export const mongoDBDeleteUserFunction = async ( authToken, slug ) => {
    return await axios.delete( `${process.env.REACT_APP_API}/admin/user/${slug}`,
        { headers: {authToken}}
    );
};

// The function is used in AdminDashUserList.js file.
export const mongoDBGetSingleUserFunction = async ( slug ) => {
    return await axios.get( `${process.env.REACT_APP_API}/admin/user/${slug}` );
};

export const mongoDBGetAllUsersFunction = async ( sort, order, page ) => {
    return await axios.post( `${process.env.REACT_APP_API}/admin/users`,  { sort, order, page });
};

export const mongoDBGetUsersCountFunction = async () => {
    return await axios.get(`${process.env.REACT_APP_API}admin/users/total`);
};

export const mongoDBFetchUserByFilterFunction = async ( args ) => {
    return await axios.post( `${process.env.REACT_APP_API}admin/search/filters`, args );
};