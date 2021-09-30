import React from "react";
import {Link} from "react-router-dom";

export default function mainMenu() {
  return (   
    <>
        <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
          <Link to="/add_car">Click to go to &rArr; Add Car Pages </Link>
        </label>  
         <h1>MainMenu.js</h1>

        <div className='min-h-screen flex flex-col justify-between'>   
          <main className='flex items-center'>
            <div className="container h-full mx-auto flex justify-between flex-wrap gap-14">

              <Link to='/add_client' className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> REGISTRA CLIENTE </Link>

              <Link to='/clients_list' className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> ELENCO CLIENTI </Link>

              <Link to='/cars_archive' className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> ARCHIVIO VETTURE </Link>

              <Link to='/services_list' className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> SCHEDE DI LAVORO </Link>

              <Link to='/services_list' className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> GESTIONE TALIANDI </Link>

              <Link to="/" className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'> NOTE INTERNE </Link>

            </div>
          </main>        
        </div>
      </>
  );
}