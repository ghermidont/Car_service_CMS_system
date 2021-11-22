/** Functions that trigger the calls to client manipulation related backend routes. */
import axios from "axios";

export const createClientFunction = async (newClient, authToken) => {
    return axios.post(`${process.env.REACT_APP_API}/client/new`, newClient, {
        headers: {authToken},
    });
};

//Calling the backend end point for total number of clients.
export const getClientsCountFunction = async () => {
    return axios.get(`${process.env.REACT_APP_API}/clients/total`);
};

export const listAllClientsFunction = async (count) => {
    return axios.get(`${process.env.REACT_APP_API}/clients`);
};

export const removeClientFunction = async (slug, authToken) => {
    return axios.delete(`${process.env.REACT_APP_API}/client/${slug}`, {
        headers: {
            authToken,
        },
    });
};

export const getSingleClientFunction = async (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/client/${slug}`);
};

export const updateClientFunction = async (slug, car, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/client/${slug}`, car, {
        headers: {
            authToken,
        },
    });
};

export const getClientListForPaginationFunction = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/clients`, { sort, order, page });
};

export const fetchClientByFilterFunction = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
