"use strict";

import React, { useEffect, useState } from "react";
import { getSingleCarFunction } from "../functions/toCarRoute";
//import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

//match is a parameter of <Route> that gets parts of the Uri.
const CMSCarPage = ({ match }) => {
  const [car, setCar] = useState({});
//const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  const { brand, model, registrationPlate, revisions, km, year, client, referenceToClient } = car;

  useEffect(() => {
    loadSingleCar();
  }, [slug]);

  const loadSingleCar = () => {
    getSingleCarFunction(slug).then((res) => {
      setCar(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <div className="container-fluid pt-2">
          <div className="row">
            <div className="col-md-8">
              {car.map((carParameter)=>
                <ul>
                  {/*//TODO complete the info page.*/}
                  <li>{carParameter._id}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSCarPage;
