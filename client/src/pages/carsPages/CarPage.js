import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { mongoDBGetSingleCarFunction } from "../../functions/callsToCarRoutes";
import {useSelector} from "react-redux";

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

export default function CarUpdatePage( { match } ) {
    const [ currentCarParamsState, setCurrentCarParamsState ] = useState(initialState);
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

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

    useEffect(() => {
        loadCarDbInfo();
        // eslint-disable-next-line
    }, [] );

    const loadCarDbInfo = () => {
        mongoDBGetSingleCarFunction( slug, reduxStoreUser.token ).then( ( car ) => {
            console.log( "single car", car );
            setCurrentCarParamsState( { ...currentCarParamsState, ...car.data } );
        } ).catch( ( error ) => {
            toast.error( "Error loading car info: ", error );
        } );
    };

    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };


    //Start here. Finish the individual car info page with link to the car update page.
    return (
        <main>
            <div className="container mx-auto py-20">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>VEICOLO</span></center>

                <label className="block mb-8 text-xl max-w-600"> MARCA
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{brand}</span>
                    </div>                      
                </label>

                <label className="block mb-8 text-xl max-w-600"> MODELLO
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{ model }</span>
                    </div>
                </label>

                <label className="block mb-8 text-xl max-w-600"> TARGA
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{ registrationPlate }</span>
                    </div>                  
                </label>

                <label className="block mb-8 text-xl max-w-600"> REVISIONE
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">
                            start: { new Date( revisions.start ).toLocaleString( "en-GB", dateOptions ) }
                            { "\n" }
                            end: { new Date( revisions.end ).toLocaleString( "en-GB", dateOptions ) }
                        </span>
                    </div>                   
                </label>

                <label className="block mb-8 text-xl max-w-600"> KM
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{ km }</span>
                    </div>                  
                </label>

                <label className="block mb-8 text-xl max-w-600"> ANNO
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{ year }</span>
                    </div>                         
                </label>

                <label className="block mb-8 text-xl max-w-600">CLIENTE
                    <div className="text-xl text-black font-bold uppercase mb-4 bg-white px-2">
                        <span className="font-normal text-text text-lg">{ client }</span>
                    </div>                  
                </label>

                <div className="flex justify-end">
                    <Link to={`/car/update/${slug}`}>
                        <button className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                            Edit
                        </button>
                    </Link>
                </div>
             
            </div>
        </main>
    );
}