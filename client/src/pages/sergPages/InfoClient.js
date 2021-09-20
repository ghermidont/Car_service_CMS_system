import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function InfoClient() {
  return(
    <>
      <Header />
     <main>
       <div className="container mx-auto py-20">
         <div className='bg-grayL shadow-shadow rounded p-12'>
          <div className='flex mb-20'>
            <div className='w-400 h-auto border border-border rounded-md mr-6'>
              <img className='' src="" alt=""/>
            </div>
            <ul>
              <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>Ragione sociale: <span className='font-normal text-text text-lg'>Officina Gallo</span></li>
              <li className='mb-4 bg-white px-2'>
                <div className='text-xl text-black font-bold uppercase'>
                  Sede Operativa: <span className='font-normal text-text text-lg'>Via Roma 33</span>
                </div>
                <div className='text-base font-bold uppercase'>Citta: <span className='font-medium text-sm text-text'>Roma</span></div>
                <div className='text-base font-bold uppercase'>Provincia: <span className='font-medium text-sm text-text'>RM</span></div>
              </li>
              <li className='mb-4 bg-white px-2'>
                <div className='text-xl text-black font-bold'>
                  Sede Legale: <span>Via Roma 33</span>
                </div>
                <div className='text-base font-bold uppercase'>Citta: <span className='font-medium text-sm text-text'>Roma</span></div>
                <div className='text-base font-bold uppercase'>Provincia: <span className='font-medium text-sm text-text'>RM</span></div>
              </li>
              <li className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>P. Iva: <span className='font-normal text-text text-lg'>1002003233</span></li>
            </ul>
          </div>
           <div className='flex justify-end'>
             <button className='text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>Edit</button>
           </div>
         </div>
       </div>
     </main>
      <Footer />
    </>
  );
}