/** Functions that trigger the calls to cars manipulation related backend routes. */
import axios from "axios";

export const mongoDBCreateCarFunction = async ( authToken, car ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/car/new`, 
            car, 
            { headers: {authToken} } 
        );
};

// Not used anywhere. For just in case.
// export const mongoDBGetCarsByCountFunction = async (count) => {
//     return await axios.get(`${process.env.REACT_APP_API}/cars/${count}`);
// };

export const mongoDBDeleteCarFunction = async ( authToken, slug ) => {
    return await axios
        .delete(
            `${process.env.REACT_APP_API}/car/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBGetSingleCarFunction = async ( slug ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/car/${slug}`
        );
};

export const mongoDBUpdateCarFunction = async (slug, car, authToken) => {
    return await axios
        .put(
            `${process.env.REACT_APP_API}/car/update/${slug}`, 
            car, {
                headers: { authToken }
            }
        );
};

//The following two calls are used for forming the pagination.
//These two functions bellow are used for pagination.
export const mongoDBGetAllCarsFunction = async ( sort, order, page ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/cars`, 
            { sort, order, page }
        );
};

//Calling the backend end point for total number of products.
export const mongoDBGetCarsCountFunction = async ( authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/cars/total`,
            { headers: { authToken } }
        );
};

export const mongoDBFetchCarByFilterFunction = async ( args ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/car/search`,
            args
        );
};