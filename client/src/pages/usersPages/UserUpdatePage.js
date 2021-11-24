
import React, { useState } from "react";
import { toast } from "react-toastify";
import UserUpdateForm from "../../components/forms/userFormComponents/UserUpdateForm";
import { useSelector } from "react-redux";
import { mongoDBUpdateCurrentUserFunction } from "../../functions/callsToUserRoutes";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
    company_name: "default company name",
    current_residence: "default current residence",
    current_city: "default current city",
    current_province: "default current province",
    official_residence: "default official residence",
    official_city: "default official city",
    official_province: "default official province",
    fiscal_code: "default fiscal code",
    images: [
        {
            public_id: "jwrzeubemmypod99e8lz",
            url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
        },       
    ],
};

export default function UpdateUserPage({match}) {
    const [currentUserInfoState, setCurrentUserInfoState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { reduxStoreUser } = useSelector(( state ) => ( { ...state } ));

    const { slug } = match.params;
    console.log(slug);
    // Get the user from Redux Store
    //const { reduxStoreUser } = useSelector((state) => ({ ...state }));

    const handleSubmit = (event) => {
        event.preventDefault();
        mongoDBUpdateCurrentUserFunction(slug, currentUserInfoState)
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
            {loading ? (
                <LoadingOutlined className="text-danger h1" />
            ) : (
                <h4>Edit user info:</h4>
            )}
            <hr />
            <UserUpdateForm
                handleSubmit={handleSubmit}
                handleUserInput={handleUserInput}
                reduxStoreUser={reduxStoreUser}
                currentUserInfoState={currentUserInfoState}
                setCurrentUserInfoState={setCurrentUserInfoState}
                setLoading={setLoading}
            />
        </main>
    );
}