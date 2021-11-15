/** Functions that trigger the calls to the user related backend routes. */
import axios from "axios";

export const updateUser = async (authToken, userUpdates) => {
    await axios.put(`${process.env.REACT_APP_API}/user/update-user`, userUpdates,{ headers: {authToken}});
};

