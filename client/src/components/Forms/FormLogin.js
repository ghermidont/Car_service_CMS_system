import React from 'react';

export default function FormLogin() {
  return (
    <>
      <div class="container mx-auto h-screen flex justify-center items-center">
        <form action="#" autoComplete="off" className='max-w-600 w-100% bg-grayL px-12 pt-8 pb-14 shadow-shadow rounded'>
          <label className='block mb-2 text-xl'>
            User name
            <input type="text" className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
          </label>
          <label className='block mb-20 text-xl'>
            Password
            <input type="password" className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'/>
          </label>
          <div className='text-xl text-white flex justify-between'>
            <button className='bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'>Login</button>
            <button className='bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'>Recover pass</button>
          </div>
        </form>
      </div>
    </>
  );
}