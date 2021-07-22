"use strict";

import React, { useEffect, useState } from "react";
import {getSingleCarFunction, listAllCarsFunction, removeCarFunction} from "../functions/toCarRoute";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const CMSCarsInfoTablePage = () => {
    const [DbCars, setDbCars] = useState({});
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        listAllCarsFunction().then((res) => setDbCars(res.data));
    }, []);

    const loadSingleCar = (e) => {
        getSingleCarFunction(e.target.name).then((res) => {
            setDbCars(res.data);
        });
    };

    const removeCarFromDB = (slug, authToken) => {
        removeCarFunction(slug, authToken).then(()=>window.alert("Car removed successfully.")).catch(err=>window.alert(err));
    }

    const showOrderInTable = (order) => (
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
            {DbCars.map((carParam) => (
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
                            <h4>Cart / {DbCars.length} Product</h4>

                            {!DbCars.length ? (
                                <p>
                                    No products in cart. <Link to="/shop">Continue Shopping.</Link>
                                </p>
                            ) : (
                                showCartItems()
                            )}
                        </div>
                        <div className="col-md-4">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Products</p>
                            {DbCars.map((c, i) => (
                                <div key={i}>
                                    <p>
                                        {c.title} x {c.count} = ${c.price * c.count}
                                    </p>
                                </div>
                            ))}
                            <hr />

                            <hr />
                           <Link to={`/car/${slug}`}>
                                    <button
                                        className="btn btn-sm btn-primary mt-2"
                                        disabled={!DbCars.length}
                                    >
                                        Proceed to Checkout
                                    </button>
                           </Link>
                                    <br />
                                    <button
                                        onClick={removeCarFromDB}
                                        className="btn btn-sm btn-warning mt-2"
                                        disabled={!DbCars.length}
                                    >
                                        Pay Cash on Delivery
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMSCarsInfoTablePage;
