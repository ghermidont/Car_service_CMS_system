import React from "react";
import { Link } from "react-router-dom";

export default function RegisterUserPage() {
  return (
    <>
      <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
        <Link to="/cars_archive">
            Click to go to &rArr; Cars Archive Page
.        </Link>
      </label>  
      <h1>RegisterUserPage.js</h1>
      
      <div className='h-screen flex flex-col justify-between'>            
        <main className='flex items-center'>
          <div className="container mx-auto py-10">
            <form>
              <label className='font-normal uppercase mb-3'>Ragione Sociale
                <input
                  className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                  type="text"/>
              </label>
              <div className='flex justify-between mt-6'>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Sede Operativa
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Citta
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
              </div>
              <div className='flex justify-between mt-6'>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Sede Sociale
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Citta
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>Provincia
                  <input
                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                    type="text"
                  />
                </label>
              </div>
              <div className='flex justify-between'>
                <div>
                  <div className='uppercase mb-2 mt-6'>Aggiungi Foto</div>
                  <div className='flex items-end'>
                    <div className='w-250 h-[250px] rounded bg-border mr-6'> </div>
                    <label
                      className='font-normal bg-bgBtnGray color uppercase cursor-pointer px-3 py-2 rounded flex justify-center inline w-100 hover:opacity-70 focus:opacity-70'>
                      <input className='hidden' type="file"/>
                      <div className='pr-2'>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                          </path>
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z">
                          </path>
                        </svg>
                      </div>
                      ADD
                    </label>
                  </div>
                </div>
                <button className='h-10 flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 mt-auto rounded transition hover:opacity-70 focus:opacity-70'>
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4">
                    </path>
                  </svg>
                  <Link to="user_page">
                      Salva
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </main>       
      </div> 
      </>  
  );
}