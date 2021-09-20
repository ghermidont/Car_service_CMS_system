import React from 'react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function RegClient() {
  return (
    <>
      <div className='h-screen flex flex-col justify-between'>
        <Header/>
        <main className='flex items-center'>
          <div className="container mx-auto py-10">
            <form className='text-lg' action="">
              <div className='flex flex-col'>
                <label className='font-normal uppercase mb-3'>Nome
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"/>
                </label>

                <label className='font-normal uppercase mb-3'>Cognome
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"/>
                </label>

                <label className='font-normal uppercase mb-3'>Data
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="date"/>
                </label>

                <label className='font-normal uppercase mb-3'>C/F
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"/>
                </label>

                <div className='flex justify-between mb-6'>

                  <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Indirizzo
                    <input
                      className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block'
                      type="text"/>
                  </label>

                  <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Citta
                    <input
                      className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block'
                      type="text"/>
                  </label>

                  <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                    <input
                      className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL w-100% block'
                      type="text"/>
                  </label>

                </div>
                <label className='font-normal uppercase mb-3'>Note
                  <textarea className='w-100% text-xl px-6 py-4 mt-1 border border-border rounded-lg h-40'></textarea>
                </label>
                <div className='flex justify-between items-end'>
                  <div>
                    <label className='font-normal uppercase mb-3'>Cellulare
                      <input
                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                        type="text"/>
                    </label>

                    <label className='font-normal uppercase mb-3'>Email
                      <input
                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                        type="text"/>
                    </label>
                  </div>
                </div>
              </div>
            </form>
            <div className='flex justify-end mt-12'>
              <button
                className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                Salva
              </button>
              <button
                className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                Stampa
              </button>
              <button
                className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Chiudi
              </button>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}