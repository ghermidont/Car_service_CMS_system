import React from "react";
import { Link } from "react-router-dom";

export default function MainMenuPage() {
    return (   
        <>
            <div className="min-h-screen flex flex-col justify-between">
                <main className="flex items-center">
                    <div className="container h-full mx-auto flex justify-between flex-wrap gap-14">

                        <Link to="/add_client" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            REGISTRA CLIENTE
                        </Link>

                        <Link to="/clients_list" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            ELENCO CLIENTI
                        </Link>

                        <Link to="/cars_archive" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            ARCHIVIO VETTURE
                        </Link>

                        <Link to="/services_list" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            SCHEDE DI LAVORO
                        </Link>

                        <Link to="/notifications_list" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            GESTIONE TALIANDI
                        </Link>

                        <Link to="/notes_list" className="text-2xl text-center font-bold bg-grayL uppercase max-w-600 w-100% py-16 rounded shadow-shadow focus:outline-none transition duration-300 hover:bg-border hover:text-white focus:text-white focus:bg-border">
                            NOTE INTERNE
                        </Link>
                    </div>
                </main>        
            </div>
        </>
    );
}