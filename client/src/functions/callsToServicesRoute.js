//This file contains Axios request to the backend related to provided services manipulations.
import axios from "axios";

export const createServiceFunction = async (newCar, authToken) => {
    await axios.post(`${process.env.REACT_APP_API}/service/new`, newCar, {
        headers: {authToken}
    });
};

//Calling the backend end point for total number of products.
export const getServicesCountFunction = async () => {
    await axios.get(`${process.env.REACT_APP_API}/services/total`);
}

export const listAllServicesFunction = async (count) => {
    await axios.get(`${process.env.REACT_APP_API}/services`);
};

export const removeServiceFunction = async (slug, authToken) => {
    await axios.delete(`${process.env.REACT_APP_API}/service/${slug}`, {
        headers: {
            authToken
        },
    });
};

export const getSingleServiceFunction = async (slug) => {
    await axios.get(`${process.env.REACT_APP_API}/service/${slug}`);
}

export const updateServiceFunction = async (slug, car, authToken) => {
    await axios.put(`${process.env.REACT_APP_API}/service/${slug}`, car, {
        headers: {
            authToken
        },
    });
}

export const getServicesListForPaginationFunction = async (sort, order, page) => {
    await axios.post(`${process.env.REACT_APP_API}/services`, { sort, order, page });
}

export const fetchServiceFilterFunction = async (arg) => {
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
}
