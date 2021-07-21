"use strict";

import React, { useEffect, useState } from "react";
import { getSingleCarFunction, listAllCarsFunction } from "../functions/toCarRoute";
import {Link} from "react-router-dom";

//TODO find the origin of match.
const CarsInfoTablePage = () => {
    const [car, setCar] = useState({});
    const [DbCars, setDbCars] = useState({});

    const { brand, model, registrationPlate, revisions, km, year, client, referenceToClient } = car;

    useEffect(() => {
        listAllCarsFunction().then();
    }, []);

    const loadSingleCar = (e) => {
        //!!TODO find in the original cod the redirect to the single product page.
        getSingleCarFunction(e.target.name).then((res) => {
            setCar(res.data);
        });
    };

    const showCartItems = () => (
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
        </table>
    );

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <div className="container-fluid pt-2">
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Cart / {cart.length} Product</h4>

                            {!cart.length ? (
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
                            {cart.map((c, i) => (
                                <div key={i}>
                                    <p>
                                        {c.title} x {c.count} = ${c.price * c.count}
                                    </p>
                                </div>
                            ))}
                            <hr />
                            Total: <b>${getTotal()}</b>
                            <hr />
                            {user ? (
                                <>
                                    <button
                                        onClick={saveOrderToDb}
                                        className="btn btn-sm btn-primary mt-2"
                                        disabled={!cart.length}
                                    >
                                        Proceed to Checkout
                                    </button>
                                    <br />
                                    <button
                                        onClick={saveCashOrderToDb}
                                        className="btn btn-sm btn-warning mt-2"
                                        disabled={!cart.length}
                                    >
                                        Pay Cash on Delivery
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-sm btn-primary mt-2">
                                    <Link
                                        to={{
                                            pathname: "/login",
                                            state: { from: "cart" },
                                        }}
                                    >
                                        Login to Checkout
                                    </Link>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPage;
