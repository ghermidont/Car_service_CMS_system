//!IMPLEMENTED
import React, { useState, useEffect } from "react";
import { auth /*googleAuthProvider*/ } from "../firebase";
import { toast } from "react-toastify";
//useSelector is used to get the data from the state.
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../functions/callsToAuthRoutes";

export default function LoginPage({ history }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //we use destructuring to get specific data from the states that are defined in the reducers/index.js file.
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        let intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) history.push("/");
        }
    }, [user, history]);

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended
        let intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard");
            } else {
                history.push("/user/history");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            //This functions will give us the user token and we send it to the back end in the header as auth token.
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    // Add data to the React Store.
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    });
                    roleBasedRedirect(res);
                })
                .catch((err) => console.log(err));
        } catch (error) {
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
      <label className='block mb-2 text-xl' style={{float: "right", paddingRight: "10px"}}>
        <Link to="/main_menu">
            Click to go to &rArr; Main Menu Page
        </Link>
      </label>
       <h1>loginPage.js</h1>

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
                          className='bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                          disabled={!email || password.length < 6}
                          onClick={handleSubmit}
                      >
                          <Link to="/main_menu">
                              Login
                          </Link>
                      </button>

                      <button
                          className='bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'
                          disabled={!email || password.length < 6}
                      >
                          <Link to="/psw_recover">
                            Recover pass
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