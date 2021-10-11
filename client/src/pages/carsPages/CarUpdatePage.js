//!IMPLEMENTED
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CarUpdateForm from "../../components/forms/carFormsComponents/CarCreateForm";
import { useSelector } from "react-redux";
import {getSingleCarFunction, updateCarFunction} from "../../functions/callsToCarRoutes";

// TODO implement the cascader.
/* Use the the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    brand: "",
    model: "",
    registrationPlate: "",
    revisions: "",
    km: "",
    year: "",
    client: "",
    referenceToClient: ""
};

export default function CarUpdatePage({match}) {
    const [currentCarParamsState, setCurrentCarParamsState] = useState(initialState);

    const { slug } = match.params;
    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCarDbInfo();
    }, []);

    const loadCarDbInfo = () => {
        getSingleCarFunction(slug).then((car) => {
            console.log("single car", car);
            setCurrentCarParamsState({ ...currentCarParamsState, ...car.data });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCarFunction(slug, currentCarParamsState, user.token)
            .then(() => {
                window.alert( "Car info is updated successfully." );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentCarParamsState({ ...currentCarParamsState, [event.target.name]: event.target.value });
    };

    return (
        <main>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/">Click to go to &rArr; Home Page</Link>
            </label>
            <h1>UpdateCarPage.js</h1>

            <CarUpdateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                currentCarParamsState={currentCarParamsState}
                setCurrentCarParamsState={setCurrentCarParamsState}
            />
        </main>
    );
}