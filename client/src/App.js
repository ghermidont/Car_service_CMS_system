import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";

//Dispatch is the entry point to the redux store.
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/callsToAuthRoutes";
import { LoadingOutlined } from "@ant-design/icons";

//!Add the correct paths
//Custom routes
const UserRoute = lazy(() => import("./components/routes/CMSUserRoute"));
const AdminRoute = lazy(() => import("./components/routes/CMSAdminRoute"));

//Login/Register pages
const LoginPage = lazy(() => import("./pages/authPages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/authPages/RegisterPage"));
const RegisterCompletePage = lazy(() => import("./pages/authPages/RegisterCompletePage"));
const ForgotPasswordPage = lazy(() => import("./pages/authPages/ForgotPasswordPage"));

//CMS User pages
const CMSUserMainMenuPage = lazy(() => import("./pages/CMSUserMainPage"));
const CMSUserProfilePage = lazy(() => import("./pages/userPages/CMSUserProfilePage"));
const CMSUserUpdateProfilePage = lazy(() => import("./pages/userPages/CMSUserUpdateProfilePage"));
const CMSUserUpdatePasswordPage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));

//Cars pages
const CarPage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const CarCreatePage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const CarUpdatePage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const CarsListPage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));

//Provided services pages
const ProvidedServiceCreatePage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const ProvidedServiceUpdatePage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const ProvidedServicesListPage  = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));

//Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboardPage"));
const CMSUsersApprovePage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));
const CMSUsersListPage = lazy(() => import("./pages/userPages/CMSUserUpdatePasswordPage"));

//Components
const Header = lazy(() => import("./components/nav/Header"));

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
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />

        <UserRoute exact path="/register/complete" component={RegisterCompletePage} />
        <UserRoute exact path="/forgot/password" component={ForgotPasswordPage} />

        <UserRoute CMSUserMainMenuPage path="/user/menu" component={CMSUserMainMenuPage} />
        <UserRoute CMSUserProfilePage path="/user/profile" component={CMSUserProfilePage} />
        <UserRoute CMSUserUpdateProfilePage path="/user/update" component={CMSUserUpdateProfilePage} />
        <UserRoute CMSUserUpdatePasswordPage path="/user/update-password" component={CMSUserUpdatePasswordPage} />

        <UserRoute CarPage exact path="/car/:slug" component={CarPage} />
        <UserRoute CarCreatePage exact path="/car/create" component={CarCreatePage} />
        <UserRoute CarUpdatePage exact path="/car/update" component={CarUpdatePage} />
        <UserRoute CarsListPage exact path="/car/list" component={CarsListPage} />

        <UserRoute ProvidedServiceCreatePage exact path="/service/service/create" component={ProvidedServiceCreatePage} />
        <UserRoute ProvidedServiceUpdatePage exact path="/service/login" component={ProvidedServiceUpdatePage} />
        <UserRoute ProvidedServicesListPage exact path="/service/login" component={ProvidedServicesListPage} />

        <AdminRoute AdminDashboard exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute CMSUsersApprovePage exact path="/admin/cms-users-approve" component={CMSUsersApprovePage} />
        <AdminRoute CMSUsersListPage exact path="/admin/cms-users-list" component={CMSUsersListPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
