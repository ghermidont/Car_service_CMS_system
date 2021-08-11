"use strict";

import React, { useEffect, useState } from "react";
import {listAllClientsFunction, removeClientFunction} from "../../../functions/callsToClientRoutes";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ClientsListPage = () => {
    const [ClientsFromDb, setClientsFromDb] = useState({});
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        listAllClientsFunction().then((res) => setClientsFromDb(res.data));
    }, []);

    const removeClientFromDB = (slug, id) => {
        removeClientFunction(slug, user.token)
            .then(()=>window.alert(`Client with id: ${id} removed successfully.`))
            .catch(err=>window.alert(err));
    }

    const showClientsInTable = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">SURNAME</th>
                <th scope="col">MOBILE PHONE</th>
                <th scope="col">LIST OF CARS</th>
            </tr>
            </thead>

            <tbody>
            {ClientsFromDb.map((clientParam) => (
                <tr key={clientParam._id}>
                    <td>{clientParam._id}</td>
                    <td>{clientParam.name}</td>
                    <td>{clientParam.surname}</td>
                    <td>{clientParam.mobile}</td>
                    <td>{clientParam.cars.length>0?clientParam.cars.map((car)=><Link to={`car/${car.slug}`}>{car.licensePlate}</Link>):<p>No registered cars</p>}</td>
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
                            <p>Cars list:</p>
                            {!ClientsFromDb.length ? (
                                <p>
                                    No clients to display.
                                </p>
                            ) : (
                                showClientsInTable()
                            )}
                        </div>
                        <div className="col-md-4">
                            {ClientsFromDb.map((client) => (
                                <>
                                    <Link to={`/client/${client.slug}`}>
                                        <button className="btn btn-sm btn-primary mt-2">
                                            Car info
                                        </button>
                                    </Link>
                                    <br />
                                    <button
                                        onClick={()=>removeClientFromDB(client.slug, client._id)}
                                        className="btn btn-sm btn-warning mt-2"
                                    >
                                        Remove client
                                    </button>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientsListPage;