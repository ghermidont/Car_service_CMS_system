//!IMPLEMENTED
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CarCreateForm from "../../components/forms/carFormsComponents/CarCreateForm";
import { useSelector } from "react-redux";
import { createCarFunction } from "../../functions/callsToCarRoutes";

// TODO implement the cascader.
/* Use the the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
  brand: "Car brand",
  model: "Car model",
  registrationPlate: "999999",
  revisions: "Revisions info",
  km: "999",
  year: "9999",
  client: "Client name",
  referenceToClient: "Client id"
};

export default function AddCarPage() {
    const [carParamsState, setCarParamsState] = useState(initialState);

    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
      event.preventDefault();
      createCarFunction(carParamsState, user.token)
        .then(() => {
          window.alert( "Car added is created" );
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.err);
        });
    };

    const handleInput = (event) => {
      // Dynamically update each of the initialState values by their name parameter.
      setCarParamsState({ ...carParamsState, [event.target.name]: event.target.value });
    };

  return (
      <main>
        <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
          <Link to="/add_client">Click to go to &rArr; Add Client Page</Link>
        </label>
         <h1>AddCarPage.js</h1>

         <CarCreateForm
           handleSubmit={handleSubmit}
           handleInput={handleInput}
           carParamsState={carParamsState}
           setCarParamsState={setCarParamsState}
         />

      </main>
  );
}