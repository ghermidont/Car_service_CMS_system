/** Functions that trigger the calls to cars manipulation related backend routes. */
import axios from "axios";

export const createCarFunction = async (newCar, authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/car/new`, newCar, {
        headers: {authToken},
    });
};

export const listAllCarsFunction = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/cars`);
};

export const removeCarFunction = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/car/${slug}`, {
        headers: {
            authToken,
        },
    });
};

export const getSingleCarFunction = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/car/${slug}`);
};

export const updateCarFunction = async (slug, car, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/car/${slug}`, car, {
        headers: {
            authToken,
        },
    });
};

//The following two calls are used for forming the pagination.
//Calling the backend end point for total number of products.
export const getCarsCountFunction = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/cars/total`);
};

export const getCarsListForPaginationFunction = async (sort, order, page) => {
    return await axios.post(`${process.env.REACT_APP_API}/cars`, { sort, order, page });
};

export const fetchCarByFilterFunction = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};  
