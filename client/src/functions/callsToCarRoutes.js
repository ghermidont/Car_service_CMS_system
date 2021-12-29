/** Functions that trigger the calls to cars manipulation related backend routes. */
import axios from "axios";

export const mongoDBCreateCarFunction = async ( authToken, car ) => {
    console.log( "mongoDBCreateCarFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/car/new`, 
            car, 
            { headers: { authToken } }
        );
};

// Not used anywhere. For just in case.
// export const mongoDBGetCarsByCountFunction = async (count) => {
//     return await axios.get(`${process.env.REACT_APP_API}/cars/${count}`);
// };

export const mongoDBDeleteCarFunction = async ( authToken, slug ) => {
    console.log( "mongoDBDeleteCarFunction() worked" );
    return await axios
        .delete(
            `${process.env.REACT_APP_API}/car/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBGetSingleCarFunction = async ( slug, authToken ) => {
    console.log( "mongoDBGetSingleCarFunction() worked" );
    return await axios
        .get(
            `${process.env.REACT_APP_API}/car/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBUpdateCarFunction = async (slug, car, authToken) => {
    console.log( "mongoDBUpdateCarFunction() worked" );
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
    console.log( "mongoDBGetAllCarsFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/cars`, 
            { sort, order, page, userId }
        );
};

export const mongoDBFetchCarByFilterFunction = async ( userId, query ) => {
    console.log( "mongoDBFetchCarByFilterFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/car/search`,
            { userId, query }
        );
};

export const mongoDBGetCarsByFilterFunction = async ( sort, order, clientId, userId ) => {
    console.log( "mongoDBGetAllCarsFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/cars/filter`,
            { sort, order, clientId, userId }
        );
};

//Calling the backend end point for total number of products.
export const mongoDBGetCarsCountFunction = async ( userId ) => {
    console.log( "mongoDBGetCarsCountFunction() worked" );
    return await axios
        .get(
            `${process.env.REACT_APP_API}/cars/total`,
            { params: { userId } }
        );
};

export const mongoDBGetAlertsFunction = async ( sort, order, page, currentDate, userId ) => {
    console.log( "mongoDBGetAlertsFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/alerts`,
            { sort, order, page, currentDate, userId }
        );
};

export const mongoDBGetAlertsCountFunction = async ( userId, currentDate ) => {
    console.log( "mongoDBGetAlertsCountFunction() worked" );
    return await axios
        .get(
            `${process.env.REACT_APP_API}/alerts/total`,
            { params: { userId, currentDate } }
        );
};

export const mongoDBToggleAlertParamsFunction = async ( slug, field, value, authToken ) => {
    return await axios
        .put(
            `${process.env.REACT_APP_API}/alert/toggle`,
            { slug, field, value },
            {
                headers: { authToken },
            }
        );
};

