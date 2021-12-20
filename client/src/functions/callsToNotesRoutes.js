/** Functions that trigger the calls to the user related backend routes. */
import axios from "axios";

export const mongoDBCreateNoteFunction = async ( authToken, note ) => {
    console.log( "mongoDBCreateNoteFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/note/new`,
            note,
            { headers: { authToken } }
        );
};

// Not used anywhere. For just in case.
// export const mongoDBGetNotesByCountFunction = async (count) => {
//     return await axios.get(`${process.env.REACT_APP_API}/notes/${count}`);
// };

export const mongoDBDeleteNoteFunction = async ( authToken, slug ) => {
    console.log( "mongoDBDeleteNoteFunction() worked" );
    return await axios
        .delete(
            `${process.env.REACT_APP_API}/note/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBGetSingleNoteFunction = async ( slug, authToken ) => {
    console.log( "mongoDBGetSingleNoteFunction() worked" );
    return await axios
        .get(
            `${process.env.REACT_APP_API}/note/${slug}`,
            { headers: { authToken } }
        );
};

export const mongoDBUpdateNoteFunction = async ( slug, note, authToken ) => {
    console.log( "mongoDBUpdateNoteFunction() worked" );
    return await axios
        .put(
            `${process.env.REACT_APP_API}/note/update/${slug}`,
            note,
            {
                headers: { authToken }
            }
        );
};

//The following two calls are used for forming the pagination.
//These two functions bellow are used for pagination.
export const mongoDBGetAllNotesFunction = async ( sort, order, page, userId ) => {
    console.log( "mongoDBGetAllNotesFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/notes`,
            { sort, order, page, userId }
        );
};

export const mongoDBGetNotesByFilterFunction = async ( sort, order, clientId, userId ) => {
    console.log( "mongoDBGetNotesByFilterFunction() worked" );
    return await axios
        .post(
            `${process.env.REACT_APP_API}/notes/filter`,
            { sort, order, clientId, userId }
        );
};

//Calling the backend end point for total number of notes.
export const mongoDBGetNotesCountFunction = async ( userId ) => {
    console.log( "mongoDBGetNotesCountFunction() worked" );
    return await axios
        .get(
            `${process.env.REACT_APP_API}/notes/total`,
            { params: { userId } }
        );
};