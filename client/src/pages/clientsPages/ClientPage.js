//TODO Test this page.

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mongoDBGetSingleClientFunction } from "../../functions/callsToClientRoutes";
import Link from "react-router-dom/es/Link";
import { useSelector } from "react-redux";

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

export default function ClientCreatePage( { match } ) {
    const [ currentClientParamsState, setCurrentClientParamsState] = useState( initialState );
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    //states
    const { 
        name, 
        surname, 
        date, 
        fiscalCode, 
        address, 
        city, 
        province, 
        notes, 
        mobile, 
        email 
    } = currentClientParamsState;

    //For implementing the date:
    //   const formattedDate = (rawDate)=>{
    //     if(rawDate===undefined)
    //         return setDateOfBirth("Date of birth not set");
    //
    //     let now = new Date(rawDate);
    //     return setDateOfBirth(date.format(now, "ddd, MMM DD YYYY"));
    // }
    //
    // useEffect(() => {
    //     formattedDate(date);
    //     // eslint-disable-next-line
    // }, [values]);
    // Get the user from Redux Store
    //const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    useEffect( () => {
        loadClientDbInfo();
        // eslint-disable-next-line
    }, [] );

    const loadClientDbInfo = () => {
        mongoDBGetSingleClientFunction( slug, reduxStoreUser.token ).then( ( client ) => {
            console.log( "Single client", client );
            setCurrentClientParamsState({ ...currentClientParamsState, ...client.data } );
        } ).catch( ( error ) => {
            toast.error("Error loading client info: ", error);
        });
    };

    return (
        <>
            <h1>ClientPage.js</h1>

            <div className="h-screen flex flex-col justify-between">
                <main className="flex items-center">
                    <div className="container mx-auto py-10">                       
                        <div className="flex flex-col">
                            <label className="font-normal uppercase mb-3">
                                Nome
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ name }</span>
                                </div>
                            </label>

                            <label className="font-normal uppercase mb-3">
                                Cognome
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ surname }</span>
                                </div>
                            </label>

                            <label className="font-normal uppercase mb-3">
                                Data
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ date }</span>
                                </div>
                            </label>

                            <label className="font-normal uppercase mb-3">
                                C/F
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ fiscalCode }</span>
                                </div>
                            </label>

                            <div className="flex justify-between mb-6">
                                <label className="font-normal uppercase mb-3 max-w-400 w-100%">
                                    Indirizzo
                                    <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                        <span className='font-normal text-text text-lg'>{ address }</span>
                                    </div>
                                </label>

                                <label className="font-normal uppercase mb-3 max-w-400 w-100%">
                                    Citta
                                    <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                        <span className='font-normal text-text text-lg'>{ city }</span>
                                    </div>
                                </label>

                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                                    <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                        <span className='font-normal text-text text-lg'>{ province }</span>
                                    </div>
                                </label>

                            </div>

                            <label className="font-normal uppercase mb-3">
                                Note
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ notes }</span>
                                </div>
                            </label>
                            <div className="flex justify-between items-end">
                                <div>
                                    <label className="font-normal uppercase mb-3">
                                        Cellulare
                                        <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                            <span className='font-normal text-text text-lg'>{ mobile }</span>
                                        </div>
                                    </label>

                                    <label className="font-normal uppercase mb-3">Email
                                        <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                            <span className='font-normal text-text text-lg'>{ email }</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>                      

                        <div className="flex justify-end mt-12">
                            <Link to={`/client/update/${slug}`}>
                                <button className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}