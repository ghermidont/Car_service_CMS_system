"use strict";

import React, { useEffect, useState } from "react";

import {
    getSingleUserFunction,
    getUsersListFunction,
    deleteUserFunction,
    toggleUserAccessFunction
} from "../../functions/callsToAdminRoutes";

//import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import IndividualUserModalPage from "./individualUserModalPage";

const AdminDashUsersList = () => {
    const [UsersFromDb, setUsersFromDb] = useState({});

    //Getting the current user from Redux Store.
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUsersListFunction().then((res) => setUsersFromDb(res.data));
    }, []);

    // const loadSingleUser = (e) => {
    //     getSingleUserFunction(e.target.name).then((res) => {
    //         setUsersFromDb(res.data);
    //     });
    // };

    const deleteUserFromDB = (slug, authToken) => {
        deleteUserFunction(slug, authToken)
            .then(
                ()=>window.alert("User removed successfully."))
            .catch(err=>window.alert(err)
            );
    }

    const toggleUserAccess = (userId, decision, authToken) => {
        toggleUserAccessFunction(userId, decision, authToken)
            .then(
                ()=>window.alert("status updated."))
            .catch(err=>window.alert(err))
    }

    const showUsersInTable = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">FISCAL CODE</th>
                <th scope="col">DATE OF BIRTH</th>
                <th scope="col">DATE REGISTERED</th>
                <th scope="col">STATUS</th>
                <th scope="col">COMMENTS</th>
            </tr>
            </thead>

            <tbody>
            {UsersFromDb.map((userParam) => (
                <tr key={userParam._id}>
                    {/*TODO Remove brackets after creating the object.*/}
                    <td>{"userParam.name"}</td>
                    <td>{"userParam.address"}</td>
                    <td>{"userParam.fiscalCode"}</td>
                    <td>{"userParam.birthDate"}</td>
                    <td>{"userParam.dateRegistered"}</td>
                    <td>{"userParam.status"}</td>
                    <td>{"userParam.comments"}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <div className="container-fluid pt-2">
                    <div className="row">
                        <div className="col-md-8">
                            <h4> {UsersFromDb.length} Users table:</h4>
                            {!UsersFromDb.length ? (
                                <p>
                                    No users.
                                </p>
                            ) : (
                                showUsersInTable()
                            )}
                        </div>

                            <hr />
                            {/*TODO see where to get the slug from*/}
                            {/*<Link to={`/car/${slug}`}>*/}
                                <button className="btn btn-sm btn-primary mt-2">
                                    More info
                                </button>
                            {/*</Link>*/}
                            <br />
                            <button
                                onClick={deleteUserFromDB}
                                className="btn btn-sm btn-warning mt-2"
                            >
                                Delete user
                            </button>
                            <button
                                onClick={toggleUserAccess}
                                className="btn btn-sm btn-warning mt-2"
                            >
                                Toggle user access
                            </button>
                            {/*TODO Pass the user params to the individual. Consult the individual product page.*/}
                            <IndividualUserModalPage getSingleUserFunction={getSingleUserFunction}/>
                       </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashUsersList;
