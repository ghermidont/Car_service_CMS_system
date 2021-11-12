import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {listAllCarsFunction, removeCarFunction} from "../../functions/callsToCarRoutes";
import {useSelector} from "react-redux";

//TODO pass the slug to the carInfo object.
export default function CarsListPage() {
    const [loading, setLoading] = useState(false);
    const [CarsFromDb, setCarsFromDb] = useState({});
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getCarsFromDb();
    }, []);

    const getCarsFromDb = () => {
        setLoading(true);
        listAllCarsFunction()
            .then((res) => {
                setCarsFromDb(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    const removeCarFromDB = (slug, plate) => {
        removeCarFunction(slug, user.token)
            .then(()=>window.alert(`Car with registration palate ${plate} removed successfully.`))
            .catch(err=>window.alert(err));
    };

    return (
        <main className='mb-12'>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/clients_list">
                    Click to go to &rArr; Clients List Page
                </Link>
            </label>
            <h1>CarsListPage.js</h1>
        
            <div className="container mx-auto">
                <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>All Products</h4>
                    )}
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
                                <th className='px-6 py-1.5 w-300 bg-blue border border-border text-xl text-white font-normal uppercase'>
                                    SCHEDA LAVORI
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {CarsFromDb.map((carInfo) => (
                                <tr key={carInfo.id}>
                                    <td>
                                        <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                            <Link to={`/car/${carInfo.slug}`}>
                                                Open
                                            </Link>
                                        </button>
                                    </td>
                                    <td className='pr-3'>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={removeCarFromDB}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className='border border-border px-3'>1</td>
                                    <td className='border border-border px-3'>2</td>
                                    <td className='border border-border px-3'>3</td>
                                    <td className='border border-border px-3'>4</td>
                                    <td className='border border-border px-3'>5</td>
                                    <td className='border border-border px-3'>6</td>
                                    <td className='border border-border px-3'>7</td>
                                    <td className='border border-border px-3'>8</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <ul className='flex justify-center items-center xl:text-lg'>
                        <li className='mx-1'>
                            {/* Back pagination arrow */}
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">
                                <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"> </path>
                                </svg>
                            </a>
                        </li>
                        <li className='mx-1'>
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">1</a>
                        </li>
                        <li className='mx-1'>
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">2</a>
                        </li>
                        <li className='mx-1'>
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">3</a>
                        </li>
                        <li className='mx-1'>
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">... </a>
                        </li>
                        <li className='mx-1'>
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">24</a>
                        </li>
                        <li className='mx-1'>
                            {/* Next pagination arrow */}
                            <a className='p-1 hover:opacity-70 focus:opacity-70' href="/"> he
                                <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"> </path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='flex justify-end mx-8'>
                    <div className='flex'>
                        <button
                            className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                            </svg>
                            <Link to="services_list">
                                Aggiungi Scheda
                            </Link>
                        </button>
                        <button
                            className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
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