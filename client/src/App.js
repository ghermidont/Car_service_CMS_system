import React, { useEffect, lazy, Suspense } from "react";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";

//Popup notifications window package.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

//Dispatch is the entry point to the redux store.
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/callsToAuthRoutes";

import { LoadingOutlined } from "@ant-design/icons";

//Custom routes
const UserRoute = lazy(() => import("./components/routes/userRoute"));
const AdminRoute = lazy(() => import("./components/routes/adminRoute"));

//Pages import
const LoginPage = lazy(() => import("./pages/loginPagePage"));
const MainMenu = lazy(() => import("./pages/mainMenuPage"));
const AddClient = lazy(() => import("./pages/addClientPage"));
const AddUser = lazy(() => import("./pages/addUserPage"));
const CarsList = lazy(() => import("./pages/carsListPage"));
const ServicesList = lazy(() => import("./pages/servicesListPage"));
const CarsArchive = lazy(() => import("./pages/carsArchivePage"));
const AddService = lazy(() => import("./pages/addServicePage"));
const AddCar = lazy(() => import("./pages/addCarPage"));
const UserPage = lazy(() => import("./pages/userPage"));
const ClientsList = lazy(() => import("./pages/clientsListPage"));

//Components
const Header = lazy(() => import("./components/header/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));

export default function App() {

    const dispatch = useDispatch();

    // User state change listener. To check firebase auth state.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });
        // Cleanup. This function is returned one more time in order to prevent memory leaks.
        return () => unsubscribe();
    }, [dispatch]);

  return (
    <HashRouter>
        <Suspense
            fallback={
                <div className="col text-center p-5">
                    Car service CMS is Loading...
                    <LoadingOutlined />
                </div>
            }
        >
          <Header />
    k     <ToastContainer />
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/main_menu" component={MainMenu}/>
            <Route exact path="/add_client" component={AddClient}/>
            <Route exact path="/add_user" component={AddUser}/>
            <Route exact path="/clients_list" component={ClientsList}/>
            <Route exact path="/cars_list" component={CarsList}/>
            <Route exact path="/services_list" component={ServicesList}/>
            <Route exact path="/cars_archive" component={CarsArchive}/>
            <Route exact path="/add_service" component={AddService}/>
            <Route exact path="/add_car" component={AddCar}/>
            <Route exact path="/user_page" component={UserPage}/>
          </Switch>
          <Footer />
        </Suspense>
    </HashRouter>    
  );
}