//!IMPLEMENTED

import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {createServiceFunction} from "../../functions/callsToServicesRoutes";
import {toast} from "react-toastify";
import ServiceCreateForm from "../../components/forms/servicesFormComponents/ServiceCreateForm";

const initialState = {
    date: "dd/mm/yyyy",
    registrationPlate: "GH9999",
    brand: "Car brand",
    model: "Car model",
    state: "done",
    operator: "Donald Duck",
    anomalies: " Broken steering system",
    checks: "On 07.09.2021",
    performedRepairs: "Steering system repair",
    notes: "breaking system close to wearing out.",
    damage: "No accidents registered."
};

export default function ServiceCreatePage() {
    const [serviceParamsState, setServiceParamsState] = useState(initialState);

    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
        event.preventDefault();
        createServiceFunction(serviceParamsState, user.token)
            .then(() => {
                window.alert( "Service added is created" );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setServiceParamsState({ ...serviceParamsState, [event.target.name]: event.target.value });
    };

    return (
        <main>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/add_client">Click to go to &rArr; Add Client Page</Link>
            </label>
            <h1>ServiceCreatePage.js</h1>

            <ServiceCreateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                serviceParamsState={serviceParamsState}
                setServiceParamsState={setServiceParamsState}
            />

        </main>
    );
}