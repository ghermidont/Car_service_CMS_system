//!Start here
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {getSingleCarFunction, updateCarFunction} from "../../functions/callsToCarRoutes";

// TODO implement the cascader.
/* Use the the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    brand: "the brand",
    model: "the model",
    registrationPlate: "9999",
    revisions: "revision info",
    km: "99999",
    year: "3021",
    client: "some client name",
    referenceToClient: "client ID from the DB"
};

export default function CarUpdatePage({match}) {
    const [currentCarParamsState, setCurrentCarParamsState] = useState(initialState);

    const {
        brand,
        model,
        registrationPlate,
        revisions,
        km,
        year,
        client
    } = currentCarParamsState;

    const { slug } = match.params;
    // Get the user from Redux Store
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCarDbInfo();
        // eslint-disable-next-line
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

    //Start here. Finish the individual car info page with link to the car update page.
    return (
        <main>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/">Click to go to &rArr; Home Page</Link>
            </label>
            <h1>UpdateCarPage.js</h1>

            <div className="container mx-auto py-20">
                <form onSubmit={handleSubmit}>
                    {/*TODO Add here inputs from the database with cascader.*/}
                    <label className='block mb-8 text-xl max-w-600'> MARCA
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="text"
                            name="brand"
                            value={brand}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'> MODELLO
                        <input
                            type="text"
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            name="model"
                            value={model}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'> TARGA
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="text"
                            name="registrationPlate"
                            value={registrationPlate}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'> REVISIONE
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="text"
                            name="revisions"
                            value={revisions}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'> KM
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="number"
                            name="km"
                            value={km}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'> ANNO
                        {/*TODO add here regular expression for year only input or replace with date type input*/}
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="number"
                            value={year}
                            onChange={handleUserInput}
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'>CLIENTE
                        {/*TODO consider adding live search algorithm from the clients database.*/}
                        <input
                            className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                            type="text"
                            value={client}
                            onChange={handleUserInput}
                        />
                    </label>

                    <div className='flex justify-end'>

                        <button className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                            </svg>
                            Salva
                        </button>

                    </div>
                </form>
            </div>
        </main>
    );
}