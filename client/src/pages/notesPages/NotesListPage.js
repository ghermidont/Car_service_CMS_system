import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    mongoDBGetAllNotesFunction,
    mongoDBGetNotesCountFunction,
    mongoDBDeleteNoteFunction,
} from "../../functions/callsToNotesRoutes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card, Pagination, List, Avatar } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function NotesListPage( { history } ) {
    console.log( "NotesListPage() worked" );

    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );
    const dispatch = useDispatch();

    const [ dbNotes, setDbNotes ] = useState( [] );
    const [ page, setPage ] = useState( 1 );
    const [ notesCount, setNotesCount ] = useState( 0 );
    const [ loading, setLoading ] = useState( false );  

    useEffect(() => {
        console.log( "NotesListPage() useEffect() [] worked." );
        mongoDBGetNotesCountFunction( reduxStoreUser._id )
            .then( ( res) => {
                setNotesCount( res.data );
                console.log( "mongoDBGetNotesCountFunction() res.data: ", res.data );
            } )
            .catch( ( error ) => {
                toast.error( "Error loading notes count", error );
                console.log( "Error loading notes count", error );
            } );
        console.log( "Notes count: ", notesCount );
    }, [] );
  
    const logout = () => {
        console.log( "CarArchivePage logout() worked." );
        signOut( auth ).then( () => {
            toast.success( "User signed out." );
        }).catch(( error ) => {
            toast.error( "Error signing out.", error );
        });
        // old version --> firebase.auth().signOut();
        dispatch( {
            type: "LOGOUT",
            payload: null,
        } );
        history.push( "/" );
    };

    const loadAllNotes = () => {
        console.log( "NotesArchivePage loadAllNotes() worked." );
        setLoading( true );
        // sort, order, limit
        if ( reduxStoreUser._id === undefined ){
            logout();
            return toast.error( "reduxStoreUser._id is undefined please re-login." );

        } else {
            mongoDBGetAllNotesFunction( "createdAt", "desc", page, reduxStoreUser._id )
                .then( ( res ) => {
                    setDbNotes( res.data );
                    setLoading( false );
                    console.log( "NotesArchivePage loadAllNotes() mongoDBGetAllNotesFunction: ", res.data );
                } ).catch( ( error ) => {
                    toast.error( "Error getting all notes: ", error );
                    console.log( "Error getting all notes: ", error );
                } );
        }
    };

    const deleteNoteFunction = ( slug ) => {
        setLoading( true );
        console.log( "NotesListPage deleteNoteFunction() worked." );
        mongoDBDeleteNoteFunction( reduxStoreUser.token, slug )
            .then( ()=> {
                toast.success( "Note deleted successfully!" );
                setLoading( false );
                setDbNotes([]);
                window.location.reload();
            } )
            .catch( ()=>{
                toast.error( "Note deletion failed!" );
            } );
    };

    useEffect(() => {
        console.log( "NotesListPage useEffect() [page] worked." );
        loadAllNotes();
        setDbNotes( [] );
    }, [ page ] );

    const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };

    return (
        <main className='mb-12'>

            { loading && <h1>Loading... </h1> }

            <div className="container mx-auto">
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>NOTES LIST</span></center>
                <div className='py-20 rounded-3xl bg-grayL shadow-shadow  mt-16 mb-10'>
                    <List
                        itemLayout="vertical"
                        size="large"

                        dataSource={ dbNotes }

                        renderItem={ item => (
                            <List.Item
                                key={ item.title }
                            >
                                <List.Item.Meta
                                    title={ <Link to={ `/note/${ item.id }`}><strong>{ item.title }</strong></Link> }
                                    description={ new Date( item.createdAt ).toLocaleString( "en-GB", dateOptions ) }
                                />
                                { item.content }
                                {
                                    <div>
                                        <Link to={`/note/update/${item.id}`}>
                                            <button className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            className='w-75 h-8 m-1 bg-red flex justify-center items-center text-white uppercase rounded hover:opacity-80 uppercase'
                                            onClick={ ()=>deleteNoteFunction( item.id ) }
                                        >
                                            Delete
                                        </button>
                                        <hr />
                                    </div>
                                }
                            </List.Item>
                        )}
                    />


                    { dbNotes.length === 0 && <center><h1> No notes info loaded... </h1></center>}
                    {/* Pagination */}
                    <div className="row">
                        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                            <Pagination
                                defaultCurrent={ 1 }
                                current={ page }
                                total={ notesCount }
                                onChange={ ( value ) => setPage( value ) }
                            />
                        </nav>
                    </div>

                    {/*Bottom buttons section*/}
                    <div className='flex justify-between mx-8'>
                        <div className='flex'>
                            {/*Add vehicle button*/}
                            <button className='flex items-center text-xl text-white bg-blue uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"> </path>
                                </svg>
                                <Link to="/add_note">
                                    Add note
                                </Link>
                            </button>

                        </div>

                    </div>
                </div>


            </div>
        </main>
    );
}