//!IMPLEMENTED
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClientUpdateForm from "../../components/forms/clientFormsComponents/ClientCreateForm";
import { useSelector } from "react-redux";
import {getSingleClientFunction, updateClientFunction} from "../../functions/callsToClientRoutes";

// TODO implement the cascader.
/* Use the the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    name: "",
    surname: "",
    date: "",
    fiscalCode: "",
    address: "",
    city: "",
    province: "",
    notes: "",
    mobile: "",
    email: ""
};

export default function ClientUpdatePage({match}) {
    const [currentClientParamsState, setCurrentClientParamsState] = useState(initialState);

    const { slug } = match.params;
    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadClientDbInfo();
    }, []);

    const loadClientDbInfo = () => {
        getSingleClientFunction(slug).then((client) => {
            console.log("Single client ", client);
            setCurrentClientParamsState({ ...currentClientParamsState, ...client.data });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateClientFunction(slug, currentClientParamsState, user.token)
            .then(() => {
                window.alert( "Client info is updated successfully." );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentClientParamsState({ ...currentClientParamsState, [event.target.name]: event.target.value });
    };

    return (
        <main>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/">Click to go to &rArr; Home Page</Link>
            </label>
            <h1>UpdateClientPage.js</h1>

            <ClientUpdateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                currentCarParamsState={currentClientParamsState}
                setCurrentCarParamsState={setCurrentClientParamsState}
            />
        </main>
    );
}