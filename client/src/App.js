import React, { useEffect, lazy, Suspense } from "react";
import {Route, Switch} from "react-router";

//Popup notifications window package.
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth } from "./firebase";

//Dispatch is the entry point to the redux store.
import { useDispatch } from "react-redux";
import { mongoDBGetCurrentUserFunction } from "./functions/callsToAuthRoutes";

import { LoadingOutlined } from "@ant-design/icons";

// Custom routes. Restrict route access for non logged in users or non admins.
const UserRoute = lazy(() => import("./components/routes/userRoute"));
const AdminRoute = lazy(() => import("./components/routes/adminRoute"));

// Pages import
// Auth pages
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"));
const PswRecoverPage = lazy(() => import("./pages/authPages/PswRecoverPage"));
const FinishRegisterAfterEmailCheckPage = lazy(() => import("./pages/authPages/FinishRegisterAfterEmailCheckPage"));
const UserRegisterPage = lazy(() => import("./pages/authPages/UserRegisterPage"));
//User pages
const MainMenuPage = lazy(() => import("./pages/MainMenuPage"));
const UserPage = lazy(() => import("./pages/usersPages/UserPage"));
const UserUpdatePage = lazy(() => import("./pages/usersPages/UserUpdatePage"));
//Cars pages
const CarsListPage = lazy(() => import("./pages/carsPages/CarsListPage"));
const CarsArchivePage = lazy(() => import("./pages/carsPages/CarsArchivePage"));
const CarCreatePage = lazy(() => import("./pages/carsPages/CarCreatePage"));
const CarUpdatePage = lazy(() => import("./pages/carsPages/CarUpdatePage"));
const CarPage = lazy(() => import("./pages/carsPages/CarPage"));
//Services pages
const ServicesListPage = lazy(() => import("./pages/servicesPages/ServicesListPage"));
const ServiceCreatePage = lazy(() => import("./pages/servicesPages/ServiceCreatePage"));
const ServiceUpdatePage = lazy(() => import("./pages/servicesPages/ServiceUpdatePage"));
const ServicePage = lazy(() => import("./pages/servicesPages/ServicePage"));
//Clients pages
const ClientCreatePage = lazy(() => import("./pages/clientsPages/ClientCreatePage"));
const ClientsListPage = lazy(() => import("./pages/clientsPages/ClientsListPage"));
const ClientUpdatePage = lazy(() => import("./pages/clientsPages/ClientUpdatePage"));
const ClientPage = lazy(() => import("./pages/clientsPages/ClientPage"));
//Admin pages
const AdminDashboard = lazy(() => import("./pages/adminPages/AdminDashboard"));
const UsersListPage = lazy(() => import("./pages/adminPages/UsersListPage"));
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
                console.log("Fire Base user from App.js onAuthStateChanged(): ", user);
                const idTokenResult = await getIdTokenResult(user, false);
                //console.log("This is the idTokenResult from App.js: ", idTokenResult);
                mongoDBGetCurrentUserFunction(idTokenResult.token, user.email)
                    .then((res) => {
                        // Add data to the React Store.
                        if (res.data!==null){
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
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
                                    token: idTokenResult.token,
                                },
                            });
                        }else{
                            console.log("No mongo DB user data received in the App.js");
                        };
                    }).catch((err) => console.log("App.js could not get current user info from MongoDB because: ", err));
            }
        });
        // Cleanup. This function is returned one more time in order to prevent memory leaks.
        return () => unsubscribe();
    }, [dispatch]);

    return (
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
            <Switch>
                {/* Auth Routes */}
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/register_user" component={UserRegisterPage}/>
                <Route exact path="/finish_register" component={FinishRegisterAfterEmailCheckPage}/>
                <Route exact path="/psw_recover" component={PswRecoverPage}/>
                {/* Admin Routes */}
                <AdminRoute exact path="/admin_dashboard" component={AdminDashboard}/>
                <AdminRoute exact path="/users_list" component={UsersListPage}/>
                {/* User Routes */}
                <UserRoute exact path="/user_page" component={UserPage}/>
                <UserRoute exact path="/user_update_page" component={UserUpdatePage}/>
                <UserRoute exact path="/main_menu" component={MainMenuPage}/>
                {/* User Routes --> Client */}
                <UserRoute exact path="/add_client" component={ClientCreatePage}/>
                <UserRoute exact path="/client_update_page" component={ClientUpdatePage}/>
                <UserRoute exact path="/clients_list" component={ClientsListPage}/>
                <UserRoute exact path="/client/:slug" component={ClientPage}/>
                {/* User Routes --> Cars */}
                <UserRoute exact path="/add_car" component={CarCreatePage}/>
                <UserRoute exact path="/car_update_page" component={CarUpdatePage}/>
                <UserRoute exact path="/cars_list" component={CarsListPage}/>
                <UserRoute exact path="/cars_archive" component={CarsArchivePage}/>
                <UserRoute exact path="/car/:slug" component={CarPage}/>
                {/* User Routes --> Services */}
                <UserRoute exact path="/add_service" component={ServiceCreatePage}/>
                <UserRoute exact path="/service_update_page" component={ServiceUpdatePage}/>
                <UserRoute exact path="/services_list" component={ServicesListPage}/>
                <UserRoute exact path="/service/:slug" component={ServicePage}/>
            </Switch>
            <Footer />
        </Suspense>
    );
}