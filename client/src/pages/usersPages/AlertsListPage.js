//TODO make this page.
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Pagination, List } from "antd";
import {
    mongoDBGetAlertsFunction,
    mongoDBGetAlertsCountFunction,
    mongoDBToggleAlertParamsFunction
} from "../../functions/callsToCarRoutes";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function AlertsListPage( { history } ) {
    console.log( "AlertsListPage() worked" );

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );
    const dispatch = useDispatch();

    const [ dbAlerts, setDbAlerts ] = useState( [] );
    const [ page, setPage ] = useState( 1 );
    const [ alertsCount, setAlertsCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );

    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

    const currentDate = new Date().toDateString();
    console.log( "AlertsListPage() currentDate: ", currentDate );

    const logout = () => {
        console.log( "CarArchivePage logout() worked." );
        signOut( auth ).then( () => {
            toast.success( "User signed out." );
        } ).catch( ( error ) => {
            toast.error( "Error signing out.", error );
        } );
        // old version --> firebase.auth().signOut();
        dispatch( {
            type: "LOGOUT",
            payload: null,
        } );
        history.push( "/" );
    };

    useEffect( () => {
        console.log( "AlertsPage() useEffect() [] worked." );
        mongoDBGetAlertsCountFunction( reduxStoreUser._id, currentDate )
            .then( ( res ) => {
                setAlertsCount( res.data );
                console.log( "mongoDBGetAlertsCountFunction() res.data: ", res.data );
            } )
            .catch( ( error ) => {
                toast.error( "Error loading alerts count", error );
            } );
        console.log( "useEffect() alertsCount: ", alertsCount );
    }, [] );

    const toggleAlertsParams = ( slug, field, value ) => {      
        mongoDBToggleAlertParamsFunction( slug, field, value, reduxStoreUser.authToken )
            .then( ( res ) => {
                toast.success( "Alert state changed changed", res );
                window.location.reload();
            } )
            .catch( ( err ) => {
                console.log( "Error changing alert state: ", err );
                toast.error( "Error changing alert state: ", err );
            } );        
    };

    const getAlerts = () => {
        console.log( "AlertsListPage getAlerts() worked." );
        setLoading( true );
        // sort, order, limit
        if ( reduxStoreUser._id === undefined ){
            logout();
            return toast.error( "reduxStoreUser._id is undefined please re-login." );
        } else {
            mongoDBGetAlertsFunction( "createdAt", "desc", page, currentDate, reduxStoreUser._id )
                .then( ( res ) => {
                    setDbAlerts( res.data );
                    setLoading( false );
                    console.log( "AlertsListPage getAlerts() mongoDBGetAlertsFunction: ", res.data );
                } ).catch( ( error ) => {
                    toast.error( "Error getting alerts: ", error );
                    console.log( "Error getting alerts: ", error );
                } );
        }
    };

    useEffect( () => {
        console.log( "AlertsListPage() useEffect() [page] useEffect worked." );
        getAlerts();
        setDbAlerts( [] );
    }, [ page ] );

    return (
        <main className="mb-12">
            { loading && <h1>Loading... </h1> }
            <div className="container mx-auto">
                <center><span style={ {fontWeight: "bold", fontSize: "25px"} }>Revision expiry alerts</span></center>
                <div className="py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={ dbAlerts }
                        renderItem={ item => (
                            <List.Item key={ item._id } >
                                <List.Item.Meta
                                    title={ <strong><span style={ { color: item.alerts.read===false?"red":"black" } }>ALERT</span> car: { item.licensePlate } </strong> }
                                    description={ item.createdAt }
                                />
                                {
                                    <div>
                                        <div>
                                            { new Date( item.revisions.end ).toLocaleString( "en-GB", dateOptions ) }
                                        </div>
                                        <div>
                                            <button
                                                className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70"
                                                onClick={
                                                    ()=>{
                                                        toggleAlertsParams( item.slug, "show", false );
                                                    }
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase"
                                                onClick={
                                                    ()=>{
                                                        toggleAlertsParams( item.slug, "read", true );
                                                    }
                                                }
                                            >
                                                Mark a read
                                            </button>
                                        </div>
                                    </div>
                                }
                            </List.Item>
                        )}
                    />

                    { dbAlerts.length === 0 && <center><h1> No alerts loaded... </h1></center>}
                    {/* Pagination */}
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                defaultCurrent={ 1 }
                                current={ page }
                                total={ alertsCount }
                                onChange={ ( value ) => setPage( value ) }
                            />
                        </nav>
                    </div>
                </div>

            </div>
        </main>
    );
}