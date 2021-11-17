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
import { getCurrentUser } from "./functions/callsToAuthRoutes";

import { LoadingOutlined } from "@ant-design/icons";

// Custom routes. Restrict route access for non logged in users or non admins.
// const UserRoute = lazy(() => import("./components/routes/userRoute"));
// const AdminRoute = lazy(() => import("./components/routes/adminRoute"));

// Pages import
const LoginPage = lazy(() => import("./pages/LoginPage"));
const MainMenu = lazy(() => import("./pages/MainMenuPage"));
const ClientCreatePage = lazy(() => import("./pages/clientsPages/ClientCreatePage"));
const RegisterUserPage = lazy(() => import("./pages/usersPages/UserRegisterPage"));
const CarsListPage = lazy(() => import("./pages/carsPages/CarsListPage"));
const ServicesListPage = lazy(() => import("./pages/servicesPages/ServicesListPage"));
const CarsArchivePage = lazy(() => import("./pages/carsPages/CarsArchivePage"));
const ServiceCreatePage = lazy(() => import("./pages/servicesPages/ServiceCreatePage"));
const CarCreatePage = lazy(() => import("./pages/carsPages/CarCreatePage"));
const CarPage = lazy(() => import("./pages/carsPages/CarPage"));
const UserPage = lazy(() => import("./pages/usersPages/UserPage"));
const ClientsListPage = lazy(() => import("./pages/clientsPages/ClientsListPage"));
const PswRecoverPage = lazy(() => import("./pages/PswRecoverPage"));
const CheckEmailPage = lazy(() => import("./pages/usersPages/UserCheckEmailPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Components
const Header = lazy(() => import("./components/header/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));

export default function App() {

    const dispatch = useDispatch();
    // User state change listener. To check firebase auth state.
    useEffect(() => {
        console.log("App.js useEffect worked!");
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                //TODO start here try user. access token
                console.log("This is the user from App.js: ", user);
                const idTokenResult = await user.getIdTokenResult();
                getCurrentUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                email: res.data.email,
                                name: res.data.name,
                                surname: res.data.surname,
                                date: res.data.date,
                                fiscal_code: res.data.fiscal_code,
                                address: res.data.address,
                                city: res.data.city,
                                province: res.data.province,
                                notes: res.data.notes,
                                mobile: res.data.mobile,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch((err) => console.log("Could not get the current user data. ", err));
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
                    <Route exact path="/admin_dashboard" component={AdminDashboard}/>
                    <Route exact path="/check_email" component={CheckEmailPage}/>
                    <Route exact path="/psw_recover" component={PswRecoverPage}/>
                    <Route exact path="/main_menu" component={MainMenu}/>
                    <Route exact path="/add_client" component={ClientCreatePage}/>
                    <Route exact path="/register_user" component={RegisterUserPage}/>
                    <Route exact path="/clients_list" component={ClientsListPage}/>
                    <Route exact path="/cars_list" component={CarsListPage}/>
                    <Route exact path="/services_list" component={ServicesListPage}/>
                    <Route exact path="/cars_archive" component={CarsArchivePage}/>
                    <Route exact path="/add_service" component={ServiceCreatePage}/>
                    <Route exact path="/add_car" component={CarCreatePage}/>
                    <Route exact path="/user_page" component={UserPage}/>
                    <Route exact path="/car/:slug" component={CarPage}/>
                </Switch>
                <Footer />
            </Suspense>
        </HashRouter>    
    );
}