//!Start here
//TODO TO IMPLEMENT
import React, {useState} from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBCreateCarFunction } from "../../functions/callsToCarRoutes";

// TODO implement the cascader.
/* Use the Ant cascader for cars select. https://ant.design/components/cascader/ */

//Cars DB API: https://parse-dashboard.back4app.com/apps/7e730946-c9c1-4aca-90f3-87f9abc2842c/browser/Carmodels_Car_Model_List
//https://www.back4app.com/docs/react/quickstart

const initialState = {
    brand: "brand",
    model: "model",
    licensePlate: "licensePlate",
    revision: "revisions date",
    km: 9999,
    year: 9999,
    client: "Client",
};

export default function CarCreatePage({history}) {
    const [carParamsState, setCarParamsState] = useState(initialState);

    const { brand, model, registrationPlate, revisions, km, year, client } = carParamsState;

    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const handleSubmit = async (e) => {
        console.log("CarCreatePage() handleSubmit() worked!");

        e.preventDefault();
        try {           
            const carInfoForMongoDB = {
                company_name: "Company name",
                current_residence: "Current residence",
                current_city: "Current city",
                current_province: "Current province",
                official_residence: "Official residence",
                official_city: "Official city",
                official_province: "Official province",
                fiscal_code: "Fiscal code",
                images: [
                    {
                        public_id: "",
                        url: "",
                        status: "default",
                    },
                ],
                email: user.email,
                token: idTokenResult.token,
                role: "b%dDHM*SDKS-Jl5kjs",
            };

            // On this stage the new user is created and in Mongo DB and then the data is also written in the redux store with dispatch function.
            mongoDBCreateCarFunction(reduxStoreUser.token, carInfoForMongoDB).then((res) => {
                console.log("mongoDBCreateCarFunction() worked in CarCreatePage.js");

            })
                .catch((err) => console.log("mongoDBCreateUserFunction() error: ", err));
            // redirect
            history.push(`/car/${slug}`);                       
        } catch (error) {
            console.log("handleSubmit try catch error: ", error);
            toast.error(error.message);
        }
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCarParamsState({ ...carParamsState, [event.target.name]: event.target.value });
    };

    return (
        <main>

            <h1>CarCreatePage.js</h1>

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

                        {/*TODO add here the printing functionality.*/}
                        <button className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                            </svg>
                            Stampa
                        </button>

                        {/*TODO Add here the pdf download functionality*/}
                        <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"> </path>
                            </svg>
                            Download
                        </button>
                    </div>
                </form>
            </div>

        </main>
    );
}