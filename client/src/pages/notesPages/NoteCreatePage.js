import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { mongoDBCreateNoteFunction } from "../../functions/callsToNotesRoutes";
import { v4 as uuidv4 } from "uuid";

export default function NoteCreatePage( { history } ){
    const { reduxStoreUser } = useSelector(( state) => ( { ...state } ) );

    const initialState = {
        id: uuidv4(),
        user: reduxStoreUser._id,
        title: "title",
        content: "content",
    };

    const [ notesParamsState, setNotesParamsState ] = useState( initialState );

    // const {
    //     title,
    //     content
    // } = notesParamsState;

    const handleSubmit = async ( event ) => {
        event.preventDefault();
        console.log( "NoteCreatePage() handleSubmit() worked!" );

        try {
            console.log( "notesParamsState: ", notesParamsState );
            await mongoDBCreateNoteFunction( reduxStoreUser.token, notesParamsState )
                .then( () => {
                    console.log( "mongoDBCreateNoteFunction() worked in NoteCreatePage.js" );
                    toast.success( "Note added successfully." );
                    history.push( "/notes_list" );
                } )
                .catch( ( error ) => {
                    console.log( "mongoDBCreateNoteFunction() error: ", error );
                    toast.error( "Session expired. Please re-login in order to be able to perform this action." );
                    //Logout logic.
                } );
        } catch ( error ) {
            console.log( "mongoDBCreateNoteFunction() in handleSubmit try catch error: ", error.message );
            toast.error( "Error adding note: ", error.message );
        }
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setNotesParamsState({ ...notesParamsState, [ event.target.name ] : event.target.value } );
    };

    return (
        <main>
            <div className="container mx-auto py-20">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>ADD NOTE</span></center>

                <form onSubmit={ handleSubmit }>
                    <label className="block mb-8 text-xl max-w-600">
                        TITLE
                        <input
                            className="block container px-2 py-1 border outline-none rounded border-border mt-1.5"
                            type="text"
                            name="title"
                            //value={ title }
                            onChange={ handleUserInput }
                            placeholder="Title"
                            required
                        />
                    </label>

                    <label className="block mb-8 text-xl max-w-600">
                        CONTENT
                        <textarea
                            className="w-100% text-xl px-6 py-4 mt-1 border border-border rounded-lg h-40"
                            name="content"
                            rows="4"
                            maxLength="1000"
                            //value={ content }
                            placeholder="Content"
                            onChange={ handleUserInput }
                            required
                        />
                    </label>

                    <div className="flex justify-end">
                        <button
                            className="flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70"
                            type="submit"
                        >
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