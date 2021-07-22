import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "./firebase";

//Dispatch is the entry point to the redux store.
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

// using lazy
const Login = lazy(() => import("./pages/auth/CMSLoginPage"));
const Register = lazy(() => import("./pages/auth/CMSRegisterPage"));
const Home = lazy(() => import("./pages/CMSClientMainPage"));
const Header = lazy(() => import("./components/nav/Header"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));

const RegisterComplete = lazy(() => import("./pages/auth/CMSRegisterCompletePage"));
const ForgotPassword = lazy(() => import("./pages/auth/CMSForgotPasswordPage"));

const UserRoute = lazy(() => import("./components/routes/CMSUserRoute"));
const AdminRoute = lazy(() => import("./components/routes/CMSAdminRoute"));
const Password = lazy(() => import("./pages/user/CMSUpdatePasswordPage"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() => import("./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/car/CarCreate"));
const AllProducts = lazy(() => import("./pages/admin/car/AllCars"));
const ProductUpdate = lazy(() => import("./pages/admin/car/CarUpdate"));
const Product = lazy(() => import("./pages/CMSCarPage"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));

const Cart = lazy(() => import("./pages/TableLogicHere-Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCouponPage = lazy(() => import("./pages/admin/coupon/CreateCouponPage"));
const Payment = lazy(() => import("./pages/Payment"));

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
      <SideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />

        {/* Displays single car */}
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />

        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
    </Suspense>
  );
};

export default App;
