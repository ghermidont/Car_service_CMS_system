import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBGetSingleNoteFunction, mongoDBUpdateNoteFunction } from "../../functions/callsToNotesRoutes";

const initialState = {
    title: "",
    content: "",
};

export default function NoteUpdatePage( { match } ) {
    const [ currentNoteParamsState, setCurrentNoteParamsState ] = useState( initialState );

    const { title, content } = currentNoteParamsState;

    const { slug } = match.params;
    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector(( state ) => ( { ...state } ) );

    const loadNoteDbInfo = () => {
        mongoDBGetSingleNoteFunction( slug, reduxStoreUser.token ).then( ( note) => {
            console.log( "single note", note );
            setCurrentNoteParamsState( { ...currentNoteParamsState, ...note.data } );
        });
    };

    useEffect(() => {
        loadNoteDbInfo();
    }, [] );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        mongoDBUpdateNoteFunction( slug, currentNoteParamsState, reduxStoreUser.token )
            .then( () => {
                toast.success( "Note info is updated successfully." );
                //Reload the page wit the new values.
                window.location.reload();
            } )
            .catch( ( error ) => {
                toast.error( error.response.data.err );
            } );
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentNoteParamsState( { ...currentNoteParamsState, [event.target.name]: event.target.value } );
    };

    return (
        <main>
            <h1>NoteUpdatePage.js</h1>

            <div className="container mx-auto py-20">
                <form onSubmit={ handleSubmit }>
                    <label className='block mb-8 text-xl max-w-600'>
                        TITLE
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="title"
                            value={ title }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <label className='block mb-8 text-xl max-w-600'>
                        CONTENT
                        <textarea
                            className="w-100% text-xl px-6 py-4 mt-1 border border-border rounded-lg h-40"
                            name="content"
                            rows="4"
                            maxLength="1000"
                            value={ content }
                            onChange={ handleUserInput }
                        />
                    </label>

                    <div className='flex justify-end'>

                        <button className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"> </path>
                            </svg>
                            Salva
                        </button>

                    </div>
                </form>
            </div>
        </main>
    );
}