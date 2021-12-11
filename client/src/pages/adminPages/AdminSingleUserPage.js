import React, {useState} from "react";
import ClientPhoto from "../../images/usr_avatar.png";
import { Link } from "react-router-dom";
//!start here finish the page.
export default function AdminSingleUserPage() {
    
    const [ userInfo, setUserInfo ] = useState();
   
    const{
        company_name,
        current_residence,
        current_city,
        current_province,
        official_residence,
        official_city,
        official_province,
        fiscal_code,
        images,
    } = userInfo;

    return(
        <main>
            <h1>AdminSingleUserPage.js</h1>
            <div className="flex justify-end">
                <Link to={ "/admin_dashboard" }>
                    <button className="text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70">
                        Admin Dashboard
                    </button>
                </Link>
            </div>
            <div className="container mx-auto py-20">
                <div className='bg-grayL shadow-shadow rounded p-12'>
                    <div className='flex mb-20'>
                        <div className='w-400 h-auto border border-border rounded-md mr-6'>
                            { images.map( ( image ) => ( <img className='' src={ image.status==="default" ? ClientPhoto : image.url } alt=""/> )) }
                        </div>
                        <ul>
                            <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                Ragione sociale: <span className='font-normal text-text text-lg'> { company_name } </span>
                            </li>

                            <li className='mb-4 bg-white px-2'>
                                <div className='text-xl text-black font-bold uppercase'>
                                    Sede Operativa: <span className='font-normal text-text text-lg'> { current_residence } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Citta: <span className='font-medium text-sm text-text'> { current_city } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Provincia: <span className='font-medium text-sm text-text'> { current_province } </span>
                                </div>
                            </li>

                            <li className="mb-4 bg-white px-2">
                                <div className="text-xl text-black font-bold">
                                    Sede Legale: <span>{ official_residence }</span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Citta: <span className='font-medium text-sm text-text'> { official_city } </span>
                                </div>
                                <div className='text-base font-bold uppercase'>
                                    Provincia: <span className='font-medium text-sm text-text'> { official_province } </span>
                                </div>
                            </li>

                            <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                                P. Iva: <span className='font-normal text-text text-lg'> { fiscal_code } </span>
                            </li>

                        </ul>
                    </div>
                    <div className='flex justify-end'>
                        <button className='text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}