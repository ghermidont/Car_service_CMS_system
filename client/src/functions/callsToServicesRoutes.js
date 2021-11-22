/** Functions that trigger the calls to services manipulation related backend routes. */

import axios from "axios";

export const createServiceFunction = async (newService, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/service/new`, newService,{headers: {authToken}});
};

//Calling the backend end point for total number of products.
export const getServicesCountFunction = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/services/total`);
};

export const listAllServicesFunction = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/services`);
};

export const deleteServiceFunction = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/service/${slug}`,{headers: {authToken}});
};

export const getSingleServiceFunction = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/service/${slug}`);
};

export const updateServiceFunction = async (slug, car, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/service/${slug}`, car, {headers: {authToken}});
};

export const getServicesListForPaginationFunction = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/services`, { sort, order, page });
};

export const fetchServiceFilterFunction = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
