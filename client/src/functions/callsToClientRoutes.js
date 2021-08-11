//This file contains Axios request to the backend related to clients manipulations.
import axios from "axios";

export const createClientFunction = async (newClient, authToken) => {
    await axios.post(`${process.env.REACT_APP_API}/client/new`, newClient, {
        headers: {authToken},
    });
};

//Calling the backend end point for total number of clients.
export const getClientsCountFunction = async () => {
    await axios.get(`${process.env.REACT_APP_API}/clients/total`);
}

export const listAllClientsFunction = async (count) => {
    await axios.get(`${process.env.REACT_APP_API}/clients`);
};

export const removeClientFunction = async (slug, authToken) => {
    await axios.delete(`${process.env.REACT_APP_API}/client/${slug}`, {
        headers: {
            authToken,
        },
    });
};

export const getSingleClientFunction = async (slug) => {
    await axios.get(`${process.env.REACT_APP_API}/client/${slug}`);
}

export const updateClientFunction = async (slug, car, authToken) => {
    await axios.put(`${process.env.REACT_APP_API}/client/${slug}`, car, {
        headers: {
            authToken,
        },
    });
}

export const getClientListForPaginationFunction = async (sort, order, page) => {
    await axios.post(`${process.env.REACT_APP_API}/clients`, { sort, order, page });
}

export const fetchClientByFilterFunction = async (arg) => {
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
}
