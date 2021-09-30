import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";

export default function loginPage(){
  return(
    <>
      <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
        <Link to="/main_menu">Click to go to &rArr; Main Menu Page</Link>
      </label>
       <h1>LoginPage.js</h1>

      <main>
        <LoginForm />
      </main>    
    </>
  );
}