//TODO Test this page.
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBGetSingleServiceFunction } from "../../functions/callsToServicesRoutes";

const initialState = {
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
    damage: "damage",
};

export default function ServicePage( { match } ) {
    console.log("ServicePage() worked");
    const [currentServiceParamsState, setCurrentServiceParamsState] = useState(initialState);
    const {
        date,
        license_plate,
        brand,
        model,
        state,
        operator,
        anomalies,
        checks,
        actions,
        notes,
        damage,        g
    } = currentServiceParamsState;

    const { slug } = match.params;
    console.log("match.params", match.params);
    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadServiceDbInfo();
    }, []);

    const loadServiceDbInfo = () => {
        mongoDBGetSingleServiceFunction(slug, reduxStoreUser.token).then((service) => {
            console.log("single service", service);
            setCurrentServiceParamsState({ ...currentServiceParamsState, ...service.data });
        }).catch(
            (error)=> {
                toast.error("Error getting user info: ", error);
                console.log("Error getting user info: ", error);
            }
        );
    };

    return (
        <main>
            <h1>ServicePage.js</h1>
                
            <div className="container mx-auto">
                <div className='my-20'>
                    <table className='mx-auto'>
                        <thead>
                            <tr>
                                <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>
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
                                <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Operatore
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-border px-3">
                                    <span className='font-normal text-text text-lg'>{ date }</span>
                                </td>
                                <td className='border border-border px-3'>
                                    <span className='font-normal text-text text-lg'>{ license_plate }</span>
                                </td>
                                <td className='border border-border px-3'>
                                    <span className='font-normal text-text text-lg'>{ brand }</span>
                                </td>
                                <td className='border border-border px-3'>                                  
                                    <span className='font-normal text-text text-lg'>{ model }</span>
                                </td>
                                <td className='border border-border px-3'>                                  
                                    <span className='font-normal text-text text-lg'>{ state }</span>
                                </td>
                                <td className='border border-border px-3'>
                                    <span className='font-normal text-text text-lg'>{ operator }</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='max-w-1075 mx-auto'>
                    <label className='block mb-6 text-xl uppercase'>
                        Anomalie
                        <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                            <span className='font-normal text-text text-lg'>{ anomalies }</span>
                        </div>
                    </label>

                    <label className='block mb-6 text-xl uppercase'>
                        Controlli
                        <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                            <span className='font-normal text-text text-lg'>{ checks }</span>
                        </div>
                    </label>

                    <label className='block mb-6 text-xl uppercase'>
                        Lavori Fatti
                        <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                            <span className='font-normal text-text text-lg'>{ actions }</span>
                        </div>
                    </label>

                    <div className='flex justify-between'>
                        <div className='w-45%'>
                            <label className='block mb-2 text-xl uppercase'>
                                Note
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ notes }</span>
                                </div>
                            </label>
                        </div>
                        <div className='w-45%'>
                            <label className='block mb-2 text-xl uppercase'>
                                Danni
                                <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                    <span className='font-normal text-text text-lg'>{ damage }</span>
                                </div>
                            </label>
                        </div>
                    </div>
               
                </div>
                <div className='flex justify-end mt-12'>
                    <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                        <Link to={`/service/update/${ slug }`}>
                                Edit
                        </Link>
                    </button>
                </div>
            </div>
        </main>
      





   
    );
}