import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../images/logo.png";
import UsrAvatar from "../../images/usr_avatar.png";
import { Link } from "react-router-dom";
import {LogoutOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
//import firebase from "firebase";
import { getAuth, signOut } from "firebase/auth";


export default function Header() {

    let history = useHistory();
    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({ ...state }));

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
        // old version --> firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        history.push("/login");
    };

    return (
        <>
            <header className="h-32 px-4 border-b border-border bg-white dark:bg-blue">
                <div className="container mx-auto h-32 flex justify-between items-center">
                    <div className='flex bg-gray-100 rounded-full shadow-md overflow-hidden shadow-shadow'>
                        <button className='px-1.5 py-0.5 bg-gray'>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                color="#fff"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                                </path>
                            </svg>
                        </button>
                        <button className='px-1.5 py-0.5'>
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <Link to="/">
                            <img src={Logo} alt=""/>
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <div>
                            <Link to="/">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                    </path>
                                </svg>
                            </Link>
                        </div>
                        <div className='flex items-center mx-14'>
                            <div className='w-60 h-14 rounded-full overflow-hidden mr-4'>
                                <img className=' bg-green rounded' src={UsrAvatar} alt=""/>
                            </div>
                            <span className='font-normal uppercase hover:opacity-70 focus:opacity-70'>
                                <Link to="/user_page">
                                    My Data
                                </Link>
                            </span>
                        </div>
                        <div>
                            { user &&
                                <button
                                    className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'
                                    onClick={logout}
                                >
                                    <LogoutOutlined/> Log Out
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}