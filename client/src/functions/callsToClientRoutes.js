/** Functions that trigger the calls to clients manipulation related backend routes. */
import axios from "axios";

export const mongoDBCreateClientFunction = async ( authToken, client ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/client/new`,
            client,
            { headers: {authToken} }
        );
};

// Not used anywhere. For just in case.
// export const mongoDBGetClientsByCountFunction = async (count) => {
//     return await axios.get(`${process.env.REACT_APP_API}/clients/${count}`);
// };

export const mongoDBDeleteClientFunction = async ( authToken, slug ) => {
    return await axios
        .delete(
            `${process.env.REACT_APP_API}/client/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBGetSingleClientFunction = async ( slug, authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/client/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBUpdateClientFunction = async ( slug, client, authToken ) => {
    return await axios
        .put(
            `${process.env.REACT_APP_API}/client/update/${slug}`,
            client,
            { headers: { authToken }}
        );
};

//The following two calls are used for forming the pagination.
//These two functions bellow are used for pagination.
export const mongoDBGetAllClientsFunction = async ( sort, order, page ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/clients`,
            { sort, order, page }
        );
};

//Calling the backend end point for total number of products.
export const mongoDBGetClientsCountFunction = async ( authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/clients/total`,
            { headers: { authToken } }
        );
};

export const mongoDBFetchClientByFilterFunction = async ( args ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/client/search`,
            args
        );
};