//This file contains Axios request to the backend related to cars manipulations.
import axios from "axios";

export const createCarFunction = async (newCar, authToken) => {
  await axios.post(`${process.env.REACT_APP_API}/car/new`, newCar, {
    headers: {authToken},
  });
};

//Calling the backend end point for total number of products.
export const getCarsCountFunction = async () => {await axios.get(`${process.env.REACT_APP_API}/cars/total`);}

export const listAllCarsFunction = async (count) => {
  await axios.get(`${process.env.REACT_APP_API}/products`);
};

export const removeCarFunction = async (slug, authToken) => {
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authToken,
    },
  });
};

export const getSingleCarFunction = async (slug) => {
  await axios.get(`${process.env.REACT_APP_API}/car/${slug}`);
}

export const updateCarFunction = async (slug, car, authToken) => {
  await axios.put(`${process.env.REACT_APP_API}/car/${slug}`, car, {
    headers: {
      authToken,
    },
  });
}

export const getCarsListForPaginationFunction = async (sort, order, page) => {
  await axios.post(`${process.env.REACT_APP_API}/cars`, { sort, order, page });
}

export const fetchCarByFilterFunction = async (arg) => {
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
}  
