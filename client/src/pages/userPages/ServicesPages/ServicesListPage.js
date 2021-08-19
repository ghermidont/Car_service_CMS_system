import React, { useEffect, useState } from "react";
import {listAllServicesFunction, deleteServiceFunction} from "../../../functions/callsToServicesRoute";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const ServicesListPage = () => {
    const [values, setValues] = useState();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        listAllServicesFunction().then((res) => setValues(res.data));
    }, []);

    const removeServiceFromDB = (slug, id) => {
        deleteServiceFunction(slug, user.token)
            .then(()=>window.alert(`Service with id: ${id} removed successfully.`))
            .catch(err=>window.alert(err));
    }

    const showServicesInTable = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">DATA</th>
                    <th scope="col">LICENCE PLATE</th>
                    <th scope="col">BRAND</th>
                    <th scope="col">MODEL</th>
                    <th scope="col">STATE</th>
                </tr>
            </thead>

            <tbody>
            {values.map((val, i) => (
                <tr key={val._id+i}>
                    <td>{val._id}</td>
                    <td>{val.data}</td>
                    <td>{val.licensePlate}</td>
                    <td>{val.brand}</td>
                    <td>{val.model}</td>
                    <td>{val.state}</td>
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
                            <p>Services list:</p>
                            {!values.length ? (
                                <p>
                                    No services to display.
                                </p>
                            ) : (
                                showServicesInTable()
                            )}
                        </div>
                        <div className="col-md-4">
                            {values.map((serv) => (
                                <>
                                    <Link to={`/service/${serv.slug}`}>
                                        <button className="btn btn-sm btn-primary mt-2">
                                            Service info
                                        </button>
                                    </Link>
                                    <br />
                                    <button
                                        onClick={()=>removeServiceFromDB(serv.slug, serv._id)}
                                        className="btn btn-sm btn-warning mt-2"
                                    >
                                        Remove service
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

export default ServicesListPage;