//TODO Test the page.
import React, { useState, useEffect } from "react";
import { getIdTokenResult, signInWithEmailAndPassword } from "firebase/auth";
//import { auth /*googleAuthProvider*/ } from "../firebase";
import { toast } from "react-toastify";
//useSelector is used to get the data from the state.
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mongoDBGetCurrentUserFunction } from "../../functions/callsToAuthRoutes";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function LoginPage( { history } ){
    console.log( "LoginPage()" );

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ passwordShown, setPasswordShown ] = useState( false );
    //we use destructuring to get specific data from the states that are defined in the reducers.
    // user is the name of the userReduces
    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );
    //const info = {name: "Mike"};
    const dispatch = useDispatch();
    
    useEffect( () => {
        const intended = history.location.state;
        console.log( "history.location.state", history.location.state );

        if ( intended ) {
            return;
        } else {
            if ( reduxStoreUser && reduxStoreUser.token ){
                history.push( "/main_menu" );
            }
        }
    }, [ reduxStoreUser, history ] );

    const logout = () => {
        signOut( auth ).then( () => {
            toast.success("User signed out." );
        }).catch(( error ) => {
            toast.error("Error signing out.", error );
        });
        // old version --> firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push( "/" );
    };

    const roleBasedRedirect = ( role, status ) => {
        console.log( "LoginPage.js roleBasedRedirect() worked" );
        // check if intended
        let intended = history.location.state;
        if ( intended ) {
            history.push( intended.from );
        } else {
            if ( status ) {
                if ( status === "active" ) {
                    if (role === "a%tDHM*54fgS-rl55kfg") {
                        history.push( "/admin_dashboard" );
                    } else if ( role === "b%dDHM*SDKS-Jl5kjs" ) {
                        history.push( "/main_menu" );
                    } else {
                        toast.error( "Your role could not be established. Please register or try to re-login." );
                        history.push( "/" );
                    }
                } else {
                    logout();
                    toast.error("Your account is inactive please contact the admin.");
                }
            } else {
                logout();
                toast.error( "Could not find account." );
            }
        }
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        try {
            let FBUser = await signInWithEmailAndPassword( auth, email, password );
            const { user } = FBUser;
           
            const idTokenResult = await getIdTokenResult( user, false );
            console.log( "LoginPage.js getIdTokenResult.token: ", idTokenResult.token );
            console.log( "LoginPage.js user.email: ", user.email );
            //This functions will give us the user token, and we send it to the back end in the header as auth token.
            mongoDBGetCurrentUserFunction( idTokenResult.token, user.email )
                .then( ( res ) => {
                // Add data to the React Store.
                    if ( res.data!==null ){
                        console.log( "LoginPage.js mongoDBGetCurrentUserFunction() response: ", JSON.stringify( res ) );
                        dispatch( {
                            type: "LOGGED_IN_USER",
                            payload: {
                                _id: res.data._id,
                                status: res.data.status,
                                company_name: res.data.company_name,
                                current_residence: res.data.current_residence,
                                current_city: res.data.current_city,
                                current_province: res.data.current_province,
                                official_residence: res.data.official_residence,
                                official_city: res.data.official_city,
                                official_province: res.data.official_province,
                                fiscal_code: res.data.fiscal_code,
                                images: res.data.images,
                                email: res.data.email,
                                role: res.data.role,
                                token: idTokenResult.token,
                            },
                        } );

                        roleBasedRedirect( res.data.role, res.data.status );
                    } else {
                        toast.error( "Could not get/find user info in the mongoDB database. Unable to proceed" );
                    }
                } ).catch( ( err ) => {
                    console.log( "Login page get user info error: ", err );
                    toast.error( `Login page get user info error: ${ err }` );
                } );
        } catch (error) {
            console.log("Login page submit error: " + error.message);
            toast.error("Wrong email or password.");
        }
    };

    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
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
            <main>
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>LOGIN</span></center>

                <div className="container mx-auto h-screen flex justify-center items-center">
                    <div className='max-w-600 w-100% bg-grayL px-12 pt-8 pb-14 shadow-shadow rounded'>
                        <form
                            action="#"
                            autoComplete="off"
                            onSubmit={ handleSubmit }
                        >
                            <label className='block mb-2 text-xl'>
                                Email
                                <input
                                    className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                    type="email"
                                    required
                                    value={ email }
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    autoFocus
                                />
                            </label>
                            <label className='block mb-20 text-xl'>
                            Password
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Your password"
                                />
                                <span onClick={ ()=>{ togglePassword(); } } style={ { color: "blue", fontSize: "15px" } }> Show password </span>
                            </label>
                            <div className='text-xl text-white flex justify-between'>
                                <button
                                    //type="submit"
                                    className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                    disabled={ !email || password.length < 6 }
                                    onClick={ handleSubmit }
                                >
                                    Login
                                </button>

                                <button
                                    className='mr-1 ml-1 bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                    disabled={ !email || password.length < 6 }
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
                            </div>
                        </form>
                        {/*// For login with Google*/}
                        {/*<button className='bg-red w-200 py-3 rounded transition duration-300 hover:opacity-70'>*/}
                        {/*    <Link to="/main_menu">*/}
                        {/*        Google sign-in*/}
                        {/*    </Link>*/}
                        {/*</button>*/}
                        {/*<button*/}
                        {/*    className='ml-1 bg-blue w-200 py-3 rounded transition duration-300 hover:opacity-70'*/}
                        {/*    onClick={() => { mongoDBCreateTestFunction(info); }}*/}
                        {/*>*/}
                        {/*    Test*/}
                        {/*</button>*/}

                    </div>
                </div>
            </main>    
        </>
    );
}