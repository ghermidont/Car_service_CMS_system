//!IMPLEMENTED
import React, { useState, useEffect } from "react";
import { getIdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
//import { auth /*googleAuthProvider*/ } from "../firebase";
import { toast } from "react-toastify";

//useSelector is used to get the data from the state.
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mongoDBGetCurrentUserFunction } from "../../functions/callsToAuthRoutes";
import { auth } from "../../firebase";

export default function LoginPage({ history }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //we use destructuring to get specific data from the states that are defined in the reducers.
    // user is the name of the userReduces
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        console.log("history.location.state", history.location.state);

        if (intended) {
            return;
        } else {
            if (reduxStoreUser && reduxStoreUser.token){
                history.push("/main_menu");
            }
        }
    }, [reduxStoreUser, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if(res.data) {
                if (res.data.role === "admin") {
                    history.push("/admin_dashboard");
                } else {
                    history.push("/main_menu");
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let FBUser = await signInWithEmailAndPassword(auth, email, password);
            const { user } = FBUser;
           
            const idTokenResult = await getIdTokenResult(user, false);
            console.log("Login Page getIdTokenResult.token: ", idTokenResult.token);
            //This functions will give us the user token and we send it to the back end in the header as auth token.
            mongoDBGetCurrentUserFunction(idTokenResult.token, user)
                .then((res) => {
                // Add data to the React Store.
                    if (res.data) {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                company_name: res.data.company_name ? res.data.company_name : "Default company_name value",
                                current_residence: res.data.current_residence ? res.data.current_residence : "Default current_residence value",
                                current_city: res.data.current_city ? res.data.current_city : "Default current_city value",
                                current_province: res.data.current_province ? res.data.current_province : "Default current_province value",
                                official_residence: res.data.current_residence ? res.data.current_residence : "Default current_residence value",
                                official_city: res.data.current_city ? res.data.current_city : "Default current_city value",
                                official_province: res.data.current_province ? res.data.current_province : "Default current_province value",
                                fiscal_code: res.data.fiscal_code ? res.data.fiscal_code : "Default fiscal_code value",
                                images: res.data.images ? res.data.images : [
                                    {
                                        public_id: "jwrzeubemmypod99e8lz",
                                        url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
                                    },
                                ],
                                email: res.data.email,
                                role: res.data.role,
                                token: idTokenResult.token,
                            },
                        });
                    };
                    roleBasedRedirect(res);
                }).catch((err) => console.log("Login page get user info error: ", err));
        } catch (error) {
            console.log("Login page submit error: " + error.message);
            toast.error(error.message);
        }
    };

    // For Google login
    // const googleLogin = async () => {
    //   auth
    //     .signInWithPopup(googleAuthProvider)
    //     .then(async (result) => {
    //       const { user } = result;
    //       const idTokenResult = await user.getIdTokenResult();
    //          //This functions will give us the user token and we send it to the back end in the header as auth token.
    //       createOrUpdateUser(idTokenResult.token)
    //         .then((res) => {
    //           dispatch({
    //             type: "LOGGED_IN_USER",
    //             payload: {
    //               name: res.data.name,
    //               email: res.data.email,
    //               token: idTokenResult.token,
    //               role: res.data.role,
    //               _id: res.data._id,
    //             },
    //           });
    //           roleBasedRedirect(res);
    //         })
    //         .catch((err) => console.log(err));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.error(err.message);
    //     });
    // };

    return(
        <>
            <h1>LoginPage.js</h1>

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
                        <label className='block mb-20 text-xl'>
                            Password
                            <input
                                type="password"
                                className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                            />
                        </label>
                        <div className='text-xl text-white flex justify-between'>

                            <button
                                className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={!email || password.length < 6}
                                onClick={handleSubmit}
                            >
                              Login
                            </button>

                            <button
                                className='mr-1 ml-1 bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={!email || password.length < 6}
                            >
                                <Link to="/psw_recover">
                                    Recover pass
                                </Link>
                            </button>

                            <button className='ml-1 bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'>
                                <Link to="/register_user">
                                    Register
                                </Link>
                            </button>

                            {/*// For login with Google*/}
                            {/*<button className='bg-red w-200 py-3 rounded transition duration-300 hover:opacity-70'>*/}
                            {/*    <Link to="/main_menu">*/}
                            {/*        Google sign-in*/}
                            {/*    </Link>*/}
                            {/*</button>*/}
                        </div>
                    </form>
                </div>
            </main>    
        </>
    );
}