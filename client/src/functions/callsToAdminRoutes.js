import axios from "axios";
import {adminCheckMiddleware, authCheckMiddleware} from "../middlewares/authMiddleware";
import {
    CMSUsersForPaginationController,
    deleteCMSUserController,
    getSingleCMSUserController, listAllCMSUsersController, searchFiltersController,
    toggleCMSUserAccessController
} from "../controllers/adminController";

export const getUsersListFunction = async (authToken) => {
    await axios.get(`${process.env.REACT_APP_API}/admin/users`, { headers: { authToken } })
};

export const toggleUserAccessFunction = async (userId, decision, authToken) => {
  await axios.put( `${process.env.REACT_APP_API}/admin/user/access/:slug`,  { userId, decision },
    { headers: { authToken:  authToken }}
  )
};

export const deleteUserFunction = async (slug, authToken) => {
    await axios.delete( `${process.env.REACT_APP_API}/admin/user/delete/:slug`,  {
        headers: {
            authToken,
        },
    });
};

export const getSingleUserFunction = async (slug, authToken) => {
    await axios.get( `${process.env.REACT_APP_API}/admin/user/${slug}`,
        { headers: { authToken:  authToken }}
    )
};

//! Why POST?
export const getUsersListForPaginationFunction = async (sort, order, page, authToken) => {
    await axios.post( `${process.env.REACT_APP_API}/admin/users/pagination`,  { sort, order, page },
        { headers: { authToken:  authToken }}
    );
};

export const getUsersCountFunction = async () => {
    await axios.get(`${process.env.REACT_APP_API}admin/users/total`);
}

//! Why POST?
export const fetchUserByFilterFunction = async (arg) => {
    await axios.post( `${process.env.REACT_APP_API}admin/search/filters`, arg);
};