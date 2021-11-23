/** Functions that trigger the calls to the user related backend routes. */
import axios from "axios";

export const mongoDBUpdateCurrentUserFunction = async (slug, userUpdates, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/user/update/${slug}`, userUpdates,{ headers: {authToken}});
};