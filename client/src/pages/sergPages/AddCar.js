import React from "react";

export default function AddCar() {
  return (
    <>

      <main>
        <div className="container mx-auto py-20">
          <form>
            <label className='block mb-8 text-xl max-w-600'>
              MARCA
              <input type="text"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              MODELLO
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              TARGA
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              REVISIONE
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              KM
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              ANNO
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <label className='block mb-8 text-xl max-w-600'>
              CLIENTE
              <input type="password"
                     className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
            </label>
            <div className='flex justify-end'>
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
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download
              </button>
            </div>
          </form>
        </div>
      </main>

    </>
  );
}