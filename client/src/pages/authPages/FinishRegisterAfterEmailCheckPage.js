import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { mongoDBCreateUserFunction } from "../../functions/callsToAuthRoutes";
import { getIdTokenResult, signInWithEmailLink, isSignInWithEmailLink, updatePassword, signOut } from "firebase/auth";

//Since the whole app is wrapped in <BrowserRouter> we can do destructuring {history} its the same thing as using (props) >>> props.history.
const FinishRegisterAfterEmailCheckPage = ( { history } ) => {
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ passwordShown, setPasswordShown ] = useState( false );

    let dispatch = useDispatch();

    useEffect( () => {
        console.log( "FinishRegisterAfterEmailCheckPage.js useEffect() worked." );
        //Getting the email from local storage.
        setEmail( window.localStorage.getItem( "emailForRegistration" ) );
        console.log( "FinishRegisterAfterEmailCheckPage() useEffect() email: ", email );
    }, [ history, email ] );

    const logout = () => {
        signOut( auth ).then( () => {
            toast.success( "You are being signed out. Please login with your new credentials." );
        } ).catch( ( error ) => {
            toast.error( "Error signing out: ", error );
        } );
        // old version --> firebase.auth().signOut();
        dispatch( {
            type: "LOGOUT",
            payload: null,
        } );
        history.push( "/" );
    };

    const handleSubmit = async ( e ) => {
        console.log( "FinishRegisterAfterEmailCheckPage handleSubmit() worked!" );
        e.preventDefault();
        // password validation
        if ( !password ) {
            toast.error( "Email and password is required" );
            return;
        }

        if ( password.length < 6 ) {
            toast.error( "Password must be at least 6 characters long" );
            return;
        }

        try {
            console.log( "try window.location.href", window.location.href );
            if ( isSignInWithEmailLink( auth, window.location.href ) ) {
                //Signing in the new user with email link.
                //setEmail(window.localStorage.getItem("emailForRegistration"));

                await signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        console.log( "Done the signInWithEmailLink()" );
                        console.log( "then window.location.href", window.location.href );
                    })
                    .catch(err => {
                        console.log("signInWithEmailLink ", err);
                    });

                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                const user = auth.currentUser;
                await updatePassword( user, password )
                    .then(()=>console.log("Password Updated!"))
                    .catch(err => {
                        console.log("Error updating the password: ", err);
                    });

                await getIdTokenResult( user, false)
                    .then( async ( idTokenResult ) => {
                    // redux store
                        console.log( "FinishRegisterAfterEmailCheckPage handleSubmit user: ", user, "idTokenResult", idTokenResult.token );

                        const userInfoForMongoDB = {
                            status: "active",
                            company_name: "Company name",
                            current_residence: "Current residence",
                            current_city: "Current city",
                            current_province: "Current province",
                            official_residence: "Official residence",
                            official_city: "Official city",
                            official_province: "Official province",
                            fiscal_code: "Fiscal code",
                            images: [],
                            email: user.email,
                            role: "b%dDHM*SDKS-Jl5kjs",
                        };

                        // On this stage the new user is created and in Mongo DB and then the data is also written in the redux store with dispatch function.
                        await mongoDBCreateUserFunction( idTokenResult.token, userInfoForMongoDB ).then( ( res) => {
                            console.log( "mongoDBCreateUserFunction() worked in FinishRegisterAfterEmailCheckPage.js" );
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
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
                                    token: res.data.token,
                                    role: res.data.role,
                                },
                            });
                            logout();
                        })
                            .catch( ( err ) =>
                            {
                                toast.error( "Error in mongoDBCreateUserFunction() in FinishRegisterAfterEmailCheckPage.js" );
                                console.log( "mongoDBCreateUserFunction() error: ", err );
                            });
                    //Logging out the user to sign in with the new password.
                    });

            }else{
                throw( "isSignInWithEmailLink() is: ", isSignInWithEmailLink( auth, window.location.href ));
            }
        } catch ( error ) {
            console.log( "FinishRegisterAfterEmailCheckPage() handleSubmit() try catch error: ", error );
            toast.error( "FinishRegisterAfterEmailCheckPage() handleSubmit() try catch error: ", error.message );
        }
    };

    // Password toggle handler
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <>
            <main>
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>FINISH REGISTER</span></center>

                <div className="container mx-auto h-screen flex justify-center items-center">
                    <form
                        action="#"
                        autoComplete="off"
                        className='max-w-600 w-100% bg-grayL px-12 pt-8 pb-14 shadow-shadow rounded'
                        onSubmit={ handleSubmit }
                    >
                        <label className='block mb-2 text-xl'>
                            Email:
                            <input
                                className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                type="email"
                                value={ email }
                                disabled
                            />
                        </label>
                        <label className='block mb-20 text-xl'>
                            Password
                            <input
                                type={passwordShown ? "text" : "password"}
                                className='block container px-2 py-1 border outline-none rounded border-border mt-1.5'
                                value={ password }
                                onChange={ ( e ) => setPassword( e.target.value ) }
                                placeholder="Your password"
                                autoFocus
                            />
                            <span onClick={ ()=>{ togglePassword(); } } style={ { color: "blue", fontSize: "15px" } }>Show password</span>
                        </label>
                        <div className='text-xl text-white flex justify-between'>
                            <button
                                className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={ password.length < 6 }
                                type="submit"
                            >
                                Complete Registration
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default FinishRegisterAfterEmailCheckPage;
