import React, { useEffect, useState } from "react";
import {listAllCarsFunction, removeCarFunction} from "../../../functions/callsToCarRoutes";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const CarsListPage = () => {
    const [CarsFromDb, setCarsFromDb] = useState({});
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        listAllCarsFunction().then((res) => setCarsFromDb(res.data));
    }, []);

    const removeCarFromDB = (slug, plate) => {
        removeCarFunction(slug, user.token)
            .then(()=>window.alert(`Car with registration palate ${plate} removed successfully.`))
            .catch(err=>window.alert(err));
    }

    const showCarsInTable = () => (
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
            {CarsFromDb.map((carParam) => (
                <tr key={carParam._id}>
                    <td>{carParam._id}</td>
                    <td>{carParam.brand}</td>
                    <td>{carParam.model}</td>
                    <td>{carParam.registrationPlate}</td>
                    <td>{carParam.km}</td>
                    <td>{carParam.year}</td>
                    <td>{carParam.client}</td>
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
                            {!CarsFromDb.length ? (
                                <p>
                                    No cars to display.
                                </p>
                            ) : (
                                showCarsInTable()
                            )}
                        </div>
                        <div className="col-md-4">
                            {CarsFromDb.map((car) => (
                                <>
                                    <Link to={`/car/${car.slug}`}>
                                        <button className="btn btn-sm btn-primary mt-2">
                                            Car info
                                        </button>
                                    </Link>
                                    <br />
                                    <button
                                        onClick={()=>removeCarFromDB(car.slug, car.registrationPlate)}
                                        className="btn btn-sm btn-warning mt-2"
                                    >
                                        Remove car
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

export default CarsListPage;
