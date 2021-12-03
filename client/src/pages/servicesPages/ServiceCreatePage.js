import React, { useState } from "react";
import { useSelector } from "react-redux";
import { mongoDBCreateServiceFunction } from "../../functions/callsToServicesRoutes";
import { toast } from "react-toastify";

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

export default function ServiceCreatePage( { history } ) {
    const [ serviceParamsState, setServiceParamsState ] = useState( initialState );
    const { date, registrationPlate, brand, model, state, operator, anomalies, checks, performedRepairs, notes, damage } = serviceParamsState;

    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        console.log( "ServiceCreatePage() handleSubmit() worked!" );

        try {
            console.log( "serviceParamsState: ", serviceParamsState );
            mongoDBCreateServiceFunction( reduxStoreUser.token, serviceParamsState ).then( () => {
                console.log( "mongoDBCreateServiceFunction() worked in ServiceCreatePage.js" );
                toast.success( "Service added successfully." );
                history.push( "/services_list" );
            })
                .catch( ( error ) => {
                    console.log( "mongoDBCreateServiceFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                    //Logout logic.
                });
        } catch ( error ) {
            console.log( "mongoDBCreateServiceFunction() in handleSubmit try catch error: ", error.message );
            toast.error( "Error adding service: ", error.message );
        }
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setServiceParamsState( { ...serviceParamsState, [ event.target.name ]: event.target.value } );
    };

    return (
        <main>
         
            <h1>ServiceCreatePage.js</h1>

            <main>
                <div className="container mx-auto">
                    <div className="my-20">
                        <table className="mx-auto">
                            <thead>
                                <tr>
                                    <th className="px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Data
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Targa
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Marca
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Modello
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Stato
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                        Operatore
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="date"
                                            value={ date }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="registrationPlate"
                                            value={ registrationPlate }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="brand"
                                            value={ brand }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="model"
                                            value={ model }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="state"
                                            value={ state }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                    <td className="border border-border px-3">
                                        <input
                                            className="block container px-2 py-1 outline-none mt-1.5"
                                            type="text"
                                            name="operator"
                                            value={ operator }
                                            onChange={ handleUserInput }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="max-w-1075 mx-auto">
                        <form onSubmit={ handleSubmit }>
                            <label className="block mb-6 text-xl uppercase">
                                Anomalie
                                <textarea
                                    className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                    name="anomalies"
                                    value={ anomalies }
                                    onChange={ handleUserInput }
                                    rows="4"
                                >
                                </textarea>
                            </label>
                            <label className="block mb-6 text-xl uppercase">
                                Controlli
                                <textarea
                                    className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                    name="checks"
                                    value={ checks }
                                    onChange={ handleUserInput }
                                    rows="2"
                                >
                                </textarea>
                            </label>
                            <label className="block mb-6 text-xl uppercase">
                                Lavori Fatti
                                <textarea
                                    className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                    name="performedRepairs"
                                    value={ performedRepairs }
                                    onChange={ handleUserInput }
                                    rows="2"
                                >
                                </textarea>
                            </label>
                            <div className="flex justify-between">
                                <div className="w-45%">
                                    <label className="block mb-2 text-xl uppercase">
                                        Note
                                        <textarea
                                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                            name="notes"
                                            value={ notes }
                                            onChange={ handleUserInput }
                                            rows="8"
                                        >
                                        </textarea>
                                    </label>
                                </div>
                                <div className="w-45%">
                                    <label className="block mb-2 text-xl uppercase">
                                        Danni
                                        <textarea
                                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                            name="damage"
                                            value={ damage }
                                            onChange={ handleUserInput }
                                            rows="8"
                                        >
                                        </textarea>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-end mt-12">
                        <button
                            className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70"
                            type="submit"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                            </svg>
                            Salva
                        </button>
                    </div>
                </div>
            </main>
        </main>
    );
}