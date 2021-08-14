//TODO Complete this page with the user data.
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

//"match" is a parameter of <Route> that gets parts of the Uri. Available for components inside the Route tags.
function IndividualUserModalPage({getSingleUserFunction, match}) {
    //Modal display handlers.
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //This state is used for the modal show on and off.
    const [show, setShow] = useState(false);
    //State to store the user gotten from the database.
    const [dBUser, setDBUser] =useState({});
    //const [isLoading, setIsLoading] = useState(true);

    //Extracting the slug from the match object
    const { slug } = match.params;
    console.log("IndividualUserModalPage slug", slug);

    //Getting the current user from Redux Store.
    const { user } = useSelector((state) => ({ ...state }));
    console.log("This is the IndividualUserModalPage user object from the Redux Store", user);

    useEffect(() => {
        loadSingleProduct();
        // eslint-disable-next-line
    }, [slug]);

    const loadSingleProduct = () => {
        getSingleUserFunction(slug).then((res) => {
            setDBUser(res.data);
            console.log(dBUser);
        });
    };

   return (
        <>
            {/*TODO destructure the dBUser*/}
            <span className="icon-search" onClick={handleShow}> </span>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                       Title of the modal user page/>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                   <h1><center>Individual user info modal page</center></h1>

                </Modal.Body>
                <Modal.Footer>
                    <button className="form-article__btn" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default IndividualUserModalPage;