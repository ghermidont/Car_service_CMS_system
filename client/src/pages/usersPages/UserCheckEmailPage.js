//!IMPLEMENTED
import React, { useState, useEffect } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
//useSelector is used to get the data from the state.
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function UserCheckEmailPage({ history }){
    const [email, setEmail] = useState("");
    //we use destructuring to get specific data from the states that are defined in the reducers/index.js file.
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user, history]);

    const handleSubmit = async (e) => {
        //prevent page reload
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(email, config);
            toast.success(
                `Email is sent to ${email}. Click the link to complete your registration.`
            );

            // save user email in local storage
            window.localStorage.setItem("emailForRegistration", email);
            // clear state
            setEmail("");
            history.push("/");
        }catch(err){
            window.alert(`This is an error from try and catch ${err}`);
        }
    };

    return(
        <>
            <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
                <Link to="/main_menu">
                    Click to go to &rArr; Main Menu Page
                </Link>
            </label>
            <h1>checkEmailPage.js</h1>

            <main>
                <div className="container mx-auto h-screen flex justify-center items-center">
                    <form
                        action="#"
                        autoComplete="off"
                        className='max-w-600 w-100% bg-grayL px-12 pt-8 pb-14 shadow-shadow rounded'
                        onSubmit={handleSubmit}
                    >
                        <label className='block mb-2 text-xl'>
                            User name
                            <input
                                className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                autoFocus
                            />
                        </label>

                        <div className='text-xl text-white flex justify-between'>
                            <button
                                className='bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={!email}
                                type="submit"
                            >
                                Register
                            </button>

                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}