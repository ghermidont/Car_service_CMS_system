/** Functions that trigger the calls to admin related backend routes. */
import axios from "axios";

// export const mongoDBGetUsersListFunction = async (authToken) => {
//     return await axios.get(`${process.env.REACT_APP_API}/admin/users`, { headers: { authToken } });
// };

export const mongoDBToggleUserAccessFunction = async ( email, role, authToken ) => {
    return await axios
        .put( 
            `${process.env.REACT_APP_API}/admin/user/access`,  
            { role, email },
            { 
                headers: { authToken },
            }
        );
};

// The function is used in AdminDashUserList.js file.
export const mongoDBDeleteUserFunction = async ( authToken, email ) => {
    return await axios
        .delete( 
            `${process.env.REACT_APP_API}/admin/user/delete`,
            {
                headers: {authToken},
                params: { email }
            }
        );
};

// The function is used in AdminDashUserList.js file.
export const mongoDBGetSingleUserFunction = async ( email, authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/admin/user`,
            {
                params: { email },
                headers: { authToken }
            }
        );
};

export const mongoDBGetAllUsersFunction = async ( sort, order, page, authToken ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/admin/users`,
            { sort, order, page },
            { headers: { authToken } }
        );
};

export const mongoDBGetUsersCountFunction = async ( authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/admin/users/total`,
            { headers: { authToken } }
        );
};

export const mongoDBFetchUserByFilterFunction = async ( args ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/admin/search/filters`,
            args
        );
};