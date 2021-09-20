import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import {NavLink} from "react-router-dom";

export default function Menu() {
  return (
    <>
      <div className='min-h-screen flex flex-col justify-between'>
        <Header/>
        <main className='flex items-center'>
          <div className="container h-full mx-auto flex justify-between flex-wrap gap-14">

            <NavLink to='/reg-cliente'
                     className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>REGISTRA
              CLIENTE
            </NavLink>

            <NavLink to='/'
                     className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>ELENCO
              CLIENTI
            </NavLink>

            <NavLink
              className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>ARCHIVIO
              VETTURE
            </NavLink>

            <NavLink
              className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>SCHEDE
              DI LAVORO
            </NavLink>

            <NavLink
              className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>GESTIONE
              TALIANDI
            </NavLink>

            <NavLink
              className='text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border'>NOTE
              INTERNE
            </NavLink>
          </div>
        </main>
        <Footer/>
      </div>

    </>
  );
}