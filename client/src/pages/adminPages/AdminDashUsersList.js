"use strict";

import React, { useEffect, useState } from "react";

import {
    getSingleUserFunction,
    getUsersListFunction,
    deleteUserFunction,
    toggleUserAccessFunction
} from "../../functions/callsToAdminRoutes";

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const AdminDashUsersList = () => {
    const [UsersFromDb, setUsersFromDb] = useState({});

    //Getting the current user from Redux Store.
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUsersListFunction().then((res) => setUsersFromDb(res.data));
    }, []);

    const loadSingleUser = (e) => {
        getSingleUserFunction(e.target.name).then((res) => {
            setUsersFromDb(res.data);
        });
    };

    const removeCarFromDB = (slug, authToken) => {
        deleteUserFunction(slug, authToken)
            .then(
                ()=>window.alert("User removed successfully."))
            .catch(err=>window.alert(err)
            );
    }

    const showUsersInTable = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">BRAND</th>
                <th scope="col">MODEL</th>
                <th scope="col">REGISTRATION PLATE NR.</th>
                <th scope="col">REVISIONS</th>
                <th scope="col">MILEAGE</th>
                <th scope="col">YEAR</th>
                <th scope="col">CLIENT</th>
            </tr>
            </thead>

            <tbody>
            {UsersFromDb.map((userParam) => (
                <tr key={userParam._id}>
                    <td>{userParam._id}</td>
                    <td>{userParam.brand}</td>
                    <td>{userParam.model}</td>
                    <td>{userParam.registrationPlate}</td>
                    <td>{userParam.km}</td>
                    <td>{userParam.year}</td>
                    <td>{userParam.client}</td>
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
                            <h4> {UsersFromDb.length} Users</h4>

                            {!UsersFromDb.length ? (
                                <p>
                                    No users.
                                </p>
                            ) : (
                                showUsersInTable()
                            )}
                        </div>
                        <div className="col-md-4">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Products</p>
                            {CarsFromDb.map((c, i) => (
                                <div key={i}>
                                    <p>
                                        {c.title} x {c.count} = ${c.price * c.count}
                                    </p>
                                </div>
                            ))}
                            <hr />

                            <hr />
                            {/*TODO see where to get the slug from*/}
                            <Link to={`/car/${slug}`}>
                                <button className="btn btn-sm btn-primary mt-2">
                                    Car info
                                </button>
                            </Link>
                            <br />
                            <button
                                onClick={removeCarFromDB}
                                className="btn btn-sm btn-warning mt-2"
                            >
                                Remove car
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashUsersList;
