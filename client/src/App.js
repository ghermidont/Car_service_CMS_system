// noinspection JSCheckFunctionSignatures

import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";

//Dispatch is the entry point to the redux store.
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/callsToAuthRoutes";
import { LoadingOutlined } from "@ant-design/icons";

// Import Parse minified version
import Parse from 'parse/dist/parse.min.js';
import Footer from "./components/Footer/Footer";

// Parse initialization configuration:
Parse.initialize(process.env.PARSE_APPLICATION_ID, process.env.PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.PARSE_HOST_URL;

//Custom routes
const UserRoute = lazy(() => import("./components/routes/CMSUserRoute"));
const AdminRoute = lazy(() => import("./components/routes/CMSAdminRoute"));

//Login/Register pages
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authPages/RegisterPage"));
const RegisterCompletePage = lazy(() => import("./pages/authPages/RegisterCompletePage"));
const ForgotPasswordPage = lazy(() => import("./pages/authPages/ForgotPasswordPage"));

//CMS User pages
const UserMainMenuPage = lazy(() => import("./pages/userPages/UserMainPage"));
const UserProfilePage = lazy(() => import("./pages/userPages/UserProfilePage"));
const UserUpdateProfilePage = lazy(() => import("./pages/userPages/UserUpdateProfilePage"));
const UserUpdatePasswordPage = lazy(() => import("./pages/userPages/UserUpdatePasswordPage"));

//Cars pages
const IndividualCarPage = lazy(() => import("./pages/userPages/CarsPages/IndividualCarPage"));
const CarCreatePage = lazy(() => import("./pages/userPages/CarsPages/CarCreatePage"));
const CarUpdatePage = lazy(() => import("./pages/userPages/CarsPages/CarUpdatePage"));
const CarsListPage = lazy(() => import("./pages/userPages/CarsPages/CarsListPage"));

//Clients pages
const ClientCreatePage = lazy(() => import("./pages/userPages/ClientsPages/ClientCreatePage"));
const ClientUpdatePage = lazy(() => import("./pages/userPages/ClientsPages/ClientUpdatePage"));
const ClientsListPage = lazy(() => import("./pages/userPages/ClientsPages/ClientsListPage"));

//Provided services pages
const ProvidedServiceCreatePage = lazy(() => import("./pages/userPages/ServicesPages/ServiceCreatePage"));
const ProvidedServiceUpdatePage = lazy(() => import("./pages/userPages/ServicesPages/ServiceUpdatePage"));
const ProvidedServicesListPage  = lazy(() => import("./pages/userPages/ServicesPages/ServicesListPage"));

//Admin pages
const AdminDashboard = lazy(() => import("./pages/adminPages/AdminDashboardPage"));

//Components
const Header = lazy(() => import("./components/oldComponents/nav/Header"));

const App = () => {
  const dispatch = useDispatch();

  // User state change listener. To check firebase auth state.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          <UserRoute exact path="/register/complete" component={RegisterCompletePage} />
          <UserRoute exact path="/forgot/password" component={ForgotPasswordPage} />

          <UserRoute CMSUserMainMenuPage path="/user/menu" component={UserMainMenuPage} />
          <UserRoute CMSUserProfilePage path="/user/profile" component={UserProfilePage} />
          <UserRoute CMSUserUpdateProfilePage path="/user/update" component={UserUpdateProfilePage} />
          <UserRoute CMSUserUpdatePasswordPage path="/user/update-password" component={UserUpdatePasswordPage} />

          <UserRoute IndividualCarPage exact path="/car/:slug" component={IndividualCarPage} />
          <UserRoute CarCreatePage exact path="/car/create" component={CarCreatePage} />
          <UserRoute CarUpdatePage exact path="/car/update" component={CarUpdatePage} />
          <UserRoute CarsListPage exact path="/car/list" component={CarsListPage} />

          <UserRoute ClientRegisterPage exact path="/client/create" component={ClientCreatePage} />
          <UserRoute ClientUpdatePage exact path="/client/update" component={ClientUpdatePage} />
          <UserRoute ClientsListPage exact path="/client/list" component={ClientsListPage} />

          <UserRoute ProvidedServiceCreatePage exact path="/service/service/create" component={ProvidedServiceCreatePage} />
          <UserRoute ProvidedServiceUpdatePage exact path="/service/login" component={ProvidedServiceUpdatePage} />
          <UserRoute ProvidedServicesListPage exact path="/service/login" component={ProvidedServicesListPage} />
          {/*Create individual service page with slug*/}

          <AdminRoute AdminDashboard exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      <Footer/>
    </Suspense>

  );
};

export default App;
