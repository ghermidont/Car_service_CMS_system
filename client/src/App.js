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
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"));
const FinishRegisterAfterEmailCheck = lazy(() => import("./pages/authPages/FinishRegisterAfterEmailCheck"));
const MainMenu = lazy(() => import("./pages/MainMenuPage"));
const ClientCreatePage = lazy(() => import("./pages/clientsPages/ClientCreatePage"));
const UserRegisterPage = lazy(() => import("./pages/authPages/UserRegisterPage"));
const CarsListPage = lazy(() => import("./pages/carsPages/CarsListPage"));
const ServicesListPage = lazy(() => import("./pages/servicesPages/ServicesListPage"));
const CarsArchivePage = lazy(() => import("./pages/carsPages/CarsArchivePage"));
const ServiceCreatePage = lazy(() => import("./pages/servicesPages/ServiceCreatePage"));
const CarCreatePage = lazy(() => import("./pages/carsPages/CarCreatePage"));
const CarPage = lazy(() => import("./pages/carsPages/CarPage"));
const UserPage = lazy(() => import("./pages/usersPages/UserPage"));
const UserUpdatePage = lazy(() => import("./pages/usersPages/UserUpdatePage"));
const UsersListPage = lazy(() => import("./pages/adminPages/UsersListPage"));

const ClientsListPage = lazy(() => import("./pages/clientsPages/ClientsListPage"));
const PswRecoverPage = lazy(() => import("./pages/authPages/PswRecoverPage"));
const AdminDashboard = lazy(() => import("./pages/adminPages/AdminDashboard"));

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
                console.log("This is the user from App.js onAuthStateChanged(): ", user);
                const idTokenResult = await getIdTokenResult(user, false);
                //console.log("This is the idTokenResult from App.js: ", idTokenResult);
                mongoDBGetCurrentUserFunction(idTokenResult.token, user)
                    .then((res) => {
                        // Add data to the React Store.
                        if (res.data.company_name!=null){
                            dispatch({
                                type: "LOGGED_IN_USER",
                                payload: {
                                    company_name: res.data.company_name ? res.data.company_name : "Default company_name value",
                                    current_residence: res.data.current_residence ? res.data.current_residence : "Default current_residence value",
                                    current_city: res.data.current_city ? res.data.current_city : "Default current_city value",
                                    current_province: res.data.current_province ? res.data.current_province : "Default current_province value",
                                    official_residence: res.data.current_residence ? res.data.current_residence : "Default current_residence value",
                                    official_city: res.data.current_city ? res.data.current_city : "Default current_city value",
                                    official_province: res.data.current_province ? res.data.current_province : "Default current_province value",
                                    fiscal_code: res.data.fiscal_code ? res.data.fiscal_code : "Default fiscal_code value",
                                    images: res.data.images ? res.data.images : [
                                        {
                                            public_id: "jwrzeubemmypod99e8lz",
                                            url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
                                        },
                                    ],
                                    email: res.data.email,
                                    role: res.data.role,
                                    token: idTokenResult.token,
                                },
                            });
                        }else{
                            console.log("No mongo DB user data received in the App.js");
                        };
                    }).catch((err) => console.log("App.js get user info error: ", err));
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
            {/*//TODO After finishing the logic implementation integrate the user and admin routes.  */}
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/finish_register" component={FinishRegisterAfterEmailCheck}/>
                <AdminRoute exact path="/admin_dashboard" component={AdminDashboard}/>
                <Route exact path="/psw_recover" component={PswRecoverPage}/>
                <UserRoute exact path="/main_menu" component={MainMenu}/>
                <UserRoute exact path="/add_client" component={ClientCreatePage}/>
                <Route exact path="/register_user" component={UserRegisterPage}/>
                <UserRoute exact path="/clients_list" component={ClientsListPage}/>
                <UserRoute exact path="/cars_list" component={CarsListPage}/>
                <UserRoute exact path="/services_list" component={ServicesListPage}/>
                <UserRoute exact path="/cars_archive" component={CarsArchivePage}/>
                <UserRoute exact path="/add_service" component={ServiceCreatePage}/>
                <UserRoute exact path="/add_car" component={CarCreatePage}/>
                <UserRoute exact path="/user_page" component={UserPage}/>
                <UserRoute exact path="/user_update_page" component={UserUpdatePage}/>
                <UserRoute exact path="/car/:slug" component={CarPage}/>
                <AdminRoute exact path="/users_list" component={UsersListPage}/>
            </Switch>
            <Footer />
        </Suspense>
       
    );
}