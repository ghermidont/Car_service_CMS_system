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

// Custom routes. Restrict route access for non logged in users or non admins.
// const UserRoute = lazy(() => import("./components/routes/userRoute"));
// const AdminRoute = lazy(() => import("./components/routes/adminRoute"));

// Pages import
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MainMenu = lazy(() => import("./pages/MainMenuPage"));
const AddClientPage = lazy(() => import("./pages/clientsPages/AddClientPage"));
const RegisterUserPage = lazy(() => import("./pages/registerUser/RegisterUserPage"));
const CarsListPage = lazy(() => import("./pages/carsPages/CarsListPage"));
const ServicesListPage = lazy(() => import("./pages/servicesPages/ServicesListPage"));
const CarsArchivePage = lazy(() => import("./pages/carsPages/CarsArchivePage"));
const AddServicePage = lazy(() => import("./pages/servicesPages/AddServicePage"));
const AddCarPage = lazy(() => import("./pages/carsPages/AddCarPage"));
const UserPage = lazy(() => import("./pages/usersPages/UserPage"));
const ClientsListPage = lazy(() => import("./pages/clientsPages/ClientsListPage"));
const PswRecoverPage = lazy(() => import("./pages/PswRecoverPage"));
const CheckEmailPage = lazy(() => import("./pages/registerUser/CheckEmailPage"));

// Components
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
          <ToastContainer />
          {/*//TODO After finishing the logic implementation integrate the user and admin routes.  */}
          <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/check_email" component={CheckEmailPage}/>
            <Route exact path="/psw_recover" component={PswRecoverPage}/>
            <Route exact path="/main_menu" component={MainMenu}/>
            <Route exact path="/add_client" component={AddClientPage}/>
            <Route exact path="/register_user" component={RegisterUserPage}/>
            <Route exact path="/clients_list" component={ClientsListPage}/>
            <Route exact path="/cars_list" component={CarsListPage}/>
            <Route exact path="/services_list" component={ServicesListPage}/>
            <Route exact path="/cars_archive" component={CarsArchivePage}/>
            <Route exact path="/add_service" component={AddServicePage}/>
            <Route exact path="/add_car" component={AddCarPage}/>
            <Route exact path="/user_page" component={UserPage}/>
          </Switch>
          <Footer />
        </Suspense>
    </HashRouter>    
  );
}