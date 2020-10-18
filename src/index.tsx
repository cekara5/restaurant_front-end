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
const menuLinks = [
  new MenuItem("Home", "/", ShowMenuItem.Always),
  new MenuItem("Prijava", "/manager/login", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Registracija", "/manager/register", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Dodavanje restorana", "/restaurant/add", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
  new MenuItem("Dodaj radno vreme", "/restaurant/add-working-time", ShowMenuItem.Always), // ShowMenuItem.NotLoggedIn
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
        <Route path="/logout" component={LogOut}></Route>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
