/**This form is called in the UserUpdatePage.ls*/
// noinspection DuplicatedCode
// noinspection DuplicatedCode
import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {Avatar, Badge} from "antd";

const UserUpdateForm = ({ currentUserInfoState, setCurrentUserInfoState, handleSubmit, handleUserInput, setLoading}) => {

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

    const fileUploadAndResize = (e) => {
        /* In case we upload single file we would take the first element in the array with e.target.files[0].
        In case o multiple upload we take all the files with e.target.files.*/
        let files = e.target.files;
        let allUploadedFiles = images;

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
                    (uri) => {
                        return axios.post(`${process.env.REACT_APP_API}/image/upload`,{ image: uri },{headers: { authToken: currentUserInfoState ? currentUserInfoState.token : "",},})
                            .then((res) => {
                                console.log("IMAGE UPLOAD RES DATA", res);
                                setLoading(false);
                                allUploadedFiles.push(res.data);
                                setCurrentUserInfoState({ ...currentUserInfoState, images: allUploadedFiles });
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log("CLOUDINARY UPLOAD ERR", err);
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/image/remove`,
                { public_id },
                {
                    headers: {
                        authToken: currentUserInfoState ? currentUserInfoState.token : "",
                    },
                }
            )
            .then(() => {
                setLoading(false);
                const { images } = currentUserInfoState;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setCurrentUserInfoState({ ...currentUserInfoState, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <div className='h-screen flex flex-col justify-between'>
            <main className='flex items-center'>
                <div className="container mx-auto py-10">
                    <form onSubmit={handleSubmit}>
                        <label className='font-normal uppercase mb-3'>
                            Ragione Sociale
                            <input
                                className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                type="text"
                                name="company_name"
                                value={company_name}
                                onChange={handleUserInput}
                            />
                        </label>
                        <div className='flex justify-between mt-6'>
                            <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                Sede Operativa
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="current_residence"
                                    value={current_residence}
                                    onChange={handleUserInput}
                                />
                            </label>
                            <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                Citta
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="current_city"
                                    value={current_city}
                                    onChange={handleUserInput}
                                />
                            </label>
                            <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                Provincia
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="current_province"
                                    value={current_province}
                                    onChange={handleUserInput}
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
                                    value={official_residence}
                                    onChange={handleUserInput}
                                />
                            </label>
                            <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                Citta
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="official_city"
                                    value={official_city}
                                    onChange={handleUserInput}
                                />
                            </label>
                            <label className='font-normal uppercase mb-3 max-w-400 w-100%'>
                                Provincia
                                <input
                                    className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                    type="text"
                                    name="official_province"
                                    value={official_province}
                                    onChange={handleUserInput}
                                />
                            </label>
                        </div>
                        <label className='font-normal uppercase mb-3'>
                            P. IVA
                            <input
                                className='text-xl h-9 px-4 mt-1 border border-border rounded-lg focus:outline-none bg-grayL max-w-400 w-100% block'
                                type="text"
                                name="fiscal_code"
                                value={fiscal_code}
                                onChange={handleUserInput}
                            />
                        </label>
                        <div className='flex justify-between'>
                            <div>
                                <div className='uppercase mb-2 mt-6'>Aggiungi Foto</div>
                                <div className='flex items-end'>
                                    <div className='w-250 h-[250px] rounded bg-border mr-6'> </div>
                                    <label
                                        className='font-normal bg-bgBtnGray color uppercase cursor-pointer px-3 py-2 rounded flex justify-center inline w-100 hover:opacity-70 focus:opacity-70'>
                                        <input
                                            className='hidden'
                                            type="file"
                                            multiple
                                            hidden
                                            accept="images/*"
                                            onChange={fileUploadAndResize}
                                        />
                                        <div className='pr-2'>
                                            {images &&
                                            images.map((image) => (
                                                <Badge
                                                    count="X"
                                                    key={image.public_id}
                                                    onClick={() => handleImageRemove(image.public_id)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <Avatar
                                                        src={image.url}
                                                        size={100}
                                                        shape="square"
                                                        className="ml-3"
                                                    />
                                                </Badge>
                                            ))}
                                        </div>
                                        ADD
                                    </label>
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
    );
};

export default UserUpdateForm;
