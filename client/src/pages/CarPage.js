"use strict";

import React, { useEffect, useState } from "react";
import { getSingleCar } from "../functions/toCarRoute";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";

//TODO find the origin of match.
const CarPage = ({ match }) => {
  const [car, setCar] = useState({});
//const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  const { brand, model, registrationPlate, revisions, km, year, client, referenceToClient } = car;

  useEffect(() => {
    loadSingleCar();
  }, [slug]);

  const loadSingleCar = () => {
    getSingleCar(slug).then((res) => {
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
