import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PswRecoverPage = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (reduxStoreUser && reduxStoreUser.token) history.push("/");
    }, [reduxStoreUser, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const config = {
        //     url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        //     handleCodeInApp: true,
        // };

        await sendPasswordResetEmail(auth, email /*config*/)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log("ERROR MSG IN FORGOT PASSWORD ", error);
            });
    };

    return (
        <>

            <main>
                {loading ? (
                    <h4 className="text-danger">Loading</h4>
                ) : (
                    <center><h4> </h4></center>
                )}
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>RECOVER PASSWORD</span></center>

                <div className="container mx-auto h-screen flex justify-center items-center">

                    <form
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
                                placeholder="Your email address"
                                autoFocus
                            />
                        </label>

                        <div className='text-xl text-white flex justify-between'>
                            <button
                                className='mr-1 bg-green w-200 py-3 rounded transition duration-300 hover:opacity-70'
                                disabled={!email}
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>  
    );
};

export default PswRecoverPage;
