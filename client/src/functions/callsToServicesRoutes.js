/** Functions that trigger the calls to services manipulation related backend routes. */
import axios from "axios";

export const mongoDBCreateServiceFunction = async ( authToken, service ) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/service/new`,
        service,
        { headers: { authToken } }
    );
};

export const mongoDBDeleteServiceFunction = async ( authToken, slug ) => {
    return await axios
        .delete(
            `${process.env.REACT_APP_API}/service/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBGetSingleServiceFunction = async ( slug, token ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/service/${slug}`,
            { headers: { authToken: token } }
        );
};

export const mongoDBUpdateServiceFunction = async ( slug, service, authToken ) => {
    return await axios
        .put(
            `${process.env.REACT_APP_API}/service/update/${slug}`,
            service,
            { headers: { authToken } }
        );
};

//The following two calls are used for forming the pagination.
//These two functions bellow are used for pagination.
export const mongoDBGetAllServicesFunction = async ( sort, order, page ) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/services`,
        { sort, order, page }
    );
};

//Calling the backend end point for total number of services.
export const mongoDBGetServicesCountFunction = async ( authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/services/total`,
            { headers: { authToken } }
        );
};

export const mongoDBFetchServiceByFilterFunction = async ( args ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/service/search`,
            args
        );
};