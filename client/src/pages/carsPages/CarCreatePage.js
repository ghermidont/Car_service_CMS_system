import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBCreateCarFunction } from "../../functions/callsToCarRoutes";
import { mongoDBGetCurrentUserFunction } from "../../functions/callsToAuthRoutes";
import { mongoDBGetAllClientsFunctionNoPag } from "../../functions/callsToClientRoutes";

// TODO implement the cascader.
/* Use the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

//TODO consider implementing here the ReduxStore user id extraction instead of mongoDBGetCurrentUserFunction().
const initialState = {
    user: "user",
    brand: "brand",
    model: "model",
    licensePlate: "licensePlate",
    revisions: {
        start: "",
        end: "",
    },
    alerts: {
        read: false,
        show: false,
    },
    km: "99999",
    year: "9999",
    client: "Client",
};

export default function CarCreatePage( { history } ){
    const [ carParamsState, setCarParamsState ] = useState( initialState );
    const [ clientsListState, setClientsListState ] = useState( initialState );
    const { reduxStoreUser } = useSelector(( state) => ( { ...state } ) );

    const {
        brand,
        model,
        licensePlate,
        revisions,
        km,
        year,
    } = carParamsState;



    const loadAllClients = async () => {
        // sort, order
        await mongoDBGetAllClientsFunctionNoPag( "createdAt", "desc", reduxStoreUser._id )
            .then( ( res ) => {
                setClientsListState( res.data );            
            }).catch(( error ) => {
                toast.error("Error getting all clients: ", error );
                console.log( "Error getting all clients", error );
            });
    };
    
    const getCurrentUser = async () => {
        await mongoDBGetCurrentUserFunction( reduxStoreUser.token, reduxStoreUser.email )
            .then( ( res ) => {
                // Add data to the React Store.
                if ( res.data !== null ) {
                    console.log( "Current User data: ", res.data._id );
                    carParamsState.user = res.data._id;
                    console.log( "carParamsState: ", carParamsState );
                } else {
                    toast.error( "No user info in the response from the backend." );
                }
            }).catch((err) => {
                console.log( "Error while getting the user info: ", err );
                toast.error( `Error while getting the user info: ${ err }` );
            });
    };

    useEffect( () => {
        getCurrentUser().then( ()=>console.log( "getCurrentUser() worked in useEffect()." ) );
        loadAllClients().then( ()=>console.log( "loadAllClients() worked in useEffect()." ) );
    }, [] );

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        console.log( "CarCreatePage() handleSubmit() worked!" );

        if( carParamsState.revisions.end!=="" ){

        }

        try {
            console.log( "handleSubmit() carParamsState: ", carParamsState );
            await mongoDBCreateCarFunction( reduxStoreUser.token, carParamsState )
                .then( () => {
                    console.log( "mongoDBCreateCarFunction() worked in CarCreatePage.js" );
                    toast.success( "Car added successfully." );
                    history.push( "/cars_archive" );
                })
                .catch( ( error ) => {
                    console.log( "mongoDBCreateCarFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                //Logout logic.
                });
        } catch (error) {
            console.log( "mongoDBCreateCarFunction() in handleSubmit try catch error: ", error.message );
            toast.error("Error adding car: ", error.message );
        }
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCarParamsState({ ...carParamsState, [ event.target.name ]:event.target.value } );
    };

    const handleDateUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCarParamsState({ ...carParamsState, revisions:{ ...carParamsState.revisions, [ event.target.name ] : new Date( event.target.value ).toDateString() }} );
        console.log(carParamsState);
    };

    return (
        <main>
            <div className="container mx-auto py-20">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>AGGIUNGI VEICOLO</span></center>

                <form onSubmit={ handleSubmit }>
                    {/*TODO Add here inputs from the database with cascader.*/}
                    <label className="block mb-8 text-xl max-w-600">
                        MARCA
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="brand"
                            value={ brand }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        MODELLO
                        <input
                            type="text"
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            name="model"
                            value={ model }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        TARGA
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="licensePlate"
                            value={ licensePlate }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        REVISIONE <br/>
                        <span>start date</span>
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="date"
                            name="start"
                            value={ revisions.start }
                            onChange={ handleDateUserInput }
                        />
                        <span>revisions.start: { revisions.start }</span> <br/>
                        <span>end date</span>
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="date"
                            name="end"
                            value={ revisions.end }
                            onChange={ handleDateUserInput }
                        />
                        <span>revisions.end: {revisions.end}</span>
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        KM
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="km"
                            value={ km }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        ANNO
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="year"
                            value={ year }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        CLIENTE
                        <select
                            name="client"
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            //className="form-control"
                            onChange={ handleUserInput }
                        >
                            <option> Please select </option>
                            { clientsListState.length > 0 &&
                                clientsListState.map( ( cli ) => (
                                    <option key={ cli._id } value={ cli._id }>
                                        { cli.name + " " + cli.surname + ", P.IVA: " + cli.fiscal_code }
                                    </option>
                                ) ) }
                        </select>
                    </label>

                    <div className="flex justify-end">
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
                </form>
            </div>

        </main>
    );
}