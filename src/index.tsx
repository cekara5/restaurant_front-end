import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import { MainMenu, MenuItem, ShowMenuItem } from "./components/MainMenu/MainMenu";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";

import LogOut from "./components/LogOutComponent/LogOutComponent";
import { LoginComponent } from "./components/Manager/LogInComponent";
import { RegisterCompopnent } from "./components/Manager/RegisterComponent";
import { AddRestaurantComponent } from "./components/Restaurant/AddRestaurantComponent";
import { AddWorkingTimeComponent } from "./components/Restaurant/AddWorkingTimeComponent";
import { AddTablesComponent } from "./components/Restaurant/AddTablesComponent";
import { RestaurantInfoComponent } from "./components/Restaurant/RestaurantInfoComponent";
import { SearchRestaurantComponent } from "./components/Restaurant/SearchRestaurantComponent";
import { AddReservationComponent } from "./components/Reservation/AddReservationComponent";
import { CheckAvailableTablesComponent } from "./components/Restaurant/CheckAvailableTablesComponent";
import { ReservationComponent } from "./components/Reservation/ReservationComponent";

const menuLinks = [
  new MenuItem("Home", "/", ShowMenuItem.Always),
  new MenuItem("Prijava", "/manager/login", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Registracija", "/manager/register", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Dodavanje restorana", "/restaurant/add", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Dodaj radno vreme", "/restaurant/add-working-time", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Dodaj stolove", "/restaurant/add-tables", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Restorani", "/restaurants", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Rezervacije", "/restaurant/reservations", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Odjava", "/logout", ShowMenuItem.Always, "right"), // ShowMenuItem.LoggedIn
];

ReactDOM.render(
  <React.StrictMode>
    <MainMenu items={menuLinks}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>

        <Route path="/manager/login" component={LoginComponent}></Route>
        <Route path="/manager/register" component={RegisterCompopnent}></Route>
        <Route path="/restaurant/add" component={AddRestaurantComponent}></Route>
        <Route path="/restaurant/add-working-time" component={AddWorkingTimeComponent}></Route>
        <Route path="/restaurant/add-tables" component={AddTablesComponent}></Route>
        <Route path="/restaurant/reservation/check-available-tables/:id" component={CheckAvailableTablesComponent}></Route>
        <Route path="/restaurant/reservation" component={AddReservationComponent}></Route>
        <Route path="/restaurant/reservations" component={ReservationComponent}></Route>
        <Route path="/restaurant/:id" component={RestaurantInfoComponent}></Route>
        <Route path="/restaurants/" component={SearchRestaurantComponent}></Route>
        <Route path="/logout" component={LogOut}></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
