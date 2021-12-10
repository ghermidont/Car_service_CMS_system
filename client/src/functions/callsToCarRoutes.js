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

export const mongoDBGetSingleCarFunction = async ( slug, authToken ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/car/${slug}`,
            { headers: { authToken } }
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
export const mongoDBGetAllCarsFunction = async ( sort, order, page, userId ) => {
    console.log("userId", userId);
    return await axios
        .post(
            `${process.env.REACT_APP_API}/cars`, 
            { sort, order, page, userId }
        );
};

export const mongoDBGetCarsByFilterFunction = async ( sort, order, userId ) => {
    console.log("mongoDBGetCarsByFilterFunction() userId: ", userId);
    return await axios
        .post(
            `${process.env.REACT_APP_API}/cars/filter`,
            { sort, order, userId }
        );
};

//Calling the backend end point for total number of products.
export const mongoDBGetCarsCountFunction = async ( userId ) => {
    return await axios
        .get(
            `${process.env.REACT_APP_API}/cars/total`,
            { params: { userId } }
        );
};

export const mongoDBFetchCarByFilterFunction = async ( args ) => {
    return await axios
        .post(
            `${process.env.REACT_APP_API}/car/search`,
            args
        );
};