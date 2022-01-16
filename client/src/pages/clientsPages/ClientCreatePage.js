import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBCreateClientFunction } from "../../functions/callsToClientRoutes";

export default function ClientCreatePage( { history } ) {
    const { reduxStoreUser } = useSelector(( state) => ( { ...state } ) );

    const initialState = {
        user: reduxStoreUser._id,
        name: "name",
        surname: "surname",
        date: "date",
        fiscal_code: "fiscal_code",
        address: "address",
        city: "city",
        province: "province",
        notes: "notes",
        mobile: "5674552333",
        email: "email@email.com"
    };

    const [ clientInfoState, setClientInfoState ] = useState( initialState );

    const {
        name,
        surname,
        date,
        fiscal_code,
        address,
        city,
        province,
        notes,
        mobile,
        email
    } = clientInfoState;

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

    const handleSubmit = ( event ) => {
        event.preventDefault();
        console.log( "ClientCreatePage() handleSubmit() worked!" );

        try {
            console.log( "clientInfoState: ", clientInfoState );
            mongoDBCreateClientFunction( reduxStoreUser.token, clientInfoState ).then( () => {
                console.log( "mongoDBCreateClientFunction() worked in ClientCreatePage.js" );
                toast.success( "Client added successfully." );
                history.push( "/clients_list" );
            })
                .catch( ( error ) => {
                    console.log( "mongoDBCreateClientFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                });
        } catch (error) {
            console.log( "mongoDBCreateClientFunction() in handleSubmit try catch error: ", error.message );
            toast.error("Error adding client: ", error.message );
        }
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setClientInfoState({ ...clientInfoState, [ event.target.name ] : event.target.value } );
    };

    return (  
        <>
            <div className="h-screen flex flex-col justify-between">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>REGISTRA CLIENTE</span></center>

                <main className="flex items-center">
                    <div className="container mx-auto py-10">
                        <form className="text-lg" onSubmit={ handleSubmit }>
                            <div className="flex flex-col">
                                <label className="font-normal uppercase mb-3">
                                    Nome
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                        type="text"
                                        name="name"
                                        //value={ name }
                                        onChange={ handleUserInput }
                                        placeholder="Name"
                                    />
                                </label>

                                <label className="font-normal uppercase mb-3">
                                    Cognome
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="surname"
                                        //value={ surname }
                                        onChange={ handleUserInput }
                                        placeholder="Surname"
                                    />
                                </label>

                                <label className="font-normal uppercase mb-3">
                                    Data
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                        type="text"
                                        name="date"
                                        //value={ date }
                                        onChange={ handleUserInput }
                                        placeholder="Date"
                                    />
                                </label>

                                <label className="font-normal uppercase mb-3">
                                    C/F
                                    <input
                                        className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                        type="text"
                                        name="fiscal_code"
                                        //value={ fiscal_code }
                                        onChange={ handleUserInput }
                                        placeholder="Fical Code"
                                    />
                                </label>

                                <div className="flex flex-wrap justify-between mb-6">
                                    <label className="font-normal uppercase mb-3 max-w-400 w-100%">
                                        Indirizzo
                                        <input
                                            className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                            type="text"
                                            name="address"
                                            //value={ address }
                                            onChange={ handleUserInput }
                                            placeholder="Address"
                                        />
                                    </label>

                                    <label className="font-normal uppercase mb-3 max-w-400 w-100%">
                                        Citta
                                        <input
                                            className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                            type="text"
                                            name="city"
                                            //value={ city }
                                            onChange={ handleUserInput }
                                            placeholder="City"
                                        />
                                    </label>

                                    <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                                        <input
                                            className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block"
                                            type="text"
                                            name="province"
                                            //value={ province }
                                            onChange={ handleUserInput }
                                            placeholder="Province"
                                        />
                                    </label>

                                </div>

                                <label className="font-normal uppercase mb-3">
                                    Note
                                    <textarea
                                        className="w-100% text-xl px-6 py-4 mt-1 border border-border rounded-lg h-40"
                                        name="notes"
                                        rows="4"
                                        maxLength="1000"
                                        //value={ notes }
                                        onChange={ handleUserInput }
                                        placeholder="Notes"
                                    >
                                    </textarea>
                                </label>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <label className="font-normal uppercase mb-3">
                                            Cellulare
                                            <input
                                                className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                                type="text"
                                                name="mobile"
                                                //pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                                //value={mobile}
                                                onChange={handleUserInput}
                                                placeholder="Mobile"
                                            />
                                        </label>

                                        <label className="font-normal uppercase mb-3">Email
                                            <input
                                                className="text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block"
                                                type="email"
                                                name="email"
                                                //value={ email }
                                                onChange={ handleUserInput }
                                                placeholder="Email"
                                            />
                                        </label>
                                    </div>
                                </div>
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
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}