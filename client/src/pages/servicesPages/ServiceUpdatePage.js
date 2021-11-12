//!IMPLEMENTED

import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceUpdateForm from "../../components/forms/servicesFormComponents/ServiceCreateForm";
import { useSelector } from "react-redux";
import {getSingleServiceFunction, updateServiceFunction} from "../../functions/callsToServicesRoutes";

const initialState = {
    date: "",
    registrationPlate: "",
    brand: "",
    model: "",
    state: "",
    operator: "",
    anomalies: "",
    checks: "",
    performedRepairs: "",
    notes: "",
    damage: ""
};

export default function ServiceUpdatePage({match}) {
    const [currentServiceParamsState, setCurrentServiceParamsState] = useState(initialState);

    const { slug } = match.params;
    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadServiceDbInfo();
    }, []);

    const loadServiceDbInfo = () => {
        getSingleServiceFunction(slug).then((service) => {
            console.log("single service", service);
            setCurrentServiceParamsState({ ...currentServiceParamsState, ...service.data });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateServiceFunction(slug, currentServiceParamsState, user.token)
            .then(() => {
                window.alert( "Service info is updated successfully." );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentServiceParamsState({ ...currentServiceParamsState, [event.target.name]: event.target.value });
    };

    return (
        <main>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/">Click to go to &rArr; Home Page</Link>
            </label>
            <h1>ServiceUpdatePage.js</h1>

            <ServiceUpdateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                currentServiceParamsState={currentServiceParamsState}
                setCurrentServiceParamsState={setCurrentServiceParamsState}
            />
        </main>
    );
}