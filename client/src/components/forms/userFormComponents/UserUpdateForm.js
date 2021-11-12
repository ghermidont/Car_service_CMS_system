/**This form is called in the UserUpdatePage.ls*/
// noinspection DuplicatedCode
// noinspection DuplicatedCode

import React from "react";
import {Link} from "react-router-dom";
//import { Select } from "antd";
//const { Option } = Select;
//Get the multi-choice logic from here.

//TODO implement the cascader.
/*Use the the Ant cascader for cars select.
https://ant.design/components/cascader/*/

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const ClientUpdateForm = ({ handleSubmit, handleUserInput, values }) => {
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
        email,
    } = values;

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

    return (
        <div className='h-screen flex flex-col justify-between'>
            <main className='flex items-center'>
                <div className="container mx-auto py-10">
                    <form className='text-lg' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>

                            <label className='font-normal uppercase mb-3'>Nome
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleUserInput}
                                />
                            </label>

                            <label className="font-normal uppercase mb-3">Cognome
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={handleUserInput}
                                />
                            </label>

                            <label className="font-normal uppercase mb-3">Data
                                <input
                                    className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                    type="text"
                                    name="date"
                                    value={date}
                                    onChange={handleUserInput}
                                />
                            </label>

                            <label className="font-normal uppercase mb-3">C/F
                                <input
                                    className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                    type="text"
                                    name="fiscalCode"
                                    value={fiscalCode}
                                    onChange={handleUserInput}
                                />
                            </label>

                            <div className="flex justify-between mb-6">

                                <label className="font-normal uppercase mb-3 max-w-400 w-100%">Indirizzo
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                        type="text"
                                        name="address"
                                        value={address}
                                        onChange={handleUserInput}
                                    />
                                </label>

                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Citta
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                        type="text"
                                        name="city"
                                        value={city}
                                        onChange={handleUserInput}
                                    />
                                </label>

                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                        type="text"
                                        name="province"
                                        value={province}
                                        onChange={handleUserInput}
                                    />
                                </label>

                            </div>

                            <label className="font-normal uppercase mb-3">Note
                                <textarea
                                    className="w-100% text-xl px-6 py-4 mt-1 border border-border rounded-lg h-40"
                                    name="notes"
                                    rows="4"
                                    maxLength="1000"
                                    value={notes}
                                    onChange={handleUserInput}
                                >
                                </textarea>
                            </label>
                            <div className='flex justify-between items-end'>
                                <div>
                                    <label className='font-normal uppercase mb-3'>Cellulare
                                        <input
                                            className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                            type="number"
                                            name="mobile"
                                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                            value={mobile}
                                            onChange={handleUserInput}
                                        />
                                    </label>

                                    <label className="font-normal uppercase mb-3">Email
                                        <input
                                            className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleUserInput}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="flex justify-end mt-12">

                        <button className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                            </svg>
                            <Link to="clients_list">
                                Salva
                            </Link>
                        </button>

                        <button className="flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                            </svg>
                            Stampa
                        </button>

                        <button className="flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"> </path>
                            </svg>
                            Download
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ClientUpdateForm;
