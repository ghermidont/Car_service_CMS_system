import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {
    mongoDBDeleteClientFunction,
    mongoDBGetAllClientsFunction,
    mongoDBGetClientsCountFunction
} from "../../functions/callsToClientRoutes";
import { mongoDBGetCarsByFilterFunction } from "../../functions/callsToCarRoutes";
import {toast} from "react-toastify";
import {Pagination} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";

export default function ClientsListPage( { history } ) {
    const [ dbClients, setDbClients ] = useState(  [ {}, {} ] );
    const [ page, setPage ] = useState( 1 );
    const [ clientsCount, setClientsCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );
    const [ carsListState, setCarsListState ] = useState([ {}, {} ] );
    const { reduxStoreUser } = useSelector(( state ) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        loadAllClients();
    }, [ page ] );

    useEffect(() => {
        mongoDBGetClientsCountFunction( reduxStoreUser._id )
            .then(( res) => {
                setClientsCount(res.data);
                console.log("Clients count: ", res.data);
            }
            )
            .catch(( error ) => {
                toast.error("Error loading clients count: ", error );
                console.log( "Error loading clients count: ", error );
            });
        console.log( clientsCount );
    }, []);

    const loadAllClients = () => {
        console.log( "loadAllClients() worked." );
        if ( reduxStoreUser._id === undefined ){
            logout();
            return toast.error("reduxStoreUser._id is undefined please re-login.");
        } else {
            setLoading( true );
            // sort, order, limit
            mongoDBGetAllClientsFunction("createdAt", "desc", page, reduxStoreUser._id)
                .then((res) => {
                    setDbClients(res.data);
                    console.log("mongoDBGetAllClientsFunction res.data: ", res.data );
                    setLoading(false);
                }).catch((error) => {
                    toast.error("Error getting all clients: ", error);
                    console.log("Error getting all clients", error);
                });
        }
    };

    const logout = () => {
        signOut( auth ).then( () => {
            toast.success("User signed out." );
        }).catch(( error ) => {
            toast.error("Error signing out.", error );
        });
        // old version --> firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push( "/" );
    };

    const getClientCars = ( clientId ) => {
        mongoDBGetCarsByFilterFunction( clientId )
            .then((res) => {
                setCarsListState(res.data);
            }).catch((error) => {
                toast.error("Error getting client cars: ", error);
                console.log("Error getting client cars", error);
            });
    };
    
    const deleteClientFunction = ( slug ) => {
        mongoDBDeleteClientFunction( reduxStoreUser.token, slug )
            .then( ()=> {
                toast.success( "Clients deleted successfully!" );
            } )
            .catch( ()=>{
                toast.error( "Client deletion failed!" );
            } );
    };

    return (   
        <main className='mb-12'>

            <h1> ClientsListPage.js </h1>
            { loading ? (
                <h1> Loading... </h1>
            ) : (
                <h1> Clients List </h1>
            ) }
            <div className="container mx-auto">
                <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                    <table className='mx-auto mb-8'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    ID
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Nome
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Cognome
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Cellulare
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Elenco Ventture
                                </th> <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    User Id
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Loop start*/}
                            { dbClients.map( client => (
                                <tr key={ client.slug }>
                                    <td>
                                        <Link to={ `/client/${ client.slug }` }>
                                            <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                                Open
                                            </button>
                                        </Link>
                                    </td>

                                    <td className='pr-3'>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={ ()=>deleteClientFunction( client.slug ) }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className='border border-border px-3'>{ client._id }</td>
                                    <td className='border border-border px-3'>{ client.name }</td>
                                    <td className='border border-border px-3'>{ client.surname }</td>
                                    <td className='border border-border px-3'>{ client.mobile }</td>
                                    <td className='border border-border px-3'>
                                        <ol>
                                            {/*TODO After implementing the db docs relationships change the clientCars with the info from the database related to the current client.*/}
                                            { carsListState.map( car =>
                                                (
                                                    <li key={ car._id } > { car.licensePlate } </li>
                                                )
                                            )
                                            }
                                        </ol>
                                    </td>
                                    <td className='border border-border px-3'>{ client.user }</td>

                                </tr>
                            ))}
                            {/*<Loop end*/}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                defaultCurrent={ 1 }
                                current={ page }
                                total={ clientsCount }
                                onChange={ ( value ) => {
                                    setPage( value );
                                    console.log( "page: ", page );
                                    console.log( "clientsCount: ", clientsCount );
                                } 
                                }
                            />
                        </nav>
                    </div>
                </div>
            </div>

            {/* TODO Include the pdf and print logic here.*/}
            <div className="flex justify-end mx-8">
                {/*Add vehicle button*/}
                <button className="flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                    </svg>
                    <Link to="/add_client">
                        Aggiungi Cliente
                    </Link>
                </button>
                {/*Print list button*/}
                <button className="flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70">
                    <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z">
                        </path>
                    </svg>
                        Stampa Lista
                </button>
            </div>
        
        </main>   
    );
}