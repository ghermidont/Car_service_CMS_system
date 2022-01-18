/** Functions that trigger the calls to the user related backend routes. */
import axios from "axios";

export const mongoDBUpdateCurrentUserFunction = async ( email, userUpdates, authToken ) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/user/update`,
        userUpdates,
        {
            headers: { authToken },
            params: { email }
        }
    );
};