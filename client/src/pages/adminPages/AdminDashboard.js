import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
    mongoDBGetAllUsersFunction,
    mongoDBGetUsersCountFunction,
    mongoDBDeleteUserFunction,
    mongoDBToggleUserAccessFunction
} from "../../functions/callsToAdminRoutes";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../../firebase";

export default function AdminDashboard ( { history } ) {
    const [ page, setPage ] = useState( 1 );
    const [ usersCount, setUsersCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );
    const [ mongoDbUsersList, setMongoDbUsersList ] = useState( [] );
    const dispatch = useDispatch();

    const rolesListState = [ "a%tDHM*54fgS-rl55kfg", "b%dDHM*SDKS-Jl5kjs" ];

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );

    const getUsersFromDb = async () => {
        console.log( "getUsersFromDb() worked: " );
        setLoading( true );
        await mongoDBGetAllUsersFunction("createdAt", "desc", page, reduxStoreUser.token )
            .then( ( res ) => {
                // console.log( "res.data[0] length: ", Object.keys( res.data[0] ).length !== 0 );
                //if( Object.keys( res.data[0] ).length !== 0 ) {
                setMongoDbUsersList( res.data );
                setLoading( false );
                console.log( "mongoDbUsersList: ", mongoDbUsersList );
                // }
                // if( Object.keys( res.data[0] ).length === 0 ){ getUsersFromDb(); }
            })
            .catch( ( err ) => {
                setLoading( false );
                console.log( "mongoDBGetAllUsersFunction() err: ", err );
            });
    };

    useEffect( () => {
        getUsersFromDb().then();
    }, [ page ] );

    useEffect( () => {
        mongoDBGetUsersCountFunction( reduxStoreUser.token )
            .then(
                ( res ) => {
                    setUsersCount( res.data );
                    console.log( "mongoDBGetUsersCountFunction worked()." );
                    console.log( "mongoDBGetUsersCountFunction: ", res.data );
                }
            )
            .catch( ( error ) => {
                toast.error( "Error loading users count: ", error );
                console.log( "Error loading users count: ", error );
            });
    }, [] );

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

    const toggleUserRole = ( userId, role ) => {
        if(reduxStoreUser._id) {
            mongoDBToggleUserAccessFunction(userId, role, reduxStoreUser.authToken)
                .then((res) => {
                    toast.success("User role changed");
                })
                .catch((err) => {
                    console.log("Error changing user role: ", err);
                    toast.error("Error changing user role: ", err);
                });
        } else {
            logout();
        }
    };
    
    const deleteUserFromDB = ( slug, company_name ) => {
        mongoDBDeleteUserFunction( slug, reduxStoreUser.token )
            .then( () => window.alert( `User ${ company_name } removed successfully.` ) )
            .catch( err => window.alert( err ) );
    };

    return(
        <>
            <center><h1 style={ { fontSize: 20, fontWeight: 700 } }> Admin dashboard </h1></center>
            <main className='mb-12'>
                <h1>UsersListPage.js</h1>

                <div className="container mx-auto">
                    <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                        { loading ? (
                            <h4 className="text-danger"> Loading... </h4>
                        ) : (
                            <h4> Users List: </h4>
                        ) }
                        <table className='mx-auto mb-8'>
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> </th>

                                    <th className='px-1 py-1.5 w-75 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    ID
                                    </th>
                                    <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Ragione sociale
                                    </th>
                                    <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Email
                                    </th>
                                    <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    P. Iva
                                    </th>
                                    <th className='px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase'>
                                    Created At
                                    </th>
                                    <th className="px-6 py-1.5 w-200 bg-blue border border-border text-2xl text-white font-normal uppercase">
                                    Role
                                    </th>
                                </tr>
                            </thead>                         
                            <tbody>
                                { mongoDbUsersList!==[] ? mongoDbUsersList.map( userInfo => (
                                 
                                    <tr key={ userInfo._id }>
                                        <td>
                                            <button className="w-75 h-8 m-1 bg-green flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase">
                                                <Link to={ `admin/user/${ userInfo.email }` }>
                                                        Open
                                                </Link>
                                            </button>
                                        </td>
                                        <td className="pr-3">
                                            <button
                                                className="w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase"
                                                onClick={ () => deleteUserFromDB( userInfo.slug, userInfo.company_name ) }
                                            >
                                                    Delete
                                            </button>
                                        </td>

                                        <td className="border border-border px-3">{ userInfo._id }</td>
                                        <td className="border border-border px-3">{ userInfo.company_name }</td>
                                        <td className="border border-border px-3">{ userInfo.email }</td>
                                        <td className="border border-border px-3">{ userInfo.fiscal_code }</td>
                                        <td className="border border-border px-3">{ userInfo.createdAt }</td>
                                        <td className="border border-border px-3">
                                            {/*//TODO Fix here the defaultValue error */}
                                            <select
                                                name="client"
                                                className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                                                //className="form-control"
                                                onChange={ ( e ) => {
                                                    userInfo.role = e.target.value;
                                                    console.log("userInfo.role: ",  userInfo.role);
                                                }
                                                } 
                                            >
                                                <option> Please select </option>
                                                { rolesListState.length > 0 &&
                                                        rolesListState.map( ( r ) => (
                                                            <option key={ r } value={ r } selected={ r===userInfo.role }>
                                                                { r === "a%tDHM*54fgS-rl55kfg" ? "Admin" : "User" }
                                                            </option>
                                                        ) )

                                                }
                                            </select>
                                            <button
                                                className="w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase"
                                                onClick={ () => toggleUserRole( userInfo.email, userInfo.role ) }
                                            >
                                                Change role
                                            </button>
                                        </td>
                                    </tr>

                                )):
                                    (<div>No user info loaded .... </div>)
                                }
                                    
                            </tbody>                           
                        </table>

                        {/* Pagination */}
                        <div className="row">
                            <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                                <Pagination
                                    current={ page }
                                    total={ ( usersCount / 3 ) * 10 }
                                    onChange={ ( value ) => setPage( value ) }
                                />
                            </nav>
                        </div>

                    </div>
                    <div className='flex justify-end mx-8'>
                        <div className='flex'>
                            <button
                                className='flex items-center text-xl text-white  bg-blueDark uppercase py-1 px-4 rounded transition hover:opacity-70 focus:opacity-70'>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"> </path>
                                </svg>
                                    Stampa Lista
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}