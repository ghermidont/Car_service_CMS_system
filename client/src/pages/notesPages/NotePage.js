import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { mongoDBGetSingleNoteFunction } from "../../functions/callsToNotesRoutes";
import { useSelector } from "react-redux";

const initialState = {
    title: "title",
    content: "content",
};

export default function NotePage( { match } ) {
    const [ currentNoteParamsState, setCurrentNoteParamsState ] = useState( initialState );
    const { reduxStoreUser } = useSelector( ( state ) => ( { ...state } ) );

    const { title, content } = currentNoteParamsState;

    const { slug } = match.params;

    useEffect(() => {
        loadNoteDbInfo();
        // eslint-disable-next-line
    }, [] );

    const loadNoteDbInfo = () => {
        mongoDBGetSingleNoteFunction( slug, reduxStoreUser.token ).then( ( note ) => {
            console.log( "single note", note );
            setCurrentNoteParamsState( { ...currentNoteParamsState, ...note.data } );
        } ).catch( ( error ) => {
            toast.error( "Error loading note info: ", error );
        } );
    };

    return (
        <main>

            <div className="container mx-auto py-20">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>NOTE</span></center>

                <label className='block mb-8 text-xl max-w-600'> TITLE
                    <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                        <span className='font-normal text-text text-lg'>{ title }</span>
                    </div>
                </label>

                <label className='block mb-8 text-xl max-w-600'> CONTENT
                    <div className='text-xl text-black font-bold uppercase mb-4 bg-white px-2'>
                        <span className='font-normal text-text text-lg'>{ content } </span>
                    </div>
                </label>

                <div className='flex justify-end'>
                    <Link to={`/note/update/${slug}`}>
                        <button className='flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70'>
                            Edit
                        </button>
                    </Link>
                </div>

            </div>
        </main>
    );
}