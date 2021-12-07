import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {
    mongoDBGetAllServicesFunction,
    mongoDBGetServicesCountFunction
} from "../../functions/callsToServicesRoutes";
import {useSelector} from "react-redux";
import { toast } from "react-toastify";
import {Pagination} from "antd";

const initialState = [
    {
        date: "date",
        license_plate: "license_plate",
        brand: "brand",
        model: "model",
        state: "state",
        operator: "operator",
        anomalies: "anomalies",
        checks: "checks",
        performed_repairs: "performed_repairs",
        notes: "notes",
        damage: "damage"
    },
    {
        date: "date",
        license_plate: "license_plate",
        brand: "brand",
        model: "model",
        state: "state",
        operator: "operator",
        anomalies: "anomalies",
        checks: "checks",
        performed_repairs: "performed_repairs",
        notes: "notes",
        damage: "damage"
    },
    {
        date: "date",
        license_plate: "license_plate",
        brand: "brand",
        model: "model",
        state: "state",
        operator: "operator",
        anomalies: "anomalies",
        checks: "checks",
        performed_repairs: "performed_repairs",
        notes: "notes",
        damage: "damage"
    },
];

export default function ServicesListPage() {

    const [ dbServices, setDbServices ] = useState( initialState );
    const [ page, setPage ] = useState( 1 );
    const [ servicesCount, setServicesCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );

    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllServices();
    }, [ page ]);

    useEffect(() => {
        mongoDBGetServicesCountFunction( reduxStoreUser.token )
            .then(( res) => setServicesCount( res.data ) )
            .catch(( error ) => {
                toast.error( "Error loading services count", error );
                console.log( "Error loading services count", error );
            });
    }, []);

    const loadAllServices = () => {
        setLoading( true );
        // sort, order, limit
        mongoDBGetAllServicesFunction( "createdAt", "desc", page )
            .then(( res ) => {
                setDbServices( res.data );
                setLoading( false );
            });
    };

    return (
        <main className='mb-12'>

            <h1>ServicesListPage.js</h1>
            { loading ? (
                <h1>Loading... </h1>
            ) : (
                <h1>Services archive</h1>
            ) }
            <div className="container mx-auto">
                <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                    <table className='mx-auto mb-8'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th> </th>
                                <th> </th>
                                <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    ID
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Data
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Targa
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Marca
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Modello
                                </th>
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Stato
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Loop start*/}
                            { dbServices.map( service => (
                                <tr key={ service.slug }>
                                    <td>
                                        <Link to={`/service/${service.slug}`}>
                                            <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                                Open
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        {/*TODO Implement here the pgf print logic.*/}
                                        <button className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                            Print
                                        </button>
                                    </td>
                                    <td className='pr-3'>
                                        <Link to={`/service/update/${service.slug}`}>
                                            <button className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td className='border border-border px-3'>{ service._id }</td>
                                    <td className='border border-border px-3'>{ service.date }</td>
                                    <td className='border border-border px-3'>{ service.license_plate }</td>
                                    <td className='border border-border px-3'>{ service.brand }</td>
                                    <td className='border border-border px-3'>{ service.model }</td>
                                    <td className='border border-border px-3'>{ service.state }</td>
                                </tr>
                            ))}
                            {/*Loop end*/}
                        </tbody>
                    </table>
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                defaultCurrent={ 1 }
                                current={ page }
                                total={ servicesCount }
                                onChange={(value) => setPage( value ) }
                            />
                        </nav>
                    </div>
                </div>
                <div className='flex justify-end mx-8'>
                    <div className='flex'>
                        <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                            </svg>
                            <Link to="add_service">
                                Aggiungi Scheda
                            </Link>
                        </button>
                        {/*TODO Implement here the pgf print logic for the whole list.*/}
                        <button className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                            </svg>
                            Stampa Lista
                        </button>
                    </div>
                </div>
            </div>
        </main>     
    );
}