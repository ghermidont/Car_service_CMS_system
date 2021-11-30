import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {mongoDBGetAllCarsFunction, mongoDBGetCarsCountFunction, mongoDBRemoveCarFunction} from "../../functions/callsToCarRoutes";
import {useSelector} from "react-redux";
import { toast } from "react-toastify";
import {Pagination} from "antd";

const initialState = [
    {
        _id: 1,
        brand: "Mercedes",
        model: "GLS600",
        licensePlate: "CVD45",
        revision: "2020/05/30",
        km: 45345,
        year: 2000,
        client: "Mark Zukerman",
        slug: "asdff4t435",
    },
    {
        _id: 2,
        brand: "BMW",
        model: "M30",
        licensePlate: "VFD45",
        revision: "2021/06/30",
        km: 346345,
        year: 2000,
        client: "1900",
        slug: "asdf4t34",
    },
    {
        _id: 3,
        brand: "Lada",
        model: "Calina",
        licensePlate: "TSS34",
        revision: "2010/01/30",
        km: 45435,
        year: 1885,
        client: "Will Smith",
        slug: "asd4t4t",
    },
    {
        _id: 4,
        brand: "Jaguar",
        model: "XLS",
        licensePlate: "TDF56",
        revision: "2015/03/30",
        km: 34999,
        year: 2030,
        client: "John Smith",
        slug: "sda4t4",
    },
    {
        _id: 5,
        brand: "Opel",
        model: "Astra",
        licensePlate: "DFG67",
        revision: "2013/09/30",
        km: 45499,
        year: 2000,
        client: "Elton John",
        slug: "dasfhgerh",
    },
];

export default function CarArchivePage() {

    const [dbCars, setDbCars] = useState(initialState);
    const [page, setPage] = useState(1);
    const [carsCount, setCarsCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllCars();
    }, [page]);

    useEffect(() => {
        mongoDBGetCarsCountFunction().then((res) => setCarsCount(res.data));
    }, []);

    const loadAllCars = () => {
        setLoading(true);
        // sort, order, limit
        mongoDBGetAllCarsFunction("createdAt", "desc", page).then((res) => {
            setDbCars(res.data);
            setLoading(false);
        });
    };

    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const deleteCarFunction = (slug, authToken) => {
        mongoDBRemoveCarFunction(slug, authToken).then(()=> {
            toast.success("Car deleted successfully!");
        }).catch(()=>{
            toast.error("Car deletion failed!");
        });
    };

    return (
        <main className='mb-12'>

            <h1>CarArchivePage.js</h1>
            {loading ? (
                <h1>Loading... </h1>
            ) : (
                <h1>Cars archive</h1>
            )}
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
                            </tr>
                        </thead>
                        <tbody>
                            {dbCars.map(car => (
                                <tr>
                                    <td>
                                        <Link to={`/cars/${car.slug}`}>
                                            <button className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>
                                                Open
                                            </button>
                                        </Link>
                                    </td>

                                    <td className='pr-3'>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={()=>deleteCarFunction(car.slug, reduxStoreUser.token)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    {/*ID*/}
                                    <td className='border border-border px-3'>{car._id}</td>
                                    {/*MARCA*/}
                                    <td className='border border-border px-3'>{car.brand}</td>
                                    {/*MODELLO*/}
                                    <td className='border border-border px-3'>{car.model}</td>
                                    {/*TARGA*/}
                                    <td className='border border-border px-3'>{car.licensePlate}</td>
                                    {/*REVISIONE*/}
                                    <td className='border border-border px-3'>{car.revision}</td>
                                    {/*KM*/}
                                    <td className='border border-border px-3'>{car.km}</td>
                                    {/*ANNO*/}
                                    <td className='border border-border px-3'>{car.year}</td>
                                    {/*CLIENTE*/}
                                    <td className='border border-border px-3'>{car.client}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                current={ page }
                                total={ (carsCount / 3) * 10 }
                                onChange={(value) => setPage(value)}
                            />
                        </nav>
                    </div>
                    {/*Pagination*/}
                    {/*<ul className='flex justify-center items-center xl:text-lg'>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">*/}
                    {/*            <svg*/}
                    {/*                className="w-6 h-6 p-0.5 border rounded-md"*/}
                    {/*                fill="none"*/}
                    {/*                stroke="currentColor"*/}
                    {/*                viewBox="0 0 24 24"*/}
                    {/*                xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                <path*/}
                    {/*                    strokeLinecap="round"*/}
                    {/*                    strokeLinejoin="round"*/}
                    {/*                    strokeWidth="2"*/}
                    {/*                    d="M10 19l-7-7m0 0l7-7m-7 7h18">*/}
                    {/*                </path>*/}
                    {/*            </svg>*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">1</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">2</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">3</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">... </a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">24</a>*/}
                    {/*    </li>*/}
                    {/*    <li className='mx-1'>*/}
                    {/*        <a className='p-1 hover:opacity-70 focus:opacity-70' href="/">*/}
                    {/*            <svg*/}
                    {/*                className="w-6 h-6 p-0.5 border rounded-md"*/}
                    {/*                fill="none"*/}
                    {/*                stroke="currentColor"*/}
                    {/*                viewBox="0 0 24 24"*/}
                    {/*                xmlns="http://www.w3.org/2000/svg">*/}
                    {/*                <path*/}
                    {/*                    strokeLinecap="round"*/}
                    {/*                    strokeLinejoin="round"*/}
                    {/*                    strokeWidth="2"*/}
                    {/*                    d="M14 5l7 7m0 0l-7 7m7-7H3">*/}
                    {/*                </path>*/}
                    {/*            </svg>*/}
                    {/*        </a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
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
                        <button className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                            </svg>
                            Stampa Lista
                        </button>
                    </div>
                    {/*Search bar START*/}
                    <form className='w-300 flex items-center relative'>
                        <button className='w-40 h-10 px-2 border border-border rounded-l-full transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"> </path>
                            </svg>
                        </button>
                        <input className='w-100% h-10 border border-border rounded-r-full border-l-0 outline-none' type="text"/>
                        <span className='text-sm text-red block absolute right-0 -bottom-8'> </span>
                    </form>
                    {/*Search bar END*/}
                </div>
            </div>
        </main>     
    );
}