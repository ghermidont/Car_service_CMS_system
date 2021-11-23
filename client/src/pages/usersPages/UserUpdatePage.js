
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserUpdateForm from "../../components/forms/userFormComponents/UserUpdateForm";
import { useSelector } from "react-redux";
import { mongoDBUpdateCurrentUserFunction } from "../../functions/callsToUserRoutes";

const initialState = {
    name: "",
    surname: "",
    date: "",
    fiscalCode: "",
    address: "",
    city: "",
    province: "",
    notes: "",
    mobile: "",
    email: ""
};

export default function UpdateUserPage({match}) {
    const [currentUserInfoState, setCurrentUserInfoState] = useState(initialState);

    const { slug } = match.params;
    console.log(slug);
    // Get the user from Redux Store
    const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
        event.preventDefault();
        mongoDBUpdateCurrentUserFunction(slug, currentUserInfoState, reduxStoreUser.token)
            .then(() => {
                window.alert( "Client info is updated successfully." );
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error.response.data.err);
            });
    };

    const handleUserInput = (event) => {
        // Dynamically update each of the initialState values by their name parameter.
        setCurrentUserInfoState({ ...currentUserInfoState, [event.target.name]: event.target.value });
    };

    return (
        <main>
            <h1>UserUpdatePage.js</h1>

            <UserUpdateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                currentCarParamsState={currentUserInfoState}
                setCurrentCarParamsState={setCurrentUserInfoState}
            />
        </main>
    );
}