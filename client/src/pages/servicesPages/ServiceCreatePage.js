import React, {useState} from "react";
import { Link } from "react-router-dom";
import CarUpdateForm from "../../components/forms/carFormsComponents/CarCreateForm";
import {useSelector} from "react-redux";
import {createCarFunction} from "../../functions/callsToCarRoutes";
import {toast} from "react-toastify";
import CarCreateForm from "../../components/forms/carFormsComponents/CarCreateForm";

export default function ServiceCreatePage() {
    const [serviceParamsState, serviceCarParamsState] = useState(initialState);

    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
        event.preventDefault();
        createCarFunction(serviceParamsState, user.token)
            .then(() => {
                window.alert( "Car added is created" );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
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
                handleUserInput={handleUserInput}
                carParamsState={carParamsState}
                setCarParamsState={setCarParamsState}
            />

        </main>
  );
}