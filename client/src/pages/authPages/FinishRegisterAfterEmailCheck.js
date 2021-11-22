import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { mongoDBCreateUserFunction } from "../../functions/callsToAuthRoutes";
import { getIdTokenResult, signInWithEmailLink, isSignInWithEmailLink } from "firebase/auth";

//Since the whole app is wrapped in <BrowserRouter> we can do destructuring {history} its the same thing as using (props) >>> props.history.
const FinishRegisterAfterEmailCheck = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch();

    useEffect(() => {
        //Getting the email from local storage.
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, [history, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if ( !password ) {
            toast.error("Email and password is required");
            return;
        }

        if ( password.length < 6 ) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            console.log(window.location.href);
            if (isSignInWithEmailLink(auth, window.location.href)) {
                //Signing in the new user with email link.
                setEmail(window.localStorage.getItem("emailForRegistration"));

                const result = await signInWithEmailLink(auth, email, window.location.href)
                    .then(() => {
                        console.log("Done the signInWithEmailLink()");
                        console.log("window.location.href", window.location.href);
                    })
                    .catch(err => {
                        console.log("signInWithEmailLink ", err);
                    });

                //console.log("EmailVerified: ", result.user.emailVerified);

                if (result) {
                    // remove user email fom local storage
                    window.localStorage.removeItem("emailForRegistration");
                    // get user id token
                    const user = auth.currentUser;
                    await user.updatePassword(password)
                        .then(()=>console.log("Password Updated!"))
                        .catch(err => {
                            console.log("error updating the password: ", err);
                        });

                    const idTokenResult = await getIdTokenResult(user, false);
                    // redux store
                    console.log("user", user, "idTokenResult", idTokenResult.token);
                    // On this stage the new user is created and in Mongo DB and then the data is also written in the redux store with dispatch function.
                    mongoDBCreateUserFunction(idTokenResult.token, {
                        email: user.email,
                        name: "Default name value",
                        surname: "Default surname value",
                        date: "Default date value",
                        fiscal_code: "Default fiscal_code value",
                        address: "Default address value",
                        city: "Default city value",
                        province: "Default province value",
                        notes: "Default notes value",
                        mobile: "Default mobile value",
                        token: idTokenResult.token,
                        role: "basic",
                    })
                        .then((res) => {
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
                                    email: res.data.email,
                                    name: res.data.name ? res.data.name: "Default name value",
                                    surname: res.data.surname ? res.data.surname: "Default surname value",
                                    date: res.data.date ? res.data.date: "Default date value",
                                    fiscal_code: res.data.fiscal_code ? res.data.fiscal_code: "Default fiscal_code value",
                                    address: res.data.address ? res.data.address: "Default address value",
                                    city: res.data.city ? res.data.city: "Default city value",
                                    province: res.data.province ? res.data.province: "Default province value",
                                    notes: res.data.notes ? res.data.notes: "Default notes value",
                                    mobile: res.data.mobile ? res.data.mobile: "Default mobile value",
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                },
                            });
                        })
                        .catch((err) => console.log("mongoDBCreateUserFunction() error: ", err));

                    // redirect
                    history.push("/user_page");
                }
            }else{
                throw("isSignInWithEmailLink() is: ", isSignInWithEmailLink(auth, window.location.href));
            }
        } catch (error) {
            console.log("handleSubmit try catch error: ", error);
            toast.error(error.message);
        }
    };  

    return (
        <>
            <h1>FinishRegistrationAfterEmailCheck.js</h1>

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
                                type="email"
                                value={email}
                                disabled
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
                                autoFocus
                            />
                        </label>
                        <div className='text-xl text-white flex justify-between'>

                            <button
                                className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={password.length < 6}
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

export default FinishRegisterAfterEmailCheck;
