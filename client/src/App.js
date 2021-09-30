import React from "react";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";

//Pages import
import LoginPage from "./pages/loginPage";
import MainMenu from "./pages/mainMenu";
import AddClient from "./pages/addClient";
import AddUser from "./pages/addUser";
import CarsList from "./pages/carsList";
import ServicesList from "./pages/servicesList";
import CarsArchive from "./pages/carsArchive";
import AddService from "./pages/addService";
import AddCar from "./pages/addCar";
import UserPage from "./pages/userPage";
import ClientsList from "./pages/clientsList";

//Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <HashRouter>
      <Header />

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
      
    </HashRouter>    
  );
}