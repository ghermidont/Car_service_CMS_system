//TODO to refactor

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
        console.log("UseEffect email from LS: ", email);
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
                    })
                    .catch(err => {
                        console.log("signInWithEmailLink ", err);
                    });

                //console.log("EmailVerified: ", result.user.emailVerified);

                if (result) {
                    // remove user email fom local storage
                    window.localStorage.removeItem("emailForRegistration");
                    // get user id token
                    let user = auth.currentUser;
                    await user.updatePassword(password);
                    const idTokenResult = await getIdTokenResult(user, false);
                    // redux store
                    console.log("user", user, "idTokenResult", idTokenResult);
                    // On this stage the new user is created and in Mongo DB and then the data is also written in the redux store with dispatch function.
                    mongoDBCreateUserFunction(idTokenResult.token)
                        .then((res) => {
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
                                    email: res.data.email,
                                    name: res.data.name,
                                    surname: res.data.surname,
                                    date: res.data.date,
                                    fiscal_code: res.data.fiscal_code,
                                    address: res.data.address,
                                    city: res.data.city,
                                    province: res.data.province,
                                    notes: res.data.notes,
                                    mobile: res.data.mobile,
                                    token: idTokenResult.token,
                                    role: res.data.role,
                                    _id: res.data._id,
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

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default FinishRegisterAfterEmailCheck;
