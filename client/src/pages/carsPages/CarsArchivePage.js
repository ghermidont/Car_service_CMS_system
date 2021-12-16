//TODO Implement the search functionality
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    mongoDBGetAllCarsFunction,
    mongoDBGetCarsCountFunction,
    mongoDBDeleteCarFunction,
    mongoDBFetchCarByFilterFunction,
} from "../../functions/callsToCarRoutes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {Card, Pagination} from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Modal } from "antd";

import CarsPrintList from "./CarsPrinList";

export default function CarArchivePage( { history } ) {
    console.log( "CarsArchivePage() worked" );

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );
    const dispatch = useDispatch();

    const [ dbCars, setDbCars ] = useState( [] );
    const [ page, setPage ] = useState( 1 );
    const [ carsCount, setCarsCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );
    const [ searchResults, setSearchResults ] = useState( [] );
    const [ searchQuery, setSearchQuery ] = useState( "" );
    const [ isModalVisible, setIsModalVisible ] = useState( false );

    const showModal = () => {
        setIsModalVisible(true);
        console.log( "isModalVisible", isModalVisible );

    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log( "isModalVisible", isModalVisible );
    };

    useEffect(() => {
        console.log( "CarArchivePage() useEffect() [] worked." );
        mongoDBGetCarsCountFunction( reduxStoreUser._id )
            .then( ( res) => {
                setCarsCount( res.data );
                console.log( "mongoDBGetCarsCountFunction() res.data: ", res.data );
            } )
            .catch( ( error ) => {
                toast.error( "Error loading cars count", error );
                console.log( "Error loading cars count", error );
            } );
        console.log( "Cars count: ", carsCount );
    }, [] );

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setSearchQuery( event.target.value );
    };

    const handleSearch = ( event ) => {
        event.preventDefault();
        console.log( "ClientCreatePage() handleSearch() worked!" );
        try {
            console.log( "searchQuery: ", searchQuery );
            mongoDBFetchCarByFilterFunction( reduxStoreUser._id, searchQuery ).then( (res) => {
                console.log( "mongoDBFetchCarByFilterFunction() worked in ClientCreatePage.js" );
                console.log( "mongoDBFetchCarByFilterFunction() ClientCreatePage.js res: ", res.data );
                setSearchResults( res.data );
                toast.success( "Search successful." );
                setSearchQuery( "" );
            } )
                .catch( ( error ) => {
                    console.log( "mongoDBFetchCarByFilterFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                } );
        } catch ( error ) {
            console.log( "mongoDBFetchCarByFilterFunction() in handleSubmit try catch error: ", error.message );
            toast.error("Search error: ", error.message );
        }
    };

    const logout = () => {
        console.log( "CarArchivePage logout() worked." );
        signOut( auth ).then( () => {
            toast.success( "User signed out." );
        }).catch(( error ) => {
            toast.error( "Error signing out.", error );
        });
        // old version --> firebase.auth().signOut();
        dispatch( {
            type: "LOGOUT",
            payload: null,
        } );
        history.push( "/" );
    };

    const loadAllCars = () => {
        console.log( "CarArchivePage loadAllCars() worked." );
        setLoading( true );
        // sort, order, limit
        if ( reduxStoreUser._id === undefined ){
            logout();
            return toast.error( "reduxStoreUser._id is undefined please re-login." );

        } else {
            mongoDBGetAllCarsFunction( "createdAt", "desc", page, reduxStoreUser._id )
                .then( ( res ) => {
                    setDbCars( res.data );
                    setLoading( false );
                    console.log( "CarArchivePage loadAllCars() mongoDBGetAllCarsFunction: ", res.data );
                } ).catch( ( error ) => {
                    toast.error( "Error getting all cars: ", error );
                    console.log( "Error getting all cars: ", error );
                } );
        }
    };

    const deleteCarFunction = ( slug ) => {
        setLoading( true );
        console.log( "CarArchivePage deleteCarFunction() worked." );
        mongoDBDeleteCarFunction( reduxStoreUser.token, slug )
            .then( ()=> {
                toast.success( "Car deleted successfully!" );
                setLoading( false );
                //window.location.reload();
            } )
            .catch( ()=>{
                toast.error( "Car deletion failed!" );
            } );
    };

    useEffect(() => {
        console.log( "CarArchivePage useEffect() [page] worked." );
        loadAllCars();
        setDbCars( [] );
    }, [ page ] );

    return (
        <main className='mb-12'>

            <h1>CarArchivePage.js</h1>
            { loading ? (
                <h1>Loading... </h1>
            ) : (
                <h1>Cars archive</h1>
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
                                    Marca
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    MODELLO
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    TARGA
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    REVISIONE
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    KM
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    ANNO
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-xl text-white font-normal uppercase'>
                                    Cliente
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-xl text-white font-normal uppercase'>
                                    user ID
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            { dbCars.length !== 0 && dbCars.map( car => (
                                <tr key={ car.slug }>
                                    <td>
                                        <Link to={ `/car/${ car.slug }` }>
                                            <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                                Open
                                            </button>
                                        </Link>
                                    </td>

                                    <td className='pr-3'>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={ ()=>deleteCarFunction( car.slug ) }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    {/*ID*/}
                                    <td className='border border-border px-3'>{ car._id }</td>
                                    {/*MARCA*/}
                                    <td className='border border-border px-3'>{ car.brand }</td>
                                    {/*MODELLO*/}
                                    <td className='border border-border px-3'>{ car.model }</td>
                                    {/*TARGA*/}
                                    <td className='border border-border px-3'>{ car.licensePlate }</td>
                                    {/*REVISIONE*/}
                                    <td className='border border-border px-3'>{ car.revisions }</td>
                                    {/*KM*/}
                                    <td className='border border-border px-3'>{ car.km }</td>
                                    {/*ANNO*/}
                                    <td className='border border-border px-3'>{ car.year }</td>
                                    {/*CLIENTE*/}
                                    <td className='border border-border px-3'>{ car.client }</td>
                                    <td className='border border-border px-3'>{ car.user }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    { dbCars.length === 0 && <center><h1> No cars info loaded... </h1></center>}
                    {/* Pagination */}
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                defaultCurrent={ 1 }
                                current={ page }
                                total={ carsCount }
                                onChange={ ( value ) => setPage( value ) }
                            />
                        </nav>
                    </div>
                </div>

                {/*Bottom buttons section*/}
                <div className='flex justify-between mx-8'>
                    <div className='flex'>
                        {/*Add vehicle button*/}
                        <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                            </svg>
                            <Link to='/add_car'>
                                Aggiungi Veicolo
                            </Link>
                        </button>
                        {/*Print list button*/}
                        { dbCars.length !== 0 &&
                            <>
                                <button
                                    className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                                    </svg>

                                    <PDFDownloadLink
                                        document={ <CarsPrintList dbCars={ dbCars }/> }
                                        fileName={`carsTable-${ new Date().toLocaleString() }.pdf` }
                                        className="btn btn-sm btn-block btn-outline-primary"
                                    >
                                        Stampa Lista
                                    </PDFDownloadLink>
                                </button>
                            </>
                        }
                    </div>

                    {/*Search bar START*/}
                    <form className="w-300 flex items-center relative" onSubmit={ handleSearch }>
                        <button
                            type="submit"
                            className="w-40 h-10 px-2 border border-border rounded-l-full transition hover:opacity-70 focus:opacity-70"
                            onClick={()=>showModal()}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"> </path>
                            </svg>
                        </button>
                        <input
                            className='w-100% h-10 border border-border rounded-r-full border-l-0 outline-none' type="text"
                            value={ searchQuery }
                            onChange={ handleUserInput }
                        />
                        <span className='text-sm text-red block absolute right-0 -bottom-8'> </span>
                    </form>
                    {/*Search bar END*/}

                    <Modal title="SEARCH RESULTS" visible={ isModalVisible } onOk={ handleOk } >
                        { searchResults.length!==0&&searchResults.map( ( car )=>

                            <Card  style={{ backgroundColor: "rgba(74, 164, 225, 1)", borderRadius: "25px"}}>
                               
                                <Card type="inner" >
                                    <span style={{ fontWeight: "bold" }}>Marca</span>: {car.brand}
                                </Card>

                                <Card
                                    style={{ marginTop: 10 }}
                                    type="inner"
                                >
                                    <span  style={{ fontWeight: "bold" }}>Targa: </span> {car.licensePlate}
                                </Card>

                                <Link to={ `/car/${ car.slug }` }>
                                    <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                        Open
                                    </button>
                                </Link>
                            </Card>


                        )}
                    </Modal>
                </div>
            </div>
        </main>     
    );
}