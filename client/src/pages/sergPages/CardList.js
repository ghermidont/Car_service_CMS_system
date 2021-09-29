import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function CardList() {
  return (
    <>
        <Header/>
        <main className='mb-12'>
          <div className="container mx-auto">
            <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
              <table className='mx-auto mb-8'>
                <thead>
                <tr>
                  <th> </th>
                  <th> </th>
                  <th> </th>
                  <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>ID</th>
                  <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>Data</th>
                  <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>Targa
                  </th>
                  <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>Marca
                  </th>
                  <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>Modello
                  </th>
                  <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>Stato
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                <tr>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Open
                    </button>
                  </td>
                  <td>
                    <button
                      className='w-75 h-8 m-1 bg-blueDark flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Print
                    </button>
                  </td>
                  <td className='pr-3'>
                    <button
                      className='w-75 h-8 m-1 bg-blue flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'>Edit
                    </button>
                  </td>
                  <td className='border border-border px-3'>1</td>
                  <td className='border border-border px-3'>2</td>
                  <td className='border border-border px-3'>3</td>
                  <td className='border border-border px-3'>4</td>
                  <td className='border border-border px-3'>5</td>
                  <td className='border border-border px-3'>6</td>
                </tr>
                </tbody>
              </table>
              <ul className='flex justify-center items-center xl:text-lg'>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">
                    <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"> </path>
                    </svg>
                  </a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">1</a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">2</a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">3</a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">... </a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">24</a>
                </li>
                <li className='mx-1'>
                  <a className='p-1 hover:opacity-70 focus:opacity-70' href="#">
                    <svg className="w-6 h-6 p-0.5 border rounded-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"> </path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className='flex justify-end mx-8'>
              <div className='flex'>
                <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                  </svg>
                  Aggiungi Scheda
                </button>
                <button className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                  </svg>
                  Stampa Lista
                </button>
              </div>

            </div>
          </div>
        </main>
        <Footer/>
    </>
  );
}