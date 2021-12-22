import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { mongoDBUpdateCurrentUserFunction } from "../../functions/callsToUserRoutes";
import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { mongoDBGetCurrentUserFunction } from "../../functions/callsToAuthRoutes";

export default function UpdateUserPage() {

    const { reduxStoreUser } = useSelector(( state ) => ( { ...state } ) );
    const dispatch = useDispatch();

    const initialState = {
        _id: "",
        status: "",
        company_name: "",
        current_residence: "",
        current_city: "",
        current_province: "",
        official_residence: "",
        official_city: "",
        official_province: "",
        fiscal_code: "",
        images: [],
        email: "",
        role: "",
        token: "",
    };

    const [ currentUserInfoState, setCurrentUserInfoState ] = useState( initialState );
    const [ loading, setLoading ] = useState( false );

    const {
        company_name,
        current_residence,
        current_city,
        current_province,
        official_residence,
        official_city,
        official_province,
        fiscal_code,
        images,
    } = currentUserInfoState;

    //const { slug } = match.params;
    //console.log( slug );
    // Get the user from Redux Store
    //const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const getCurrentUser = () => {
        mongoDBGetCurrentUserFunction( reduxStoreUser.token, reduxStoreUser.email )
            .then( ( res ) => {
                // Add data to the React Store.
                if ( res.data !== null ) {
                    setCurrentUserInfoState( res.data );
                } else {
                    toast.error( "No user info in the response from the backend." );
                }
            }).catch((err) => {
                console.log( "Error while getting the user info: ", err );                
                toast.error( `Error while getting the user info: ${err}` );
            });
    };

    useEffect( () => {
        getCurrentUser();
    }, [] );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        mongoDBUpdateCurrentUserFunction( reduxStoreUser.email, currentUserInfoState, reduxStoreUser.token )
            .then( () => {
                toast.success( "Client info is updated successfully." );
                window.location.reload();
                mongoDBGetCurrentUserFunction( reduxStoreUser.token, reduxStoreUser.email )
                    .then( ( res ) => {
                        // Add data to the React Store.
                        if ( res.data!==null ){
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
                                    _id: res.data._id,
                                    status: res.data.status,
                                    company_name: res.data.company_name,
                                    current_residence: res.data.current_residence,
                                    current_city: res.data.current_city,
                                    current_province: res.data.current_province,
                                    official_residence: res.data.current_residence,
                                    official_city: res.data.current_city,
                                    official_province: res.data.current_province,
                                    fiscal_code: res.data.fiscal_code,
                                    images: res.data.images,
                                    email: res.data.email,
                                    role: res.data.role,
                                    token: reduxStoreUser.token,
                                },
                            } );
                        } else {
                            toast.error( "Could not find user info in the mongoDB database." );
                        };
                    } ).catch( ( err ) => {
                        console.log( "Error getting the user info: ", err.status );
                        toast.error( `Error while getting the user info: ${err}` );
                    });
            })
            .catch( ( error ) => {
                toast.error( "mongoDBUpdateCurrentUserFunction() error: ", error.response.data.err );
            });
    };

    const handleUserInput = ( event ) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentUserInfoState({ ...currentUserInfoState, [ event.target.name ]: event.target.value } );
    };

    const fileUploadAndResize = ( event ) => {
        /* In case we upload single file we would take the first element in the array with e.target.files[0].
        In case o multiple upload we take all the files with e.target.files.*/
        const files = event.target.files;
        const allUploadedFiles = images;

        if ( files ) {
            setLoading( true );

            for ( let i = 0; i < files.length; i++ ) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    ( uri ) => {
                        return axios
                            .post(
                                `${process.env.REACT_APP_API}/image/upload`,
                                { image: uri },
                                { 
                                    headers: { authToken: reduxStoreUser.token },
                                }
                            )
                            .then( ( res) => {
                                console.log( "IMAGE UPLOAD RES DATA: ", res );
                                setLoading( false );
                                allUploadedFiles.push( res.data );
                                setCurrentUserInfoState({ ...currentUserInfoState, images: allUploadedFiles } );
                            } )
                            .catch( ( err ) => {
                                setLoading( false );
                                console.log( "CLOUDINARY UPLOAD ERR: ", err );
                            } );
                    },
                    "base64"
                );
            }
        }
    };

    const handleImageRemove = async ( public_id ) => {
        console.log( "handleImageRemove() worked" );
        setLoading( true );
        await axios
            .post(
                `${process.env.REACT_APP_API}/image/remove`,
                { public_id },
                {
                    headers: {
                        authToken: reduxStoreUser.token,
                    },
                }
            )
            .then( (res) => {
                setLoading( false );
                toast.success( "Image removed successfully. res: ", res );
                // const { images } = currentUserInfoState;
                // const filteredImages = images.filter( ( item) => {
                //     return item.public_id !== public_id;
                // });
                setCurrentUserInfoState({ ...currentUserInfoState, images: Array(0) } );
                console.log( "handleImageRemove() currentUserInfoState: ", currentUserInfoState );
                // handleSubmit();
                // console.log(currentUserInfoState);
            })
            .catch( ( err ) => {
                console.log( "handleImageRemove", err );
                toast.error( "handleImageRemove", err );
                setLoading( false );
            } );
    };

    return (
        <main>

            { loading ? (
                <LoadingOutlined className="text-danger h1" />
            ) : (
                <h4> </h4>
            )}
            <hr />

            <div className="h-screen flex flex-col justify-between">
                {/*Page title*/}
                <center><span style={{fontWeight: "bold", fontSize: "25px"}}>UPDATE USER INFO</span></center>

                <main className="flex items-center">
                    <div className="container mx-auto py-10">
                        <form onSubmit={ handleSubmit }>
                            <label className='font-normal uppercase mb-3'>
                                Ragione Sociale
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="company_name"
                                    value={ company_name }
                                    onChange={ handleUserInput }
                                />
                            </label>
                            <div className='flex justify-between mt-6'>
                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                    Sede Operativa
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="current_residence"
                                        value={ current_residence }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                    Citta
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="current_city"
                                        value={ current_city }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                                <label className="font-normal uppercase mb-3 max-w-400 w-100%">
                                    Provincia
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="current_province"
                                        value={ current_province }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                            </div>
                            <div className='flex justify-between mt-6'>
                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                    Sede Legale
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="official_residence"
                                        value={ official_residence }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                    Citta
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="official_city"
                                        value={ official_city }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                                <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                    Provincia
                                    <input
                                        className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                        type="text"
                                        name="official_province"
                                        value={ official_province }
                                        onChange={ handleUserInput }
                                    />
                                </label>
                            </div>
                            <label className='font-normal uppercase mb-3'>
                                P. IVA
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="fiscal_code"
                                    value={ fiscal_code }
                                    onChange={ handleUserInput }
                                />
                            </label>
                            <div className="flex justify-between">
                                <div>
                                    <div className="uppercase mb-2 mt-6"> Foto </div>
                                    <div className="flex items-end">
                                        <div className='w-250 h-[250px] rounded bg-border mr-6'> </div>
                                        { currentUserInfoState.images.length === 0 &&
                                            <label
                                                className='font-normal bg-bgBtnGray color uppercase cursor-pointer px-3 py-2 rounded flex justify-center inline w-100 hover:opacity-70 focus:opacity-70'>
                                                <input
                                                    className="flex items-center text-xl text-white bg-red uppercase py-1 px-4 mr-4 rounded transition hover:opacity-70 focus:opacity-70"
                                                    type="file"
                                                    multiple
                                                    hidden
                                                    accept="images/*"
                                                    onChange={fileUploadAndResize}
                                                />
                                                Add image
                                            </label>
                                        }

                                        <div className='pr-2'>
                                            {/*{ currentUserInfoState.images!==undefined &&*/}
                                            {/*images.map( ( image ) => (*/}
                                            { currentUserInfoState.images.length!==0 &&
                                            <Badge
                                                count="REMOVE"
                                                key={ currentUserInfoState.images[0].public_id }
                                                onClick={ () => handleImageRemove( currentUserInfoState.images[0].public_id ) }
                                                style={ { cursor: "pointer", paddingRight: "10" } }
                                            >
                                                <Avatar
                                                    src={ currentUserInfoState.images[0].url }
                                                    size={ 100 }
                                                    shape="square"
                                                    className="ml-3"
                                                />
                                            </Badge>
                                            }

                                            {/*) ) }*/}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className='h-10 flex items-center text-xl text-white bg-green uppercase py-1 px-4 mr-4 mt-auto rounded transition hover:opacity-70 focus:opacity-70'
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
            </div>

        </main>
    );
}