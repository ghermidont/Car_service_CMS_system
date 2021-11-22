import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserRegisterPage = ({ history }) => {
    const [email, setEmail] = useState("");

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/main_menu");
    }, [user, history]);

    const handleSubmit = async (e) => {
        //prevent page reload
        e.preventDefault();
        const config = {
            url: "http://localhost:3000/finish_register", //process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
        await sendSignInLinkToEmail(auth, email, config).then(()=>{
            // save user email in local storage
            window.localStorage.setItem("emailForRegistration", email);
            toast.success(`Email is sent to ${email}. Click the link to complete your registration.`);
            history.push("/");
        });
        // clear state
        setEmail("");
    };



    return (
        // TODO On release remove the empty tags and the h1.
        <>
            <h1>UserRegisterPage.js</h1>

            <main>
                <div className="container mx-auto h-screen flex justify-center items-center">
                    <form
                        action="#"
                        autoComplete="off"
                        className='max-w-600 w-100% bg-grayL px-12 pt-8 pb-14 shadow-shadow rounded'
                        onSubmit={handleSubmit}
                    >
                        <label className='block mb-2 text-xl'>
                            Email:
                            <input
                                className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                autoFocus
                            />
                        </label>

                        <div className='text-xl text-white flex justify-between'>

                            <button
                                className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={!email}
                                onClick={handleSubmit}
                            >
                                Register
                            </button>

                        </div>
                    </form>
                </div>
            </main>
        </>

    );
};

export default UserRegisterPage;
